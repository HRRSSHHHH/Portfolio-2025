import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemLabel from "../ui/SystemLabel";

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
        const ctx = gsap.context(() => {

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
        <div ref={containerRef} className="min-h-screen bg-brand-dark text-brand-light font-montserrat-alternates">

            {/* NAVIGATION HINT */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between mix-blend-difference pointer-events-none">
                <span className="font-de-valencia text-2xl text-brand-white">AURO</span>
                <SystemLabel className="text-brand-white">Case Study 2024</SystemLabel>
            </div>

            {/* --- 1. HERO: THE HOOK --- */}
            <section ref={heroRef} className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="hero-img absolute inset-0 bg-gradient-to-b from-brand-card to-brand-dark z-0 opacity-80" />
                {/* Fallback for Cinematic Video */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-brand-dark/80 to-brand-dark z-0" />

                <div className="relative z-10 text-center flex flex-col items-center gap-6">
                    <SystemLabel className="text-brand-primary mb-4">
                        Project ID: 02 / Sustainability
                    </SystemLabel>
                    <h1 className="text-[12vw] md:text-[15vw] leading-[0.8] font-de-valencia text-brand-light mix-blend-difference">
                        AURO
                    </h1>
                    <p className="font-light text-xl md:text-2xl mt-4 tracking-wide text-brand-light/40">
                        Can a game save the planet?
                    </p>
                </div>
            </section>

            {/* --- 2. THE GENESIS (CONTEXT & ROLE) --- */}
            <section ref={genesisRef} className="blueprint-bg text-brand-dark py-32 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <SystemLabel className="text-brand-primary mb-4 section-header">The Inciting Incident</SystemLabel>
                        <h2 className="text-4xl md:text-6xl font-de-valencia mb-8 section-header">The Challenge</h2>
                        <p className="font-light text-xl leading-relaxed text-brand-dark/80 mb-8">
                            For our "Design & Society" capstone, we were given a mission: <strong>Educate by Design.</strong><br />
                            We needed to address a societal issue not by preaching, but by designing a system that changes behavior.
                        </p>

                        <div className="stagger-list bg-brand-dark/5 p-8 rounded-sm space-y-4">
                            <h3 className="font-consolas font-bold text-lg uppercase tracking-wider mb-4 border-b border-brand-dark/20 pb-2">My Role: Lead Designer</h3>
                            <div className="flex justify-between items-center text-sm border-b border-brand-dark/10 pb-2">
                                <span>Concept & Lore</span>
                                <span className="font-bold">Architected "The 5 Elements"</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-brand-dark/10 pb-2">
                                <span>Scriptwriting</span>
                                <span className="font-bold">3-Act Trailer Narrative</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-brand-dark/10 pb-2">
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
                            <div className="bg-brand-dark text-brand-light p-6">
                                <SystemLabel className="text-brand-primary mb-1">Team Details</SystemLabel>
                                <span className="text-2xl font-de-valencia">5 Students</span>
                            </div>
                            <div className="bg-brand-dark text-brand-light p-6">
                                <SystemLabel className="text-brand-primary mb-1">Timeline</SystemLabel>
                                <span className="text-2xl font-de-valencia">8 Weeks</span>
                            </div>
                            <div className="col-span-2 bg-brand-white/50 p-6 border border-brand-dark/10">
                                <SystemLabel className="text-brand-dark/40 mb-2">Core Tool Stack</SystemLabel>
                                <div className="flex flex-wrap gap-2">
                                    {["ChatGPT", "Midjourney", "Leonardo.ai", "ElevenLabs", "Premiere Pro"].map(tool => (
                                        <SystemLabel key={tool} className="px-3 py-1 bg-brand-dark/10 rounded-none border border-brand-dark/10">{tool}</SystemLabel>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. PHASE 1: THE ENQUIRY (THE ENEMY) --- */}
            <section ref={researchRef} className="bg-brand-dark text-brand-light py-32 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <SystemLabel className="text-brand-primary mb-4 section-header">Phase 1: Diagnosis</SystemLabel>
                    <h2 className="text-4xl md:text-5xl font-de-valencia section-header">The Enemy: Eco-Anxiety</h2>
                    <p className="mt-6 text-brand-light/40 font-light leading-relaxed">
                        We researched why current sustainability education fails. The answer was <strong>Fear</strong>.<br />
                        Doom-scrolling and "The World is Ending" narratives cause paralysis, not action.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-brand-card p-12 rounded-sm border border-brand-primary/20">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">The Insight: Agency is Key</h3>
                        <p className="text-sm text-brand-light/40 mb-6 font-montserrat-alternates">
                            We analyzed the "Learning Pyramid". Traditional passive methods are ineffective for complex emotional topics.
                        </p>
                        <div className="space-y-4 font-consolas text-sm">
                            <div className="flex items-center gap-4 text-brand-light/20">
                                <div className="w-24 text-right">Lecture</div>
                                <div className="flex-1 bg-brand-dark h-2 rounded-none"><div className="w-[5%] bg-brand-light/20 h-full"></div></div>
                                <div className="w-12">5%</div>
                            </div>
                            <div className="flex items-center gap-4 text-brand-light/20">
                                <div className="w-24 text-right">Reading</div>
                                <div className="flex-1 bg-brand-dark h-2 rounded-none"><div className="w-[10%] bg-brand-light/20 h-full"></div></div>
                                <div className="w-12">10%</div>
                            </div>
                            <div className="flex items-center gap-4 text-brand-primary font-bold text-lg scale-105 origin-left">
                                <div className="w-24 text-right">Simulation</div>
                                <div className="flex-1 bg-brand-dark h-4 rounded-none"><div className="w-[90%] bg-brand-primary h-full shadow-[0_0_10px_var(--color-brand-primary)]"></div></div>
                                <div className="w-12">90%</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-brand-primary/20 pl-12 flex flex-col justify-center h-full">
                        <p className="text-2xl font-de-valencia italic leading-snug">
                            "To save the planet, the next generation doesn't need more facts. They need to feel they have the <span className="text-brand-primary">power to fix it</span>."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 4. PHASE 2: THE STRUGGLE (IDEATION) --- */}
            <section ref={ideationRef} className="blueprint-bg text-brand-dark py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <SystemLabel className="text-brand-primary mb-4 section-header">Phase 2: The Search</SystemLabel>
                    <h2 className="text-4xl md:text-5xl font-de-valencia mb-16 section-header">Finding the "Fun" in Survival</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-list">
                        {/* Idea 1 */}
                        <div className="p-8 border border-brand-dark/20 opacity-60 hover:opacity-100 transition-opacity">
                            <SystemLabel className="text-brand-accent mb-2 block">Attempt 01</SystemLabel>
                            <h3 className="font-bold text-xl mb-4 line-through decoration-brand-accent">Trash Collector</h3>
                            <p className="text-sm text-brand-dark/60 font-montserrat-alternates">
                                A mobile game where you pick up litter.
                                <br /><br />
                                <strong>Verdict:</strong> Failed. It felt like a chore, not a game.
                            </p>
                        </div>
                        {/* Idea 2 */}
                        <div className="p-8 border border-brand-dark/20 opacity-60 hover:opacity-100 transition-opacity">
                            <SystemLabel className="text-brand-accent mb-2 block">Attempt 02</SystemLabel>
                            <h3 className="font-bold text-xl mb-4 line-through decoration-brand-accent">Eco City Builder</h3>
                            <p className="text-sm text-brand-dark/60 font-montserrat-alternates">
                                Managing resources and carbon taxes.
                                <br /><br />
                                <strong>Verdict:</strong> Failed. Too complex and "math-heavy" for kids.
                            </p>
                        </div>
                        {/* Idea 3 */}
                        <div className="p-8 bg-brand-dark text-brand-light transform scale-105 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-brand-primary text-xs font-bold uppercase font-consolas text-brand-dark">Winner</div>
                            <SystemLabel className="text-brand-primary mb-2 block">The Pivot</SystemLabel>
                            <h3 className="font-bold text-2xl font-de-valencia mb-4">AURO: The Adventure</h3>
                            <p className="text-sm text-brand-light/60 font-montserrat-alternates">
                                An atmospheric journey where you don't fight monsters—you heal them.
                                <br /><br />
                                <strong>Core Emotion:</strong> Hope & Restoration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. PHASE 3: THE BLUEPRINT (DESIGN) --- */}
            <section ref={designRef} className="bg-brand-card text-brand-light py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto mb-16">
                    <SystemLabel className="text-brand-primary mb-4 section-header">Phase 3: The Blueprint</SystemLabel>
                    <h2 className="text-4xl md:text-5xl font-de-valencia section-header">Forging the Weapon</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-brand-primary">Design Decision #1: The Content</h3>
                        <p className="mb-4 font-montserrat-alternates">We mapped real-world issues to 5 Distinct Biomes:</p>
                        <ul className="space-y-4 font-light text-sm text-brand-light/60 stagger-list font-montserrat-alternates">
                            <li className="flex gap-4"><span className="text-brand-white font-bold w-20">Water</span> <span className="text-brand-light/20">&rarr;</span> Plastic Sea (Pollution)</li>
                            <li className="flex gap-4"><span className="text-brand-white font-bold w-20">Air</span> <span className="text-brand-light/20">&rarr;</span> Smog Chasm (Emissions)</li>
                            <li className="flex gap-4"><span className="text-brand-white font-bold w-20">Earth</span> <span className="text-brand-light/20">&rarr;</span> Scorched Lands (Deforestation)</li>
                            <li className="flex gap-4"><span className="text-brand-white font-bold w-20">Fire</span> <span className="text-brand-light/20">&rarr;</span> Volcanic Forge (Warming)</li>
                            <li className="flex gap-4"><span className="text-brand-white font-bold w-20">Space</span> <span className="text-brand-light/20">&rarr;</span> Cosmic Void (Debris)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-brand-primary">Design Decision #2: The Interface</h3>
                        <div className="bg-brand-dark p-8 border border-brand-primary/20 rounded-lg">
                            <SystemLabel className="mb-2">The "Diegetic" UI</SystemLabel>
                            <p className="text-sm text-brand-light/40 mb-6 font-montserrat-alternates">
                                To keep kids immersed, we removed all floating numbers.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-brand-light/60 font-montserrat-alternates">
                                <li><strong>Health Bar:</strong> Integrated into the backpack as a battery.</li>
                                <li><strong>Powers:</strong> The "Elemental Conduit" gauntlet physically changes color (Blue for Water, Green for Earth).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Character Feature */}
                <div className="mt-24 border-t border-brand-light/10 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="aspect-[3/4] bg-brand-dark/50 relative group overflow-hidden border border-brand-light/20">
                                <div className="absolute inset-0 flex items-center justify-center text-brand-primary opacity-20 text-6xl font-de-valencia group-hover:opacity-40 transition-opacity">
                                    [FIG_04]
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-2xl font-bold mb-6 text-brand-primary">Design Decision #3: The Hero</h3>
                            <p className="text-lg mb-4 font-montserrat-alternates font-medium">Why does "Auro" have no face?</p>
                            <p className="font-light text-brand-light/40 leading-relaxed font-montserrat-alternates">
                                We purposefully designed Auro as a <strong>"Blank Canvas."</strong><br />
                                By obscuring facial features and using a gender-neutral silhouette, we allow <em>any</em> child—regardless of race or gender—to project themselves onto the hero.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 6. PHASE 4 & 5: THE PIVOT & ENGINE --- */}
            <section ref={productionRef} className="blueprint-bg text-brand-dark py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                        {/* The Pivot */}
                        <div className="md:col-span-4">
                            <SystemLabel className="text-brand-primary mb-4 section-header">Phase 4: The Pivot</SystemLabel>
                            <h2 className="text-3xl font-bold mb-6 font-de-valencia">Scope Change</h2>
                            <p className="text-sm text-brand-dark/60 leading-relaxed mb-8 font-montserrat-alternates">
                                With only 8 weeks, coding a full game was impossible. We shifted our goal from a "Playable Demo" to a <strong>"Vertical Slice Trailer."</strong>
                                <br /><br />
                                This allowed us to focus purely on the <em>vision</em> and <em>narrative</em> without technical bottlenecks.
                            </p>
                        </div>

                        {/* The Engine */}
                        <div className="md:col-span-8 bg-brand-white/50 p-12 rounded-sm border border-brand-dark/5">
                            <SystemLabel className="text-brand-primary mb-8">Phase 5: The Superpower</SystemLabel>
                            <h2 className="text-4xl font-de-valencia mb-12">The AI Production Stack</h2>

                            <div className="grid grid-cols-2 gap-8 stagger-list">
                                <div>
                                    <h4 className="font-bold text-lg mb-2 font-consolas">ChatGPT</h4>
                                    <p className="text-xs text-brand-dark/40 font-montserrat-alternates">Used for "Rhizomatic Storytelling" - generating deep lore for the Reclaimers and refining the 3-Act script.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 font-consolas">Leonardo.ai / Midjourney</h4>
                                    <p className="text-xs text-brand-dark/40 font-montserrat-alternates">Generated high-fidelity textures for the 3D models and concept art to establish the "Cyber-Nature" aesthetic.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 font-consolas">ElevenLabs</h4>
                                    <p className="text-xs text-brand-dark/40 font-montserrat-alternates">Synthesized the voice of "Mother Earth" - creating an ancient, emotive narrator without hiring voice actors.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 font-consolas">Adobe Premiere Pro</h4>
                                    <p className="text-xs text-brand-dark/40 font-montserrat-alternates">The assembly line. Stitching AI assets with orchestral scores to create the final cinematic experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 7. FINAL PRODUCTION (CLIMAX) --- */}
            <section className="bg-black text-brand-light py-40 flex flex-col items-center justify-center relative min-h-screen">
                <SystemLabel className="text-brand-primary mb-8">The Result</SystemLabel>

                <div className="w-full max-w-6xl aspect-video bg-brand-dark relative border border-brand-primary/40 shadow-[0_0_100px_rgba(var(--color-brand-primary-rgb),0.2)] flex items-center justify-center group overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-primary)_0%,_transparent_60%)] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />

                    <div className="z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-none border border-brand-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer backdrop-blur-sm">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-brand-white border-b-[10px] border-b-transparent ml-1" />
                        </div>
                        <span className="font-de-valencia text-2xl tracking-widest opacity-80">Watch Vertical Slice</span>
                    </div>
                </div>

                <div className="mt-24 max-w-3xl text-center px-6">
                    <h3 className="font-de-valencia text-2xl mb-6 text-brand-primary">Conclusion</h3>
                    <p className="font-light text-lg italic text-brand-light/40 font-montserrat-alternates">
                        "AURO proved that with the right intent, a small team can produce 'AAA-quality' conceptual work.
                        We didn't just design a game; we designed a feeling of <span className="text-brand-white not-italic">Agency</span>."
                    </p>
                </div>

                <div className="absolute bottom-12">
                    <SystemLabel className="cursor-pointer hover:underline text-brand-primary">Back to Archives</SystemLabel>
                </div>
            </section>
        </div>
    );
}
