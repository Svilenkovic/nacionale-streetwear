<?php
declare(strict_types=1);

function envValue(string $key, string $default = ''): string {
    $value = getenv($key);
    if ($value === false) {
        return $default;
    }

    return trim((string) $value);
}

// CORS
// Use wildcard by default, but allow strict origin override via environment.
$allowedOrigin = envValue('NACIONALE_CORS_ORIGIN', '*');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: {$allowedOrigin}");
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Database
define('DB_HOST', envValue('NACIONALE_DB_HOST', 'localhost'));
define('DB_NAME', envValue('NACIONALE_DB_NAME', 'nacionale'));
define('DB_USER', envValue('NACIONALE_DB_USER', 'nacionale_user'));
define('DB_PASS', envValue('NACIONALE_DB_PASS', 'change-me'));

// Business defaults
define('FREE_SHIPPING_THRESHOLD', (float) envValue('NACIONALE_FREE_SHIPPING_THRESHOLD', '3000'));
define('DEFAULT_SHIPPING_COST', (float) envValue('NACIONALE_SHIPPING_COST', '350'));

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
    return $pdo;
}

function jsonResponse(mixed $data, bool $success = true, int $code = 200): never {
    http_response_code($code);
    echo json_encode(
        ['success' => $success, 'data' => $data],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function jsonError(string $message, int $code = 400): never {
    http_response_code($code);
    echo json_encode(
        ['success' => false, 'error' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        jsonError('Neispravan JSON payload', 400);
    }

    if (!is_array($data)) {
        jsonError('JSON payload mora biti objekat', 400);
    }

    return $data;
}

function cleanInput(string $input): string {
    $value = trim($input);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value);

    return $value ?? '';
}

function isValidSlug(string $slug): bool {
    return (bool) preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug);
}

function isTruthyQueryValue(mixed $value): bool {
    if (is_bool($value)) {
        return $value;
    }

    $normalized = strtolower(cleanInput((string) $value));
    return in_array($normalized, ['1', 'true', 'yes', 'on'], true);
}

function decodeJsonArray(mixed $value): array {
    if (!is_string($value) || $value === '') {
        return [];
    }

    $decoded = json_decode($value, true);
    if (!is_array($decoded)) {
        return [];
    }

    return array_values(array_filter($decoded, static fn($item) => is_scalar($item)));
}

function castProductRow(array $product): array {
    $product['id'] = (int) ($product['id'] ?? 0);
    $product['collection_id'] = (int) ($product['collection_id'] ?? 0);
    $product['colors'] = decodeJsonArray($product['colors'] ?? null);
    $product['sizes'] = decodeJsonArray($product['sizes'] ?? null);
    $product['featured'] = (bool) ($product['featured'] ?? false);
    $product['active'] = (bool) ($product['active'] ?? false);
    $product['price'] = (float) ($product['price'] ?? 0);
    $product['old_price'] = isset($product['old_price']) && $product['old_price'] !== null
        ? (float) $product['old_price']
        : null;

    return $product;
}

// Rate limiting (simple file-based, per IP)
function rateLimit(int $maxRequests = 30, int $windowSeconds = 60): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = sys_get_temp_dir() . '/nacionale_rate_' . md5($ip);

    $fp = fopen($file, 'c+');
    if ($fp === false) {
        return;
    }

    if (!flock($fp, LOCK_EX)) {
        fclose($fp);
        return;
    }

    $raw = stream_get_contents($fp);
    $data = json_decode($raw !== false && $raw !== '' ? $raw : '[]', true);
    if (!is_array($data)) {
        $data = [];
    }

    $now = time();
    $data = array_values(array_filter(
        $data,
        static fn($timestamp) => is_int($timestamp) && ($now - $timestamp) < $windowSeconds
    ));

    if (count($data) >= $maxRequests) {
        flock($fp, LOCK_UN);
        fclose($fp);
        jsonError('Previše zahteva. Pokušajte ponovo za minut.', 429);
    }

    $data[] = $now;

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    fflush($fp);

    flock($fp, LOCK_UN);
    fclose($fp);
}
