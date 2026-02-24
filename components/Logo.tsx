'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import logoRed from '@/lib/justlogosymbolred.png';
import logoWhite from '@/lib/justlogosymbolwhite.png';

interface LogoProps {
    className?: string;
    size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative cursor-pointer transition-transform duration-500 ease-out hover:rotate-12 ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Red Logo (Base) */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={logoRed}
                    alt="manuflux logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* White Logo (Reveal Layer) */}
            <div
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    maskImage: `radial-gradient(circle 20px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 100%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 20px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 100%, transparent 100%)`,
                }}
            >
                <Image
                    src={logoWhite}
                    alt="manuflux logo hover"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}
