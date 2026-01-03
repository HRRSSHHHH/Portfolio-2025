import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(SplitText);

const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const [hidden, setHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        // Hide on scroll down, show on scroll up. Always show if menu is open.
        if (latest > previous && latest > 150 && !isMenuOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Ensure hidden state is reset when menu closes so navbar comes back
            setHidden(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Effect for SplitText animation (Desktop)
    useEffect(() => {
        const glitchTimelines: gsap.core.Timeline[] = [];
        const cleanups: (() => void)[] = [];
        let isMounted = true;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            navItemsRef.current.forEach((item, index) => {
                if (item) {
                    const textElement = item.querySelector('p');
                    if (textElement) {
                        const split = new SplitText(textElement, { type: 'chars' });

                        if (prefersReducedMotion) {
                            gsap.to(split.chars, { opacity: 1, duration: 0.5, stagger: 0.05 });
                            return;
                        }

                        gsap.set(split.chars, { opacity: 0 });

                        const tl = gsap.timeline({ paused: true });
                        tl.from(split.chars, {
                            duration: 0.05,
                            opacity: 0,
                            x: () => gsap.utils.random(-4, 4),
                            y: () => gsap.utils.random(-4, 4),
                            rotation: () => gsap.utils.random(-5, 5),
                            scale: () => gsap.utils.random(0.9, 1.1),
                            filter: 'blur(20px)',
                            ease: 'power2.inOut',
                            stagger: { each: 0.015, from: 'random' },
                            repeat: 1,
                            yoyo: true,
                        }).to(split.chars, {
                            duration: 0.4,
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotation: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            ease: 'elastic.out(1, 0.7)',
                            stagger: { each: 0.03, from: 'random' },
                        });

                        glitchTimelines[index] = tl;
                        const initialDelay = 1.0 + (0.3 * index);
                        gsap.to(tl, { time: tl.duration(), delay: initialDelay, onComplete: () => { tl.pause(); } });

                        const enterListener = () => { if (!tl.isActive()) tl.restart(); };
                        const leaveListener = () => { };

                        item.addEventListener('mouseenter', enterListener);
                        item.addEventListener('mouseleave', leaveListener);

                        cleanups.push(() => {
                            item.removeEventListener('mouseenter', enterListener);
                            item.removeEventListener('mouseleave', leaveListener);
                            split.revert();
                        });
                    }
                }
            });
        });

        return () => {
            isMounted = false;
            glitchTimelines.forEach(tl => tl.kill());
            cleanups.forEach(cleanup => cleanup());
        };
    }, []);

    const underlineRef = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        const underline = underlineRef.current;

        if (underline && target) {
            const containerRect = target.parentElement?.getBoundingClientRect();
            const itemRect = target.getBoundingClientRect();

            if (containerRect) {
                const left = itemRect.left - containerRect.left;
                gsap.to(underline, {
                    x: left,
                    width: itemRect.width,
                    opacity: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: true,
                });
            }
        }
    };

    const handleMouseLeave = () => {
        const underline = underlineRef.current;
        if (underline) {
            gsap.to(underline, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
            });
        }
    };

    // --- REFINED ANIMATION VARIANTS ---

    // Menu Overlay: Spring Physics for fluidity
    const menuVariants: Variants = {
        closed: {
            y: "-100%",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        },
        open: {
            y: "0%",
            borderBottomLeftRadius: "0%",
            borderBottomRightRadius: "0%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.07,
                delayChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    // Text Reveal Container: Clip path for the reveal effect
    const linkContainerVariants: Variants = {
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        }
    };

    // The Text itself: Slides up from 100%
    const linkVariants: Variants = {
        closed: {
            y: "120%",
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3
            }
        },
        open: {
            y: "0%",
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 30
            }
        }
    };

    const systemTextVariants: Variants = {
        closed: { opacity: 0, y: 20 },
        open: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.5 }
        }
    };

    const isLightPage = ['/', '/about', '/skills', '/resume', '/contact', '/projects'].includes(pathname);
    const navTextColor = isLightPage ? 'text-brand-dark' : 'text-brand-white';

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`box-border flex items-center justify-between md:justify-center md:gap-[200px] px-6 md:px-[48px] py-6 md:py-[32px] w-full fixed top-0 left-0 z-50 bg-transparent transition-colors duration-300 ${isMenuOpen ? 'bg-transparent' : ''}`}
            data-name="Navbar"
            data-node-id="637:8"
        >
            {/* Logo */}
            <Link to="/" className={`font-de-valencia leading-[0] not-italic relative shrink-0 ${isLightPage ? 'text-brand-primary' : 'text-brand-white'} text-[14px] text-nowrap no-underline z-50 md:text-[14px] text-xl`} data-node-id="637:6">
                <p className="leading-[normal] whitespace-pre">Harsh</p>
            </Link>

            {/* Desktop Menu */}
            <div className={`hidden md:flex content-stretch font-montserrat-alternates gap-[24px] items-center leading-[0] not-italic relative shrink-0 ${navTextColor} text-[12px] text-nowrap relative`} data-name="Menu Items" data-node-id="637:7">
                {/* Shared Underline Element */}
                <div
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 h-[2px] bg-brand-primary pointer-events-none opacity-0"
                    style={{ width: 0 }}
                />

                {navLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`relative shrink-0 no-underline ${navTextColor} px-2 py-1`}
                        ref={(el) => { navItemsRef.current[index] = el; }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p className="leading-[normal] whitespace-pre relative z-10">{link.name}</p>
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden z-50 p-2 ${isMenuOpen ? 'text-brand-white' : navTextColor} focus:outline-none`}
                aria-label="Toggle Menu"
            >
                <motion.div
                    animate={isMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { rotate: 90, scale: 1.1 },
                        closed: { rotate: 0, scale: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.div>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-brand-dark z-40 flex flex-col items-center justify-center md:hidden origin-top"
                    >
                        <motion.div
                            className="flex flex-col gap-6 items-center"
                            variants={linkContainerVariants}
                        >
                            {navLinks.map((link) => (
                                <div key={link.name} className="overflow-hidden"> {/* Masking Container */}
                                    <motion.div variants={linkVariants}>
                                        <Link
                                            to={link.path}
                                            className="font-de-valencia text-5xl text-brand-light hover:text-brand-primary transition-colors duration-300 block py-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Decorative Elements for Mobile Menu */}
                        <motion.div
                            variants={systemTextVariants}
                            className="absolute bottom-10 text-brand-secondary/50 font-consolas text-xs"
                        >
                            [ SYSTEM : ONLINE ]
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
