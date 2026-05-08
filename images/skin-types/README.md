# Skin type photos

Drop one image per skin type into this folder. Each card on `skin-types.html`
already points to the matching filename — once a file is present, the photo
appears automatically and the placeholder is removed.

## Expected filenames

| Skin type            | File                          |
| -------------------- | ----------------------------- |
| Oily                 | `oily.jpg`                    |
| Combination          | `combination.jpg`             |
| Dry                  | `dry.jpg`                     |
| Sensitive & rosacea  | `sensitive-rosacea.jpg`       |
| Mature & aging       | `mature.jpg`                  |
| Acne-prone           | `acne.jpg`                    |

## Recommended specs

- Format: `.jpg` (or `.png` if you prefer — update the `src` in
  `skin-types.html` to match).
- Aspect ratio: roughly **4:5 portrait** or **1:1 square** — the card crops
  to fill, so anything close works. Avoid extreme panoramas.
- Min size: **900 px** on the long edge. **1400 px** is ideal for retina.
- Keep the focal point near the upper-center so cropping doesn't cut off
  faces on smaller screens.

## Swapping or renaming

If you want to use different filenames or extensions, just open
`skin-types.html`, find the matching `<img class="skin-card__img" src="...">`
inside that card and update the `src` (and the `alt` text).
