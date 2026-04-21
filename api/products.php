<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$db = getDB();

// GET single product by slug
if (!empty($_GET['slug'])) {
    $slug = cleanInput((string) $_GET['slug']);
    if (!isValidSlug($slug)) {
        jsonError('Neispravan slug', 400);
    }

    $stmt = $db->prepare('
        SELECT p.*, c.name AS collection_name, c.slug AS collection_slug
        FROM products p
        LEFT JOIN collections c ON p.collection_id = c.id
        WHERE p.slug = :slug AND p.active = 1
        LIMIT 1
    ');
    $stmt->execute(['slug' => $slug]);
    $product = $stmt->fetch();

    if (!$product) {
        jsonError('Proizvod nije pronađen', 404);
    }

    jsonResponse(castProductRow($product));
}

// GET product list
$where = ['p.active = 1'];
$params = [];

if (!empty($_GET['collection'])) {
    $collectionSlug = cleanInput((string) $_GET['collection']);
    if (!isValidSlug($collectionSlug)) {
        jsonError('Neispravan parametar collection', 400);
    }

    $where[] = 'c.slug = :collection';
    $params['collection'] = $collectionSlug;
}

if (array_key_exists('featured', $_GET) && isTruthyQueryValue($_GET['featured'])) {
    $where[] = 'p.featured = 1';
}

$whereSQL = implode(' AND ', $where);
$orderSQL = 'p.sort_order ASC, p.created_at DESC';

if (!empty($_GET['sort'])) {
    $sortKey = cleanInput((string) $_GET['sort']);
    $sortMap = [
        'price-asc' => 'p.price ASC',
        'price-desc' => 'p.price DESC',
        'newest' => 'p.created_at DESC',
    ];

    if (isset($sortMap[$sortKey])) {
        $orderSQL = $sortMap[$sortKey];
    }
}

$stmt = $db->prepare("
    SELECT p.*, c.name AS collection_name, c.slug AS collection_slug
    FROM products p
    LEFT JOIN collections c ON p.collection_id = c.id
    WHERE {$whereSQL}
    ORDER BY {$orderSQL}
");
$stmt->execute($params);
$products = $stmt->fetchAll();

foreach ($products as &$p) {
    $p = castProductRow($p);
}
unset($p);

jsonResponse($products);
