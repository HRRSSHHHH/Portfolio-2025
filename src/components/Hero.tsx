import { motion } from 'framer-motion';
import BrandButton from './ui/BrandButton';
import SystemLabel from './ui/SystemLabel';

export default function Hero() {

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
                className="absolute top-28 left-10 md:top-12 md:left-12 flex flex-col items-start gap-1"
            >
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></span>
                    <SystemLabel>Focus: AI optimized UX</SystemLabel>
                </div>
                <SystemLabel className="opacity-60">Field: UX</SystemLabel>
            </motion.div>

            {/* Top Right: Status & Location */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute top-28 right-10 md:top-12 md:right-12 flex flex-col items-end gap-2"
            >
                <div className="flex items-center gap-2 pointer-events-auto">
                    <SystemLabel className="text-brand-primary">Status: Open to Roles</SystemLabel>
                    <div className="w-1.5 h-1.5 bg-brand-primary"></div>
                </div>
                <SystemLabel className="opacity-60">Loc: Global / Remote</SystemLabel>
            </motion.div>

            {/* Bottom Left: Education */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="absolute bottom-6 left-6 md:bottom-12 md:left-12 hidden md:block"
            >
                <SystemLabel className="opacity-60 leading-relaxed">
                    Degree: B.Des<br />
                    Institute: NIFT
                </SystemLabel>
            </motion.div>

            {/* Corner Guides */}
            <div className="absolute top-24 left-6 w-3 h-[1px] bg-brand-dark/20 md:w-4 md:top-8 md:left-8"></div>
            <div className="absolute top-24 left-6 w-[1px] h-3 bg-brand-dark/20 md:h-4 md:top-8 md:left-8"></div>

            <div className="absolute top-24 right-6 w-3 h-[1px] bg-brand-dark/20 md:w-4 md:top-8 md:right-8"></div>
            <div className="absolute top-24 right-6 w-[1px] h-3 bg-brand-dark/20 md:h-4 md:top-8 md:right-8"></div>

            <div className="absolute bottom-6 left-6 w-3 h-[1px] bg-brand-dark/20 md:w-4 md:bottom-8 md:left-8"></div>
            <div className="absolute bottom-6 left-6 w-[1px] h-3 bg-brand-dark/20 md:h-4 md:bottom-8 md:left-8"></div>

            <div className="absolute bottom-6 right-6 w-3 h-[1px] bg-brand-dark/20 md:w-4 md:bottom-8 md:right-8"></div>
            <div className="absolute bottom-6 right-6 w-[1px] h-3 bg-brand-dark/20 md:h-4 md:bottom-8 md:right-8"></div>


            {/* --- MAIN CONTENT --- */}
            <div className="text-center space-y-4 md:space-y-6 mix-blend-difference text-brand-dark relative z-20 px-8 md:px-0">

                {/* Identity / Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-consolas text-brand-primary text-xs tracking-[0.2em] font-medium mb-1 md:mb-2 uppercase"
                >
                    This is <span className="font-bold">HARSH</span> and I am
                </motion.p>

                {/* Headline */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="font-de-valencia text-[12vw] leading-[0.85] md:leading-[0.8] text-brand-primary tracking-tight"
                    >
                        Designing
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                        className="font-de-valencia text-[12vw] leading-[0.85] md:leading-[0.8] text-brand-primary tracking-tight"
                    >
                        Intelligence
                    </motion.h1>
                </div>

                {/* Sub-headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex items-center justify-center gap-3 md:gap-4 font-montserrat-alternates text-brand-dark text-xs md:text-sm lg:text-base tracking-[0.2em] uppercase font-medium mt-6 md:mt-8"
                >
                    <span className="opacity-80">Product Designer</span>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-20 md:bottom-12 pointer-events-auto z-20"
            >
                <BrandButton
                    variant="primary"
                    theme="light"
                    onClick={() => {
                        const projectsSection = document.getElementById('featured-projects');
                        if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    id="hero-cta"
                >
                    View Selected Works
                </BrandButton>
            </motion.div>
        </motion.section>
    );
}
