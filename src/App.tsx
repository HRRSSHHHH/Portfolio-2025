
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleTransition from './components/ParticleTransition';
import './App.css';

const Home = lazy(() => import('./components/Home'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Resume = lazy(() => import('./components/Resume'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Auro = lazy(() => import('./components/case-studies/Auro'));

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
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="fixed inset-0 bg-brand-primary z-[50]" />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <ParticleTransition>
                    <Home />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <ParticleTransition>
                    <Projects />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/skills"
                element={
                  <ParticleTransition>
                    <Skills />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <ParticleTransition>
                    <About />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/resume"
                element={
                  <ParticleTransition>
                    <Resume />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <ParticleTransition>
                    <Contact />
                    <Footer />
                  </ParticleTransition>
                }
              />
              <Route
                path="/project/auro"
                element={
                  <ParticleTransition>
                    <Auro />
                    <Footer />
                  </ParticleTransition>
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