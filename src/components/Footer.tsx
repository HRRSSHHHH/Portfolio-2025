import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // 1. Grid Lines "Draw" themselves
      // Select all borders/separators (horizontal and vertical)
      const horizontalLines = gsap.utils.toArray(".grid-line-h");
      const verticalLines = gsap.utils.toArray(".grid-line-v");

      tl.fromTo([...horizontalLines, ...verticalLines],
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, duration: 1.2, ease: "expo.out", stagger: 0.05 }
      );

      // 2. Content Fade In
      const cells = gsap.utils.toArray(".grid-cell-content");
      tl.fromTo(cells,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.05 },
        "-=0.8"
      );

    }, footerRef);

    // Infinite Ticker Animation
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
    <footer ref={footerRef} className="relative w-full bg-[#0c1f26] text-white overflow-hidden pt-12">

      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* TOP TICKER BAR */}
      <div className="w-full h-12 border-y border-[#2d936c]/20 overflow-hidden relative flex items-center bg-[#01161e]">
        <div ref={tickerRef} className="flex whitespace-nowrap font-mono text-xs text-[#2d936c] tracking-[0.3em] uppercase opacity-70">
          {Array(10).fill("• OPEN FOR OPPORTUNITIES • DESIGN • CODE • TYPOGRAPHY • EXPERIENCE ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* MAIN ARCHITECTURAL GRID */}
      {/* Grid Definition: Mobile 1 Col, Tablet 2 Cols, Desktop 12 Cols */}
      <div ref={gridRef} className="max-w-7xl mx-auto w-full border-x border-[#2d936c]/20 grid grid-cols-1 md:grid-cols-12 relative z-10">

        {/* CELL 1: MAIN CTA (Spans 8 cols) */}
        <div className="col-span-1 md:col-span-8 p-8 md:p-16 border-b border-[#2d936c]/20 relative group overflow-hidden">
          <div className="grid-cell-content h-full flex flex-col justify-between">
            <span className="font-mono text-xs text-[#2d936c]/60 mb-8 block">• START A PROJECT</span>
            <h2 className="text-[15vw] md:text-[8vw] font-de-valencia text-[#2d936c] leading-[0.9] tracking-tight mix-blend-screen transition-all duration-500 group-hover:text-white">
              LET'S<br />CREATE.
            </h2>
            <button onClick={handleCopyEmail} className="mt-8 flex items-center gap-4 group/btn w-fit">
              <span className="w-12 h-12 rounded-full border border-[#2d936c] flex items-center justify-center group-hover/btn:bg-[#2d936c] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#2d936c] group-hover/btn:text-white rotate-[-45deg] group-hover/btn:rotate-0 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="font-montserrat-alternates text-lg md:text-xl font-light text-white group-hover/btn:tracking-widest transition-all duration-300">
                {emailCopied ? "Email Copied!" : "hello@harshsharma.design"}
              </span>
            </button>
          </div>
          {/* Animated Grid Lines for this cell */}
          <div className="grid-line-v absolute top-0 right-0 h-full w-[1px] bg-[#2d936c]/20 origin-top" />
          <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-[#2d936c]/20 origin-left" />
        </div>

        {/* RIGHT COLUMN STACK (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-4 flex flex-col">

          {/* CELL 2: SOCIALS */}
          <div className="flex-1 p-8 border-b border-[#2d936c]/20 relative group hover:bg-[#2d936c]/5 transition-colors duration-500">
            <div className="grid-cell-content">
              <span className="font-mono text-xs text-[#2d936c]/60 mb-6 block">• CONNECT</span>
              <div className="flex flex-col gap-4 font-montserrat-alternates">
                {['LinkedIn', 'Twitter', 'Dribbble', 'GitHub'].map((social) => (
                  <a key={social} href="#" className="text-xl font-light text-gray-300 hover:text-[#2d936c] hover:translate-x-2 transition-all duration-300 block">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-[#2d936c]/20 origin-left" />
          </div>

          {/* CELL 3: STATUS & LOCATION */}
          <div className="flex-1 p-8 border-b border-[#2d936c]/20 relative group hover:bg-[#2d936c]/5 transition-colors duration-500">
            <div className="grid-cell-content">
              <span className="font-mono text-xs text-[#2d936c]/60 mb-6 block">• STATUS</span>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="text-lg text-white font-light">Available for Work</span>
              </div>
              <div className="mt-8">
                <span className="font-mono text-xs text-[#2d936c]/60 block mb-2">• TIME</span>
                <span className="text-white font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
              </div>
            </div>
            <div className="grid-line-h absolute bottom-0 left-0 w-full h-[1px] bg-[#2d936c]/20 origin-left" />
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT & BACK TO TOP (Spans 12 cols) */}
        <div className="col-span-1 md:col-span-12 p-6 flex justify-between items-center relative">
          <div className="grid-cell-content font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Harsh Sharma • Designed in Figma • Built with React
          </div>

          <button
            onClick={scrollToTop}
            className="grid-cell-content flex items-center gap-3 hover:text-[#2d936c] transition-colors duration-300 group"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest hidden md:inline">Back to Top</span>
            <div className="w-8 h-8 rounded-none border border-[#2d936c]/30 group-hover:bg-[#2d936c] flex items-center justify-center transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2d936c] group-hover:text-white transform -rotate-90 transition-colors duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          {/* Top border of bottom bar is actually bottom of cells above, so no extra border needed here? 
                        Wait, need a line if the grid height varies. Safe to add top border here.
                    */}
          <div className="grid-line-h absolute top-0 left-0 w-full h-[1px] bg-[#2d936c]/20 origin-left" />
        </div>
      </div>

      <div className="w-full h-12 bg-[#01161e] mb-0" /> {/* Spacer */}
    </footer>
  );
}
