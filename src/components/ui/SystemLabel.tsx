import React from 'react';

interface SystemLabelProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'pill';
}

const SystemLabel: React.FC<SystemLabelProps> = ({ children, className = '', variant = 'default' }) => {
    if (variant === 'pill') {
        return (
            <span className={`font-consolas text-xs uppercase tracking-[0.2em] rounded-none ${className}`}>
                {children}
            </span>
        );
    }

    return (
        <span className={`font-consolas text-xs uppercase tracking-[0.2em] text-brand-primary rounded-none ${className}`}>
            [{children}]
        </span>
    );
};

export default SystemLabel;
