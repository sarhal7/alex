# Alex — Fully Customisable Portfolio

A modern, minimal personal-portfolio website inspired by [moncy.dev](https://www.moncy.dev/).

## ✨ Features

- **Dark / Light mode** toggle (persists across visits)
- **Cursor spotlight** glow effect
- **Smooth scroll** & intersection-observer fade-in animations
- **Fully responsive** (mobile-first, hamburger nav)
- **Zero build step** — plain HTML / CSS / JS, open `index.html` in any browser
- **One-file customisation** — all personal data lives in `config.js`

## 🗂 File Structure

```
├── index.html   — HTML skeleton (no content — all injected by JS)
├── style.css    — Design tokens (CSS custom properties) + layout
├── script.js    — Renders content from config + all interactions
└── config.js    — ✏️  YOUR customisation file (edit this one!)
```

## 🚀 Quick Start

1. Clone / download the repo.
2. Open **`config.js`** and fill in your details (name, bio, projects, skills, social links, accent colour, etc.).
3. Open `index.html` in a browser — done!

No npm, no bundler, no build step required.

## 🎨 Customisation Guide (`config.js`)

| Section | What to change |
|---------|---------------|
| `name`, `role`, `tagline` | Your headline copy |
| `avatar` | URL or relative path to your photo |
| `resumeUrl` | Link to your CV/PDF |
| `social` | GitHub / Twitter / LinkedIn / email |
| `navLinks` | Navigation items |
| `about.paragraphs` | Bio text (array of strings) |
| `projects[]` | Title, description, tags, live/source URLs, optional screenshot |
| `skills[]` | Category groups with item arrays |
| `theme.accent` | Any hex colour — all highlights update automatically |
| `theme.defaultMode` | `"dark"` or `"light"` |
| `theme.fontBody/fontMono` | Any Google Font or system font stack |

## 📦 Deploy

Works with any static host:

```bash
# Vercel
vercel --prod

# Netlify (drag & drop the folder in the UI)

# GitHub Pages
# Push to a repo → Settings → Pages → Deploy from branch (root)
```

## 📄 Licence

MIT
