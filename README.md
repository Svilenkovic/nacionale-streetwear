# Nacionale Streetwear

Kompletan source kod za Nacionale web shop: Next.js frontend (static export) + PHP API + SQL schema + nginx konfiguracija.

## Tehnologije

- Next.js 16 (App Router, `output: "export"`)
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP + Three.js
- PHP API (`backend/api`)
- MySQL schema (`backend/sql`)

## Struktura projekta

- `src/`: frontend source (app, komponente, hooks, lib)
- `backend/api/`: PHP endpointi (`products`, `collections`, `orders`)
- `backend/sql/`: baza i inicijalna schema
- `nginx/`: primer deploy konfiguracije
- `next.config.ts`: static export podeavanja

## Lokalni razvoj (frontend)

```bash
npm install
npm run dev
```

## Build i quality check

```bash
npm run build
npm run lint
```

## Backend napomena

API endpointi ocekuju PHP + MySQL okruzenje. Pre produkcije obavezno:

- validacija DB kredencijala,
- prepared statements i error handling,
- testiranje endpointa (`orders.php`, `products.php`, itd.).

## Live Preview

- https://nacionale.svilenkovic.rs

## Deploy flow (produkcija)

1. Frontend build: `npm run build`
2. Deploy `out/` u web root
3. Deploy/azuriranje `backend/api` i SQL migracija po potrebi
4. Zavrsna provera API + frontend integracije
