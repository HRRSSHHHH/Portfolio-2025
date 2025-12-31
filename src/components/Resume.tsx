import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

            // Header Animation
            // Header Animation
            gsap.fromTo(".header-reveal",
                {
                    y: 50,
                    opacity: 0,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    autoAlpha: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );

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
                    scrub: 0.5 // Reduced for better responsiveness
                }
            });

            // Experience Nodes Animation
            gsap.from(".exp-node", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Slightly faster stagger
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
        <div ref={containerRef} className="bg-[#e0e0e0] min-h-screen text-[#01161e] font-montserrat-alternates pt-32 pb-20 relative overflow-hidden">

            {/* Background Texture (Optimized) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* 1. HEADER: The Profile */}
            <header className="max-w-4xl mx-auto px-6 md:px-12 mb-32 relative z-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-[#2d936c] font-mono text-xs tracking-[0.2em] uppercase header-reveal justify-center md:justify-start">
                            <span>Status: Available</span>
                            <span className="w-12 h-[1px] bg-[#2d936c]" />
                            <span>San Francisco</span>
                        </div>

                        <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-de-valencia text-[#01161e] tracking-tight header-reveal">
                            The <span className="text-[#2d936c]">Trajectory.</span>
                        </h1>
                        <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-gray-600 header-reveal">
                            A history of solving complex problems and delivering high-impact solutions.
                        </p>
                    </div>

                    {/* Magnetic Button */}
                    <button className="header-reveal group relative px-8 py-4 bg-[#01161e] text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-[#2d936c] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            Download PDF
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-1 transition-transform duration-300">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </span>
                    </button>
                </div>
            </header>

            {/* 2. THE TIMELINE SECTION */}
            <section className="timeline-section max-w-5xl mx-auto px-6 md:px-12 relative">

                {/* The Central Line */}
                <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#01161e]/20 transform md:-translate-x-1/2 h-full z-0">
                    <div ref={lineRef} className="w-full h-full bg-[#2d936c] origin-top will-change-transform" />
                </div>

                <div className="flex flex-col gap-24 relative z-10 py-12">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`exp-node flex flex-col md:flex-row gap-8 md:gap-20 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                            {/* Date Marker (Mobile: Top, Desktop: Opposite Side) */}
                            <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} pl-12 md:pl-0`}>
                                <div className="font-mono text-xs md:text-sm text-[#2d936c] uppercase tracking-widest bg-[#e0e0e0] py-2 px-4 border border-[#2d936c]/20 rounded-full">
                                    {exp.period}
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-[24px] md:left-1/2 w-3 h-3 bg-[#01161e] border-2 border-[#e0e0e0] rounded-full transform -translate-x-1/2 shadow-[0_0_0_8px_rgba(224,224,224,1)] z-20" />

                            {/* Content Card */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 border-[#2d936c] group cursor-default">
                                    <h3 className="text-2xl md:text-3xl font-de-valencia text-[#01161e] mb-1">{exp.role}</h3>
                                    <div className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-6">{exp.company}</div>

                                    <p className="text-gray-700 leading-relaxed mb-6 font-light">
                                        {exp.description}
                                    </p>

                                    <ul className="space-y-2 mb-8 border-t border-[#01161e]/5 pt-4">
                                        {exp.achievements.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                <span className="text-[#2d936c] mt-1.5 text-[10px]">●</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-[#01161e]/5 text-[#01161e]/60 text-[10px] font-mono rounded-sm group-hover:bg-[#2d936c]/10 group-hover:text-[#2d936c] transition-colors duration-300">
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
                    <span className="font-de-valencia text-2xl text-[#01161e]/40">Your Company Next?</span>
                </div>

            </section>

        </div>
    );
}
