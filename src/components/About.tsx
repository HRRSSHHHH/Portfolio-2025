import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx: gsap.Context;
        let isMounted = true;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            ctx = gsap.context(() => {
                // Header Animation
                const splitTitle = new SplitText(".hero-title", { type: "chars" });
                gsap.from(splitTitle.chars, {
                    opacity: 0,
                    y: 50,
                    rotateX: -90,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.out"
                });

                gsap.from(".hero-reveal", {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    delay: 0.5,
                    stagger: 0.2,
                    ease: "power3.out"
                });

                // Philosophy Section (Parallax Text)
                const philosophyTexts = gsap.utils.toArray(".philosophy-text");
                philosophyTexts.forEach((text: any) => {
                    gsap.from(text, {
                        opacity: 0.1,
                        y: 100,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: text,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1
                        }
                    });
                });

                // DNA Blueprint
                gsap.from(".dna-row", {
                    scaleX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: ".dna-section",
                        start: "top 70%"
                    }
                });

                gsap.from(".dna-content", {
                    opacity: 0,
                    x: -20,
                    duration: 0.8,
                    delay: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".dna-section",
                        start: "top 70%"
                    }
                });

            }, containerRef);
        });

        return () => {
            isMounted = false;
            ctx?.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-[#e0e0e0] min-h-screen text-[#01161e] font-montserrat-alternates pt-32 pb-20 relative overflow-hidden">

            {/* 1. THE CORE: Header */}
            <header className="max-w-7xl mx-auto px-6 md:px-12 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left: The Manifesto */}
                    <div className="order-2 md:order-1">
                        <div className="flex items-center gap-4 text-[#2d936c] font-mono text-xs tracking-[0.2em] uppercase hero-reveal mb-8">
                            <span>The Core</span>
                            <span className="w-12 h-[1px] bg-[#2d936c]" />
                            <span>About Me</span>
                        </div>
                        <h1 className="hero-title text-[12vw] md:text-[6.5vw] leading-[1.1] font-de-valencia text-[#01161e] mb-8">
                            Harsh <br /> <span className="text-[#2d936c]">Sharma.</span>
                        </h1>
                        <p className="hero-reveal text-xl md:text-2xl font-light leading-relaxed text-gray-700 max-w-lg">
                            I don’t just build software. I build for the human on the other side of the screen.
                        </p>
                    </div>

                    {/* Right: The Portrait (Conceptual) */}
                    <div className="order-1 md:order-2 hero-reveal relative group cursor-crosshair">
                        <div className="aspect-[3/4] bg-[#01161e] relative overflow-hidden">
                            {/* Placeholder for Face */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#01161e] to-[#2d936c] opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-de-valencia text-9xl text-[#e0e0e0]/10 group-hover:text-[#e0e0e0]/20 transition-colors duration-500">ME</span>
                            </div>

                            {/* Glitch Overlay */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 font-mono text-xs text-[#2d936c] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            System_ID: 001
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. THE PHILOSOPHY (Scroll) */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 mb-40">
                <div className="flex flex-col gap-32">
                    <div className="philosophy-text text-4xl md:text-6xl font-de-valencia leading-tight">
                        <span className="text-[#2d936c]">01.</span> Complexity must be reduced to simplicity, not hidden.
                    </div>
                    <div className="philosophy-text text-4xl md:text-6xl font-de-valencia leading-tight pl-0 md:pl-20 text-right">
                        <span className="text-[#2d936c]">02.</span> Code is the new clay. Use it to sculpt experience.
                    </div>
                    <div className="philosophy-text text-4xl md:text-6xl font-de-valencia leading-tight">
                        <span className="text-[#2d936c]">03.</span> AI is the bicycle for the mind. I pedal fast.
                    </div>
                </div>
            </section>

            {/* 3. THE DNA BLUEPRINT */}
            <section className="dna-section max-w-7xl mx-auto px-6 md:px-12 mb-40">
                <div className="border-t border-[#01161e] pt-4 mb-12 flex justify-between items-end">
                    <h2 className="text-4xl font-de-valencia">The Blueprint</h2>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#2d936c] hidden md:block">System Specs</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 font-mono text-sm uppercase max-w-4xl">
                    {[
                        { label: "Location", value: "San Francisco, CA" },
                        { label: "Obsessions", value: "Grid Systems, Espresso, Lo-Fi" },
                        { label: "Education", value: "B.S. Computer Science" },
                        { label: "Design Tool", value: "Figma (Auto Layout Master)" },
                        { label: "Code Editor", value: "VS Code (Vim Mode)" },
                        { label: "Current Read", value: "The Design of Everyday Things" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-baseline justify-between py-4 border-b border-[#01161e]/10 dna-row relative">
                            <span className="text-gray-500 dna-content">{item.label}</span>
                            <span className="text-[#01161e] font-bold dna-content">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. TEAM FIT DIAGRAM (Conceptual) */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
                <div className="bg-[#01161e] text-[#e0e0e0] p-12 md:p-24 relative overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: `linear-gradient(#2d936c 1px, transparent 1px), linear-gradient(90deg, #2d936c 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-de-valencia mb-8">The Missing Piece.</h2>
                            <p className="text-xl font-light leading-relaxed text-gray-400 mb-12">
                                I sit at the intersection of Design, Engineering, and Product.
                                I don't just hand off designs; I ship them.
                            </p>
                            <a href="mailto:hello@example.com" className="inline-block border border-[#2d936c] text-[#2d936c] px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#2d936c] hover:text-white transition-all duration-300">
                                Initiate Contact
                            </a>
                        </div>

                        {/* Diagram Visual */}
                        <div className="relative h-64 md:h-full flex items-center justify-center">
                            <div className="absolute w-40 h-40 border border-[#2d936c]/30 rounded-full flex items-center justify-center text-[#2d936c]/30 font-mono text-xs -translate-x-10 -translate-y-6">Design</div>
                            <div className="absolute w-40 h-40 border border-[#2d936c]/30 rounded-full flex items-center justify-center text-[#2d936c]/30 font-mono text-xs translate-x-10 -translate-y-6">Code</div>
                            <div className="absolute w-40 h-40 border border-[#2d936c]/30 rounded-full flex items-center justify-center text-[#2d936c]/30 font-mono text-xs translate-y-12">Product</div>
                            <div className="absolute w-4 h-4 bg-[#e0e0e0] rounded-full shadow-[0_0_20px_#2d936c]" />
                            <div className="absolute mt-8 text-[#e0e0e0] font-de-valencia text-xl">ME</div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
