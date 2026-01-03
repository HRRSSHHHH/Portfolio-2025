import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemLabel from "./ui/SystemLabel";

gsap.registerPlugin(ScrollTrigger);

const aiTools = [
    "ChatGPT",
    "Claude",
    "Gemini",
    "MidJourney",
    "Stable Diffusion"
];

export default function AIToolsScroll() {
    const component = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".ai-tool-item");

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + (slider.current!.offsetWidth * 2),
                    markers: false
                }
            });
        }, component);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={component} className="relative w-full overflow-hidden bg-brand-card text-brand-light font-montserrat-alternates">

            {/* Header Section */}
            <div className="section-title text-center py-20 px-4">
                <h2 className="text-[12vw] md:text-[6vw] font-thin uppercase tracking-tighter text-brand-primary leading-none mb-4 font-de-valencia">
                    Skills
                </h2>
                <div className="w-16 h-[1px] bg-brand-primary/40 mx-auto mb-4" />
                <SystemLabel className="text-brand-primary opacity-70">
                    Capabilities & Tooling
                </SystemLabel>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={slider} className="h-screen flex items-center whitespace-nowrap overflow-hidden">
                {aiTools.map((tool, index) => (
                    <div
                        key={index}
                        className="ai-tool-item w-screen h-screen flex-shrink-0 flex flex-col justify-center items-center relative"
                    >
                        {/* Huge Background Number */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[25vw] font-de-valencia text-brand-primary opacity-[0.03] pointer-events-none select-none z-0">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>

                        {/* Main Tool Name */}
                        <div className="relative z-10 text-[12vw] md:text-[8vw] font-thin uppercase tracking-tight text-brand-light/90 hover:text-brand-primary transition-colors duration-500 cursor-default leading-none font-de-valencia">
                            {tool.split('\n').map((line, i) => (
                                <span key={i} className="block text-center">{line}</span>
                            ))}
                        </div>

                        {/* Decoration Line */}
                        <div className="w-24 h-[1px] bg-brand-light/10 mt-12" />
                    </div>
                ))}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-brand-card to-transparent pointer-events-none" />
        </div>
    );
}
