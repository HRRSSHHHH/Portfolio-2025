import React, { useEffect, useRef } from 'react';
import { usePresence } from 'framer-motion';

export default function PixelTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Grid configuration
        // 1vw x 2vh roughly
        const cols = 100;
        const rows = 50;
        const width = canvas.width / cols;
        const height = canvas.height / rows;

        const pixels: number[] = [];
        for (let i = 0; i < cols * rows; i++) {
            pixels.push(i);
        }

        // Shuffle for random glitch effect
        for (let i = pixels.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
        }

        let animationFrameId: number;
        const startTime = performance.now();

        const render = (time: number) => {
            const elapsed = time - startTime;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#2d936c';

            let allFinished = true;

            pixels.forEach((pixelIndex, i) => {
                // Calculate position
                const col = pixelIndex % cols;
                const row = Math.floor(pixelIndex / cols);
                const x = col * width;
                const y = row * height;

                // Staggered delay based on shuffled index (i)
                // We want the animation to progress across the shuffled array
                const myDelay = (i / pixels.length) * 500; // Spread start times over 500ms
                const myElapsed = elapsed - myDelay;

                let alpha = 0;

                if (isPresent) {
                    // ENTER: Opacity 1 -> 0
                    // We want to reveal the page.
                    // Start at 1, go to 0.
                    if (myElapsed < 0) alpha = 1;
                    else alpha = 1 - (myElapsed / 300); // 300ms fade per pixel
                    if (alpha < 0) alpha = 0;
                } else {
                    // EXIT: Opacity 0 -> 1
                    // We want to cover the page.
                    // Start at 0, go to 1.
                    if (myElapsed < 0) alpha = 0;
                    else alpha = myElapsed / 300;
                    if (alpha > 1) alpha = 1;
                }

                if ((isPresent && alpha > 0) || (!isPresent && alpha < 1)) {
                    allFinished = false;
                }

                if (alpha > 0) {
                    // Fix for sub-pixel rendering gaps: add a small overlap
                    ctx.globalAlpha = alpha;
                    ctx.fillRect(x - 0.5, y - 0.5, width + 1, height + 1);
                }
            });

            if (!allFinished) {
                animationFrameId = requestAnimationFrame(render);
            } else {
                if (!isPresent && safeToRemove) {
                    safeToRemove();
                }
            }
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isPresent, safeToRemove]);

    return (
        <div className="relative w-full h-full">
            {/* Canvas Overlay */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-[9999] pointer-events-none"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Page Content */}
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
}
