# Nacionale API (VPS Source)

Minimalan, produkcijski API sloj izdvojen iz live VPS deploy-a za nacionale.svilenkovic.rs.

Ovaj repozitorijum je namenjen kao javni code showcase:
- prikazuje arhitekturu porudzbina/proizvoda/kolekcija
- ne otkriva frontend source niti osetljive kredencijale
- koristi env konfiguraciju umesto hardkodovanih tajni

## Struktura

- `config.php` - CORS, DB konekcija, JSON helperi, rate limiting
- `products.php` - lista proizvoda i pojedinacni proizvod po slug-u
- `collections.php` - lista kolekcija i kolekcija po slug-u
- `orders.php` - kreiranje porudzbine i pregled porudzbine
- `.env.example` - primer konfiguracije za okruzenje

## Endpoint-i

- `GET /api/products.php`
- `GET /api/products.php?slug=<slug>`
- `GET /api/products.php?collection=<slug>&featured=1&sort=price-asc`
- `GET /api/collections.php`
- `GET /api/collections.php?slug=<slug>`
- `POST /api/orders.php`
- `GET /api/orders.php?id=<order_id>&phone=<telefon>`

## Primer POST payload-a

```json
{
  "customer_name": "Petar Petrovic",
  "customer_phone": "+38160111222",
  "customer_email": "petar@example.com",
  "address": "Bulevar oslobodjenja 10",
  "city": "Novi Sad",
  "zip_code": "21000",
  "note": "Pozvati pre isporuke",
  "items": [
    {
      "product_id": 12,
      "color": "#111111",
      "size": "L",
      "quantity": 2
    }
  ]
}
```

## Bezbednosne napomene

- Input validacija i normalizacija za sve kljucne ulaze
- SQL upiti su prepared statements
- Cene se validiraju na serveru (ne veruje se klijentu)
- Rate limiting po IP za endpoint porudzbine
- Osetljivi podaci su pomereni u env varijable

## Pokretanje

1. Kopirati `.env.example` u lokalni env mehanizam servera.
2. Postaviti realne DB vrednosti u env.
3. Deploy API fajlova u web root `/api` folder.
4. Proveriti syntax:

```bash
php -l config.php
php -l products.php
php -l collections.php
php -l orders.php
```

## Napomena

Frontend source nije deo ovog javnog paketa po zahtevu vlasnika projekta.
