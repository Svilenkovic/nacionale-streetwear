<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$db = getDB();

// GET single collection by slug
if (!empty($_GET['slug'])) {
    $slug = cleanInput((string) $_GET['slug']);
    if (!isValidSlug($slug)) {
        jsonError('Neispravan slug', 400);
    }

    $stmt = $db->prepare('SELECT * FROM collections WHERE slug = :slug AND active = 1 LIMIT 1');
    $stmt->execute(['slug' => $slug]);
    $collection = $stmt->fetch();

    if (!$collection) {
        jsonError('Kolekcija nije pronađena', 404);
    }

    $collection['id'] = (int) ($collection['id'] ?? 0);
    $collection['active'] = (bool) ($collection['active'] ?? false);

    jsonResponse($collection);
}

// GET all collections
$stmt = $db->query('SELECT * FROM collections WHERE active = 1 ORDER BY created_at DESC');
$collections = $stmt->fetchAll();

foreach ($collections as &$collection) {
    $collection['id'] = (int) ($collection['id'] ?? 0);
    $collection['active'] = (bool) ($collection['active'] ?? false);
}
unset($collection);

jsonResponse($collections);
