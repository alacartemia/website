# Assets Map — A La Carte Miami

> **Status:** Phase 1 **built** — June 2026 (pending Netlify deploy + DNS)  
> **Site files:** `index.html`, `css/styles.css`, `js/main.js`, `privacy.html`, `accessibility.html`, `404.html`, `netlify.toml`

---

## Folder structure

```
assets/
├── hero/           5+ files  — desktop + mobile hero covers
├── interior/      14 files  — 7 masters + 7 gallery thumbs (*-.webp)
├── Food/          14 files  — food grid (JPG fallbacks)
├── Food2/         15 files  — food & lifestyle masters (WebP)
├── working/        6 files  — community / barista (WebP)
├── Logo/           4 PNG   — header/footer logos
├── Logo/social/    4 PNG   — OG / share (pre-composed)
├── favicon/        ✓       — favicon.io package + site.webmanifest
├── colors.txt
└── alc_sticker_*.png (reference only)
```

---

## Live site — section → code mapping

```
┌─────────────────────────────────────────┐
│ HEADER — logo-white.png + ORDER NOW     │
│          hamburger (mobile, right)      │
├─────────────────────────────────────────┤
│ HERO — <picture> desktop / mobile       │
│   H1: Á La Carte Miami                  │
│   H2: Thoughtfully prepared food…       │
│   location → #locations                 │
│   [ Start Your Order ] — bottom         │
├─────────────────────────────────────────┤
│ ABOUT — brand copy + Kosher ORB badge   │
├─────────────────────────────────────────┤
│ COMMUNITY — working/ALC0047 copy.webp   │
│   App Store / Google Play — coming soon │
├─────────────────────────────────────────┤
│ FOOD — Food2 featured + 5-cell mosaic   │
├─────────────────────────────────────────┤
│ INTERIOR — horizontal gallery + arrows  │
│   7 thumbs @ 1000×1500 (*-.webp)        │
├─────────────────────────────────────────┤
│ LOCATIONS — Hallandale + map + Bay Harbor│
├─────────────────────────────────────────┤
│ CONTACT — Netlify form                  │
├─────────────────────────────────────────┤
│ FOOTER — social, Privacy, Accessibility │
│ A11Y toolbar — fixed bottom-left        │
└─────────────────────────────────────────┘
```

**Section IDs:** `#hero`, `#about`, `#community`, `#food`, `#interior`, `#locations`, `#contact`

---

## Format support

```html
<picture>
  <source media="(max-width: 767px)" type="image/webp" srcset="/assets/hero/hero-poster-mobile.webp">
  <source type="image/webp" srcset="/assets/hero/hero-poster3.webp">
  <img src="/assets/hero/hero-poster3.webp" alt="" width="3612" height="1344" fetchpriority="high">
</picture>
```

| Folder | Format | Notes |
|--------|--------|-------|
| hero, interior (gallery), Food2, working | `.webp` | Primary |
| Food | `.jpg` | `<picture>` fallback in food grid |
| Logo | `.png` | Transparent |

**URL encoding:** paths with spaces use `%20` in HTML (e.g. `ALC%20%20-%20Dec%202025%20-%20Int%20-%203-.webp`).

**Food2 filename quirk:** files like `ALC  - Dec 2025 - 4.webp` have **two spaces** after `ALC`; `EXT*` files have **one space** — must match exactly in `srcset`.

---

## `hero/`

| File | Size | Dimensions | Use |
|------|------|------------|-----|
| **hero-poster3.webp** | ~192 KB | 3612×1344 (~21:9) | **Active desktop hero** |
| **hero-poster-mobile.webp** | ~97 KB | 1536×2752 (9:16) | **Active mobile hero** (`max-width: 767px`) |
| hero-poster2.webp | ~182 KB | 3168×1344 (21:9) | Alternate / A-B test |
| hero-poster4.webp | ~138 KB | 3168×1344 (21:9) | Alternate / A-B test |
| hero-poster.webp | ~174 KB | 2752×1536 (~16:9) | Legacy (16:9 + wall sign) — backup |

### Hero CSS (current)

| Breakpoint | Setting |
|------------|---------|
| Desktop | `min-height: clamp(23rem, 70vh, 45rem)` · `object-position: center 42%` |
| Mobile | `min-height: clamp(21rem, 62vh, 36rem)` · `object-position: center 72%` |
| Mobile text | Top-aligned (`flex-start`, `padding-top: clamp(4rem, 16vh, 6rem)`) |
| CTA | Fixed bottom (`.hero__cta`) |

