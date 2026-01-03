import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemLabel from "./ui/SystemLabel";
import BrandButton from "./ui/BrandButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      const horizontalLines = gsap.utils.toArray(".grid-line-h");
      const verticalLines = gsap.utils.toArray(".grid-line-v");

      tl.fromTo([...horizontalLines, ...verticalLines],
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.05 }
      );

      const cells = gsap.utils.toArray(".grid-cell-content");
      tl.fromTo(cells,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.05 },
        "-=0.8"
      );

    }, footerRef);

    if (tickerRef.current) {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    }

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@harshsharma.design");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-brand-card text-brand-light overflow-hidden pt-12">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* TOP TICKER BAR */}
      <div className="w-full h-12 border-y border-brand-primary/20 overflow-hidden relative flex items-center bg-brand-dark">
        <div ref={tickerRef} className="flex whitespace-nowrap font-consolas text-xs text-brand-primary tracking-[0.3em] uppercase opacity-70">
          {Array(10).fill("• OPEN FOR OPPORTUNITIES • DESIGN • CODE • TYPOGRAPHY • EXPERIENCE ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="max-w-7xl mx-auto w-full border-x border-brand-primary/20 grid grid-cols-1 md:grid-cols-12 relative z-10">

        {/* CELL 1: MAIN CTA */}
        <div className="col-span-1 md:col-span-8 p-8 md:p-16 border-b border-brand-primary/20 relative group overflow-hidden">
          <div className="grid-cell-content h-full flex flex-col justify-between">
            <SystemLabel className="text-brand-primary/60 mb-8 block">• Start a Project</SystemLabel>
            <h2 className="text-[15vw] md:text-[8vw] font-de-valencia text-brand-primary leading-[0.9] tracking-tight mix-blend-screen transition-all duration-500 group-hover:text-brand-light">
              LET'S<br />CREATE.
            </h2>
            <div className="mt-8 flex items-center gap-4 w-fit">
              <BrandButton onClick={handleCopyEmail} variant="secondary" theme="dark" className="px-6 py-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="">
                  {emailCopied ? "Email Copied!" : "hello@harshsharma.design"}
                </span>
              </BrandButton>
            </div>
          </div>
          <div className="grid-line-v absolute top-0 right-0 h-full w-[1px] bg-brand-primary/20 origin-top" />
          <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-brand-primary/20 origin-left" />
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col">
          {/* CELL 2: SOCIALS */}
          <div className="flex-1 p-8 border-b border-brand-primary/20 relative group hover:bg-brand-primary/5 transition-colors duration-500">
            <div className="grid-cell-content">
              <SystemLabel className="text-brand-primary/60 mb-6 block">• Connect</SystemLabel>
              <div className="flex flex-col gap-4 font-montserrat-alternates">
                {['LinkedIn', 'Twitter', 'Dribbble', 'GitHub'].map((social) => (
                  <a key={social} href="#" className="text-xl font-light text-brand-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 block">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-brand-primary/20 origin-left" />
          </div>

          {/* CELL 3: STATUS & LOCATION */}
          <div className="flex-1 p-8 border-b border-brand-primary/20 relative group hover:bg-brand-primary/5 transition-colors duration-500">
            <div className="grid-cell-content">
              <SystemLabel className="text-brand-primary/60 mb-6 block">• Status</SystemLabel>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-none bg-brand-primary animate-pulse shadow-[0_0_10px_var(--color-brand-primary)]" />
                <span className="text-lg text-brand-white font-light font-montserrat-alternates">Available for Work</span>
              </div>
              <div className="mt-8">
                <SystemLabel className="text-brand-primary/60 block mb-2 opacity-60">• Time</SystemLabel>
                <span className="text-brand-light font-consolas text-sm">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
              </div>
            </div>
            <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-brand-primary/20 origin-left" />
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="col-span-1 md:col-span-12 p-6 flex justify-between items-center relative">
          <div className="grid-cell-content font-consolas text-[10px] md:text-xs text-brand-white/40 uppercase tracking-widest">
            © {new Date().getFullYear()} Harsh Sharma • Designed in Figma • Built with React
          </div>

          <BrandButton
            onClick={scrollToTop}
            variant="tertiary"
            theme="dark"
            className="flex items-center gap-3 px-4 py-2"
          >
            <SystemLabel className="hidden md:inline text-inherit opacity-40 group-hover:opacity-100">Back to Top</SystemLabel>
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform -rotate-90">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </BrandButton>
          <div className="grid-line-h absolute top-0 left-0 w-full h-[1px] bg-brand-primary/20 origin-left" />
        </div>
      </div>

      <div className="w-full h-12 bg-brand-dark mb-0" />
    </footer>
  );
}
