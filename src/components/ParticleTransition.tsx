import React, { useEffect, useRef } from 'react';
import { usePresence } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    size: number;
    targetX: number;
    targetY: number;
    speed: number;
    color: string;
    alpha: number;
    drift: number;
}

export default function ParticleTransition({ children }: { children: React.ReactNode }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: Particle[] = [];
        const particleCount = 2000;
        const colors = ['#222222', '#2d936c', '#888888']; // Theme colors

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                targetX: Math.random() * canvas.width,
                targetY: Math.random() * canvas.height,
                speed: Math.random() * 0.15 + 0.05,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 0, // Start invisible
                drift: Math.random() * Math.PI * 2
            });
        }

        let animationFrameId: number;
        let progress = 0;

        const render = () => {
            // Easing for the global transition state
            // If entering (isPresent=true), we want to start solid and go clear.
            // If exiting (isPresent=false), we want to start clear and go solid.
            if (isPresent) {
                // ENTERING: Reveal
                progress -= 0.02;
                if (progress < 0) progress = 0;
            } else {
                // EXITING: Cover
                progress += 0.03;
                if (progress > 1) progress = 1;
            }

            // If we are exiting and finished covering, we tell Framer we are done
            if (!isPresent && progress >= 1 && safeToRemove) {
                safeToRemove();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Optimization: If progress is 0, don't draw anything (Entering finished)
            if (progress <= 0 && isPresent) {
                // Just stop the loop to save battery? 
                // We keep it running for the "drifting" effect maybe? 
                // No, standard transition should stop.
                // But let's keep drawing empty to clear.
            } else {
                particles.forEach(p => {
                    // Update alpha based on global progress
                    // drift
                    p.x += Math.cos(p.drift) * 0.2;
                    p.y += Math.sin(p.drift) * 0.2;

                    // Wrap around
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    // Draw
                    ctx.globalAlpha = progress; // Simple fade for now, consistent with "filling the screen"
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Fill background to ensure total coverage at max progress
                if (progress > 0.9) {
                    ctx.globalAlpha = (progress - 0.9) * 10; // Ramp up quickly at the end
                    ctx.fillStyle = '#111'; // Match site bg
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // If we are mounting (entering), start progress at 1 (covered)
        if (isPresent) {
            progress = 1;
        } else {
            progress = 0;
        }

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isPresent, safeToRemove]);

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-[9999] pointer-events-none"
                style={{ width: '100vw', height: '100vh' }}
            />
            {children}
        </div>
    );
}
