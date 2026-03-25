# Design Spec: y0un92 Terminal Editorial Blog

## Overview

A geek-style terminal-aesthetic personal blog built with Astro, deployed on GitHub Pages. Content is authored in Markdown. The visual language is derived from the "Neo-Technical Manuscript" prototype — Catppuccin Mocha palette, Space Grotesk + JetBrains Mono typography, left-aligned editorial layout with decorative terminal elements.

---

## Decisions

| Item | Decision |
|------|----------|
| Blog name | **y0un92** |
| Tech stack | Astro + Tailwind CSS + vanilla JS (no framework runtime) |
| Content language | Chinese content, English UI |
| i18n | Not needed |
| Sidebar | Preserve prototype style (brand, search, system specs decoration, category index) |
| Deployment | GitHub Pages via GitHub Actions |
| Repository root | `/Volumes/software/webdav/blog/` (no nested subdirectory) |

---

## 1. Project Structure

```
blog/
├── src/
│   ├── content/
│   │   ├── posts/              # Markdown blog posts
│   │   │   └── *.md
│   │   └── config.ts           # Content Collection schema
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell, <head>, theme script
│   │   ├── PostLayout.astro    # Post detail page layout
│   │   └── PageLayout.astro    # Generic page layout (about, etc.)
│   ├── components/
│   │   ├── Navbar.astro        # Top navigation bar
│   │   ├── Sidebar.astro       # Left sidebar (brand/search/system specs/categories)
│   │   ├── PostCard.astro      # Post list card
│   │   ├── TagBadge.astro      # Tag badge
│   │   ├── SearchModal.astro   # Search modal (vanilla JS + Fuse.js)
│   │   ├── ThemeToggle.astro   # Dark/light theme toggle
│   │   ├── Footer.astro        # Footer bar
│   │   ├── TOC.astro           # Table of Contents
│   │   └── Pagination.astro    # Pagination component
│   ├── pages/
│   │   ├── index.astro         # Home (post list)
│   │   ├── posts/
│   │   │   └── [...slug].astro # Post detail dynamic route
│   │   ├── categories/
│   │   │   ├── index.astro     # Category overview
│   │   │   └── [category].astro
│   │   ├── tags/
│   │   │   └── [tag].astro     # Posts by tag
│   │   ├── about.astro         # About page
│   │   ├── 404.astro           # Terminal-style 404 page
│   │   ├── search-index.json.ts # Search index static endpoint
│   │   └── rss.xml.ts          # RSS feed
│   ├── styles/
│   │   └── global.css          # Tailwind entry + custom styles
│   └── utils/
│       └── posts.ts            # Post query/sort/pagination utilities
├── public/
│   ├── fonts/                  # Self-hosted Space Grotesk + JetBrains Mono
│   └── favicon.svg
├── prototype/                  # Original prototype reference
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 2. Content Model

### Markdown Frontmatter Schema

```yaml
---
title: "Article Title"
description: "Short description for SEO and card preview"
date: 2024-05-20
category: "ENGINEERING_NOTES"      # Single category, maps to sidebar INDEX/FOLDERS
tags: ["UI/UX", "CYBERPUNK"]      # Multiple tags
cover: "./covers/post-1.jpg"      # Optional cover image
draft: false                       # true = excluded from build
---
```

Validated at build time by Astro Content Collections with Zod schema.

### Writing Workflow

```
Write .md in src/content/posts/ → git push → GitHub Actions build → Deploy to GitHub Pages
```

## 3. Page Design

### Page Inventory

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Post list + sidebar, replicates prototype layout |
| Post detail | `/posts/[slug]` | Markdown render + TOC + tags + prev/next navigation |
| Category overview | `/categories` | All categories in terminal style |
| Category filter | `/categories/[category]` | Posts filtered by category |
| Tag filter | `/tags/[tag]` | Posts filtered by tag |
| About | `/about` | Personal intro, terminal style |
| 404 | `*` | Terminal-style "command not found" error page |
| RSS | `/rss.xml` | Standard RSS 2.0 feed |

### Home Page Layout

```
┌─────────────────────────────────────────────────────┐
│  user@blog:~$    HOME  POSTS  ABOUT     🌙  ⌨       │
├──────────────┬──────────────────────────────────────┤
│              │  01 // RECENT_ARCHIVES               │
│  y0un92      │  ─────────────────────               │
│  [VER ...]   │  Transmission Feed                   │
│              │                                      │
│  > SEARCH    │  [1] 2024-05-20                      │
│              │  Article Title Here                  │
│  SYSTEM SPECS│  Description text...                 │
│  ████░░ 42%  │  [tag1] [tag2]                       │
│  ███░░░ 38%  │                                      │
│              │  [2] 2024-05-18                       │
│  INDEX       │  Another Article                     │
│  01. CAT_A   │  Description...                      │
│  02. CAT_B   │                                      │
│  03. CAT_C   │  > LOAD_MORE_DATA --OFFSET 3         │
├──────────────┴──────────────────────────────────────┤
│  SYS_REF: MAIN_BRANCH    [S]SEARCH [H]HOME [G]GH   │
└─────────────────────────────────────────────────────┘
```

- Mobile: sidebar collapses below post list
- Pagination: 10 posts per page, terminal-style pagination buttons

### Post Detail Layout

```
┌─────────────────────────────────────────────────────┐
│  user@blog:~$    HOME  POSTS  ABOUT     🌙  ⌨       │
├──────────────────────────────────────┬──────────────┤
│  01 // POST                          │  TOC         │
│  ─────────────────────               │  ├ Heading 1 │
│  Article Title                       │  ├ Heading 2 │
│  2024-05-20 // [tag1] [tag2]         │  └ Heading 3 │
│                                      │              │
│  Markdown rendered content...        │              │
│  # Heading 1                         │              │
│  paragraph text                      │              │
│  ```code block```                    │              │
│                                      │              │
│  ← PREV_POST    NEXT_POST →          │              │
├──────────────────────────────────────┴──────────────┤
│  footer                                             │
└─────────────────────────────────────────────────────┘
```

- TOC: right-side sticky on scroll
- Code blocks: Shiki dual theme — `catppuccin-mocha` (dark) / `catppuccin-latte` (light), configured in `astro.config.mjs` via `markdown.shikiConfig.themes`
- Mobile: TOC collapses above article content

## 4. Style System

### Color Palette (Catppuccin Mocha / Latte)

| Token | Dark (Mocha) | Light (Latte) | Usage |
|-------|-------------|---------------|-------|
| `surface` | `#121221` | `#eff1f5` | Page background |
| `surface-container` | `#1e1e2e` | `#e6e9ef` | Content area / cards |
| `surface-container-high` | `#292839` | `#dce0e8` | Hover / active states |
| `surface-container-lowest` | `#0d0d1c` | `#ccd0da` | Code blocks / input insets |
| `on-surface` | `#e3e0f7` | `#4c4f69` | Primary text |
| `on-surface-variant` | `#cdc3d1` | `#6c6f85` | Secondary text |
| `primary` | `#e2c7ff` | `#8839ef` | Primary accent |
| `primary-container` | `#cba6f7` | `#7287fd` | Brand / logo |
| `secondary` | `#a8c8ff` | `#1e66f5` | Nav active indicator |
| `tertiary` | `#f5c2e7` | `#ea76cb` | Index numbers |
| `cat-green` | `#a6e3a1` | `#40a02b` | System decoration / success |
| `cat-peach` | `#fab387` | `#fe640b` | Search / warning |
| `cat-blue` | `#89b4fa` | `#1e66f5` | Article titles |

