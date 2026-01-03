import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./ui/SectionHeader";
import SystemLabel from "./ui/SystemLabel";
import BrandButton from "./ui/BrandButton";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx: gsap.Context;
        let isMounted = true;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            ctx = gsap.context(() => {
                // Header Animation
                gsap.from(".reveal-item", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out"
                });

                // Skill Cards Animation
                gsap.from(".skill-card", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".skills-grid",
                        start: "top 80%"
                    }
                });

            }, containerRef);
        });

        return () => {
            isMounted = false;
            ctx?.revert();
        };
    }, []);

    const skillsData = [
        {
            category: "Design & Strategy",
            skills: [
                { name: "Figma", level: 95 },
                { name: "Design Systems", level: 90 },
                { name: "User Research", level: 85 },
                { name: "Prototyping", level: 92 },
            ]
        },
        {
            category: "Development & Engineering",
            skills: [
                { name: "React", level: 95 },
                { name: "TypeScript", level: 90 },
                { name: "Tailwind CSS", level: 98 },
                { name: "GSAP", level: 88 },
                { name: "Next.js", level: 90 },
                { name: "Node.js", level: 80 },
            ]
        },
        {
            category: "Artificial Intelligence",
            skills: [
                { name: "Prompt Engineering", level: 85 },
                { name: "LLM Integration", level: 80 },
                { name: "RAG Architectures", level: 75 },
                { name: "Automated Workflows", level: 88 },
            ]
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen blueprint-bg pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="reveal-item">
                    <SectionHeader
                        label="The Skillset"
                        title={<>Technical <br />Mastery & <span className="text-brand-primary">Precision.</span></>}
                        description="My stack is a reflection of my philosophy: minimal, performant, and intelligence-driven. I specialize in bridging the gap between design vision and technical execution."
                        light
                    />
                </div>

                <div className="max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 reveal-item">
                    <div className="text-xl md:text-2xl font-light leading-relaxed text-brand-dark/80 font-montserrat-alternates">
                        Designing systems that think. <br />
                        Engineering experiences that feel.
                    </div>
                    <div className="text-sm text-brand-dark/50 leading-relaxed font-consolas border-l border-brand-primary pl-6">
                        I bridge the gap between creative intuition and algorithmic efficiency.
                        By integrating AI into the design process, I deliver higher fidelity work at 10x velocity.
                    </div>
                </div>

                {/* 2. THE SKILLSET GRID */}
                <section className="skills-grid mt-32 mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {skillsData.map((category, idx) => (
                            <div key={category.category} className="flex flex-col gap-6 skill-card">
                                <div className="flex justify-between items-center border-b border-brand-dark/10 pb-4">
                                    <SystemLabel>{category.category}</SystemLabel>
                                    <span className="text-brand-dark/20 text-4xl font-de-valencia">0{idx + 1}</span>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="p-6 bg-brand-dark/5 border border-brand-dark/10 hover:border-brand-primary hover:bg-white transition-all duration-300 group/skill"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg text-brand-dark">{skill.name}</h4>
                                                <span className="font-consolas text-[10px] text-brand-dark/40 group-hover/skill:text-brand-primary">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-brand-dark/10 h-[2px] overflow-hidden">
                                                <div
                                                    className="bg-brand-primary h-full transition-transform duration-1000 origin-left"
                                                    style={{ transform: `scaleX(${skill.level / 100})` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. The CTA Reveal */}
                <section className="reveal-item mt-40 border-t border-brand-dark/10 pt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="max-w-xl">
                        <h4 className="font-de-valencia text-4xl mb-6 text-brand-dark">Need a specific <br />technical stack?</h4>
                        <p className="text-brand-dark/60 font-consolas text-sm">
                            I am highly adaptable and have experience across a wide range of modern web technologies.
                        </p>
                    </div>
                    <BrandButton variant="secondary" theme="light" className="px-10 py-5">
                        View Technical Resume
                    </BrandButton>
                </section>
            </div>
        </div>
    );
}
