# Digital Bouquet

A lightweight Next.js app for creating and sharing a tiny digital bouquet.

## Features

- 4-step wizard (`/create`):
  1. Choose flower
  2. Choose wrapping (live composite preview)
  3. Write note (160-char limit + counter)
  4. Generate and copy shareable link
- Composite render uses layered transparent assets in a fixed square preview:
  - Flower behind
  - Wrapping on top
- Shareable URL payload (no backend): `/b/<payload>`
- Recipient page decodes payload and renders bouquet + note
- Friendly error state for invalid links or unknown IDs

## Tech

- Next.js (App Router) + TypeScript
- Tailwind CSS
- `next/image` for optimized rendering
- No auth, DB, or analytics

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Assets

Place transparent same-size files in:

- `public/flowers_png/*`
- `public/wraps_png/*`

The sample project is wired to:

- `public/flowers_png/chrysanthemum delight.png`, `chrysanthemum.png`, `lilies.png`, `pastel roses.png`, `peonies.png`, `red roses.png`, `sunflowers.png`, `tulips.png`
- `public/wraps_png/wrap1.png` ... `wrap6.png`

You can replace these with PNGs (recommended for production asset pipeline) and update `lib/options.ts` paths.

## Link encoding (`lib/share.ts`)

Payload schema:

```ts
{ f: string; w: string; n: string }
```

Encoding flow:

1. Normalize + validate payload
2. `JSON.stringify(payload)`
3. UTF-8 bytes -> base64
4. Convert base64 -> base64url (`+` -> `-`, `/` -> `_`, trim `=`)

Decoding is wrapped in `try/catch`, length-limited, and ID-validated.

## Core files

- `components/CompositePreview.tsx`
- `components/Stepper/Progress.tsx`
- `components/OptionGrid.tsx`
- `components/CreateWizard.tsx`
- `lib/share.ts`
- `app/create/page.tsx`
- `app/b/[payload]/page.tsx`

## Basic test plan

1. Go to `/create`.
2. Select a flower -> Next enabled.
3. Select a wrapping -> preview updates live -> Next enabled.
4. Enter note -> counter updates -> Generate link.
5. Copy/open link in a separate browser/device.
6. Confirm bouquet layers + note match original selections.
7. Open an invalid payload URL like `/b/not-a-valid-payload` and confirm friendly error + CTA.
8. Check mobile layout: preview appears above steps and everything remains tappable.
