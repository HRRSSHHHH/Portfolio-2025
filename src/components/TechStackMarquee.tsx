import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const techStack = [
    "React", "Three.js", "TypeScript", "Python-AI", "Design Systems", "Framer Motion", "Next.js", "Node.js"
];

export default function TechStackMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        // Clone content for seamless loop
        const content = marquee.innerHTML;
        marquee.innerHTML = content + content;

        const width = marquee.scrollWidth / 2;

        const tl = gsap.to(marquee, {
            x: -width,
            duration: 20,
            ease: "none",
            repeat: -1,
        });

        const handleMouseEnter = () => tl.timeScale(0.2); // Slow down on hover
        const handleMouseLeave = () => tl.timeScale(1);

        const wrapper = wrapperRef.current;
        if (wrapper) {
            wrapper.addEventListener('mouseenter', handleMouseEnter);
            wrapper.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            tl.kill();
            if (wrapper) {
                wrapper.removeEventListener('mouseenter', handleMouseEnter);
                wrapper.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full py-8 bg-[#e0e0e0] overflow-hidden border-b border-[#01161e]/10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#e0e0e0] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#e0e0e0] to-transparent z-10 pointer-events-none"></div>

            <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 px-8 items-center">
                {techStack.map((tech, i) => (
                    <span key={i} className="text-4xl md:text-5xl font-de-valencia text-[#01161e]/20 uppercase tracking-tight select-none hover:text-[#2d936c] transition-colors duration-300 cursor-default">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
