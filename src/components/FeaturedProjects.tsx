import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Project Data - Simplified for Minimalist Premium
const projects = [
    {
        id: "01",
        title: "Fathom",
        category: "Data Visualization",
        description: "Transforming complex datasets into intuitive, human-centered dashboards.",
        tags: ["React", "D3.js"],
        accent: "#2d936c",
        // No patterns, just pure data
    },
    {
        id: "02",
        title: "Sensei AI",
        category: "EdTech Platform",
        description: "Adaptive learning algorithms that evolve with every student interaction.",
        tags: ["AI/ML", "UX Research"],
        accent: "#2d936c",
    },
    {
        id: "03",
        title: "OnAI",
        category: "Generative Tools",
        description: "Empowering creators with AI-driven design partners.",
        tags: ["GenAI", "Product"],
        accent: "#2d936c",
    }
];

export default function FeaturedProjects() {
    const component = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const distortionRef = useRef<SVGFEDisplacementMapElement>(null);

    const centerCard = useRef<HTMLDivElement>(null);
    const leftCard = useRef<HTMLDivElement>(null);
    const rightCard = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                }
            });

            // Initial states
            gsap.set([centerCard.current, leftCard.current, rightCard.current], { autoAlpha: 0 });
            gsap.set(centerCard.current, { y: 600, scale: 0.8 });
            gsap.set(leftCard.current, { x: -800, rotation: -15, scale: 0.8 });
            gsap.set(rightCard.current, { x: 800, rotation: 15, scale: 0.8 });

            // Animations
            tl.to(distortionRef.current, { attr: { scale: 1000 }, duration: 1, ease: "power1.in" }, 0)
                .to(headerRef.current, { autoAlpha: 0, duration: 1 }, 0);

            tl.to(centerCard.current, { duration: 1.5, autoAlpha: 1, y: 0, scale: 1, ease: "back.out(1.2)" }, "-=0.2")
                .to(leftCard.current, { duration: 1.5, autoAlpha: 1, x: 0, rotation: -5, scale: 1, ease: "back.out(1.2)" }, "-=0.8")
                .to(rightCard.current, { duration: 1.5, autoAlpha: 1, x: 0, rotation: 5, scale: 1, ease: "back.out(1.2)" }, "-=1.0");

        }, component);
        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (index: number) => {
        gsap.to(cardsRef.current[index], {
            y: -8, // Very subtle lift
            scale: 1.01,
            zIndex: 100,
            rotation: 0,
            boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.4)", // Darker, cleaner shadow
            borderColor: "rgba(255, 255, 255, 0.2)", // Subtle white border on hover
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index: number) => {
        gsap.to(cardsRef.current[index], {
            y: 0,
            scale: 1,
            zIndex: index === 0 ? 10 : (index === 1 ? 20 : 30),
            rotation: index === 0 ? 0 : (index === 1 ? -5 : 5),
            boxShadow: "none",
            borderColor: "rgba(255, 255, 255, 0.05)", // Barely visible default border
            duration: 0.4,
            ease: "power2.out"
        });
    };

    return (
        <div id="featured-projects" ref={component} className="relative w-full text-[#01161e] font-montserrat-alternates" style={{ zIndex: 10 }}>
            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id="sand-dissolve">
                        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="1" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" ref={distortionRef} />
                    </filter>
                </defs>
            </svg>

            <div ref={triggerRef} className="h-screen w-full flex flex-col justify-center items-center overflow-hidden py-20 relative"
                style={{ backgroundColor: "rgba(224, 224, 224, 0.5)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>

                <div ref={headerRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 text-center" style={{ filter: "url(#sand-dissolve)" }}>
                    <h2 className="text-[12vw] md:text-[8vw] font-thin tracking-tighter uppercase text-[#01161e] leading-[0.9] select-none break-words max-w-full" style={{ fontWeight: 100 }}>
                        Featured <br /> <span className="text-[#2d936c]" style={{ fontWeight: 100 }}>Work</span>
                    </h2>
                </div>

                <div className="relative w-full max-w-7xl h-[65vh] flex justify-center items-center mt-10 perspective-[2000px]">
                    {/* Further Reduced height: h-[350px] md:h-[450px] */}
                    <div ref={centerCard} className="absolute w-[300px] md:w-[380px] h-[350px] md:h-[450px] z-10">
                        <CardContent project={projects[0]} index={0} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} elemRef={cardsRef} />
                    </div>
                    <div ref={leftCard} className="absolute w-[300px] md:w-[380px] h-[350px] md:h-[450px] z-20 transform -translate-x-4 md:-translate-x-12">
                        <CardContent project={projects[1]} index={1} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} elemRef={cardsRef} />
                    </div>
                    <div ref={rightCard} className="absolute w-[300px] md:w-[380px] h-[350px] md:h-[450px] z-30 transform translate-x-4 md:translate-x-12">
                        <CardContent project={projects[2]} index={2} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} elemRef={cardsRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const CardContent = ({ project, index, handleMouseEnter, handleMouseLeave, elemRef }: any) => {
    return (
        <article
            ref={el => { elemRef.current[index] = el; }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            tabIndex={0}
            className={`w-full h-full rounded-[1px] md:rounded-[4px] relative overflow-hidden bg-[#0c1f26] border border-white/5 flex flex-col justify-between group cursor-pointer`}
            style={{
                // Pure clean minimalist background - No complex gradients
                background: "#0c1f26",
            }}
        >
            {/* Top Bar: Ultra Clean Labels */}
            <div className="relative z-10 flex justify-between items-start p-6 md:p-8">
                <div className="flex flex-col gap-1">
                    <span className="font-de-valencia text-xl md:text-2xl text-[#2d936c] opacity-80">0{index + 1}</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium opacity-80">{project.category}</span>
                </div>

                {/* Minimal Arrow */}
                <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </div>
            </div>

            {/* Bottom Content: Type-Driven */}
            <div className="relative z-10 p-6 md:p-8 pt-0 mt-auto">
                <h3 className="text-3xl md:text-4xl font-normal text-white mb-3 tracking-tight">
                    {project.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed opacity-60 mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Tech Stack - Plain Text to reduce noise */}
                <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider text-white/40">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};
