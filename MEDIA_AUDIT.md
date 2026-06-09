# Client Media Audit — A La Carte Miami

> Scanned: `Downloads/a la carte media/` (70 files)  
> Compared to legacy `assets/Food/` (22 JPG @ 1024px)  
> **Verdict:** New client media is **significantly better** — professional shoot, brand-consistent, WebP-ready.

---

## Folder overview

| Folder | Files | Size | Role |
|--------|-------|------|------|
| **workingwebp/** | 44 | 1080px portrait, 43–190 KB | **Primary web pool** — food, drinks, lifestyle |
| **interior/** | 11 | 3.4k–5.9k px, 169–475 KB | **Hero + atmosphere** — space, arches, cream/wood |
| **more/** | 15 | 3.5k–6k px, 156–498 KB | **High-res masters** — Nov spread, Dec dishes, LS |

**Note:** Files named `EXT` are **not building exteriors** — they are food/drink/lifestyle shots (e.g. matcha, counter lineup). No clear storefront facade found in this batch.

---

## Legacy `assets/Food/` — status

| | Old Food/ | New workingwebp + interior |
|---|-----------|----------------------------|
| Quality | Good product shots | **Pro shoot, on-brand space** |
| Format | JPG | **WebP** (smaller, modern) |
| Web size | 1024 mixed | 1080 optimized |
| Interior | ❌ | ✅ |
| Brand (apron/cups) | ❌ | ✅ |

**Recommendation:** **Replace** `assets/Food/` with curated picks from new media. Keep old folder as `_archive/Food-legacy/` or delete after migration.

---

## Site mapping — what the page needs (implemented)

| Site slot | Active file | Notes |
|-----------|-------------|-------|
| **hero desktop** | `hero/hero-poster3.webp` | 21:9 ultrawide (3612×1344) |
| **hero mobile** | `hero/hero-poster-mobile.webp` | 9:16 portrait (1536×2752) |
| **section-feature** | `Food2/Nov 2025 - 35.webp` | Food featured spread |
| **community-app** | `working/ALC0047 copy.webp` | Community section |
| **interior gallery** | `interior/*-.webp` | 1000×1500 thumbs — see ASSETS_MAP.md |
| **hero-video** | TBD | poster slots ready |

### Interior gallery performance (June 2026)

Full-resolution interior masters (3.4k–5.8k px) caused scroll jank.  
**Fix:** gallery uses `*-.webp` thumbs at **1000×1500**; masters retained for archive / phase 2.

Naming: `Int - 3.webp` → `Int - 3-.webp`; `Int -.webp` → `Int --.webp`.

---

## Recommended migration → `assets/`

Copy **only these** (~10 files) — not all 70:

```
assets/
├── hero/
│   └── hero-poster.webp          ← interior Int-17
├── sections/
│   ├── community-app.webp        ← workingwebp ALC0047
│   ├── section-feature-desktop.webp  ← more Nov 2025 - 35
│   └── section-feature-mobile.webp   ← interior Int-3
├── gallery/                      (optional — phase 1.5)
│   ├── interior-15.webp
│   ├── interior-4.webp
│   ├── food-poke.webp            ← more Dec 2025 - 4
│   ├── food-counter.webp         ← more EXT5 (misnamed)
│   ├── matcha.webp               ← workingwebp ALC0068
│   └── lifestyle-cups.webp       ← workingwebp ALC0350
├── Logo/                         (existing — keep)
└── _archive/
    └── Food-legacy/              (old 22 JPG — optional move)
```

---

## workingwebp — best of 44 (extras for gallery / swap)

| File | Content | Use |
|------|---------|-----|
| ALC0047 | Barista + apron | **community** ★ |
| ALC0068 | Matcha whisk | craft / wellness |
| ALC0188 | Food bowl | section alt |
| ALC0350 | Branded cups in car | lifestyle / social |
| ALC0051 | Latte heart | drink accent |
| ALC0142–0355 | Various dishes | gallery pool |

Skip migrating all 44 — pick on demand.

---

## interior — all 11 ranked

| Rank | File | Orient | Hero? |
|------|------|--------|-------|
| ★1 | Int - 17.webp | landscape | **Best hero** |
| ★2 | Int - 15.webp | landscape | Hero alt / gallery |
| ★3 | Int - 4.webp | landscape | Hero alt |
| 4 | Int - 3.webp | portrait | Mobile section |
| 5 | Int - 9.webp | portrait | Minimal shadow wall |
| 6 | Int -.webp | portrait | Full room |
| 7–11 | 16, 19, 21, 23, 7 | mixed | Gallery backup |

---

## more/ — 15 files

| File | Use |
|------|-----|
| **A la Carte - Nov 2025 - 35.webp** | ★ Desktop food section (only landscape food spread) |
| **ALC - Dec 2025 - 4.webp** | Poke / menu hero food |
| **ALC - Dec 2025 - EXT5.webp** | Counter lineup (not exterior) |
| **ALC - Dec 2025 - EXT1.webp** | Matcha pour |
| **ALC - Dec 2025 - EXT4.webp** | Matcha lattes on table |
| Dec 2025 6–14, LS-* | High-res masters / gallery — don't all go on one-page site |
| **LS - *** | Lifestyle portraits — social, not phase 1 |

---

## Technical notes

- **Use WebP on site** — `<picture>` with WebP + fallback if needed
- **more/** = source; **workingwebp/** = already web-sized for mobile sections
- **Hero:** use `interior` high-res (Netlify serves well under ~500KB)
- Run scanner: `python scripts/scan_client_media.py`

---

## Decision needed from you

1. Confirm **Int-17** as hero (or Int-15 / Int-4)?
2. Confirm **ALC0047** for community section?
3. Move curated files to `assets/` now?

---

*Internal doc — A La Carte media audit*
