import { useMarkdown, useMarkdownMany } from "./hooks/useMarkdown";

function App() {
  // جلب البيانات ديناميكياً من ملفات الـ Markdown
  const { meta: aboutMeta, content: aboutContent, loading: aboutLoading } = useMarkdown("/data/about.md");
  const { html: eduHtml, loading: eduLoading } = useMarkdown("/data/education.md");
  
  // جلب كروت المشاريع بالتوازي
  const { results: projectResults, loading: projectsLoading } = useMarkdownMany([
    "/data/projects/smart-task-allocation.md"
  ]);

  if (aboutLoading || eduLoading || projectsLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0d0f14", color: "#4e8ef7", fontFamily: "sans-serif" }}>
        جاري جلب واجهات كريم الاحترافية...
      </div>
    );
  }

  return (
    <div id="pf-root">
      {/* الخلفيات المشعة (Blobs) المستوحاة من ستايل كلود */}
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav>
        <div class="nav-inner">
          <span class="nav-logo">kareem<span>.</span>dev</span>
          <div class="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
          </div>
        </div>
      </nav>

      <div class="wrapper">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section class="hero" id="about">
          <p class="hero-eyebrow">Available for opportunities &nbsp;·&nbsp; {aboutMeta?.location}</p>
          <h1 class="hero-name">Kareem <em>Ayman</em><br />Ghabayen</h1>
          <p class="hero-title">{aboutMeta?.title}</p>
          <p class="hero-bio">
            {aboutContent}
          </p>
          
          {/* كروت قنوات الاتصال الذكية */}
          <div class="contact-chips">
            <span class="chip">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {aboutMeta?.email}
            </span>
            <span class="chip">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              {aboutMeta?.phone}
            </span>
            <span class="chip">
              <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {aboutMeta?.location}
            </span>
          </div>

          <div class="hero-cta">
            <a href={`mailto:${aboutMeta?.email}`} class="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Get in touch
            </a>
            <a href="#projects" class="btn-ghost">
              View projects
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
            </a>
          </div>
        </section>

        <div class="divider"></div>

        {/* ── SKILLS ─────────────────────────────────────────────────────────── */}
        <section id="skills">
          <div class="section-label">Technical Skills</div>
          <div class="skill-groups">
            <div>
              <p class="skill-group-label">Core Programming</p>
              <div class="badge-row">
                {aboutMeta?.skills_core?.map((skill, i) => (
                  <span key={i} class="badge">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <p class="skill-group-label">Web Development</p>
              <div class="badge-row">
                {aboutMeta?.skills_web?.map((skill, i) => (
                  <span key={i} class="badge">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <p class="skill-group-label">Tools &amp; Methodology</p>
              <div class="badge-row">
                {aboutMeta?.skills_tools?.map((skill, i) => (
                  <span key={i} class="badge">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div class="divider"></div>

        {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
        <section id="projects">
          <div class="section-label">Projects</div>
          {projectResults?.map((project, index) => (
            <div key={index} class="project-card">
              <div class="project-accent"></div>
              <div class="project-header">
                <p class="project-name">{project.meta?.title}</p>
                <span class="project-role">{project.meta?.role || "Developer"}</span>
              </div>
              <div class="project-desc markdown-render" dangerouslySetInnerHTML={{ __html: project.html }} />
              <div class="stack-row">
                {project.meta?.stack?.map((tech, i) => (
                  <span key={i} class="stack-pill">{tech}</span>
                ))}
                <span class="stack-pill">{project.meta?.methodology}</span>
              </div>
            </div>
          ))}
        </section>

        <div class="divider"></div>

        {/* ── EDUCATION ──────────────────────────────────────────────────────── */}
        <section id="education">
          <div class="section-label">Education &amp; Certifications</div>
          {/* قراءة بيانات الـ Timeline والشهادات من الماركداون مباشرة بتنسيق كلود الفخم */}
          <div class="markdown-render" dangerouslySetInnerHTML={{ __html: eduHtml }} />
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer>
          <span class="footer-logo">kareem<span>.</span>dev</span>
          <span class="footer-copy">Oslo, Norway &nbsp;·&nbsp; {new Date().getFullYear()}</span>
        </footer>

      </div>
    </div>
  );
}

export default App;