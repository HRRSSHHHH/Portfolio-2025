import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from "./ui/SectionHeader";
import BrandButton from "./ui/BrandButton";
import SystemLabel from "./ui/SystemLabel";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsSubmitting(false);
                setIsSent(true);
            }
        });

        tl.to(".submit-btn-content", { y: -20, opacity: 0, duration: 0.3 })
            .to(".submit-btn-success", { y: 0, opacity: 1, duration: 0.3 });
    };

    return (
        <div ref={containerRef} className="min-h-screen blueprint-bg pt-32 pb-20 overflow-hidden flex flex-col justify-between">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Left: The Form */}
                <div className="order-2 md:order-1 relative z-10">
                    <div className="mb-16 reveal-item">
                        <SectionHeader
                            label="Get in Touch"
                            title={<>Say <br /> Hello.</>}
                            description="Currently open for new opportunities and collaborations. Let's build something exceptional."
                            light
                        />
                    </div>

                    {!isSent ? (
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-12 max-w-lg reveal-item">
                            <div className="group relative">
                                <label className="block text-xs font-consolas uppercase text-brand-dark/40 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-transparent border-b border-brand-dark/10 py-4 font-montserrat-alternates text-brand-dark focus:border-brand-primary outline-none transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="group relative">
                                <label className="block text-xs font-consolas uppercase text-brand-dark/40 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-transparent border-b border-brand-dark/10 py-4 font-montserrat-alternates text-brand-dark focus:border-brand-primary outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="group relative">
                                <label className="block text-xs font-consolas uppercase text-brand-dark/40 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-brand-dark/10 py-4 font-montserrat-alternates text-brand-dark focus:border-brand-primary outline-none transition-colors resize-none"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <BrandButton
                                type="submit"
                                disabled={isSubmitting}
                                variant="primary"
                                theme="light"
                                className="w-full py-6"
                            >
                                <div className="relative h-6 w-full flex items-center justify-center overflow-hidden">
                                    <span className="submit-btn-content absolute flex items-center gap-2 transition-transform duration-300">
                                        Send Message
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                    <span className="submit-btn-success absolute opacity-0 translate-y-4 flex items-center gap-2 text-brand-dark">
                                        Transmission Successful
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17L4 12" />
                                        </svg>
                                    </span>
                                </div>
                            </BrandButton>
                        </form>
                    ) : (
                        <div className="flex flex-col gap-6 reveal-item">
                            <SystemLabel variant="pill" className="w-fit bg-brand-primary text-brand-dark border-none px-6 py-2">Message Received</SystemLabel>
                            <h3 className="text-4xl font-de-valencia text-brand-dark">Talk soon.</h3>
                            <BrandButton
                                onClick={() => setIsSent(false)}
                                variant="tertiary"
                                theme="light"
                                className="w-fit"
                            >
                                Send another?
                            </BrandButton>
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div className="order-1 md:order-2 flex flex-col justify-center gap-12 border-l border-brand-dark/5 pl-12 reveal-item">
                    <div>
                        <SystemLabel className="text-brand-dark/40 mb-4 block">• Location</SystemLabel>
                        <p className="text-2xl font-de-valencia text-brand-dark">India / Remote</p>
                    </div>
                    <div>
                        <SystemLabel className="text-brand-dark/40 mb-4 block">• Social</SystemLabel>
                        <div className="flex flex-col gap-4">
                            {["LinkedIn", "GitHub", "Twitter", "Dribbble"].map(social => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-xl font-montserrat-alternates font-light text-brand-dark/80 hover:text-brand-primary hover:translate-x-2 transition-all duration-300"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Signature */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 flex justify-between items-end reveal-item">
                <span className="font-de-valencia text-[10vw] leading-[0.8] text-brand-dark/5 translate-y-8 select-none">
                    HARSH
                </span>
                <div className="mb-4">
                    <SystemLabel className="text-brand-dark/20 text-[10px] block">Availability</SystemLabel>
                    <span className="font-consolas text-xs text-brand-primary animate-pulse tracking-widest">• ACTIVE</span>
                </div>
            </div>
        </div>
    );
}
