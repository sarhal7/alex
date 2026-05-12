/* global CONFIG is loaded from config.js */
(() => {
  "use strict";

  /* ── Apply config tokens to CSS variables ──────────── */
  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = mode === "dark" ? "☀" : "☾";
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(saved || CONFIG.theme.defaultMode || preferred);
  }

  function injectCSSVars() {
    const root = document.documentElement;
    root.style.setProperty("--accent", CONFIG.theme.accent);
    // Derive dim / glow from accent (simple alpha versions)
    root.style.setProperty("--accent-dim",  hexToRgba(CONFIG.theme.accent, .15));
    root.style.setProperty("--accent-glow", hexToRgba(CONFIG.theme.accent, .35));
    root.style.setProperty("--font-body", CONFIG.theme.fontBody);
    root.style.setProperty("--font-mono", CONFIG.theme.fontMono);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /* ── Build Navigation ──────────────────────────────── */
  function buildNav() {
    const logo    = document.getElementById("navLogo");
    const links   = document.getElementById("navLinks");
    const mobNav  = document.getElementById("mobileNav");

    if (logo) logo.innerHTML = `${CONFIG.name}<span>.</span>`;

    if (links) {
      links.innerHTML = CONFIG.navLinks.map(l =>
        `<li><a href="${l.href}">${l.label}</a></li>`
      ).join("") + `<li><a href="${CONFIG.social.github}" target="_blank" rel="noopener">GitHub ↗</a></li>`;
    }

    if (mobNav) {
      mobNav.innerHTML = CONFIG.navLinks.map(l =>
        `<a href="${l.href}" class="mob-link">${l.label}</a>`
      ).join("") + `<a href="${CONFIG.social.github}" target="_blank" rel="noopener" class="mob-link">GitHub ↗</a>`;
    }
  }

  /* ── Build Hero ────────────────────────────────────── */
  function buildHero() {
    setText("heroName",    `Hi, I'm <span class="highlight">${CONFIG.name}</span>`);
    setText("heroRole",    CONFIG.role);
    setText("heroTagline", CONFIG.tagline);

    const avatar = document.getElementById("heroAvatar");
    if (avatar && CONFIG.avatar) {
      avatar.innerHTML = `<img src="${CONFIG.avatar}" alt="${CONFIG.name}" loading="lazy">`;
    }

    const resumeBtn = document.getElementById("resumeBtn");
    if (resumeBtn) resumeBtn.href = CONFIG.resumeUrl;
  }

  /* ── Build About ───────────────────────────────────── */
  function buildAbout() {
    const container = document.getElementById("aboutText");
    if (!container) return;
    container.innerHTML = CONFIG.about.paragraphs
      .map(p => `<p>${p}</p>`)
      .join("");
  }

  /* ── Build Projects ────────────────────────────────── */
  function buildProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    grid.innerHTML = CONFIG.projects.map(p => `
      <div class="project-card fade-in ${p.featured ? "featured" : ""}">
        ${p.image
          ? `<div class="project-img"><img src="${p.image}" alt="${p.title}"></div>`
          : `<div class="project-img">${p.title}</div>`}
        <div class="project-header">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-links">
            ${p.liveUrl  ? `<a href="${p.liveUrl}"  class="project-link" target="_blank" rel="noopener" title="Live demo">⬡</a>` : ""}
            ${p.sourceUrl? `<a href="${p.sourceUrl}" class="project-link" target="_blank" rel="noopener" title="Source code">⌥</a>` : ""}
          </div>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>`).join("");
  }

  /* ── Build Skills ──────────────────────────────────── */
  function buildSkills() {
    const grid = document.getElementById("skillsGrid");
    if (!grid) return;
    grid.innerHTML = CONFIG.skills.map(g => `
      <div class="skill-group fade-in">
        <div class="skill-category">${g.category}</div>
        <div class="skill-items">${g.items.map(i => `<div class="skill-item">${i}</div>`).join("")}</div>
      </div>`).join("");
  }

  /* ── Build Contact Social ──────────────────────────── */
  function buildSocial() {
    const el = document.getElementById("socialLinks");
    if (!el) return;
    const links = [
      { label: "GitHub",   href: CONFIG.social.github,   icon: githubIcon() },
      { label: "Twitter",  href: CONFIG.social.twitter,  icon: twitterIcon() },
      { label: "LinkedIn", href: CONFIG.social.linkedin, icon: linkedinIcon() },
      { label: "Email",    href: `mailto:${CONFIG.social.email}`, icon: mailIcon() },
    ];
    el.innerHTML = links.map(l => `
      <a href="${l.href}" class="social-link" target="_blank" rel="noopener">
        ${l.icon} ${l.label}
      </a>`).join("");
  }

  /* ── Build Footer ──────────────────────────────────── */
  function buildFooter() {
    setText("footerCopy", `© ${CONFIG.copyrightYear} ${CONFIG.name}. Built with ♥`);
  }

  /* ── Helpers ───────────────────────────────────────── */
  function setText(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ── Navbar scroll style ───────────────────────────── */
  function initNavScroll() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const update = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── Hamburger menu ────────────────────────────────── */
  function initHamburger() {
    const btn    = document.getElementById("hamburger");
    const mobNav = document.getElementById("mobileNav");
    if (!btn || !mobNav) return;

    btn.addEventListener("click", () => {
      const open = btn.classList.toggle("open");
      mobNav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });

    // Close when a link is clicked
    mobNav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        btn.classList.remove("open");
        mobNav.classList.remove("open");
        btn.setAttribute("aria-expanded", false);
      })
    );
  }

  /* ── Theme toggle ──────────────────────────────────── */
  function initThemeToggle() {
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ── Spotlight glow that follows cursor ────────────── */
  function initSpotlight() {
    const spot = document.getElementById("spotlight");
    if (!spot) return;
    let visible = false;
    window.addEventListener("mousemove", (e) => {
      spot.style.left = e.clientX + "px";
      spot.style.top  = e.clientY + "px";
      if (!visible) { spot.style.opacity = "1"; visible = true; }
    }, { passive: true });
    document.addEventListener("mouseleave", () => { spot.style.opacity = "0"; visible = false; });
  }

  /* ── Intersection-observer fade-ins ───────────────── */
  function initFadeIns() {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
  }

  /* ── Smooth active nav link ─────────────────────────── */
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav-links a[href^='#']");
    if (!links.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            links.forEach(a => a.classList.remove("active"));
            const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (active) active.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => obs.observe(s));
  }

  /* ── Contact form ──────────────────────────────────── */
  function initContactForm() {
    const form  = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector("[type='submit']");
      btn.disabled = true;
      btn.textContent = "Sending…";

      // TODO: Replace this stub with a real API call, e.g. Formspree, EmailJS,
      // or your own backend endpoint.  Until then the form only simulates sending.
      await new Promise(r => setTimeout(r, 1200));

      showToast("Demo mode — wire up a real endpoint to send messages ✓", "success");
      form.reset();
      btn.disabled = false;
      btn.textContent = "Send Message →";
    });

    function showToast(msg, type = "success") {
      if (!toast) return;
      toast.textContent = msg;
      toast.className   = `toast ${type}`;
      void toast.offsetWidth; // reflow
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
  }

  /* ── SVG icons ─────────────────────────────────────── */
  function githubIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;
  }
  function twitterIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  }
  function linkedinIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  }
  function mailIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
  }

  /* ── Boot ──────────────────────────────────────────── */
  function boot() {
    injectCSSVars();
    initTheme();
    buildNav();
    buildHero();
    buildAbout();
    buildProjects();
    buildSkills();
    buildSocial();
    buildFooter();
    initNavScroll();
    initHamburger();
    initThemeToggle();
    initSpotlight();
    initFadeIns();
    initActiveNav();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
