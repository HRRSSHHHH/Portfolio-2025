import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./ui/SectionHeader";
import SystemLabel from "./ui/SystemLabel";
import BrandButton from "./ui/BrandButton";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  category: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  outcome: string;
  year: string;
  stack: string[];
}

const projects: Project[] = [
  {
    id: "01",
    category: "UX/UI",
    title: "Liquid Assets",
    role: "Lead Product Designer",
    problem: "Traditional banking dashboards overwhelm users with raw data, leading to decision paralysis.",
    solution: "Designed a 'Context-First' interface that translates complex metrics into natural language insights.",
    outcome: "30% increase in daily active users.",
    year: "2024",
    stack: ["React", "D3.js", "Figma", "Node.js"]
  },
  {
    id: "02",
    category: "Gen AI",
    title: "AURO - Game trailer design",
    role: "Frontend Engineer",
    problem: "AI image generation tools lack precise control for professional artists.",
    solution: "Built a node-based editor allowing granular control over latent space vectors.",
    outcome: "Adoption by 5 major design studios.",
    year: "2024",
    stack: ["TypeScript", "WebGL", "Python", "TensorFlow"]
  },
  {
    id: "03",
    category: "Product",
    title: "Vital Sync",
    role: "UX Researcher & Designer",
    problem: "Remote patient monitoring systems suffer from 40% data entry error rates.",
    solution: "Implemented voice-first data entry with LLM-based error correction.",
    outcome: "Error rates dropped to <5%.",
    year: "2023",
    stack: ["React Native", "OpenAI API", "Framer Motion"]
  },
  {
    id: "04",
    category: "Product",
    title: "Loom & Thread",
    role: "Full Stack Developer",
    problem: "Luxury fashion e-commerce lacks the tactile feeling of in-store shopping.",
    solution: "Developed a WebGL fabric physics engine to simulate material drape in real-time.",
    outcome: "Conversion rate doubled for high-ticket items.",
    year: "2022",
    stack: ["Three.js", "Shopify", "React", "Blender"]
  },
  {
    id: "05",
    category: "Academic",
    title: "EcoSense",
    role: "Research Lead",
    problem: "Campus energy waste was untracked and invisible to students.",
    solution: "IoT sensor network visualization with gamified reduction targets.",
    outcome: "Best Thesis Award 2022",
    year: "2022",
    stack: ["Arduino", "Python", "D3.js"]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const navigate = useNavigate();

  const categories = ["All", "UX/UI", "Product", "Gen AI", "Academic"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (projectId: string) => {
    if (projectId === "02") {
      navigate("/project/auro");
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal Animation
      gsap.from(".reveal-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Rows Reveal
      gsap.from(".project-row", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]); // Re-run when filter changes

  return (
    <div ref={containerRef} className="min-h-screen blueprint-bg pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 1. THE MANIFESTO HEADER */}
        <header className="mb-32 reveal-item">
          <SectionHeader
            label="Archived Works"
            title={<>Thought & <br /><span className="text-brand-primary">Execution.</span></>}
            description="A curated archive of problems solved. Bridging the gap between human intuition and artificial intelligence through rigorous design and engineering."
            light
          />

          <div className="flex flex-wrap gap-12 mt-12 border-t border-brand-dark/10 pt-8">
            {[
              { label: "Experience", value: "3 Years" },
              { label: "Projects Delivered", value: "15+" },
              { label: "Client Satisfaction", value: "100%" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-de-valencia text-brand-dark">{stat.value}</div>
                <div className="font-consolas text-xs text-brand-dark/50 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* 2. THE BLUEPRINT GRID */}
        <section className="projects-grid">
          {/* CATEGORY FILTER BAR */}
          <div className="flex flex-wrap gap-6 mb-12 reveal-item font-consolas text-sm tracking-wider">
            {categories.map((cat) => (
              <BrandButton
                key={cat}
                onClick={() => setActiveCategory(cat)}
                variant="tertiary"
                theme="light"
                className={`px-4 py-2 ${activeCategory === cat ? "!text-brand-primary" : ""}`}
              >
                {cat}
              </BrandButton>
            ))}
          </div>

          {/* Filter / Legend */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-dark font-consolas text-xs uppercase tracking-widest text-brand-dark/60 reveal-item">
            <div className="hidden md:block">01. ID</div>
            <div className="hidden md:block pl-12">02. Context</div>
            <div className="flex-1 pl-12">03. The Case Study</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col min-h-[50vh]">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { rowsRef.current[index] = el; }}
                onClick={() => handleProjectClick(project.id)}
                className="project-row group relative border-b border-brand-dark/10 py-16 hover:bg-brand-dark/5 transition-colors duration-500 cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10 px-4 md:px-0">
                  {/* 01: ID */}
                  <div className="col-span-1 md:col-span-1">
                    <span className="font-de-valencia text-4xl text-brand-primary/40 group-hover:text-brand-primary transition-colors duration-300">
                      {project.id}
                    </span>
                  </div>

                  {/* 02: Context */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2">
                      <SystemLabel>{project.category}</SystemLabel>
                      <span className="text-sm text-brand-dark/50 font-consolas tracking-wider">{project.year}</span>
                    </div>
                  </div>

                  {/* 03: The Core Content */}
                  <div className="col-span-1 md:col-span-9 pl-0 md:pl-8">
                    <div className="flex flex-col gap-12">
                      <div className="max-w-3xl w-full">
                        <h3 className="text-3xl md:text-5xl font-medium text-brand-dark mb-2 group-hover:translate-x-2 transition-transform duration-300 font-de-valencia tracking-tight leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm text-brand-primary font-medium mb-6 font-consolas uppercase tracking-wider">{project.role}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                          <div>
                            <h4 className="font-consolas text-xs uppercase text-brand-dark/40 mb-2 tracking-[0.2em]">The Problem</h4>
                            <p className="text-brand-dark/80 leading-relaxed font-light font-montserrat-alternates">{project.problem}</p>
                          </div>
                          <div>
                            <h4 className="font-consolas text-xs uppercase text-brand-dark/40 mb-2 tracking-[0.2em]">The Solution</h4>
                            <p className="text-brand-dark/80 leading-relaxed font-light font-montserrat-alternates">{project.solution}</p>
                          </div>
                        </div>

                        {/* VISUAL EVIDENCE TRIPTYCH */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* TILE 1: THE INTERFACE */}
                          <div className="flex flex-col gap-3 group/tile cursor-pointer">
                            <div className="aspect-[4/3] bg-brand-card rounded-sm relative overflow-hidden transition-transform duration-500 group-hover/tile:-translate-y-2 shadow-sm border border-white/5">
                              <div className="absolute top-4 left-4 right-4 h-8 bg-brand-primary/10 rounded-sm" />
                              <div className="absolute top-16 left-4 w-1/2 h-24 bg-white/5 rounded-sm" />
                              <div className="absolute top-16 right-4 w-1/3 h-24 bg-white/5 rounded-sm" />
                              <div className="absolute bottom-4 left-4 right-4 h-20 bg-white/5 rounded-sm" />
                              <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300">
                                <span className="font-de-valencia text-brand-light text-xl tracking-widest">View Design</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-brand-dark/10 pt-2">
                              <span className="font-consolas text-[10px] uppercase tracking-widest text-brand-primary">01. Interface</span>
                              <span className="font-consolas text-[10px] text-brand-dark/40">Figma</span>
                            </div>
                          </div>

                          {/* TILE 2: THE ARCHITECTURE */}
                          <div className="flex flex-col gap-3 group/tile cursor-pointer">
                            <div className="aspect-[4/3] bg-brand-card relative overflow-hidden border border-brand-primary/20 rounded-sm transition-transform duration-500 group-hover/tile:-translate-y-2 shadow-sm">
                              <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: `radial-gradient(circle, var(--color-brand-primary) 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
                              />
                              <div className="absolute inset-8 border border-dashed border-brand-primary/30 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center relative">
                                  <div className="w-2 h-2 bg-brand-primary rounded-full" />
                                  <div className="absolute top-full left-1/2 h-8 w-[1px] bg-brand-primary/30" />
                                  <div className="absolute bottom-full left-1/2 h-8 w-[1px] bg-brand-primary/30" />
                                  <div className="absolute right-full top-1/2 w-8 h-[1px] bg-brand-primary/30" />
                                  <div className="absolute left-full top-1/2 w-8 h-[1px] bg-brand-primary/30" />
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300">
                                <span className="font-de-valencia text-brand-light text-xl tracking-widest">View Logic</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-brand-dark/10 pt-2">
                              <span className="font-consolas text-[10px] uppercase tracking-widest text-brand-primary">02. Architecture</span>
                              <span className="font-consolas text-[10px] text-brand-dark/40">FigJam</span>
                            </div>
                          </div>

                          {/* TILE 3: THE CODE */}
                          <div className="flex flex-col gap-3 group/tile cursor-pointer">
                            <div className="aspect-[4/3] bg-brand-dark border border-brand-white/5 rounded-sm relative overflow-hidden font-consolas text-[10px] p-6 text-brand-light/40 transition-transform duration-500 group-hover/tile:-translate-y-2 shadow-sm">
                              <div className="flex flex-col gap-1 opacity-60">
                                <div className="flex gap-2"><span className="text-brand-secondary">import</span> <span className="text-brand-primary">{`{ motion }`}</span> <span className="text-brand-secondary">from</span> <span className="text-brand-primary">"framer-motion"</span>;</div>
                                <div className="flex gap-2 text-brand-secondary">const<span className="text-brand-primary"> Variant</span> = {`{`}</div>
                                <div className="pl-4">enter: {`{`} opacity: 1, y: 0 {`}`},</div>
                                <div className="pl-4">exit: {`{`} opacity: 0, y: 20 {`}`}</div>
                                <div>{`}`};</div>
                              </div>
                              <div className="absolute inset-0 bg-brand-dark/95 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300">
                                <span className="font-de-valencia text-brand-light text-xl tracking-widest">View Repo</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-brand-dark/10 pt-2">
                              <span className="font-consolas text-[10px] uppercase tracking-widest text-brand-primary">03. Engineering</span>
                              <span className="font-consolas text-[10px] text-brand-dark/40">React/TS</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-consolas text-xs uppercase text-brand-primary tracking-widest">Impact:</span>
                            <span className="font-medium text-brand-dark font-montserrat-alternates">{project.outcome}</span>
                          </div>

                          <div className="flex gap-2">
                            {project.stack.map(tech => (
                              <span key={tech} className="px-2 py-1 bg-brand-dark/5 rounded-sm text-[10px] font-consolas text-brand-dark/60 border border-brand-dark/5">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
