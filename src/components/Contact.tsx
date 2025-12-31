import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useLayoutEffect(() => {
        let ctx: gsap.Context;
        let isMounted = true;

        document.fonts.ready.then(() => {
            if (!isMounted) return;

            ctx = gsap.context(() => {
                // Header Animation
                const splitTitle = new SplitText(".contact-title", { type: "chars" });
                gsap.from(splitTitle.chars, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power2.out"
                });

                gsap.from(".contact-reveal", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                });

                // Input Line Animation
                gsap.from(".input-line", {
                    scaleX: 0,
                    transformOrigin: "left",
                    duration: 1,
                    delay: 0.8,
                    stagger: 0.1,
                    ease: "power3.inOut"
                });

            }, containerRef);
        });

        return () => {
            isMounted = false;
            ctx?.revert();
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate transmission
        const tl = gsap.timeline({
            onComplete: () => {
                setIsSubmitting(false);
                setIsSent(true);
            }
        });

        tl.to(".submit-btn-text", { y: -20, opacity: 0, duration: 0.3 })
            .to(".submit-btn-bar", { width: "100%", duration: 1.5, ease: "power2.inOut" })
            .to(".submit-btn", { backgroundColor: "#2d936c", borderColor: "#2d936c", duration: 0.3 })
            .to(".submit-btn-success", { y: 0, opacity: 1, duration: 0.3 });
    };

    return (
        <div ref={containerRef} className="bg-[#e0e0e0] min-h-screen text-[#01161e] font-montserrat-alternates pt-32 pb-20 relative overflow-hidden flex flex-col justify-between">

            {/* Background Texture (Subtle Noise Only) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-20">

                {/* Left: The Form */}
                <div className="order-2 md:order-1 relative z-10">
                    <div className="mb-16 contact-reveal">
                        <div className="flex items-center gap-4 text-[#2d936c] font-mono text-xs tracking-widest uppercase mb-4">
                            <span>Get in Touch</span>
                            <span className="w-12 h-[1px] bg-[#2d936c]" />
                        </div>
                        <h1 className="contact-title text-6xl md:text-8xl font-de-valencia leading-[0.9]">
                            Say <br /> Hello.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 font-light max-w-sm contact-reveal">
                            Currently open for new opportunities and collaborations.
                        </p>
                    </div>

                    {!isSent ? (
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-12 max-w-lg contact-reveal">

                            <div className="group relative">
                                <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Name</label>
                                <input type="text" required className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 focus:outline-none placeholder-[#01161e]/30 peer text-[#01161e] pb-4" />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01161e]/20 input-line" />
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2d936c] transition-all duration-500 peer-focus:w-full" />
                            </div>

                            <div className="group relative">
                                <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Email</label>
                                <input type="email" required className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 focus:outline-none placeholder-[#01161e]/30 peer text-[#01161e] pb-4" />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01161e]/20 input-line" />
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2d936c] transition-all duration-500 peer-focus:w-full" />
                            </div>

                            <div className="group relative">
                                <label className="block text-xs font-mono uppercase text-gray-400 mb-2">Message</label>
                                <textarea required rows={1} className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 focus:outline-none placeholder-[#01161e]/30 peer text-[#01161e] pb-4 resize-none min-h-[60px]"
                                    onChange={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }} />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01161e]/20 input-line" />
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2d936c] transition-all duration-500 peer-focus:w-full" />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="submit-btn group relative h-14 w-full md:w-48 bg-[#01161e] text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg mt-4">
                                <div className="submit-btn-bar absolute left-0 top-0 bottom-0 bg-[#2d936c] w-0" />

                                <span className="submit-btn-text absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-widest z-10 transition-colors duration-300 group-hover:text-white">
                                    Send Message
                                </span>
                                <span className="submit-btn-success absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-white opacity-0 translate-y-10 z-10">
                                    Sent
                                </span>
                            </button>
                        </form>
                    ) : (
                        <div className="max-w-lg mt-12 p-8 bg-white shadow-sm border-l-4 border-[#2d936c]">
                            <h3 className="text-2xl font-de-valencia text-[#01161e] mb-2">Message Received.</h3>
                            <p className="text-gray-600 font-light">Thank you for reaching out. I'll get back to you shortly.</p>
                        </div>
                    )}
                </div>

                {/* Right: Contact Details */}
                <div className="order-1 md:order-2 flex flex-col justify-end items-start md:items-end contact-reveal">

                    <div className="flex flex-col gap-2 mb-16 text-right">
                        <span className="font-mono text-xs uppercase text-[#01161e]/40">Email</span>
                        <a href="mailto:hello@example.com" className="text-3xl md:text-5xl font-de-valencia hover:text-[#2d936c] transition-colors">
                            hello@example.com
                        </a>
                    </div>

                    <div className="flex flex-col gap-4 text-right">
                        <span className="font-mono text-xs uppercase text-[#01161e]/40">Socials</span>
                        {[
                            { name: "LinkedIn", url: "#" },
                            { name: "Twitter", url: "#" },
                            { name: "GitHub", url: "#" },
                            { name: "Read.cv", url: "#" }
                        ].map((social) => (
                            <a key={social.name} href={social.url} className="group flex items-center justify-end gap-2 font-mono text-sm uppercase hover:text-[#2d936c] transition-colors">
                                {social.name}
                                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#2d936c]">-&gt;</span>
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            <div className="w-full text-center contact-reveal opacity-30 mt-20">
                <span className="font-de-valencia text-[10rem] md:text-[16rem] leading-none text-transparent text-stroke-1 opacity-10 select-none pointer-events-none">
                    Harsh
                </span>
            </div>

        </div>
    );
}