**Future:** replace with `<video>` + poster → same slot.

---

## `interior/` — section: **Our Space**

### Gallery (in site — thumbs)

Site uses **1000×1500** WebP thumbs for scroll performance. Naming: add `-` before `.webp`; last file uses `--` (original already ends with `-`).

| Gallery file (active) | Master (archive) | Dimensions (gallery) |
|----------------------|------------------|----------------------|
| `ALC  - Dec 2025 - Int - 3-.webp` | `… - 3.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int - 9-.webp` | `… - 9.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int - 7-.webp` | `… - 7.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int - 16-.webp` | `… - 16.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int - 19-.webp` | `… - 19.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int - 21-.webp` | `… - 21.webp` | 1000×1500 |
| `ALC  - Dec 2025 - Int --.webp` | `… - Int -.webp` | 1000×1500 |

**UI:** `.interior-gallery` — horizontal scroll + prev/next arrows + styled 3px scrollbar.  
**Loading:** first 3 images `loading="eager"`, rest `lazy`.

**Phase 2:** rename thumbs to clean names (e.g. `interior-01.webp`) and remove `-` suffix convention.

---

## `Food/` (legacy JPG — optional archive)

Food section now uses **Food2 `*-.webp` only** (no JPG fallback in `index.html`).

This folder can be deleted after confirming no other references, or kept locally as archive.

---

## `Food2/` (15 WebP @ web size)

All files use **`-` suffix** before `.webp` (web-optimized; masters removed).

| Dimensions | Files |
|------------|-------|
| **2500×1667** | `A la Carte - Nov 2025 - 35-.webp` — featured spread |
| **1200×1800** | All other `Food2/*-.webp` (mosaic + swap options) |

### Active in `index.html`

| File | Section |
|------|---------|
| `A la Carte - Nov 2025 - 35-.webp` | Featured |
| `ALC  - Dec 2025 - 4-.webp` | Mosaic |
| `ALC - Dec 2025 - EXT5-.webp` | Mosaic |
| `ALC - Dec 2025 - EXT4-.webp` | Mosaic |
| `ALC  - Dec 2025 - 7-.webp` | Mosaic |
| `ALC  - Dec 2025 - 11-.webp` | Mosaic |

### Reserve (swap options, not in HTML)

`LS - 0/3/17/19-.webp`, `ALC  - Dec 2025 - 6/8/12/14-.webp`, `ALC - Dec 2025 - EXT1-.webp`

**Filename quirk:** `ALC  -` = two spaces; `ALC -` = one space (EXT files).

`EXT*` = drinks/counter, **not** building exterior.

---

## `working/` (6 WebP)

| File | Use |
|------|-----|
| **ALC0047 copy.webp** | ★ Community section |
| Others | Reserve / swap |

---

## `Logo/` + `favicon/`

See `assets/Logo/README.md`.

| Header (navy) | `logo-white.png` — centered; rectangular crop recommended (less dead space) |
| Favicon | `assets/favicon/` — favicon.io package, manifest updated |

---

## Built pages

| File | Notes |
|------|-------|
| `index.html` | One-page site — all sections |
| `privacy.html` | Toast policy (from client txt) + a11y toolbar |
| `accessibility.html` | WCAG statement + a11y toolbar |
| `404.html` | Branded error page |
| `netlify.toml` | Publish `.` + security headers |
| `scripts/build_privacy.py` | Regenerate privacy.html from Toast txt |

---

## Missing / pending

| Item | Status |
|------|--------|
| hero-video.mp4 | Client TBD |
| App Store / Google Play URLs | Placeholder "coming soon" |
| Storefront exterior photo | Not in assets |
| Netlify deploy + DNS | Not started |
| Logo rectangular crop | Recommended for header |
| Interior thumb rename / cleanup | Optional phase 2 |
| OG / Schema / Analytics | Phase 2 |

---

## Quick counts

| Folder | Active in site | Notes |
|--------|----------------|-------|
| hero | 2 (+ alts) | poster3 + mobile |
| interior | 7 gallery | + 7 masters archived |
| Food | 5 in grid | + featured Food2 |
| Food2 | 6 in site | |
| working | 1 | community |
| **Code** | 6 HTML + CSS + JS | phase 1 complete |

---

*Internal — last updated June 2026 after phase 1 build.*
