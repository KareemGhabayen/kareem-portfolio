# Portfolio Frontend Architecture
## Kareem Ayman Ghabayen — Personal Portfolio

---

## Folder & File Structure

```
portfolio/
├── public/
│   └── data/                        ← All .md content files live here
│       ├── about.md
│       ├── education.md
│       └── projects/
│           └── smart-task-allocation.md
│
├── src/
│   ├── main.jsx                     ← React entry point
│   ├── App.jsx                      ← Root app + router shell
│   │
│   ├── utils/
│   │   └── mdParser.js              ← 🔑 Central Data Parser (front-matter + body)
│   │
│   ├── hooks/
│   │   └── useMarkdown.js           ← Custom hook: fetch + parse .md on demand
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── SectionWrapper.jsx
│   │   ├── ui/
│   │   │   ├── SkillBadge.jsx
│   │   │   ├── TimelineItem.jsx
│   │   │   └── ProjectCard.jsx
│   │   └── sections/
│   │       ├── HeroSection.jsx      ← Consumes about.md front-matter
│   │       ├── AboutSection.jsx     ← Renders about.md body content
│   │       ├── EducationSection.jsx ← Consumes education.md
│   │       └── ProjectsSection.jsx  ← Maps over projects/*.md
│   │
│   └── styles/
│       └── tokens.css               ← Design tokens (colors, spacing, typography)
│
├── index.html
├── vite.config.js
└── package.json
```

---

## Data Flow

```
public/data/*.md
       │
       ▼
  useMarkdown(path)          ← React hook: fetches raw .md text
       │
       ▼
  mdParser.parse(raw)        ← Splits front-matter (YAML) from Markdown body
       │  returns { meta, content }
       ▼
  Section Component          ← Destructures meta fields, renders content as HTML
       │
       ▼
  UI Components              ← SkillBadge, TimelineItem, ProjectCard, etc.
```

---

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Parser | Custom `mdParser.js` (no heavy lib) | Zero-dependency, tree-shakeable |
| Fetch strategy | `useMarkdown` hook with `useEffect` | Lazy-fetches only what's on screen |
| Styling | CSS custom properties + Tailwind-compatible classes | Portable, no build-time coupling |
| Bundler | Vite | Fast HMR, native ESM, minimal config |
| Routing | Hash-based scroll (`#about`, `#projects`) | Single-page, no server config needed |
