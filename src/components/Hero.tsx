import { motion } from 'framer-motion';

interface HeroProps { }

export default function Hero({ }: HeroProps) {

    return (
        <motion.section
            className="absolute inset-0 h-dvh flex flex-col items-center justify-center z-10 pointer-events-none select-none overflow-hidden"
        >

            {/* --- HUD LAYER --- */}

            {/* Top Left: Specialization */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="absolute top-28 left-10 md:top-12 md:left-12 flex flex-col items-start gap-1 font-['Consolas'] text-[#01161e] text-[10px] md:text-xs tracking-widest opacity-60"
            >
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2d936c] rounded-full animate-pulse"></span>
                    <span>FOCUS: AI optimized UX</span>
                </div>
                <span>FIELD: UX</span>
            </motion.div>

            {/* Top Right: Status & Location */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute top-28 right-10 md:top-12 md:right-12 flex flex-col items-end gap-2"
            >
                <div className="flex items-center gap-2 font-['Consolas'] text-[#2d936c] text-[10px] md:text-xs tracking-widest pointer-events-auto">
                    <span>STATUS: OPEN TO ROLES</span>
                    <div className="w-1.5 h-1.5 bg-[#2d936c]"></div>
                </div>
                <div className="font-['Consolas'] text-[#01161e] text-[10px] md:text-xs tracking-widest opacity-60">
                    LOC: GLOBAL / REMOTE
                </div>
            </motion.div>

            {/* Bottom Left: Education - Hidden on mobile, visible on desktop */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="absolute bottom-6 left-6 md:bottom-12 md:left-12 font-['Consolas'] text-[#01161e] text-[10px] md:text-xs tracking-widest opacity-60 hidden md:block"
            >
                DEGREE: B.DES<br />
                INSTITUTE: NIFT
            </motion.div>

            {/* Corner Guides - Thinner and tighter on mobile */}
            <div className="absolute top-24 left-6 w-3 h-[1px] bg-[#01161e]/20 md:w-4 md:top-8 md:left-8"></div>
            <div className="absolute top-24 left-6 w-[1px] h-3 bg-[#01161e]/20 md:h-4 md:top-8 md:left-8"></div>

            <div className="absolute top-24 right-6 w-3 h-[1px] bg-[#01161e]/20 md:w-4 md:top-8 md:right-8"></div>
            <div className="absolute top-24 right-6 w-[1px] h-3 bg-[#01161e]/20 md:h-4 md:top-8 md:right-8"></div>

            <div className="absolute bottom-6 left-6 w-3 h-[1px] bg-[#01161e]/20 md:w-4 md:bottom-8 md:left-8"></div>
            <div className="absolute bottom-6 left-6 w-[1px] h-3 bg-[#01161e]/20 md:h-4 md:bottom-8 md:left-8"></div>

            <div className="absolute bottom-6 right-6 w-3 h-[1px] bg-[#01161e]/20 md:w-4 md:bottom-8 md:right-8"></div>
            <div className="absolute bottom-6 right-6 w-[1px] h-3 bg-[#01161e]/20 md:h-4 md:bottom-8 md:right-8"></div>


            {/* --- MAIN CONTENT --- */}
            <div className="text-center space-y-4 md:space-y-6 mix-blend-difference text-[#01161e] relative z-20 px-8 md:px-0">

                {/* Identity / Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-['Consolas'] text-[#2d936c] text-[12px] md:text-[14px] tracking-[0.1em] font-medium mb-1 md:mb-2 uppercase"
                >
                    This is <span className="font-bold">HARSH</span> and I am
                </motion.p>

                {/* Headline - Scaled for Mobile Impact */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="font-de-valencia text-[15vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-[#2d936c] tracking-tight"
                    >
                        Designing
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                        className="font-de-valencia text-[15vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] text-[#2d936c] tracking-tight"
                    >
                        Intelligence
                    </motion.h1>
                </div>

                {/* Sub-headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex items-center justify-center gap-3 md:gap-4 font-montserrat-alternates text-[#01161e] text-xs md:text-sm lg:text-base tracking-[0.2em] uppercase font-medium mt-6 md:mt-8"
                >
                    <span className="opacity-80">Product Designer</span>
                </motion.div>
            </div>

            {/* CTA - Repositioned for touch */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-20 md:bottom-12 pointer-events-auto z-20"
            >
                <button
                    onClick={() => {
                        const projectsSection = document.getElementById('featured-projects');
                        if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    id="hero-cta"
                    className="group relative px-6 py-2.5 md:px-8 md:py-3 overflow-hidden rounded-full bg-[#e0e0e0]/50 backdrop-blur-xl border border-[#01161e]/20 hover:border-[#2d936c] shadow-lg hover:shadow-xl hover:shadow-[#2d936c]/20 transition-all duration-300"
                >
                    <div className="absolute inset-0 w-0 bg-[#2d936c]/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className="relative font-montserrat-alternates text-[#01161e] text-[10px] md:text-xs tracking-widest uppercase group-hover:text-[#2d936c] transition-colors duration-300">
                        View Selected Works
                    </span>
                </button>
            </motion.div>
        </motion.section>
    );
}
