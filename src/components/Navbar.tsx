import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

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

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Effect for SplitText animation and hover
    useEffect(() => {
        const glitchTimelines: gsap.core.Timeline[] = [];
        const cleanups: (() => void)[] = [];
        let isMounted = true;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            navItemsRef.current.forEach((item, index) => {
                if (item) {
                    const textElement = item.querySelector('p');
                    if (textElement) {
                        const split = new SplitText(textElement, { type: 'chars' });

                        if (prefersReducedMotion) {
                            // Simple fade in for reduced motion
                            gsap.to(split.chars, { opacity: 1, duration: 0.5, stagger: 0.05 });
                            return;
                        }

                        gsap.set(split.chars, { opacity: 0 }); // Initially hide characters

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
                            stagger: {
                                each: 0.015,
                                from: 'random',
                            },
                            repeat: 1,
                            yoyo: true,
                        })
                            .to(split.chars, {
                                duration: 0.4,
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                                scale: 1,
                                filter: 'blur(0px)',
                                ease: 'elastic.out(1, 0.7)',
                                stagger: {
                                    each: 0.03,
                                    from: 'random',
                                },
                            });

                        glitchTimelines[index] = tl; // Store the timeline

                        // Initial animation on load
                        const initialDelay = 1.0 + (0.3 * index);
                        gsap.to(tl, { time: tl.duration(), delay: initialDelay, onComplete: () => { tl.pause(); } });

                        const enterListener = () => {
                            if (!tl.isActive()) {
                                tl.restart();
                            }
                        };
                        const leaveListener = () => {
                            // Optional reverse logic
                        };

                        item.addEventListener('mouseenter', enterListener);
                        item.addEventListener('mouseleave', leaveListener);

                        // Push cleanup for this item
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
            glitchTimelines.forEach(tl => tl.kill()); // Kill all timelines on unmount
            cleanups.forEach(cleanup => cleanup());
        };
    }, [navLinks]);

    const underlineRef = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        const underline = underlineRef.current;

        if (underline && target) {
            // Get position relative to the container
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

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="box-border content-stretch flex gap-[200px] items-center justify-center px-[48px] py-[32px] w-full fixed top-0 left-0 z-10 bg-transparent"
            data-name="Navbar"
            data-node-id="637:8"
        >
            <Link to="/" className="font-de-valencia leading-[0] not-italic relative shrink-0 text-[#2d936c] text-[14px] text-nowrap no-underline" data-node-id="637:6">
                <p className="leading-[normal] whitespace-pre">Harsh</p>
            </Link>
            <div className="content-stretch flex font-montserrat-alternates gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-[#01161e] text-[12px] text-nowrap relative" data-name="Menu Items" data-node-id="637:7">
                {/* Shared Underline Element */}
                <div
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 h-[2px] bg-[#2d936c] pointer-events-none opacity-0"
                    style={{ width: 0 }}
                />

                {navLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="relative shrink-0 no-underline text-[#01161e] px-2 py-1"
                        ref={(el) => { navItemsRef.current[index] = el; }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p className="leading-[normal] whitespace-pre relative z-10">{link.name}</p>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