### Theme Switching

- CSS variables defined on `:root` (dark default)
- `html.light` overrides to light values
- Tailwind references CSS variables
- JS toggles `html` class + persists to `localStorage`

### Typography

| Usage | Font | Notes |
|-------|------|-------|
| Brand / nav / labels | **JetBrains Mono** | Monospace for all "system-level" text |
| Headings / body | **Space Grotesk** | Technical-humanist, high readability |
| Code blocks | **JetBrains Mono** | Natural choice |
| CJK body text | System CJK fallback | `"LXGW WenKai", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif` |

Fonts self-hosted in `public/fonts/` (Latin fonts only). CJK fonts use system fallback stack to avoid large font downloads (~10MB+). The fallback chain ensures consistent rendering across macOS, Linux, and Windows.

### Design Rules (from prototype DESIGN.md)

- **No-Line Rule**: No `1px solid border` for section separation; use background color hierarchy
- **No-Pill Rule**: Buttons/tags use `0.125rem` border-radius, never full rounded
- **Left-aligned**: Content left-aligned, never centered
- **Ghost Border**: When boundaries needed, use `outline-variant` at 30% opacity
- **Glassmorphism**: Search modal and overlays use 70% opacity + 24px blur. In light mode, use `surface-container` at 85% opacity (higher than dark mode to maintain readability on light backgrounds)
- **Border Radius Scale**: `DEFAULT: 0.125rem`, `lg: 0.25rem`, `xl: 0.5rem`, `full: 0.75rem` (intentionally redefined from Tailwind's 9999px to maintain terminal aesthetic)
- **Signature Glow**: Primary action buttons use gradient from `primary` to `primary-container` at 135deg

## 5. Interactive Features

| Feature | Implementation |
|---------|---------------|
| Dark/light theme | vanilla JS, `localStorage` persistence, `<html>` class toggle |
| Search | Fuse.js client-side fuzzy search, build-time JSON index, `Ctrl+K` / `Cmd+K` trigger |
| Code highlighting | Shiki (Astro built-in), Catppuccin Mocha theme |
| Back to top | FAB button from prototype, vanilla JS scroll |
| Mobile menu | Hamburger menu, vanilla JS toggle |

### Search Implementation

**Index generation**: Astro static endpoint at `src/pages/search-index.json.ts` generates the index at build time.

**Index schema**:
```json
[
  {
    "title": "Article Title",
    "description": "Short description",
    "category": "ENGINEERING_NOTES",
    "tags": ["UI/UX", "CYBERPUNK"],
    "slug": "my-first-post",
    "date": "2024-05-20"
  }
]
```

**Note on CJK search**: Fuse.js has no built-in CJK tokenizer. Index only `title` + `tags` + `category` (not full body) to keep fuzzy matching quality acceptable for Chinese text. Full-text search is out of scope for v1.

**Search flow**:
```
User clicks search box or presses Ctrl+K / Cmd+K
→ Lazy-load Fuse.js + /search-index.json (base-path aware)
→ Client-side fuzzy match
→ Display results in Glass-style modal overlay
→ Click result navigates to post, Escape closes modal
```

**Keyboard**: `Escape` closes modal, arrow keys navigate results, `Enter` opens selected result.

## 6. SEO

| Item | Implementation |
|------|---------------|
| Meta tags | Dynamic `title` / `description` / `canonical` per page |
| Open Graph | `og:title` / `og:description` / `og:image` on post pages |
| Sitemap | `@astrojs/sitemap` auto-generated |
| RSS | `@astrojs/rss` standard feed |
| Structured data | `Article` JSON-LD on post pages |
| robots.txt | Static file in `public/` |

## 7. Deployment

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
trigger: push to main
steps:
  1. checkout
  2. setup Node 20
  3. pnpm install
  4. astro build
  5. deploy to GitHub Pages (actions/deploy-pages)
```

### Configuration

- GitHub Pages source: GitHub Actions
- `astro.config.mjs`: `site: 'https://y0un92.github.io'`, `base: '/blog'`
- Optional custom domain via `public/CNAME`

### URL Strategy (base path)

Setting `base: '/blog'` means all internal links and asset paths must be base-aware:
- Internal links: use Astro's `import.meta.env.BASE_URL` prefix
- RSS / OG / canonical URLs: use full `site + base` path
- Search index fetch: load from `${import.meta.env.BASE_URL}search-index.json`
- Static assets in `public/`: automatically served under base path by Astro

## 8. Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/sitemap": "^3.x",
    "@astrojs/rss": "^4.x",
    "fuse.js": "^7.x"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "tailwindcss": "^4.x",
    "sharp": "^0.33.x"
  }
}
```

**Note**: Tailwind v4 uses `@tailwindcss/vite` as Vite plugin (not the deprecated `@astrojs/tailwind`). There is no `tailwind.config.mjs` — all theme tokens are defined in `src/styles/global.css` via `@theme` directives.

Zero framework runtime. Client-side JS budget: Fuse.js (~25KB gzipped) + search index, lazy-loaded on search trigger only.

## 9. Icons

Inline SVGs for all icons (search, terminal, dark_mode, expand_less, folder_open, settings_input_component). No icon font or CDN dependency. Icons extracted from Material Symbols and embedded directly in components.

## 10. Images

- Post cover images stored in `src/content/posts/covers/` (co-located with posts)
- Use Astro's `<Image>` component for automatic optimization via sharp
- Allowed formats: jpg, png, webp, avif
- Lazy loading via native `loading="lazy"` attribute
- When no cover is provided: post card renders without image column (text-only layout variant)

## 11. Responsive Breakpoints

Use Tailwind default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px (sidebar/content split point)
- `xl`: 1280px

### Mobile behavior:
- `< lg`: Sidebar collapses below post list; hamburger menu for navigation
- `< md`: Post cards switch to single-column (no cover image column)
- TOC on post pages: collapses into expandable section above article on mobile
- Hamburger menu: slides in from top, full-width overlay panel with navigation links

## 12. Prototype Divergences

Elements from the prototype intentionally dropped:
- `CONTACT` nav item — not needed for v1
- `[ZH]/[EN]` language switcher — i18n not in scope
- External CDN images — replaced with self-hosted covers

## 13. Category & Tag Slug Rules

- Category slugs: UPPER_SNAKE_CASE (e.g., `ENGINEERING_NOTES`), used directly as URL segments
- Tag slugs: lowercase, hyphen-separated (e.g., `ui-ux`)
- Both must be ASCII-only for URL safety
- Display names can differ from slugs (defined in a mapping if needed)
