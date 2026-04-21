<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    handleCreateOrder($db);
}

if ($method === 'GET') {
    handleGetOrder($db);
}

jsonError('Method not allowed', 405);

function handleCreateOrder(PDO $db): never {
    rateLimit(10, 60); // max 10 orders per minute per IP

    $input = getJsonInput();

    $items = $input['items'] ?? null;
    if (!is_array($items) || count($items) === 0) {
        jsonError('Korpa je prazna');
    }

    // Sanitize and validate customer data
    $name = substr(cleanInput((string) ($input['customer_name'] ?? '')), 0, 120);
    $phone = substr(cleanInput((string) ($input['customer_phone'] ?? '')), 0, 32);
    $email = substr(cleanInput((string) ($input['customer_email'] ?? '')), 0, 120);
    $address = substr(cleanInput((string) ($input['address'] ?? '')), 0, 180);
    $city = substr(cleanInput((string) ($input['city'] ?? '')), 0, 100);
    $zip = substr(cleanInput((string) ($input['zip_code'] ?? '')), 0, 20);
    $note = substr(cleanInput((string) ($input['note'] ?? '')), 0, 500);

    if ($name === '' || $phone === '' || $address === '' || $city === '' || $zip === '') {
        jsonError('Nedostaju obavezni podaci kupca');
    }

    if (!preg_match('/^[\d\s+\-()]{6,20}$/', $phone)) {
        jsonError('Neispravan format telefona');
    }

    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Neispravan email format');
    }

    // Validate product IDs first (deduped for efficient DB lookup)
    $productIdsMap = [];
    foreach ($items as $index => $item) {
        if (!is_array($item)) {
            jsonError('Neispravan format stavke u korpi');
        }

        $pid = (int) ($item['product_id'] ?? 0);
        if ($pid <= 0) {
            jsonError('Neispravan product_id u korpi');
        }

        $productIdsMap[$pid] = $pid;
    }

    $productIds = array_values($productIdsMap);
    if (count($productIds) === 0) {
        jsonError('Korpa je prazna');
    }

    // Validate items against DB
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));
    $stmt = $db->prepare("SELECT id, price FROM products WHERE id IN ({$placeholders}) AND active = 1");
    $stmt->execute($productIds);
    $dbRows = $stmt->fetchAll();

    $dbProducts = [];
    foreach ($dbRows as $row) {
        $dbProducts[(int) $row['id']] = (float) $row['price'];
    }

    $subtotal = 0;
    $validatedItems = [];

    foreach ($items as $item) {
        $pid = (int) ($item['product_id'] ?? 0);
        if (!isset($dbProducts[$pid])) {
            jsonError("Proizvod #{$pid} ne postoji ili nije aktivan");
        }

        $qty = max(1, min(10, (int) ($item['quantity'] ?? 1)));
        $serverPrice = (float) $dbProducts[$pid];
        $lineTotal = $serverPrice * $qty;
        $subtotal += $lineTotal;

        $color = substr(cleanInput((string) ($item['color'] ?? '')), 0, 50);
        $size = substr(cleanInput((string) ($item['size'] ?? '')), 0, 20);
        if ($color === '' || $size === '') {
            jsonError('Veličina i boja su obavezni za svaku stavku korpe');
        }

        $validatedItems[] = [
            'product_id' => $pid,
            'color' => $color,
            'size' => $size,
            'quantity' => $qty,
            'price' => $serverPrice,
        ];
    }

    // Shipping
    $shippingCost = $subtotal >= FREE_SHIPPING_THRESHOLD ? 0.0 : DEFAULT_SHIPPING_COST;
    $grandTotal = $subtotal + $shippingCost;

    // Insert order
    $db->beginTransaction();
    try {
        $stmt = $db->prepare('
            INSERT INTO orders (customer_name, customer_phone, customer_email, address, city, zip_code, note, total, shipping_cost, status)
            VALUES (:name, :phone, :email, :address, :city, :zip, :note, :total, :shipping, :status)
        ');
        $stmt->execute([
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'address' => $address,
            'city' => $city,
            'zip' => $zip,
            'note' => $note,
            'total' => $grandTotal,
            'shipping' => $shippingCost,
            'status' => 'pending',
        ]);

        $orderId = (int) $db->lastInsertId();

        $stmt = $db->prepare('
            INSERT INTO order_items (order_id, product_id, color, size, quantity, price)
            VALUES (:order_id, :product_id, :color, :size, :quantity, :price)
        ');

        foreach ($validatedItems as $item) {
            $stmt->execute([
                'order_id' => $orderId,
                'product_id' => $item['product_id'],
                'color' => $item['color'],
                'size' => $item['size'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        $db->commit();
        jsonResponse(['order_id' => $orderId], true, 201);

    } catch (\Throwable $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        jsonError('Greška pri kreiranju porudžbine', 500);
    }
}

function handleGetOrder(PDO $db): never {
    $id = (int) ($_GET['id'] ?? 0);
    $phone = cleanInput((string) ($_GET['phone'] ?? ''));
    if ($id <= 0 || $phone === '') {
        jsonError('Parametri id i phone su obavezni');
    }

    $stmt = $db->prepare('SELECT * FROM orders WHERE id = :id AND customer_phone = :phone LIMIT 1');
    $stmt->execute(['id' => $id, 'phone' => $phone]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonError('Porudžbina nije pronađena', 404);
    }

    // Fetch items
    $stmt = $db->prepare('
        SELECT oi.*, p.name AS product_name
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = :order_id
    ');
    $stmt->execute(['order_id' => $id]);
    $order['items'] = $stmt->fetchAll();

    // Cast types
    $order['total'] = (float) $order['total'];
    $order['shipping_cost'] = (float) $order['shipping_cost'];
    $order['id'] = (int) $order['id'];
    foreach ($order['items'] as &$item) {
        $item['id'] = (int) $item['id'];
        $item['product_id'] = (int) $item['product_id'];
        $item['price'] = (float) $item['price'];
        $item['quantity'] = (int) $item['quantity'];
    }
    unset($item);

    jsonResponse($order);
}
