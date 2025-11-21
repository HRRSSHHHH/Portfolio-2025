
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PixelTransition from './components/PixelTransition';
import './App.css';

const Home = lazy(() => import('./components/Home'));
const Projects = lazy(() => import('./components/Projects'));

gsap.registerPlugin(ScrollTrigger);



function App() {
  const location = useLocation();

  useEffect(() => {
    // Setup Lenis
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Refresh ScrollTrigger on route change
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-24">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="fixed inset-0 bg-[#2d936c] z-[50]" />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PixelTransition>
                    <Home />
                    <Footer />
                  </PixelTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PixelTransition>
                    <Projects />
                    <Footer />
                  </PixelTransition>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;