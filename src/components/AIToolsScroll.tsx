import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".ai-tool-item");

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
        // Consistent Dark Teal Background matching FeaturedProjects
        <div ref={component} className="relative w-full overflow-hidden bg-[#0c1f26] text-white font-montserrat-alternates">

            {/* Header Section */}
            <div className="section-title text-center py-20 px-4">
                <h2 className="text-[12vw] md:text-[6vw] font-thin uppercase tracking-tighter text-[#2d936c] leading-none mb-4" style={{ fontWeight: 100 }}>
                    Skills
                </h2>
                <div className="w-16 h-[1px] bg-[#2d936c]/40 mx-auto mb-4" />
                <p className="font-mono text-[#2d936c] text-xs md:text-sm tracking-[0.3em] uppercase opacity-70">
                    Capabilities & Tooling
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={slider} className="h-screen flex items-center whitespace-nowrap overflow-hidden">
                {aiTools.map((tool, index) => (
                    <div
                        key={index}
                        className="ai-tool-item w-screen h-screen flex-shrink-0 flex flex-col justify-center items-center relative"
                    >
                        {/* Huge Background Number - Premium De Valencia Watermark */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[25vw] font-de-valencia text-[#2d936c] opacity-[0.03] pointer-events-none select-none z-0">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>

                        {/* Main Tool Name - Sleek Thin Typography */}
                        <div className="relative z-10 text-[12vw] md:text-[8vw] font-thin uppercase tracking-tight text-white/90 hover:text-[#2d936c] transition-colors duration-500 cursor-default leading-none" style={{ fontWeight: 100 }}>
                            {tool.split('\n').map((line, i) => (
                                <span key={i} className="block text-center">{line}</span>
                            ))}
                        </div>

                        {/* Minimalist Decoration Line */}
                        <div className="w-24 h-[1px] bg-white/10 mt-12" />
                    </div>
                ))}
            </div>

            {/* Bottom Fade for smooth transition */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0c1f26] to-transparent pointer-events-none" />
        </div>
    );
}
