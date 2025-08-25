import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  useEffect(() => {
    // 1. Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 2. Setup Lenis
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 3. Cleanup on unmount
    return () => {
      lenis.destroy();
      // You might want to kill the ticker here if App can unmount,
      // but for a top-level App component, it's often not necessary.
    };
  }, []);

  return (
    <div className="App">
      <ParticleBackground />
      <div style={{ height: '200vh' }}></div>
      
    </div>
  );
}

export default App;