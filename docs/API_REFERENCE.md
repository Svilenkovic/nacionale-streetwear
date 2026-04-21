# API Reference

## Base

Svi endpoint-i su dostupni pod `/api` putanjom.

## `GET /api/products.php`

Vraca listu aktivnih proizvoda.

### Query parametri

- `collection` - slug kolekcije
- `featured` - `1|true|yes|on`
- `sort` - `price-asc|price-desc|newest`

## `GET /api/products.php?slug=<slug>`

Vraca jedan proizvod po slug-u.

## `GET /api/collections.php`

Vraca aktivne kolekcije.

## `GET /api/collections.php?slug=<slug>`

Vraca jednu kolekciju po slug-u.

## `POST /api/orders.php`

Kreira porudzbinu.

### Obavezna polja

- `customer_name`
- `customer_phone`
- `address`
- `city`
- `zip_code`
- `items[]`

### Napomena

Cena i dostupnost artikala se proveravaju na serveru.
Klijentske cene se ignorisu.

## `GET /api/orders.php?id=<id>&phone=<phone>`

Vraca detalje porudzbine i stavke.
