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
