import { useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import AIToolsScroll from './AIToolsScroll';
import FeaturedProjects from './FeaturedProjects';
import Experience from './Experience';
import Hero from './Hero';
import TechStackMarquee from './TechStackMarquee';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef} id="hero-scroll-container" className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ParticleBackground containerRef={containerRef} />
          <Hero />
        </div>
      </div>
      <TechStackMarquee />
      <FeaturedProjects />
      <Experience />
      <AIToolsScroll />
    </>
  );
}
