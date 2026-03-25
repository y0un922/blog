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
├── tailwind.config.mjs
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
- Code blocks: Shiki with Catppuccin Mocha theme (Astro built-in)
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

Fonts self-hosted in `public/fonts/` to avoid external requests.

### Design Rules (from prototype DESIGN.md)

- **No-Line Rule**: No `1px solid border` for section separation; use background color hierarchy
- **No-Pill Rule**: Buttons/tags use `0.125rem` border-radius, never full rounded
- **Left-aligned**: Content left-aligned, never centered
- **Ghost Border**: When boundaries needed, use `outline-variant` at 30% opacity
- **Glassmorphism**: Search modal and overlays use 70% opacity + 24px blur

## 5. Interactive Features

| Feature | Implementation |
|---------|---------------|
| Dark/light theme | vanilla JS, `localStorage` persistence, `<html>` class toggle |
| Search | Fuse.js client-side fuzzy search, build-time JSON index, `Ctrl+K` / `Cmd+K` trigger |
| Code highlighting | Shiki (Astro built-in), Catppuccin Mocha theme |
| Back to top | FAB button from prototype, vanilla JS scroll |
| Mobile menu | Hamburger menu, vanilla JS toggle |

### Search Flow

```
Build time: Astro generates /search-index.json (title/description/tags/category/slug)
Runtime: User triggers search → lazy-load Fuse.js + index → client-side fuzzy match
```

- Glass-style modal overlay
- Real-time result display
- Click result to navigate to post

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
    "@astrojs/tailwind": "^6.x",
    "tailwindcss": "^4.x",
    "sharp": "^0.33.x"
  }
}
```

Zero framework runtime. Minimal dependency footprint.
