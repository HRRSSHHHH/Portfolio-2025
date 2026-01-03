import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from "./ui/SectionHeader";
import BrandButton from "./ui/BrandButton";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    skills: string[];
}

const experiences: Experience[] = [
    {
        id: "01",
        role: "Senior Product Designer",
        company: "TechFlow Systems",
        period: "2024 - Present",
        description: "Leading the design system migration and unifying the UX across 4 disparate SaaS products.",
        achievements: [
            "Reduced design debt by 40% via new atomic design system.",
            "Mentored 3 junior designers to promotion.",
            "Spearheaded the 'AI-First' dashboard initiative."
        ],
        skills: ["Figma", "Design Systems", "Leadership", "Strategy"]
    },
    {
        id: "02",
        role: "Frontend Engineer & UX",
        company: "Nebula AI",
        period: "2022 - 2024",
        description: "Bridged the gap between design and engineering, creating the core UI for a generative AI platform.",
        achievements: [
            "Implemented the real-time node editor using React Flow.",
            "Optimized WebGL rendering performance by 60%.",
            "Designed and built the marketing site which won Awwwards SOTD."
        ],
        skills: ["React", "WebGL", "Three.js", "Prototyping"]
    },
    {
        id: "03",
        role: "UX Researcher",
        company: "Human Centric",
        period: "2021 - 2022",
        description: "Conducted deep user research to inform product strategy for healthcare startups.",
        achievements: [
            "Conducted 50+ user interviews for validtion.",
            "Identified key friction points reducing churn by 15%.",
            "Created the foundational personas used for 2 years."
        ],
        skills: ["User Interviews", "Data Analysis", "Journey Mapping"]
    }
];

export default function Resume() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Reveal Animations
            gsap.from(".reveal-item", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            // The Line Drawing Animation
            gsap.from(lineRef.current, {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 0.5
                }
            });

            // Experience Nodes Animation
            gsap.from(".exp-node", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 70%"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen blueprint-bg pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* 1. HEADER: The Profile */}
                <header className="mb-32 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 reveal-item">
                    <div className="flex flex-col gap-4">
                        <SectionHeader
                            label="Status: Available"
                            title={<>The <span className="text-brand-primary">Trajectory.</span></>}
                            description="A history of solving complex problems and delivering high-impact solutions."
                            light
                        />
                    </div>

                    <BrandButton variant="primary" theme="light">
                        <span className="flex items-center gap-2">
                            Download PDF
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-1 transition-transform duration-300">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </span>
                    </BrandButton>
                </header>

                {/* 2. THE TIMELINE SECTION */}
                <section className="timeline-section relative">
                    {/* The Central Line */}
                    <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-dark/10 transform md:-translate-x-1/2 h-full z-0">
                        <div ref={lineRef} className="w-full h-full bg-brand-primary origin-top will-change-transform" />
                    </div>

                    <div className="flex flex-col gap-24 relative z-10 py-12">
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className={`exp-node flex flex-col md:flex-row gap-8 md:gap-20 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                                {/* Date Marker */}
                                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} pl-12 md:pl-0`}>
                                    <div className="font-consolas text-xs md:text-sm text-brand-primary uppercase tracking-widest blueprint-bg py-2 px-4 border border-brand-primary/20 rounded-none shadow-sm">
                                        {exp.period}
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-[24px] md:left-1/2 w-4 h-4 bg-brand-dark border-2 border-brand-light rounded-none transform -translate-x-1/2 shadow-[0_0_0_8px_var(--color-brand-light)] z-20" />

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                    <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 border-brand-primary group cursor-default">
                                        <h3 className="text-2xl md:text-3xl font-de-valencia text-brand-dark mb-1">{exp.role}</h3>
                                        <div className="text-sm font-consolas text-brand-dark/60 uppercase tracking-wider mb-6">{exp.company}</div>

                                        <p className="text-brand-dark/80 leading-relaxed mb-6 font-light font-montserrat-alternates">
                                            {exp.description}
                                        </p>

                                        <ul className="space-y-2 mb-8 border-t border-brand-dark/5 pt-4">
                                            {exp.achievements.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-brand-dark/60 font-montserrat-alternates">
                                                    <span className="text-brand-primary mt-1.5 text-[10px]">●</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-brand-dark/5 text-brand-dark/60 text-[10px] font-consolas rounded-sm group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors duration-300">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Message */}
                    <div className="text-center py-20 relative z-10 exp-node">
                        <span className="font-de-valencia text-2xl text-brand-dark/40 italic">Your Company Next?</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
