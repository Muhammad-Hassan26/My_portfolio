import { useState, useEffect, useRef } from "react";

// ─── Placeholder image URLs (easy to swap) ───────────────────────────────────
const IMAGES = {
  hero: "/src/assets/Myimage.jpeg",
  about: "/src/assets/Myimage2.jpeg",
  project1: "https://placehold.co/600x400/0f3460/e94560?text=Project+1",
  project2: "https://placehold.co/600x400/0f3460/e94560?text=Project+2",
  project3: "https://placehold.co/600x400/0f3460/e94560?text=Project+3",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = {
  Frontend: [
    { name: "HTML5", level: 92 },
    { name: "CSS3 / SASS", level: 88 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "React.js", level: 82 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Bootstrap", level: 78 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 80 },
    { name: "VS Code", level: 90 },
    { name: "Figma", level: 70 },
    { name: "npm / Yarn", level: 75 },
  ],
  "Soft Skills": [
    { name: "Problem Solving", level: 88 },
    { name: "Team Collaboration", level: 85 },
    { name: "Communication", level: 82 },
    { name: "Time Management", level: 80 },
  ],
};

const NAV_LINKS = ["Home", "About", "Skills", "Contact"];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c14;
    --bg2: #0d1320;
    --bg3: #111827;
    --accent: #00d4ff;
    --accent2: #e94560;
    --accent3: #7c3aed;
    --text: #e8eaf0;
    --text2: #8892a4;
    --border: rgba(0,212,255,0.15);
    --card: rgba(13,19,32,0.8);
    --glow: 0 0 30px rgba(0,212,255,0.25);
    --font-display: 'Syne', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-display);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  /* ── Nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 4rem;
    background: rgba(8,12,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s;
  }
  .nav.scrolled { padding: 0.8rem 4rem; box-shadow: var(--glow); }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .nav-logo span { color: var(--accent2); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-display); font-size: 0.95rem; font-weight: 600;
    color: var(--text2); transition: color 0.3s; letter-spacing: 0.03em;
  }
  .nav-links button:hover, .nav-links button.active { color: var(--accent); }
  .nav-links button.active { position: relative; }
  .nav-links button.active::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
    height: 2px; background: var(--accent); border-radius: 1px;
  }
  .nav-cta {
    background: transparent; border: 1px solid var(--accent);
    color: var(--accent) !important; padding: 0.5rem 1.2rem;
    border-radius: 4px; transition: all 0.3s !important;
  }
  .nav-cta:hover { background: var(--accent) !important; color: var(--bg) !important; }

  /* ── Sections ── */
  .section { min-height: 100vh; padding: 6rem 4rem; }
  .section-label {
    font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.2em;
    color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800;
    line-height: 1.1; margin-bottom: 1rem;
  }
  .section-title em { font-style: normal; color: var(--accent); }
  .section-sub {
    color: var(--text2); font-size: 1.05rem; max-width: 560px; margin-bottom: 3rem;
  }

  /* ── Home ── */
  #home {
    display: flex; align-items: center; justify-content: space-between;
    gap: 4rem; position: relative; overflow: hidden;
  }
  .home-left { flex: 1; animation: fadeInUp 0.8s ease forwards; }
  .home-greeting {
    font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent);
    letter-spacing: 0.15em; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .home-greeting::before {
    content: ''; width: 40px; height: 1px; background: var(--accent);
  }
  .home-name {
    font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.05;
    margin-bottom: 0.5rem;
  }
  .home-name .accent { color: var(--accent); }
  .home-title {
    font-size: clamp(1.1rem, 2.5vw, 1.6rem); color: var(--text2);
    font-weight: 500; margin-bottom: 1.5rem;
  }
  .home-title .typed { color: var(--accent2); }
  .home-desc {
    color: var(--text2); max-width: 520px; font-size: 1rem;
    line-height: 1.8; margin-bottom: 2.5rem;
  }
  .home-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    padding: 0.85rem 2rem; background: var(--accent); color: var(--bg);
    border: none; border-radius: 4px; font-family: var(--font-display);
    font-size: 0.95rem; font-weight: 700; cursor: pointer; letter-spacing: 0.05em;
    transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,212,255,0.3);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,255,0.45); }
  .btn-secondary {
    padding: 0.85rem 2rem; background: transparent; color: var(--text);
    border: 1px solid var(--border); border-radius: 4px; font-family: var(--font-display);
    font-size: 0.95rem; font-weight: 600; cursor: pointer;
    transition: all 0.3s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
  .home-stats {
    display: flex; gap: 3rem; margin-top: 3rem;
    padding-top: 2rem; border-top: 1px solid var(--border);
  }
  .stat-num {
    font-size: 2rem; font-weight: 800; color: var(--accent);
    font-family: var(--font-mono); display: block;
  }
  .stat-label { font-size: 0.8rem; color: var(--text2); letter-spacing: 0.05em; }

  .home-right {
    flex: 0 0 380px; display: flex; flex-direction: column;
    align-items: center; gap: 1.5rem;
    animation: fadeInRight 0.8s 0.2s ease both;
  }
  .hero-img-wrap {
    position: relative; width: 300px; height: 300px;
  }
  .hero-img-wrap::before {
    content: ''; position: absolute; inset: -3px;
    background: conic-gradient(from 0deg, var(--accent), var(--accent3), var(--accent2), var(--accent));
    border-radius: 50%; animation: spin 4s linear infinite;
  }
  .hero-img-wrap::after {
    content: ''; position: absolute; inset: 3px;
    background: var(--bg); border-radius: 50%;
  }
  .hero-img {
    position: relative; z-index: 1;
    width: 100%; height: 100%; object-fit: cover;
    border-radius: 50%; padding: 6px;
  }
  .hero-badge {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 50px; padding: 0.6rem 1.5rem;
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.85rem; font-weight: 600;
    backdrop-filter: blur(10px);
  }
  .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }

  /* grid bg */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.03;
    background-image:
      linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(100px);
  }
  .orb1 { width: 500px; height: 500px; background: rgba(0,212,255,0.06); top: -100px; right: -100px; }
  .orb2 { width: 400px; height: 400px; background: rgba(124,58,237,0.06); bottom: 100px; left: -100px; }

 /* ── About ── */
 #about {
    display: flex; 
    align-items: flex-start; /* Align to top to prevent weird stretching */
    justify-content: center;
    gap: 5rem;
    padding: 80px 10%; /* Ensure comfortable side margins */
    background: linear-gradient(135deg, var(--bg2) 0%, var(--bg) 100%);
 }

 .about-img-col { 
    flex: 0 0 380px; 
    position: sticky; /* Keeps the image in view as you read the bio */
    top: 2rem;
 }

 .about-img-frame {
    position: relative; 
    border-radius: 12px; /* Slightly smoother corners */
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3); /* Adds depth */
 }

 .about-img-frame img { 
    width: 100%; 
    display: block; 
    object-fit: cover;
 }

 .about-img-frame::before {
    content: ''; 
    position: absolute; 
    inset: 0;
    background: linear-gradient(to top, rgba(10, 10, 15, 0.8) 0%, transparent 40%);
    z-index: 1;
 }

 .about-img-tag {
    position: absolute; 
    bottom: 1.5rem; 
    left: 1.5rem; 
    z-index: 2;
    background: rgba(0, 212, 255, 0.1); 
    backdrop-filter: blur(4px); /* Modern touch */
    border: 1px solid var(--accent);
    border-radius: 4px; 
    padding: 0.5rem 1rem;
    font-family: var(--font-mono); 
    font-size: 0.75rem; 
    color: var(--accent);
 }

 .about-text-col { 
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
 }

 .about-bio { 
    color: var(--text2); 
    line-height: 1.8; 
    margin-bottom: 2.5rem; 
    font-size: 1.05rem; 
    text-align: justify; /* Cleaner look for longer bios */
 }

 .about-bio strong { 
    color: var(--text); 
    font-weight: 600;
 }

 .edu-list { 
    list-style: none; 
    display: flex; 
    flex-direction: column; 
    gap: 1.2rem; 
    margin-bottom: 2.5rem; 
 }

 .edu-item {
    display: flex; 
    gap: 1.5rem; 
    align-items: center; /* Vertically centers icon with text */
    padding: 1.5rem; 
    background: var(--card);
    border: 1px solid var(--border); 
    border-radius: 10px;
    transition: all 0.3s ease;
    /* Ensure all boxes have the same structure regardless of content */
 }

 .edu-item:hover { 
    border-color: var(--accent); 
    transform: translateX(8px); /* Subtle slide effect on hover */
    background: rgba(255, 255, 255, 0.02);
 }

 .edu-icon {
    font-size: 1.4rem; 
    width: 50px; 
    height: 50px;
    background: rgba(0, 212, 255, 0.08); 
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 10px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    flex-shrink: 0; /* Prevents icon from squishing */
 }

 .edu-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
 }

 .edu-degree { 
    font-weight: 700; 
    font-size: 1rem; 
    margin-bottom: 0.3rem; 
    color: var(--text);
    line-height: 1.3;
 }

 .edu-school { 
    color: var(--text2); 
    font-size: 0.9rem; 
    margin-bottom: 0.4rem; 
 }

 .edu-year { 
    color: var(--accent); 
    font-family: var(--font-mono); 
    font-size: 0.8rem; 
    font-weight: 500;
 }

 /* ── Skills ── */
 #skills { 
    background: var(--bg); 
    padding: 4rem 2rem; /* Added padding for better spacing */
 }

 /* Correcting text alignment for the subtitle in image 1 */
 .section-sub {
    max-width: 700px;
    margin: 0 auto; /* Centers the paragraph block */
    text-align: center; /* Centers the text inside */
    line-height: 1.6;
 }

 .skills-grid {
    display: grid; 
    /* Changed to auto-fit so it doesn't break on smaller screens */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 2rem;
    margin-top: 3rem;
    align-items: start; /* Ensures cards align at the top if content heights vary */
 }

 .skill-category {
    background: var(--card); 
    border: 1px solid var(--border);
    border-radius: 12px; 
    padding: 2rem;
    transition: border-color 0.3s, transform 0.3s;
    height: 100%; /* Keeps cards uniform height in a row */
 }

 .skill-category:hover { 
    border-color: var(--accent); 
    transform: translateY(-4px); 
 }

 .skill-cat-title {
    font-size: 0.8rem; 
    font-family: var(--font-mono);
    color: var(--accent); 
    letter-spacing: 0.15em;
    text-transform: uppercase; 
    margin-bottom: 1.5rem;
    display: flex; 
    align-items: center; 
    gap: 0.5rem;
    /* Ensuring the title is left-aligned within the card */
    justify-content: flex-start; 
 }

 .skill-cat-title::before {
    content: '//'; 
    color: var(--accent2); 
    font-weight: 700;
 }

 .skill-item { 
    margin-bottom: 1.2rem; 
 }

 .skill-header {
    display: flex; 
    justify-content: space-between;
    align-items: flex-end; /* Aligns skill name and percentage to the bottom of the line */
    margin-bottom: 0.5rem; 
    font-size: 0.9rem;
 }

 .skill-pct { 
    color: var(--accent); 
    font-family: var(--font-mono); 
    font-size: 0.8rem; 
 }

 .skill-bar { 
    height: 4px; 
    background: rgba(255,255,255,0.06); 
    border-radius: 2px; 
    overflow: hidden; 
 }

 .skill-fill {
    height: 100%; 
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent3));
    width: 0; 
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
 }

 .skill-fill.animated { 
    width: var(--target-width); 
 }

  /* ── Contact ── */
  #contact {
    background: linear-gradient(135deg, var(--bg2) 0%, var(--bg) 100%);
    display: flex; gap: 2rem; align-items: flex-start;
  }
  .contact-left { flex: 1; }
  .contact-info { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem; }
  .contact-item {
    display: flex; gap: 1rem; align-items: center;
    padding: 1.2rem 1.5rem; background: var(--card);
    border: 1px solid var(--border); border-radius: 8px;
    transition: border-color 0.3s;
  }
  .contact-item:hover { border-color: var(--accent); }
  .contact-icon {
    font-size: 1.2rem; width: 44px; height: 44px;
    background: rgba(0,212,255,0.1); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .contact-detail-label { font-size: 0.75rem; color: var(--text2); margin-bottom: 0.2rem; font-family: var(--font-mono); }
  .contact-detail-val { font-weight: 600; font-size: 0.95rem; }
  .social-links { display: flex; gap: 1rem; }
  .social-btn {
    padding: 0.7rem 1.5rem; background: var(--card);
    border: 1px solid var(--border); border-radius: 6px; cursor: pointer;
    color: var(--text2); font-family: var(--font-display); font-size: 0.85rem; font-weight: 600;
    transition: all 0.3s;
  }
  .social-btn:hover { border-color: var(--accent); color: var(--accent); }
  .contact-right { flex: 1; }
  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-label { font-size: 0.8rem; font-family: var(--font-mono); color: var(--text2); letter-spacing: 0.05em; }
  .form-input, .form-textarea {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 6px; padding: 0.85rem 1rem;
    color: var(--text); font-family: var(--font-display); font-size: 0.95rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
  }
  .form-input:focus, .form-textarea:focus {
    border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,212,255,0.1);
  }
  .form-textarea { resize: vertical; min-height: 140px; }
  .form-submit {
    padding: 1rem; background: var(--accent); color: var(--bg);
    border: none; border-radius: 6px; font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; cursor: pointer;
    transition: all 0.3s; letter-spacing: 0.05em;
    box-shadow: 0 4px 20px rgba(0,212,255,0.3);
  }
  .form-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,255,0.45); }
  .form-submit.sent { background: #22c55e; }

  /* ── Footer ── */
  footer {
    padding: 2rem 4rem; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.8rem; color: var(--text2); font-family: var(--font-mono);
  }

  /* ── Animations ── */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.3); }
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  .cursor { animation: blink 1s step-end infinite; color: var(--accent); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    #about, #contact { flex-direction: column; gap: 3rem; }
    .about-img-col, .contact-right { flex: unset; width: 100%; }
    #home { flex-direction: column-reverse; text-align: center; }
    .home-desc { margin: 0 auto 2.5rem; }
    .home-btns { justify-content: center; }
    .home-stats { justify-content: center; }
    .home-greeting { justify-content: center; }
  }
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav.scrolled { padding: 0.8rem 1.5rem; }
    .nav-links { display: none; }
    .section { padding: 5rem 1.5rem; }
    footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
    .skills-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .home-right { flex: unset; }
    .hero-img-wrap { width: 220px; height: 220px; }
  }
