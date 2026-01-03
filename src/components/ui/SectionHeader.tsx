import React from 'react';

interface SectionHeaderProps {
    label?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    label,
    title,
    description,
    light = false
}) => {
    const textColor = light ? 'text-brand-dark' : 'text-brand-white';
    const labelColor = 'text-brand-primary';
    const descColor = light ? 'text-brand-dark/60' : 'text-brand-light/60';

    return (
        <div className={`mb-16 md:mb-24 ${textColor}`}>
            {label && (
                <div className={`flex items-center gap-4 ${labelColor} font-consolas text-xs tracking-[0.2em] uppercase mb-4`}>
                    <span>{label}</span>
                    <span className={`w-12 h-[1px] bg-brand-primary`} />
                </div>
            )}
            <h2 className="text-4xl md:text-7xl font-de-valencia leading-[1.1] tracking-tight mb-6">
                {title}
            </h2>
            {description && (
                <p className={`max-w-2xl text-lg md:text-xl font-montserrat-alternates font-light leading-relaxed ${descColor}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
