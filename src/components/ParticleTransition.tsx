import React, { useEffect, useRef } from 'react';
import { usePresence } from 'framer-motion';
import { THEME } from '../constants/ThemeConstants';

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

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: Particle[] = [];
        const particleCount = 2000;
        const colors = [THEME.dark, THEME.primary, THEME.secondary];

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
                alpha: 0,
                drift: Math.random() * Math.PI * 2
            });
        }

        let animationFrameId: number;
        let progress = 0;

        const render = () => {
            if (isPresent) {
                progress -= 0.02;
                if (progress < 0) progress = 0;
            } else {
                progress += 0.03;
                if (progress > 1) progress = 1;
            }

            if (!isPresent && progress >= 1 && safeToRemove) {
                safeToRemove();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!(progress <= 0 && isPresent)) {
                particles.forEach(p => {
                    p.x += Math.cos(p.drift) * 0.2;
                    p.y += Math.sin(p.drift) * 0.2;

                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.globalAlpha = progress;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                if (progress > 0.9) {
                    ctx.globalAlpha = (progress - 0.9) * 10;
                    ctx.fillStyle = THEME.dark;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

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
