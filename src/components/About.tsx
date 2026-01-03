import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./ui/SectionHeader";
import SystemLabel from "./ui/SystemLabel";
import BrandButton from "./ui/BrandButton";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx: gsap.Context;
        let isMounted = true;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            ctx = gsap.context(() => {
                // Initial Reveal Animation
                gsap.from(".reveal-item", {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                });

                // Strategies Section (card-reveal animation)
                gsap.from(".card-reveal", {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".strategies-section",
                        start: "top 70%",
                        toggleActions: "play none none none"
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
        <div ref={containerRef} className="min-h-screen blueprint-bg pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* 1. THE CORE: Header */}
                <header className="mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left: The Manifesto */}
                        <div className="order-2 md:order-1 reveal-item">
                            <SectionHeader
                                label="The Blueprint"
                                title={<>The Intelligence <br />Behind the <span className="text-brand-primary">Design.</span></>}
                                description="Crafting more than just interfaces. I architect systems that bridge the gap between human curiosity and machinic precision."
                                light
                            />
                        </div>

                        {/* Right: The Portrait (Conceptual) */}
                        <div className="order-1 md:order-2 reveal-item relative group cursor-crosshair">
                            <div className="aspect-[3/4] bg-brand-dark relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-brand-primary opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-de-valencia text-9xl text-brand-light/10 group-hover:text-brand-light/20 transition-colors duration-500">ME</span>
                                </div>
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 font-consolas text-xs text-brand-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                System_ID: 001
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. THE STRATEGIES */}
                <section className="strategies-section mb-40">
                    <SectionHeader
                        label="My Approach"
                        title={<>Strategies for <br /><span className="text-brand-primary">Impact.</span></>}
                        description="I combine a product-first mindset with technical precision and a forward-looking embrace of AI to deliver exceptional digital experiences."
                        light
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        {/* Strategy 1 */}
                        <div className="relative group p-10 border border-brand-dark/10 hover:border-brand-primary transition-all duration-500 hover:shadow-2xl bg-white/40 backdrop-blur-sm card-reveal">
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <SystemLabel>01</SystemLabel>
                                    <h3 className="text-4xl font-de-valencia text-brand-dark mt-4">Product <br />Mindset.</h3>
                                    <div className="absolute top-0 right-0 p-8 text-7xl font-de-valencia text-brand-dark/10">01</div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-brand-dark/80 font-light leading-relaxed mb-6 font-montserrat-alternates">
                                        I treat every design as a business hypothesis. By analyzing user behavior through the lens of psychology and data, I build products that don't just look premium but solve critical conversion and engagement problems.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["User Research", "MVP Strategy", "Data Analytics"].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-dark/5 rounded-none text-[10px] font-consolas uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strategy 2 */}
                        <div className="relative group p-10 border border-brand-dark/10 hover:border-brand-primary transition-all duration-500 hover:shadow-2xl bg-white/40 backdrop-blur-sm card-reveal">
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <SystemLabel>02</SystemLabel>
                                    <h3 className="text-4xl font-de-valencia text-brand-dark mt-4">Technical <br />Precision.</h3>
                                    <div className="absolute top-0 right-0 p-8 text-7xl font-de-valencia text-brand-dark/20">02</div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-brand-dark/80 font-light leading-relaxed mb-6 font-montserrat-alternates">
                                        Design shouldn't be a bottleneck for engineering. I write clean, performant React and Three.js code, ensuring the transition from Figma to production is lossless in both quality and performance.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["React/TS", "Three.js", "GSAP"].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-dark/5 rounded-none text-[10px] font-consolas uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strategy 3 */}
                        <div className="relative group p-10 bg-brand-dark text-brand-light shadow-2xl card-reveal overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-brand-primary text-brand-dark text-[10px] font-bold uppercase tracking-tighter">Current Mastery</div>
                            <div className="flex flex-col h-full justify-between relative z-10">
                                <div>
                                    <SystemLabel>03</SystemLabel>
                                    <h3 className="text-4xl font-de-valencia mt-4">AI <br />Integration.</h3>
                                    <div className="absolute top-0 right-0 p-8 text-7xl font-de-valencia text-brand-light/10">03</div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-gray-400 font-light leading-relaxed mb-6 font-montserrat-alternates">
                                        The next frontier of UX is generative. I specialize in designing fluid, ethical AI interactions that feel natural and enhance human capability rather than replacing it.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["LLM UX", "Prompt Eng.", "Stability AI"].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-light/10 rounded-none text-[10px] font-consolas uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary rounded-full blur-[80px] opacity-20" />
                        </div>
                    </div>
                </section>

                {/* 3. The CTA Reveal */}
                <section className="mt-40 border-t border-brand-dark/10 pt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="max-w-xl">
                        <h4 className="font-de-valencia text-4xl mb-6 text-brand-dark">Ready to build the <br />future?</h4>
                        <p className="text-brand-dark/60 font-consolas text-sm">
                            I am currently open to high-impact collaborations where design meets deep tech.
                        </p>
                    </div>
                    <BrandButton variant="primary" theme="light" className="px-10 py-5">
                        Initiate Connection
                    </BrandButton>
                </section>
            </div>
        </div>
    );
}
