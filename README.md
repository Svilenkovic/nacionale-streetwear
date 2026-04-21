# Nacionale Demo Commerce API

Javni showcase repozitorijum za API sloj projekta Nacionale.

> Status: Demo projekat pravljen kao probna verzija za klijenta.
> Klijent se na kraju nije odlucio za finalnu realizaciju sajta.

## Sta je javno objavljeno

Ovaj repozitorijum namerno sadrzi samo backend API showcase deo:
- cist i dokumentovan PHP API
- validaciju porudzbina na serveru
- sigurnije rukovanje unosom i konfiguracijom
- env baziranu konfiguraciju bez hardkodovanih tajni

Frontend source i kompletan produkcioni kod nisu javno objavljeni.

## Struktura

- `api/config.php` - CORS, DB konekcija, helper funkcije, rate limiting
- `api/products.php` - listanje i single fetch proizvoda
- `api/collections.php` - listanje i single fetch kolekcija
- `api/orders.php` - kreiranje porudzbine i status lookup
- `.env.example` - primer konfiguracije
- `docs/API_REFERENCE.md` - detaljni endpoint opisi
- `docs/ARCHITECTURE.md` - tehnicka arhitektura i tokovi
- `NOTICE_DEMO.md` - formalna napomena o demo statusu

## Kvalitet i sigurnost

- prepared statements za sve SQL upite
- server-side validacija cena i artikala
- normalizacija i validacija ulaza
- rate limiting po IP adresi
- transaction safety za upis porudzbine
- bezbedan JSON parsing sa kontrolom greske

## Brzi start

1. Kopiraj env vrednosti iz `.env.example`.
2. Postavi realne DB kredencijale kroz server environment.
3. Deploy API fajlova u `/api` folder.
4. Proveri syntax:

```bash
php -l api/config.php
php -l api/products.php
php -l api/collections.php
php -l api/orders.php
```

## Live referenca

- Site URL: https://nacionale.svilenkovic.rs

## Demo napomena

Ovaj projekat je ostavljen javno iskljucivo kao tehnicki portfolio primer.
Nije aktivan komercijalni proizvod.
