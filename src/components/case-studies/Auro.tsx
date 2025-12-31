import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Auro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const genesisRef = useRef<HTMLElement>(null);
    const researchRef = useRef<HTMLElement>(null);
    const ideationRef = useRef<HTMLElement>(null);
    const designRef = useRef<HTMLElement>(null);
    const productionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // 1. Hero Parallax
            gsap.to(".hero-img", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. Section Headers Reveal
            gsap.utils.toArray<HTMLElement>(".section-header").forEach(header => {
                gsap.from(header, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: header,
                        start: "top 80%"
                    }
                });
            });

            // 3. Stagger Lists (Role, Tools, Steps)
            gsap.utils.toArray<HTMLElement>(".stagger-list").forEach(list => {
                gsap.from(list.children, {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: list,
                        start: "top 75%"
                    }
                });
            });

        }, containerRef);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#01161e] text-[#e0e0e0] font-montserrat-alternates">

            {/* NAVIGATION HINT */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between mix-blend-difference pointer-events-none">
                <span className="font-de-valencia text-2xl text-white">AURO</span>
                <span className="font-mono text-xs uppercase tracking-widest text-white">Case Study 2024</span>
            </div>

            {/* --- 1. HERO: THE HOOK --- */}
            <section ref={heroRef} className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="hero-img absolute inset-0 bg-gradient-to-b from-[#0c1f26] to-[#01161e] z-0 opacity-80" />
                {/* Fallback for Cinematic Video */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d936c]/20 via-[#01161e]/80 to-[#01161e] z-0" />

                <div className="relative z-10 text-center flex flex-col items-center gap-6">
                    <div className="font-mono text-[#2d936c] tracking-[0.3em] text-xs uppercase mb-4">
                        Project ID: 02 / Sustainability
                    </div>
                    <h1 className="text-[12vw] md:text-[15vw] leading-[0.8] font-de-valencia text-[#e0e0e0] mix-blend-difference">
                        AURO
                    </h1>
                    <p className="font-light text-xl md:text-2xl mt-4 tracking-wide text-gray-400">
                        Can a game save the planet?
                    </p>
                </div>
            </section>

            {/* --- 2. THE GENESIS (CONTEXT & ROLE) --- */}
            <section ref={genesisRef} className="bg-[#e0e0e0] text-[#01161e] py-32 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-4 section-header">The Inciting Incident</span>
                        <h2 className="text-4xl md:text-6xl font-de-valencia mb-8 section-header">The Challenge</h2>
                        <p className="font-light text-xl leading-relaxed text-gray-800 mb-8">
                            For our "Design & Society" capstone, we were given a mission: <strong>Educate by Design.</strong><br />
                            We needed to address a societal issue not by preaching, but by designing a system that changes behavior.
                        </p>

                        <div className="stagger-list bg-[#d4d4d4] p-8 rounded-sm space-y-4">
                            <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b border-[#01161e]/20 pb-2">My Role: Lead Designer</h3>
                            <div className="flex justify-between items-center text-sm border-b border-[#01161e]/10 pb-2">
                                <span>Concept & Lore</span>
                                <span className="font-bold">Architected "The 5 Elements"</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-[#01161e]/10 pb-2">
                                <span>Scriptwriting</span>
                                <span className="font-bold">3-Act Trailer Narrative</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-[#01161e]/10 pb-2">
                                <span>Creative Direction</span>
                                <span className="font-bold">AI Prompt Engineering</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Final Edit</span>
                                <span className="font-bold">Adobe Premiere Pro</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end">
                        <div className="stagger-list grid grid-cols-2 gap-4">
                            <div className="bg-[#01161e] text-[#e0e0e0] p-6">
                                <span className="block text-xs text-[#2d936c] uppercase mb-1">Team Details</span>
                                <span className="text-2xl font-de-valencia">5 Students</span>
                            </div>
                            <div className="bg-[#01161e] text-[#e0e0e0] p-6">
                                <span className="block text-xs text-[#2d936c] uppercase mb-1">Timeline</span>
                                <span className="text-2xl font-de-valencia">8 Weeks</span>
                            </div>
                            <div className="col-span-2 bg-[#f5f5f5] p-6 border border-[#01161e]/10">
                                <span className="block text-xs text-gray-500 uppercase mb-2">Core Tool Stack</span>
                                <div className="flex flex-wrap gap-2">
                                    {["ChatGPT", "Midjourney", "Leonardo.ai", "ElevenLabs", "Premiere Pro"].map(tool => (
                                        <span key={tool} className="px-3 py-1 bg-[#01161e]/10 rounded-full text-xs font-mono">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. PHASE 1: THE ENQUIRY (THE ENEMY) --- */}
            <section ref={researchRef} className="bg-[#01161e] text-[#e0e0e0] py-32 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-4 section-header">Phase 1: Diagnosis</span>
                    <h2 className="text-4xl md:text-5xl font-de-valencia section-header">The Enemy: Eco-Anxiety</h2>
                    <p className="mt-6 text-gray-400 font-light leading-relaxed">
                        We researched why current sustainability education fails. The answer was <strong>Fear</strong>.<br />
                        Doom-scrolling and "The World is Ending" narratives cause paralysis, not action.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#0c1f26] p-12 rounded-sm border border-[#2d936c]/20">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">The Insight: Agency is Key</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            We analyzed the "Learning Pyramid". Traditional passive methods are ineffective for complex emotional topics.
                        </p>
                        <div className="space-y-4 font-mono text-sm">
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="w-24 text-right">Lecture</div>
                                <div className="flex-1 bg-[#01161e] h-2 rounded-full"><div className="w-[5%] bg-gray-600 h-full"></div></div>
                                <div className="w-12">5%</div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="w-24 text-right">Reading</div>
                                <div className="flex-1 bg-[#01161e] h-2 rounded-full"><div className="w-[10%] bg-gray-600 h-full"></div></div>
                                <div className="w-12">10%</div>
                            </div>
                            <div className="flex items-center gap-4 text-[#2d936c] font-bold text-lg scale-105 origin-left">
                                <div className="w-24 text-right">Simulation</div>
                                <div className="flex-1 bg-[#01161e] h-4 rounded-full"><div className="w-[90%] bg-[#2d936c] h-full shadow-[0_0_10px_#2d936c]"></div></div>
                                <div className="w-12">90%</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-[#2d936c]/20 pl-12 flex flex-col justify-center h-full">
                        <p className="text-2xl font-de-valencia italic leading-snug">
                            "To save the planet, the next generation doesn't need more facts. They need to feel they have the <span className="text-[#2d936c]">power to fix it</span>."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 4. PHASE 2: THE STRUGGLE (IDEATION) --- */}
            <section ref={ideationRef} className="bg-[#e0e0e0] text-[#01161e] py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-4 section-header">Phase 2: The Search</span>
                    <h2 className="text-4xl md:text-5xl font-de-valencia mb-16 section-header">Finding the "Fun" in Survival</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-list">
                        {/* Idea 1 */}
                        <div className="p-8 border border-gray-300 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono uppercase text-red-500 mb-2 block">Attempt 01</span>
                            <h3 className="font-bold text-xl mb-4 line-through decoration-red-500">Trash Collector</h3>
                            <p className="text-sm text-gray-600">
                                A mobile game where you pick up litter.
                                <br /><br />
                                <strong>Verdict:</strong> Failed. It felt like a chore, not a game.
                            </p>
                        </div>
                        {/* Idea 2 */}
                        <div className="p-8 border border-gray-300 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-mono uppercase text-red-500 mb-2 block">Attempt 02</span>
                            <h3 className="font-bold text-xl mb-4 line-through decoration-red-500">Eco City Builder</h3>
                            <p className="text-sm text-gray-600">
                                Managing resources and carbon taxes.
                                <br /><br />
                                <strong>Verdict:</strong> Failed. Too complex and "math-heavy" for kids.
                            </p>
                        </div>
                        {/* Idea 3 */}
                        <div className="p-8 bg-[#01161e] text-[#e0e0e0] transform scale-105 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-[#2d936c] text-xs font-bold uppercase">Winner</div>
                            <span className="text-xs font-mono uppercase text-[#2d936c] mb-2 block">The Pivot</span>
                            <h3 className="font-bold text-2xl font-de-valencia mb-4">AURO: The Adventure</h3>
                            <p className="text-sm text-gray-300">
                                An atmospheric journey where you don't fight monsters—you heal them.
                                <br /><br />
                                <strong>Core Emotion:</strong> Hope & Restoration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. PHASE 3: THE BLUEPRINT (DESIGN) --- */}
            <section ref={designRef} className="bg-[#0c1f26] text-[#e0e0e0] py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto mb-16">
                    <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-4 section-header">Phase 3: The Blueprint</span>
                    <h2 className="text-4xl md:text-5xl font-de-valencia section-header">Forging the Weapon</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-[#2d936c]">Design Decision #1: The Content</h3>
                        <p className="mb-4">We mapped real-world issues to 5 Distinct Biomes:</p>
                        <ul className="space-y-4 font-light text-sm text-gray-300 stagger-list">
                            <li className="flex gap-4"><span className="text-white font-bold w-20">Water</span> <span className="text-gray-500">&rarr;</span> Plastic Sea (Pollution)</li>
                            <li className="flex gap-4"><span className="text-white font-bold w-20">Air</span> <span className="text-gray-500">&rarr;</span> Smog Chasm (Emissions)</li>
                            <li className="flex gap-4"><span className="text-white font-bold w-20">Earth</span> <span className="text-gray-500">&rarr;</span> Scorched Lands (Deforestation)</li>
                            <li className="flex gap-4"><span className="text-white font-bold w-20">Fire</span> <span className="text-gray-500">&rarr;</span> Volcanic Forge (Warming)</li>
                            <li className="flex gap-4"><span className="text-white font-bold w-20">Space</span> <span className="text-gray-500">&rarr;</span> Cosmic Void (Debris)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-[#2d936c]">Design Decision #2: The Interface</h3>
                        <div className="bg-[#01161e] p-8 border border-[#2d936c]/20 rounded-lg">
                            <h4 className="font-mono uppercase text-xs mb-2">The "Diegetic" UI</h4>
                            <p className="text-sm text-gray-400 mb-6">
                                To keep kids immersed, we removed all floating numbers.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                                <li><strong>Health Bar:</strong> Integrated into the backpack as a battery.</li>
                                <li><strong>Powers:</strong> The "Elemental Conduit" gauntlet physically changes color (Blue for Water, Green for Earth).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Character Feature */}
                <div className="mt-24 border-t border-[#e0e0e0]/10 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="aspect-[3/4] bg-[#1a1a1a] relative group overflow-hidden border border-[#e0e0e0]/20">
                                <div className="absolute inset-0 flex items-center justify-center text-[#2d936c] opacity-20 text-6xl font-de-valencia group-hover:opacity-40 transition-opacity">
                                    [FIG_04]
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-2xl font-bold mb-6 text-[#2d936c]">Design Decision #3: The Hero</h3>
                            <p className="text-lg mb-4">Why does "Auro" have no face?</p>
                            <p className="font-light text-gray-400 leading-relaxed">
                                We purposefully designed Auro as a <strong>"Blank Canvas."</strong><br />
                                By obscuring facial features and using a gender-neutral silhouette, we allow <em>any</em> child—regardless of race or gender—to project themselves onto the hero.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 6. PHASE 4 & 5: THE PIVOT & ENGINE --- */}
            <section ref={productionRef} className="bg-[#e0e0e0] text-[#01161e] py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                        {/* The Pivot */}
                        <div className="md:col-span-4">
                            <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-4 section-header">Phase 4: The Pivot</span>
                            <h2 className="text-3xl font-bold mb-6">Scope Change</h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-8">
                                With only 8 weeks, coding a full game was impossible. We shifted our goal from a "Playable Demo" to a <strong>"Vertical Slice Trailer."</strong>
                                <br /><br />
                                This allowed us to focus purely on the <em>vision</em> and <em>narrative</em> without technical bottlenecks.
                            </p>
                        </div>

                        {/* The Engine */}
                        <div className="md:col-span-8 bg-[#f5f5f5] p-12 rounded-sm border border-[#01161e]/5">
                            <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-8">Phase 5: The Superpower</span>
                            <h2 className="text-4xl font-de-valencia mb-12">The AI Production Stack</h2>

                            <div className="grid grid-cols-2 gap-8 stagger-list">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">ChatGPT</h4>
                                    <p className="text-xs text-gray-500">Used for "Rhizomatic Storytelling" - generating deep lore for the Reclaimers and refining the 3-Act script.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Leonardo.ai / Midjourney</h4>
                                    <p className="text-xs text-gray-500">Generated high-fidelity textures for the 3D models and concept art to establish the "Cyber-Nature" aesthetic.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">ElevenLabs</h4>
                                    <p className="text-xs text-gray-500">Synthesized the voice of "Mother Earth" - creating an ancient, emotive narrator without hiring voice actors.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Adobe Premiere Pro</h4>
                                    <p className="text-xs text-gray-500">The assembly line. Stitching AI assets with orchestral scores to create the final cinematic experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 7. FINAL PRODUCTION (CLIMAX) --- */}
            <section className="bg-[#000] text-[#e0e0e0] py-40 flex flex-col items-center justify-center relative min-h-screen">
                <span className="font-mono text-[#2d936c] text-xs tracking-[0.2em] uppercase block mb-8">The Result</span>

                <div className="w-full max-w-6xl aspect-video bg-[#1a1a1a] relative border border-[#2d936c]/40 shadow-[0_0_100px_rgba(45,147,108,0.2)] flex items-center justify-center group overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2d936c_0%,_transparent_60%)] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />

                    <div className="z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full border border-[#e0e0e0] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer backdrop-blur-sm">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                        </div>
                        <span className="font-de-valencia text-2xl tracking-widest opacity-80">Watch Vertical Slice</span>
                    </div>
                </div>

                <div className="mt-24 max-w-3xl text-center px-6">
                    <h3 className="font-de-valencia text-2xl mb-6 text-[#2d936c]">Conclusion</h3>
                    <p className="font-light text-lg italic text-gray-400">
                        "AURO proved that with the right intent, a small team can produce 'AAA-quality' conceptual work.
                        We didn't just design a game; we designed a feeling of <span className="text-white not-italic">Agency</span>."
                    </p>
                </div>

                <div className="absolute bottom-12">
                    <span className="font-mono text-[10px] uppercase text-[#2d936c] cursor-pointer hover:underline">Back to Archives</span>
                </div>
            </section>
        </div>
    );
}
