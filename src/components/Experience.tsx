import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemLabel from "./ui/SystemLabel";
import { THEME } from "../constants/ThemeConstants";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
    {
        id: "01",
        year: "2023 - Present",
        title: "Founding Engineer",
        org: "Stealth Startup",
        description: "Building the core design system and frontend architecture. Working directly with founders to iterate on product strategy.",
        type: "work"
    },
    {
        id: "02",
        year: "2021 - 2023",
        title: "Senior Frontend Engineer",
        org: "Tech Giants Inc.",
        description: "Led development of high-performance dashboards. Improved load times by 40% and established new code quality standards.",
        type: "work"
    },
    {
        id: "03",
        year: "2020",
        title: "Master of Interaction Design",
        org: "Design Institute",
        description: "Focus on human-computer interaction and spatial computing interfaces.",
        type: "edu"
    },
    {
        id: "04",
        year: "2016 - 2020",
        title: "B.S. Computer Science",
        org: "University of Tech",
        description: "Major in Systems Programming with a minor in Visual Arts.",
        type: "edu"
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Line Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                }
            });

            // Draw the line
            tl.fromTo(lineRef.current,
                { strokeDasharray: 2000, strokeDashoffset: 2000 },
                { strokeDashoffset: 0, ease: "none" }
            );

            // Nodes & Cards Animation
            nodesRef.current.forEach((node, i) => {
                if (!node) return;

                // Animate Node
                gsap.fromTo(node,
                    { autoAlpha: 0.2, scale: 0.5, borderColor: THEME.secondary },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        borderColor: THEME.primary,
                        backgroundColor: THEME.card,
                        boxShadow: `0 0 20px ${THEME.primary}44`,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: node,
                            start: "top 60%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );

                // Animate Card Entry
                const card = cardsRef.current[i];
                if (card) {
                    gsap.fromTo(card,
                        { autoAlpha: 0, x: i % 2 === 0 ? -50 : 50 },
                        {
                            autoAlpha: 1,
                            x: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: node,
                                start: "top 65%",
                            }
                        }
                    );
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="interface-bg py-32 overflow-hidden font-montserrat-alternates relative">

            {/* Header */}
            <div className="text-center mb-32 relative z-10 px-4">
                <h2 className="text-[10vw] md:text-[8vw] font-thin tracking-tighter uppercase text-brand-light leading-[0.9] select-none font-de-valencia">
                    The <br /> <span className="text-brand-primary font-normal">Trajectory</span>
                </h2>
                <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
                    <div className="h-[1px] w-12 bg-brand-primary"></div>
                    <SystemLabel className="text-brand-primary">Experience & Education</SystemLabel>
                    <div className="h-[1px] w-12 bg-brand-primary"></div>
                </div>
            </div>

            <div ref={triggerRef} className="relative max-w-5xl mx-auto flex flex-col items-center">

                {/* Central Line SVG */}
                <svg className="absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2 h-full z-0 overflow-visible">
                    <path
                        ref={lineRef}
                        d="M 1 0 V 2000"
                        fill="none"
                        stroke={THEME.primary}
                        strokeWidth="2"
                        className="opacity-100"
                    />
                    <path d="M 1 0 V 2000" fill="none" stroke={THEME.primary} strokeWidth="2" className="opacity-10" />
                </svg>

                {/* Timeline Items */}
                <div className="w-full relative z-10 flex flex-col gap-24 md:gap-40 pb-20">
                    {experienceData.map((item, index) => (
                        <div key={item.id} className={`flex w-full items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative group`}>

                            {/* Content Card Side */}
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 md:pr-24 text-right' : 'pl-12 md:pl-24 text-left'}`}>
                                <div
                                    ref={el => { cardsRef.current[index] = el; }}
                                    className="relative group-hover:-translate-y-1 transition-transform duration-500"
                                >
                                    <h3 className="text-2xl md:text-4xl font-light text-brand-light mb-2 font-montserrat-alternates">{item.title}</h3>
                                    <div className={`flex flex-col gap-1 ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                        <SystemLabel className="text-brand-primary opacity-90">{item.org}</SystemLabel>
                                        <SystemLabel className="text-brand-light/40 md:hidden">{item.year}</SystemLabel>
                                    </div>
                                    <p className="text-brand-light/60 font-light text-sm leading-relaxed max-w-md mt-4 font-montserrat-alternates ml-auto mr-auto lg:mx-0">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Central Node */}
                            <div
                                ref={el => { nodesRef.current[index] = el; }}
                                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-brand-primary bg-brand-dark z-20 flex items-center justify-center p-1 shadow-2xl"
                            >
                                <div className="w-full h-full bg-brand-primary rounded-full opacity-0" />
                            </div>

                            {/* Date Side (Desktop) */}
                            <div className={`w-1/2 hidden md:block ${index % 2 === 0 ? 'pl-12 md:pl-24 text-left' : 'pr-12 md:pr-24 text-right'}`}>
                                <SystemLabel className="text-brand-light/40">{item.year}</SystemLabel>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
