# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official marketing website for 先宏資訊 (XRed Information), a Taiwan-based enterprise software company specializing in HCL Notes/Domino upgrades and AI solutions. It is a **pure static HTML site** with no build tools, no npm, and no JavaScript framework.

## Development

**Preview locally** using any static file server from the project root:

```bash
python -m http.server 8080
# or
npx serve .
```

Always serve via HTTP (not `file://`) because assets use absolute paths starting with `/` (e.g., `/assets/js/tailwind-config.js`).

**No build step** — edit HTML files directly and refresh the browser.

## Architecture

### Page Structure

Every page follows an identical shell:

1. `<head>` — Google Analytics (GA4: `G-SRBKZG4REL`), Tailwind CDN with plugins, Google Fonts (Noto Sans TC + IBM Plex Mono), Material Symbols, then `/assets/js/tailwind-config.js` and `/assets/css/common.css`
2. `<header id="header">` — sticky nav with desktop dropdown and mobile hamburger (inline JS), plus theme toggle button
3. `<main class="layout-container border-x border-outline-variant">` — page sections
4. `<footer id="footer">` — company info, social links, copyright
5. `<script src="/assets/js/theme-toggle.js">` — always the last tag before `</body>`

When adding a new page, copy the header/footer verbatim from an existing page. The nav and footer are duplicated in every HTML file (no server-side includes).

### Shared Assets

| File | Role |
|---|---|
| `assets/css/common.css` | Material Design 3 CSS custom properties for dark/light themes, `.brutalist-grid`, `.grid-block`, `.layout-container`, `.bpm-table` |
| `assets/js/tailwind-config.js` | Tailwind theme extension — maps all MD3 token names to CSS vars, sets fonts, and forces `border-radius: 0` globally |
| `assets/js/theme-toggle.js` | Toggles `html.dark` / `html.light` classes and persists to `localStorage`. Icon sync with theme is handled in head (no localStorage read on init) |
| `robots.txt` | Allows all paths, points to `https://www.xred.com.tw/sitemap.xml` |

### Design System

- **Theme**: Dark by default (`<html class="dark">`). Toggle switches to `html.light`. All colors come from CSS custom properties defined in `common.css`; Tailwind utility classes like `text-primary` or `bg-surface-container` resolve through those vars.
- **Grid**: Sections use `.brutalist-grid` (12-column CSS grid) with `.grid-block` cells. Cells use `col-span-*` for responsive layouts. All borders are `var(--outline-variant)` with negative margins to create a contiguous grid effect.
- **Typography**: Body/headings use `Noto Sans TC`; monospace labels (section tags like `// SECTION_NAME`) use `IBM Plex Mono`. Section labels always appear as `<span class="text-primary text-xs tracking-[0.4em] uppercase font-bold font-mono">// LABEL</span>`.
- **No rounded corners**: `* { border-radius: 0 !important; }` is enforced globally.
- **No Tailwind purging**: Tailwind is loaded from CDN, so all utility classes are available without configuration.
- **Images**: All images use **WebP** format. Never use PNG — convert to WebP when adding new assets.

### URL Conventions

Pages follow two naming patterns:

| Type | Pattern | Examples |
|---|---|---|
| Company pages | `PascalCase.html` | `AboutUs.html`, `ContactUs.html`, `Customers.html` |
| Service pages | `services_<CamelCase>.html` | `services_XPertRAG.html`, `services_QilinAI.html`, `services_OCR.html`, `services_DominoClaw.html`, `services_EIP.html`, `services_BPM.html`, `services_notesUpgrade.html` |
| HCL standalone | `hcl_<lowercase>.html` | `hcl_voltmx.html` |

Sitemap (`sitemap.xml`) is organized into four sections: 首頁與公司資訊, AI 賦能應用, 企業協同辦公, HCL 專區. Always add `lastmod` date when updating sitemap entries.

### Image Assets

Use category-prefixed folders under `assets/img/`:

| Category | Folder | Pages |
|---|---|---|
| Company | `assets/img/about/` | AboutUs.html |
| BPM | `assets/img/bpm/` | services_BPM.html |
| X-Pert RAG | `assets/img/xpert-rag/` | services_XPertRAG.html |
| Qilin AI | `assets/img/qilin-ai/` | services_QilinAI.html |
| OCR | `assets/img/ocr/` | services_OCR.html |
| DominoClaw | `assets/img/dominoclaw/` | services_DominoClaw.html |
| EIP | `assets/img/eip/` | services_EIP.html |
| Notes Upgrade | `assets/img/notes-upgrade/` | services_notesUpgrade.html |

Avoid creating duplicate or deprecated directory structures. Old directories (`30_AboutUs/`, `hcl-landing/`, `training-consulting/`) have been removed.

## Current Site Map

| Page | Category |
|---|---|
| `index.html` | Home |
| `AboutUs.html` | Company |
| `ContactUs.html` | Company |
| `Customers.html` | Company |
| `services_XPertRAG.html` | AI 賦能應用 |
| `services_QilinAI.html` | AI 賦能應用 |
| `services_OCR.html` | AI 賦能應用 |
| `services_DominoClaw.html` | AI 賦能應用 |
| `services_EIP.html` | 企業協同辦公 |
| `services_BPM.html` | 企業協同辦公 |
| `services_notesUpgrade.html` | HCL 專區 |
| `hcl_voltmx.html` | HCL 專區 |

## Important Notes

- **Never add `package.json`, `node_modules/`, or build tools** — this is a pure static site
- **Never leave `.bak` or temporary files** in the repository
- **All images must be WebP** — never add PNG files
- All HTML pages must be valid, semantic HTML5 with proper `lang="zh-Hant"` attribute
- Test dark/light theme toggle on every change
- Mobile responsiveness is critical — test on both mobile and desktop views
- When adding a new service page, update both the sitemap (with `lastmod` date) and the CLAUDE.md Image Assets table
