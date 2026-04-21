# Architecture

## Kontekst

Javni repo prikazuje samo API sloj iz demo e-commerce projekta.

## Komponente

- HTTP layer (CORS + JSON response helperi)
- Validation layer (ulazni podaci i query parametri)
- Data layer (PDO + prepared statements)
- Order transaction layer (orders + order_items)
- Abuse protection (rate limiting po IP)

## Tok kreiranja porudzbine

1. Validacija payload-a i customer podataka
2. Validacija item-a prema bazi (id + cena)
3. Racunanje subtotal + shipping + grand total
4. DB transaction
5. Commit i response sa `order_id`

## Principi

- fail fast na los ulaz
- server je source of truth za cenu
- bez hardkodovanih tajni
- bezbedan fallback i konzistentan JSON response
