# PK Beauty

One-page marketing site for **PK Beauty** — Paulina, licensed esthetician based in Trumbull, Connecticut.

The site is plain HTML / CSS / JS — no build step required.

## Run locally

Any static file server works. A couple of options from the `pk-beauty/` folder:

```bash
# Node
npx serve -l 3000

# Python 3
python -m http.server 3000
```

Then open http://localhost:3000.

## Project structure

```
pk-beauty/
  index.html
  css/styles.css
  js/main.js
  images/
    paulina.jpg     # portrait used in the About section
```

## Sections

- Hero with animated gradient backdrop
- About / bio with portrait
- Services
- Client gallery
- Before your appointment
- Before & after sliders (six)
- Booking policies
- Booking CTA
- Footer with hours, contact, socials

## Customize

- **Booking link:** in `index.html`, replace the `https://squareup.com/appointments` URL on the main CTA and any "Book now" links.
- **Portrait:** swap `images/paulina.jpg` (3:4 portrait recommended).
- **Before/after photos:** replace each pair's `<img src>` inside `.compare__after` and `.compare__before`.
- **Contact / socials:** update phone, email, Instagram, Facebook in the footer block.
