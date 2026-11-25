# AGENTS.md — Muhammed Sadiq · Portfolio & CV

Instructions for anyone (human or AI agent) working on this repository.

## Project

A personal portfolio and online CV for **Muhammed Sadiq** (System & Software Engineering),
built as a **static site with Hugo Extended**. There is no theme, no backend, no database and no
JavaScript framework.

Professional identity: **Software Engineering and Backend Development** (Laravel, PHP, full-stack).
AutoCAD (2D design, CNC) is an *additional* skill, never the main focus.

## Commands

| Task | Command |
|---|---|
| Local development server | `hugo server` → http://localhost:1313 |
| Include draft pages | `hugo server -D` |
| Production build (required check) | `hugo --minify --panicOnWarning` |
| New project page | `hugo new projects/my-project.md` |

- Requires **Hugo Extended v0.158+** (developed with v0.170.1). Install on Windows: `winget install Hugo.Hugo.Extended`.
- The build output goes to `public/` and must not be edited by hand.
- A build is only "done" when `hugo --minify --panicOnWarning` finishes with no errors or warnings.
  Also check `hugo --logLevel info` for `deprecated:` notices and fix them early.

## Architecture

```
hugo.toml                 Site config: baseURL, menus, SEO defaults, sitemap
data/                     Structured personal information (edit these to update the site)
  profile.yaml            Name, title, tagline, bio, interests, contact, social links
  skills.yaml             Skill groups (primary: true marks the main focus)
  education.yaml          Education entries
  experience.yaml         Experience entries — section is hidden while the list is empty
content/
  _index.md               Home page (meta description)
  cv.md                   CV page (layout: cv)
  projects/_index.md      Projects list intro
  projects/*.md           One file per project (front matter + Markdown body)
archetypes/projects.md    Template used by `hugo new projects/…`
layouts/
  baseof.html             Page shell: head, skip link, header, main, footer, scripts
  home.html               Home page — composes partials/sections/*
  cv.html                 Printable CV
  projects/section.html   /projects/ list
  projects/page.html      Single project page
  page.html, section.html Generic fallbacks
  404.html, robots.txt
  partials/
    head.html             Meta, font preload, CSS pipeline, favicons
    seo.html              Title, description, canonical, Open Graph, Twitter, JSON-LD
    header.html, footer.html, scripts.html
    sections/             Home page sections (hero, about, skills, projects, education, experience, contact)
    project-card.html, skill-group.html, timeline-item.html, contact-links.html,
    section-heading.html, icon.html (inline SVG icons), placeholder.html
assets/
  css/                    tokens → base → layout → components → print (concatenated in that order)
  js/main.js              Mobile menu, scroll reveal, print button (progressive enhancement)
static/                   Fonts (self-hosted, OFL), favicons, Open Graph image
```

### Key decisions

- **Content vs. data**: facts that appear in several places (profile, skills, education, experience)
  live in `data/*.yaml`; projects are Markdown files because each has its own page.
- **CSS via Hugo Pipes**: the five CSS files are concatenated, minified and fingerprinted in
  `partials/head.html` (cache-busting + SRI). No Sass/PostCSS/Node needed. Design tokens
  (colours, spacing, type) are in `assets/css/tokens.css`.
- **JavaScript is optional**: the site works fully without JS. `html.js` is set in the head;
  JS-only styles are scoped to `.js`.
- **Dark mode** follows the operating system (`prefers-color-scheme`); there is no toggle.
- **URLs**: always use `relURL`/`absURL`/`.RelPermalink` — never hard-code `/path`, so the site
  also works from a sub-path (e.g. GitHub project pages). Menu anchors (`#about`) are prefixed
  with the home URL in `header.html`.
- **Placeholders**: missing information renders as a visible dashed "— to be added" marker
  (`partials/placeholder.html`). Projects with `placeholder: true` show a badge and get `noindex`.

### Hugo version notes (v0.170)

- Use `hugo.Data`, not `.Site.Data` (deprecated).
- Use `locale` in `hugo.toml`, not `languageCode` (deprecated); in templates `site.Language.Locale`.
- Read summaries with `.Summary`, not `.Params.summary` (deprecated).
- Do **not** use `type` in project front matter — it is reserved by Hugo and changes which layout
  is used. Projects use `category` instead.

## Project front matter

```yaml
title: "Project name"
summary: "One or two sentences — used on cards and as meta description."
weight: 1            # lower = earlier
featured: true       # show on the home page
category: "Personal" # Personal / Academic / Team / Freelance
role: "Backend developer"
year: "2025"
tech: ["Laravel", "PHP", "MySQL"]
repo: "https://github.com/…"   # optional
demo: "https://…"              # optional
placeholder: false
```

## Rules

1. **Never invent personal information** — no made-up employers, dates, projects, achievements,
   metrics or links. Use only information provided or verified by Muhammed. Missing data stays a
   placeholder.
2. Present experience honestly: he is a student; do not describe him as senior or expert.
3. No new dependencies, frameworks, themes, backend or database without explicit approval.
4. Keep the design consistent: one accent colour (teal), Inter + JetBrains Mono, no gradients or
   glow effects, restrained motion that respects `prefers-reduced-motion`.
5. Accessibility: semantic HTML, visible focus states, labelled navigation, sufficient contrast,
   decorative icons `aria-hidden`, links with meaningful text.
6. Keep reusable markup in `layouts/partials/`; keep content in `data/` and `content/`.
7. Do not modify unrelated files.
8. **Do not commit, push, publish or deploy without explicit permission.**

## Before deploying

- Set `baseURL` in `hugo.toml` to the real URL.
- Replace all placeholders (search the site for "to be added" and `placeholder: true`).
- Run `hugo --minify --panicOnWarning` and confirm it succeeds.
