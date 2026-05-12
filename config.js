/**
 * =====================================================
 *  SITE CONFIGURATION — edit everything here to
 *  fully customise your portfolio without touching
 *  any other file.
 * =====================================================
 */
const CONFIG = {

  /* ---------- Personal Info ---------- */
  name:        "Alex",
  role:        "Full-Stack Developer & Designer",
  tagline:     "I build fast, accessible, beautiful things for the web.",
  avatar:      "https://avatars.githubusercontent.com/u/9919?s=200", // URL or local path
  resumeUrl:   "#",   // link to your résumé PDF

  /* ---------- Social Links ---------- */
  social: {
    github:   "https://github.com/yourusername",
    twitter:  "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email:    "hello@example.com",
  },

  /* ---------- Navigation ---------- */
  navLinks: [
    { label: "About",    href: "#about"    },
    { label: "Projects", href: "#projects" },
    { label: "Skills",   href: "#skills"   },
    { label: "Contact",  href: "#contact"  },
  ],

  /* ---------- About Section ---------- */
  about: {
    paragraphs: [
      "Hey! I'm Alex — a developer who loves turning complex problems into elegant, user-friendly experiences.",
      "I've been building on the web for 5+ years, working with startups and established companies alike. I care deeply about performance, accessibility and clean code.",
      "When I'm not coding you'll find me hiking, reading sci-fi, or experimenting with generative art.",
    ],
  },

  /* ---------- Projects ---------- */
  projects: [
    {
      title:       "Nova UI",
      description: "A zero-dependency component library built for speed. 40 + accessible components, fully tree-shakeable.",
      tags:        ["TypeScript", "CSS", "Open Source"],
      liveUrl:     "#",
      sourceUrl:   "#",
      image:       "", // optional: URL to a project screenshot
      featured:    true,
    },
    {
      title:       "Pulse Analytics",
      description: "Real-time web analytics dashboard. Sub-second query times over 10 M events/day using ClickHouse.",
      tags:        ["React", "Node.js", "ClickHouse"],
      liveUrl:     "#",
      sourceUrl:   "#",
      image:       "",
      featured:    true,
    },
    {
      title:       "Ink CMS",
      description: "Headless CMS with a visual block editor. MDX-first, git-backed content, instant previews.",
      tags:        ["Next.js", "MDX", "PostgreSQL"],
      liveUrl:     "#",
      sourceUrl:   "#",
      image:       "",
      featured:    false,
    },
    {
      title:       "Orbit CLI",
      description: "Developer tool that scaffolds full-stack apps with opinionated defaults and one-command deploys.",
      tags:        ["Go", "Docker", "CLI"],
      liveUrl:     "",
      sourceUrl:   "#",
      image:       "",
      featured:    false,
    },
  ],

  /* ---------- Skills ---------- */
  skills: [
    { category: "Frontend",  items: ["React", "Next.js", "TypeScript", "CSS / Tailwind", "Svelte"] },
    { category: "Backend",   items: ["Node.js", "Go", "PostgreSQL", "Redis", "REST & GraphQL"] },
    { category: "DevOps",    items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Linux"] },
    { category: "Design",    items: ["Figma", "Motion Design", "Design Systems", "Accessibility"] },
  ],

  /* ---------- Theme / Colours ---------- */
  theme: {
    defaultMode: "dark",   // "dark" | "light"

    // Accent colour used for highlights, links and CTA buttons.
    // Change the hex value – everything updates automatically.
    accent: "#7C3AED",     // purple

    // Font stack (must be loaded in index.html if using Google Fonts)
    fontBody:   "'Inter', system-ui, sans-serif",
    fontMono:   "'JetBrains Mono', 'Fira Code', monospace",
  },

  /* ---------- Misc ---------- */
  copyrightYear: new Date().getFullYear(),
};
