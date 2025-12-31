import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triadRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx: gsap.Context;
        let isMounted = true;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            ctx = gsap.context(() => {
                // Header Animation
                gsap.from(".header-reveal", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out"
                });

                // Triad Cards Animation
                gsap.fromTo(".triad-card",
                    {
                        y: 50,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: triadRef.current,
                            start: "top 85%" // Trigger slightly earlier
                        }
                    }
                );

                // Workflow Animation
                gsap.from(".workflow-step", {
                    x: -30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".workflow-section",
                        start: "top 75%"
                    }
                });

                ScrollTrigger.refresh();

            }, containerRef);
        });

        return () => {
            isMounted = false;
            ctx?.revert();
        };
    }, []);

    const capabilities = [
        {
            title: "Strategic Design",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                </svg>
            ),
            description: "Crafting systems, not just screens. Focus on usability, aesthetics, and scalability.",
            tags: ["Figma", "Design Systems", "User Research", "Prototyping"]
        },
        {
            title: "Vibe Coding",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                    <path d="M10 9h4" />
                </svg>
            ),
            description: "Rapid prototyping and production-ready code. Translating vision to DOM instantly.",
            tags: ["React", "TypeScript", "Tailwind", "Framer Motion", "GSAP"]
        },
        {
            title: "Artificial Intelligence",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                    <path d="M12 12 2.1 12a10.1 10.1 0 0 0 1.9 4Z" />
                    <path d="M12 12v9a9 9 0 0 0 1.3.1c.3 0 .7 0 1-.1Z" />
                </svg>
            ),
            description: "Leveraging LLMs and generative tools to optimize workflows and create adaptive UIs.",
            tags: ["Prompt Engineering", "RAG", "LLM Integration", "Automated Workflows"]
        }
    ];

    return (
        <div ref={containerRef} className="bg-[#e0e0e0] min-h-screen text-[#01161e] font-montserrat-alternates pt-32 pb-20">

            {/* 1. HEADER: The Value Proposition */}
            <header className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
                <div className="flex items-center gap-4 text-[#2d936c] font-mono text-xs tracking-[0.2em] uppercase header-reveal mb-6">
                    <span>Capabilities</span>
                    <span className="w-12 h-[1px] bg-[#2d936c]" />
                    <span>Hybrid Talent</span>
                </div>

                <h1 className="text-[10vw] md:text-[7vw] leading-[0.9] font-de-valencia text-[#01161e] tracking-tight header-reveal">
                    Beyond the <span className="text-[#2d936c]">Interface.</span>
                </h1>

                <div className="max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 header-reveal">
                    <div className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
                        Designing systems that think. <br />
                        Engineering experiences that feel.
                    </div>
                    <div className="text-sm text-gray-500 leading-relaxed font-mono border-l border-[#2d936c] pl-6">
                        I bridge the gap between creative intuition and algorithmic efficiency.
                        By integrating AI into the design process, I deliver higher fidelity work at 10x velocity.
                    </div>
                </div>
            </header>

            {/* 2. THE TRIAD */}
            <section ref={triadRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {capabilities.map((cap) => (
                        <div key={cap.title} className="triad-card group relative p-8 md:p-12 border-t border-[#01161e]/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                            <div className="text-[#2d936c] mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                {cap.icon}
                            </div>
                            <h3 className="text-3xl font-de-valencia mb-4">{cap.title}</h3>
                            <p className="text-gray-600 font-light leading-relaxed mb-8 min-h-[4rem]">
                                {cap.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {cap.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-[#01161e]/5 text-[#01161e]/60 text-xs font-mono rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. AUGMENTED WORKFLOW */}
            <section className="workflow-section max-w-7xl mx-auto px-6 md:px-12 mb-32">
                <div className="border-t border-[#01161e] pt-4 mb-16 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl font-de-valencia">The Augmented Workflow</h2>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#2d936c] hidden md:block">Optimization Loop</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {[
                        { step: "01", title: "Discovery", desc: "AI-Accelerated Research & Synthesis" },
                        { step: "02", title: "Execution", desc: "Generative UI & Vibe Coding" },
                        { step: "03", title: "Refinement", desc: "Automated Testing & Optimization" }
                    ].map((item) => (
                        <div key={item.step} className="workflow-step border-l border-[#01161e]/10 p-8 md:p-12 relative overflow-hidden group">
                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-[#2d936c] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                            <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                                <span className="font-mono text-xs mb-4 block opacity-50">Step {item.step}</span>
                                <h3 className="text-3xl md:text-4xl font-de-valencia mb-2">{item.title}</h3>
                                <p className="font-light opacity-80">{item.desc}</p>
                            </div>

                            {/* Arrow */}
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. THE STACK (Periodic Table Style) */}
            <section className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        "Figma", "React", "TypeScript", "Tailwind",
                        "Python", "LangChain", "Node.js", "WebGL",
                        "Git", "Docker", "Next.js", "OpenAI"
                    ].map((tool) => (
                        <div key={tool} className="aspect-video md:aspect-square flex items-center justify-center border border-[#01161e]/10 hover:bg-[#01161e] hover:text-[#2d936c] transition-colors duration-300 cursor-default group">
                            <span className="font-mono text-sm md:text-lg group-hover:tracking-widest transition-all duration-300">{tool}</span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
