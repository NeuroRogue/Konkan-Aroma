# KonkanAroma — Static Website

A fully static, mobile-first site. No backend, no database, no forms, no cookies, no analytics.

## Before you deploy: add your WhatsApp number

Every page currently uses a placeholder number in the WhatsApp link:

```
https://wa.me/91XXXXXXXXXX?text=...
```

Replace `91XXXXXXXXXX` with your real number in **country code + number** format, no `+`, no spaces, no dashes (e.g. `919876543210`). This exact string appears **9 times** across the project — find-and-replace `91XXXXXXXXXX` with your number in all files:

- `index.html` — 3 occurrences (hero button, CTA button, floating button)
- `about.html` — 2 occurrences (closing CTA, floating button)
- `products.html` — 2 occurrences (closing CTA, floating button)
- `reach-us.html` — 2 occurrences (main WhatsApp panel button, floating button)

Quick way to do it from a terminal, from inside the project folder:

```bash
grep -rl "91XXXXXXXXXX" . | xargs sed -i '' 's/91XXXXXXXXXX/9198XXXXXXX/g'
```
(drop the empty `''` after `-i` if you're on Linux rather than macOS)

The pre-filled message text ("Hi! I'm interested in your authentic food products.") is already URL-encoded and doesn't need to change unless you want different wording.

## Structure

```
index.html
about.html
products.html
reach-us.html
assets/css/style.css
assets/js/main.js
assets/images/   (empty — drop real product photos here; see notes below)
```

## Adding more products

`products.html` has two categories, toggled by the buttons at the top of the Products section: **Sweets & Nashta** and **Spices & Masala**. Each is its own `<div class="product-grid" data-category="...">` containing five `<article class="product-card">` blocks.

To add a new product:
1. Open `products.html` and find the `product-grid` for the right category (`data-category="sweets"` or `data-category="spices"`).
2. Copy one entire `<article class="product-card">...</article>` block.
3. Paste it right after the last product in that category.
4. Edit the image `src`, the `product-tag` label, the `<h3>` title, the description, and the two `<span class="chip">` labels.

To add a whole new category (e.g. "Pickles"):
1. Add a new button in `.category-toggle`: `<button class="category-btn" data-category="pickles" role="tab" aria-selected="false">Pickles</button>`
2. Add a new `<div class="product-grid is-hidden" data-category="pickles">` with your product cards inside.
3. No JavaScript changes needed — `main.js` reads `data-category` automatically.

## Swapping placeholder images for real photos

Every `<img>` currently points to an Unsplash placeholder URL and has a comment above it like:

```html
<!-- Replace with real product photo: assets/images/malvani-masala.jpg -->
```

To use your own photos: drop the image file into `assets/images/`, then change the `src` on that line to the relative path, e.g. `assets/images/malvani-masala.jpg`.

## Local preview

No build step needed — just open `index.html` in a browser. For the smoothest experience:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying with GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: KonkanAroma static site"
git branch -M main
git remote add origin https://github.com/<your-username>/konkanaroma.git
git push -u origin main
```

Then: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save.**
Site goes live at `https://<your-username>.github.io/konkanaroma/`.

## Privacy by design

- No forms anywhere on the site.
- No cookies, local storage, or session storage used.
- No analytics or tracking scripts of any kind.
- The only outbound action a visitor can take is opening a WhatsApp chat — nothing is submitted to this site itself.
