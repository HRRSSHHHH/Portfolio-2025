import React, { useState, useRef } from 'react';

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    theme?: 'light' | 'dark';
    children: React.ReactNode;
}

const BrandButton: React.FC<BrandButtonProps> = ({
    variant = 'primary',
    theme = 'dark', // Default to dark as most interactive sections are dark
    children,
    className = '',
    ...props
}) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    // Anatomy Baseline: Consolas, XS, Uppercase, Tracking Widest, No Rounded Corners
    const baseStyles = "px-10 py-5 font-consolas text-xs uppercase tracking-[0.2em] transition-all duration-500 rounded-none relative overflow-hidden group flex items-center justify-center gap-3 active:scale-[0.98] outline-none";

    // Theme-based Rest & Hover Logic
    const themeStyles = {
        light: {
            textRest: "text-brand-dark",
            textHover: "group-hover:text-brand-dark",
            fillPrimary: "bg-brand-primary",
            fillSecondary: "bg-brand-primary/10",
            restBorder: "border-brand-dark/10",
            hoverCorner: "group-hover:border-brand-dark"
        },
        dark: {
            textRest: "text-brand-primary",
            // For Primary on Dark: Text becomes dark on white fill
            // For Secondary/Tertiary on Dark: Text becomes white on hover
            textHover: variant === 'primary' ? "group-hover:text-brand-dark" : "group-hover:text-brand-light",
            fillPrimary: "bg-brand-white",
            fillSecondary: "bg-brand-primary/10",
            restBorder: "border-brand-primary/20",
            hoverCorner: "group-hover:border-brand-primary"
        }
    };

    const variants = {
        primary: `${themeStyles[theme].textRest} ${themeStyles[theme].textHover}`,
        secondary: `${themeStyles[theme].textRest} ${themeStyles[theme].textHover} transition-colors duration-300`,
        tertiary: `${themeStyles[theme].textRest} ${themeStyles[theme].textHover} transition-all duration-300`
    };

    const hexChars = "0123456789ABCDEF";
    const generateDataString = (length: number) => {
        return Array.from({ length }, () => hexChars[Math.floor(Math.random() * hexChars.length)] + hexChars[Math.floor(Math.random() * hexChars.length)]).join(' ');
    };

    const dataRows = [
        generateDataString(30),
        generateDataString(30),
        generateDataString(30)
    ];

    return (
        <button
            ref={buttonRef}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onMouseMove={handleMouseMove}
            {...props}
        >
            {/* 1. Background Data Stream (Only for Primary & Secondary) */}
            {variant !== 'tertiary' && (
                <div className={`absolute inset-0 ${theme === 'light' ? 'opacity-[0.1]' : 'opacity-[0.12]'} pointer-events-none select-none flex flex-col justify-around py-1 overflow-hidden z-0`}>
                    {dataRows.map((row, i) => (
                        <div
                            key={i}
                            className={`whitespace-nowrap font-consolas text-[8px] animate-data-stream ${variant === 'primary' ? 'group-hover:animate-data-stream-fast' : ''} group-hover:opacity-80 transition-all duration-700`}
                            style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
                        >
                            {row} {row} {row}
                        </div>
                    ))}
                </div>
            )}

            {/* 2. Interactive Cursor Glow (Only for Primary & Secondary) */}
            {variant !== 'tertiary' && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 147, 108, 0.35), transparent)`
                    }}
                />
            )}

            {/* 3. Surface Fill Layer (Primary & Secondary only) */}
            {variant === 'primary' && (
                <div className={`absolute inset-0 ${themeStyles[theme].fillPrimary} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0`} />
            )}

            {variant === 'secondary' && (
                <div className={`absolute inset-0 ${themeStyles[theme].fillSecondary} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />
            )}

            {/* 4. The Content (Typography & Icons) */}
            <span className={`relative z-10 flex items-center justify-center gap-3 ${variant !== 'tertiary' ? 'group-hover:animate-text-glitch' : ''} transition-all duration-300 pointer-events-none uppercase`}>
                {children}
            </span>

            {/* 5. Precision Schematic Corners - Primary (Collapse), Secondary (Bridge), Tertiary (Viewport) */}
            <div className="absolute inset-0 pointer-events-none z-20">
                {/* Dotted Bridge (Secondary only) */}
                {variant === 'secondary' && (
                    <div className={`absolute inset-0 border border-dotted ${theme === 'light' ? 'border-brand-primary/30' : 'border-brand-primary/20'} transition-opacity duration-500 group-hover:opacity-0`} />
                )}

                {/* Common Corner Logic */}
                {[
                    { pos: "top-0 left-0", border: "border-t border-l" },
                    { pos: "top-0 right-0", border: "border-t border-r" },
                    { pos: "bottom-0 left-0", border: "border-b border-l" },
                    { pos: "bottom-0 right-0", border: "border-b border-r" }
                ].map((corner, i) => {
                    let sizeClass = "";
                    let borderClass = "";
                    let transitionClass = "transition-all duration-500 ease-out";
                    let opacityClass = "opacity-100";

                    if (variant === 'primary') {
                        sizeClass = "w-full h-full group-hover:w-3 group-hover:h-3";
                        borderClass = `${themeStyles[theme].restBorder} ${themeStyles[theme].hoverCorner}`;
                    } else if (variant === 'secondary') {
                        sizeClass = "w-3 h-3 group-hover:w-full group-hover:h-full";
                        borderClass = "border-brand-primary/60 group-hover:border-brand-primary";
                    } else if (variant === 'tertiary') {
                        sizeClass = "w-2 h-2";
                        borderClass = "border-brand-primary";
                        opacityClass = "opacity-0 group-hover:opacity-100";
                    }

                    // Refine translate per corner for Tertiary ultra-tight viewport focus
                    let translateClass = "";
                    if (variant === 'tertiary') {
                        if (corner.pos.includes('left')) translateClass = "group-hover:translate-x-8";
                        if (corner.pos.includes('right')) translateClass = "group-hover:-translate-x-8";
                        if (corner.pos.includes('top')) translateClass += " group-hover:translate-y-4";
                        if (corner.pos.includes('bottom')) translateClass += " group-hover:-translate-y-4";
                    }

                    return (
                        <div
                            key={i}
                            className={`absolute ${corner.pos} ${corner.border} ${borderClass} ${sizeClass} ${opacityClass} ${transitionClass} ${translateClass}`}
                        />
                    );
                })}
            </div>
        </button>
    );
};

export default BrandButton;