`;

// ─── Typed text hook ──────────────────────────────────────────────────────────
function useTyped(words, speed = 100) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), 1600);
        else setCi(c => c + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi(w => (w + 1) % words.length);
          setCi(0);
        } else {
          setCi(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [ci, wi, deleting, words, speed]);

  return display;
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span>{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-fill ${animate ? "animated" : ""}`}
          style={{ "--target-width": `${level}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activePage, setActivePage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const skillsRef = useRef(null);

  const typed = useTyped(["Frontend Developer", "React.js Enthusiast", "Electronics Student"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (page) => {
    setActivePage(page);
    document.getElementById(page.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="grid-bg" />
      <div className="orb orb1" />
      <div className="orb orb2" />

      {/* ── Navbar ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          &lt;<span>MHS</span> /&gt;
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                className={`${activePage === link ? "active" : ""} ${link === "Contact" ? "nav-cta" : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Home ── */}
      <section className="section" id="home">
        <div className="home-left">
          <div className="home-greeting">Hi, I'm</div>
          <h1 className="home-name">
            Muhammad<br />
            Hassan <span className="accent">Samdani</span>
          </h1>
          <div className="home-title">
            <span className="typed">{typed}</span>
            <span className="cursor">|</span>
          </div>
          <p className="home-desc">
            A passionate frontend developer crafting beautiful, performant web experiences.
            I turn ideas into pixel-perfect, interactive digital products with clean code and creative vision.
          </p>
          <div className="home-btns">
            <button className="btn-primary" onClick={() => scrollTo("Contact")}>
              Get In Touch →
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("About")}>
              About Me
            </button>
          </div>
          <div className="home-stats">
            <div>
              <span className="stat-num">10+</span>
              <span className="stat-label">Projects Done</span>
            </div>
            <div>
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div>
              <span className="stat-num">15+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        <div className="home-right">
          <div className="hero-img-wrap">
            <img src={IMAGES.hero} alt="Muhammad Hassan Samdani" className="hero-img" />
          </div>
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for Work
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section" id="about">
        <div className="about-img-col">
          <div className="about-img-frame">
            <img src={IMAGES.about} alt="About Hassan" />
          </div>
        </div>
        <div className="about-text-col">
          <p className="section-label">About_me</p>
          <h2 className="section-title">Who I <em>Am</em></h2>
          <p className="about-bio">
            I'm <strong>Muhammad Hassan Samdani</strong>, a frontend developer based in Pakistan,
            passionate about building exceptional digital experiences. I specialize in creating
            responsive, accessible, and visually compelling web interfaces using modern technologies.
          </p>
          <p className="about-bio">
            Currently pursuing my <strong>Bachelor's degree in Electronics Engineering</strong>,
            I blend technical knowledge with creative design thinking to craft solutions that are
            both functional and beautiful. I believe great code and great design go hand in hand.
          </p>

          <p className="section-label" style={{ marginBottom: "1rem" }}>Education</p>
          <ul className="edu-list">
            <li className="edu-item">
              <div className="edu-icon">🎓</div>
              <div>
                <div className="edu-degree">Bachelor of Science — Electronics Engineering</div>
                <div className="edu-school">Quaid-e-Azam University</div>
                <div className="edu-year">2023 — Present</div>
              </div>
            </li>
            <li className="edu-item">
              <div className="edu-icon">📐</div>
              <div>
                <div className="edu-degree">FSC Pre-Engineering</div>
                <div className="edu-school">HAMZA APSACS</div>
                <div className="edu-year">2021 — 2023</div>
              </div>
            </li>
            <li className="edu-item">
              <div className="edu-icon">📚</div>
              <div>
                <div className="edu-degree">Matriculation (SSC)</div>
                <div className="edu-school">HAMZA APSACS</div>
                <div className="edu-year">2019 — 2021</div>
              </div>
            </li>
          </ul>

          <button className="btn-primary" onClick={() => scrollTo("Contact")}>
            Let's Work Together →
          </button>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="section" id="skills" ref={skillsRef}>
        <p className="section-label">My_skills</p>
        <h2 className="section-title">What I <em>Know</em></h2>
        <p className="section-sub">
          My toolkit spans modern frontend technologies, design tools, and collaborative workflows.
        </p>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div className="skill-category" key={cat}>
              <div className="skill-cat-title">{cat}</div>
              {items.map(s => (
                <SkillBar key={s.name} name={s.name} level={s.level} animate={skillsVisible} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section" id="contact">
        <div className="contact-left">
          <p className="section-label">Contact_me</p>
          <h2 className="section-title">Let's <em>Connect</em></h2>
          <p className="section-sub">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <div className="contact-detail-label">// email</div>
                <div className="contact-detail-val">muhammadhassansamdani@email.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-detail-label">// location</div>
                <div className="contact-detail-val">Pakistan 🇵🇰</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div>
                <div className="contact-detail-label">// status</div>
                <div className="contact-detail-val">Open to Opportunities</div>
              </div>
            </div>
          </div>
          <div className="social-links">
            <button className="social-btn">GitHub</button>
            <button className="social-btn">LinkedIn</button>
            <button className="social-btn">Twitter</button>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">// your_name</label>
                <input
                  className="form-input"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">// your_email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">// subject</label>
              <input
                className="form-input"
                placeholder="Project Inquiry"
                value={formState.subject}
                onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">// message</label>
              <textarea
                className="form-textarea"
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className={`form-submit ${sent ? "sent" : ""}`}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <span>© 2024 Muhammad Hassan Samdani</span>
        <span>Designed & Built with ❤️</span>
        <span>&lt;MHS /&gt;</span>
      </footer>
    </>
  );
}