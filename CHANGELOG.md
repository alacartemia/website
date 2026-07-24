# Changelog — A La Carte Miami Website

> **Internal doc** — יומן שינויים מ-phase 1 build עד deploy  
> **Repo:** [github.com/alacartemia/website](https://github.com/alacartemia/website)  
> **Netlify (staging):** `endearing-malabi-e31314.netlify.app`  
> **Domain (pending DNS):** `alacartemia.com`  
> **Last updated:** June 2026

---

## סיכום מצב נוכחי

| פריט | סטטוס |
|------|--------|
| Phase 1 build | ✓ Complete |
| GitHub (`alacartemia/website`) | ✓ Pushed |
| Netlify deploy | ✓ Live (staging URL) |
| Netlify Forms (`contact`) | ✓ Active — 1+ submissions |
| DNS → `alacartemia.com` | ⏳ Pending |
| Form email notifications | ⏳ Configure in Netlify dashboard |

---

## Git commits (כרונולוגי)

| Commit | תיאור |
|--------|--------|
| `5f3db0d` | **Initial commit** — אתר phase 1 מלא (HTML, CSS, JS, assets, Netlify config) |
| `f1645e9` | **Asset optimization** — Food2 בגרסת web (`*-.webp`), ניקוי קבצים לא בשימוש |
| `74560d7` | **Mobile food grid** — תמונה 6 במובייל בלבד (`ALC  - Dec 2025 - 12-.webp`) |
| `18028cb` | **Contact form fix** — שדה Phone, תיקון POST/404, Netlify form detection |
| `6a45b5a` | **Success modal** — popup אישור אחרי שליחת טופס (ללא reload) |

---

## תשתית — GitHub & Netlify

### GitHub
- ארגון: **`alacartemia`**
- Repo: **`alacartemia/website`** (Public)
- Branch: **`main`**
- `.gitignore`: `node_modules/`, `.netlify/`, `.env`, `.DS_Store`, `Thumbs.db`

### Netlify
- Team: **alacarte**
- Import from GitHub → `alacartemia/website`
- **Build command:** *(ריק)*
- **Publish directory:** `.`
- **Form detection:** enabled
- `netlify.toml`: clean URLs (`/privacy`, `/accessibility`), security headers, `[dev]` block

### Local dev
```bash
npm install
npm run dev      # Netlify Dev → http://localhost:8888 (redirects work)
npm run preview  # serve only → http://localhost:8765 (no clean URLs)
```

**חשוב:** Netlify Forms **לא עובד ב-localhost** — POST מחזיר `501 Unsupported method`. לבדיקת טופס + popup: **אתר חי ב-Netlify**.

---

## שינויי Assets

### Food2 — גרסאות web (`*-.webp`)

כל 15 הקבצים הוחלפו לרזולוציה מוקטנת. סיומת **`-` לפני `.webp`** (כמו `interior/`).

| סוג | רזולוציה | דוגמה |
|-----|----------|--------|
| Featured | 2500×1667 | `A la Carte - Nov 2025 - 35-.webp` |
| Mosaic + reserve | 1200×1800 | `ALC  - Dec 2025 - 4-.webp`, `LS - *-.webp`, וכו' |

**6 פעילים ב-HTML** + **9 reserve** (לא מקושרים — לswap עתידי).

### נמחק מה-repo (ניקוי deploy)

| נתיב | סיבה |
|------|------|
| `assets/_review_jpg/` | עותקי review — לא בשימוש |
| `assets/interior/*` (masters) | רזולוציה מלאה — נשארו רק 7 thumbs `*-.webp` |
| `assets/hero/hero-poster.webp`, `poster2`, `poster4` | alternates — נשארו poster3 + mobile |
| `assets/working/` (5 מתוך 6) | reserve — נשאר `ALC0047 copy.webp` |
| `assets/Food/` (9 JPG מיותרים) | לא בשימוש — נשארו 5 JPG (ארכיון) |
| `assets/ALC Stickers-1.jpg`, `alc_sticker_*.png` | reference בלבד |

### Food section — HTML
- Mosaic משתמש ב-**Food2 WebP בלבד** (בלי JPG fallback)
- **Desktop:** 5 תמונות + featured (mosaic 2×2 + 4 cells)
- **Mobile:** 6 תמונות — תמונה 6 (`12-.webp`) מוסתרת בדסקtop (`.gallery-grid__item--mobile-only`)

### מבנה assets נוכחי (בערך)

```
assets/
├── hero/           2   poster3 + mobile
├── interior/       7   gallery thumbs only
├── Food2/         15   all *-.webp (6 active + 9 reserve)
├── Food/           5   JPG archive (+ INVENTORY.md)
├── working/        1   ALC0047 copy.webp
├── Logo/           4   + social/
└── favicon/        ✓
```

---

## שינויי Contact Form

### שדות
| שדה | חובה |
|-----|------|
| Name | ✓ |
| Email | ✓ |
| Phone | אופציונלי |
| Message | ✓ |
| bot-field (honeypot) | hidden |

### Netlify Forms — הגדרה בקוד
- `data-netlify="true"` + `netlify` על הטופס הגלוי
- טופס **hidden** נוסף (build-time detection) עם כל השדות
- `action="/"` — POST ל-root (לא `/?sent=1` — גרם ל-404)
- שליחה via **`fetch` POST** ב-`js/main.js`

### UX — Success modal
- אחרי שליחה מוצלחת: **popup** (`.contact-modal`) — "Your message was sent"
- סגירה: Close / X / Escape / click על backdrop
- הטופס מתאפס; **ללא redirect / reload**
- שגיאה: הודעה אדומה מתחת לטופס

### Netlify Dashboard (ידני)
1. **Forms → Form detection** — enabled ✓
2. **Form notifications** — להגדיר אימייל לקבלת שליחות
3. Submissions נשמרות ב-**Forms → contact**

---

## שינויי קוד (קבצים)

| קובץ | שינויים עיקריים |
|------|-----------------|
| `index.html` | Food2 paths `*-.webp`, mobile food tile, phone field, contact modal, hidden Netlify form |
| `css/styles.css` | `.gallery-grid__item--mobile-only`, `.form-optional`, `.contact-modal` |
| `js/main.js` | Netlify fetch submit, success modal, interior scroll (unchanged) |
| `netlify.toml` | ללא שינוי ב-commits האחרונים |
| `ASSETS_MAP.md` | עודכן ל-Food2 web size |
| `.gitignore` | `.netlify/` added |

---

## באגים שתוקנו

| # | בעיה | פתרון |
|---|------|--------|
| 1 | Form redirect `/?sent=1` → 404 | `action="/"` + fetch + modal |
| 2 | Form לא מזוהה ב-Netlify | hidden form + `netlify` attribute |
| 3 | תמונה 6 ב-food מופיעה בדסקtop | desktop-first CSS hide |
| 4 | Food image 8117 — path spaces | `ALC%20%20-%20` (2 spaces) |
| 5 | Netlify Dev 404 | `[dev]` block + port 8888 |

---

## ממתין / Phase 2

| פריט | הערות |
|------|--------|
| DNS `alacartemia.com` | Netlify Domain management |
| Form notification email | Netlify dashboard |
| App Store / Google Play URLs | placeholders — `btn--outline` |
| `hero-video.mp4` | Client TBD |
| Logo rectangular crop | header — recommended |
| OG / Schema / Analytics / GSC | Phase 2 |
| Interior thumb rename | `interior-01.webp` וכו' |
| מחיקת `assets/Food/` | אופציונלי — כבר לא בשימוש ב-HTML |

---

## בדיקות לפני Launch

```
□ אתר חי — כל הסקשנים + תמונות
□ ORDER NOW → Toast
□ Contact form → submission ב-Netlify + popup למשתמש
□ /privacy + /accessibility (clean URLs)
□ Mobile — hero, food 6 tiles, hamburger
□ Desktop — food mosaic 5 tiles
□ 404 page
□ Accessibility toolbar
□ DNS + SSL על alacartemia.com
```

---

*Internal — A La Carte Miami website project.*
