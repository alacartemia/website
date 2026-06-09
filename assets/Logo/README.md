# Logo assets — A La Carte

Path: `assets/Logo/`

## Files (4 × PNG, 1350×1350, RGBA transparent)

| File | Variant | Use on background |
|------|---------|-------------------|
| **logo-white.png** | Wordmark "Á La Carte" — cream `#FFF3D2` | **Navy `#171842`** (header) |
| **logo-blue.png** | Wordmark — navy `#171842` | **Cream `#FFF3D2`** (body, footer) |
| **logo-icon-white.png** | ALC monogram — cream | Navy / dark sections |
| **logo-icon-blue.png** | ALC monogram — navy | Cream / light sections |

## Rule (contrast)

```
Background NAVY (#171842)  →  logo-white.png  (header — centered)
Background CREAM (#FFF3D2) →  logo-blue.png
```

## Site implementation (planned)

| Location | Background | Logo file |
|----------|------------|-----------|
| **Header** | `#171842` | `logo-white.png` |
| **Footer** | `#FFF3D2` | `logo-blue.png` (optional) |
| **Favicon** | derive from `logo-icon-blue.png` or `logo-icon-white.png` |
| **OG image** | `Logo/social/logo-blue-social.png` — phase 2 |

## HTML example (header)

```html
<header style="background:#171842">
  <a href="/">
    <img src="assets/Logo/logo-white.png" alt="Á La Carte" width="180" height="auto">
  </a>
</header>
```

## Notes

- "white" = brand cream `#FFF3D2`, not pure #FFFFFF
- "blue" = brand navy `#171842`
- Icon variants for favicon, app links, small spaces
- Sticker reference (not logo): `assets/alc_sticker_page_1.png`

---

## Social / pre-composed (baked background) — `social/`

Square PNGs with **solid brand background** (not transparent).  
Use for OG, share previews, email — **not** for site header (use transparent files above).

| File | Content | Background |
|------|---------|------------|
| **logo-white-social.png** | Wordmark cream | Navy `#171842` |
| **logo-blue-social.png** | Wordmark navy | Cream `#FFF3D2` |
| **icon-white-social.png** | ALC monogram cream | Navy |
| **icon-blue-social.png** | ALC monogram navy | Cream |

### Planned use

| Use | File |
|-----|------|
| **og-image** (phase 2) | `logo-blue-social.png` |
| Share / WhatsApp / Instagram link | `logo-blue-social.png` or `logo-white-social.png` |
| Favicon fallback (crop) | `icon-blue-social.png` or `icon-white-social.png` |

All files: ~1350×1350, RGBA.

