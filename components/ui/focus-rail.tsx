"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn, getAssetPath } from "@/lib/utils";
import { LiquidButton } from "./liquid-glass-button";

export type FocusRailItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc: string;
    href?: string;
    meta?: string;
};

interface FocusRailProps {
    items: FocusRailItem[];
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
    loop?: boolean;
    className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 */
const BASE_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
} as const;

const TAP_SPRING = {
    type: "spring",
    stiffness: 450,
    damping: 18,
    mass: 1,
} as const;

export function FocusRail({
    items,
    active,
    setActive,
    loop = true,
    className,
}: FocusRailProps) {
    const count = items.length;
    const activeIndex = wrap(0, count, active);
    const activeItem = items[activeIndex];

    // --- NAVIGATION HANDLERS ---
    const handlePrev = React.useCallback(() => {
        if (!loop && active === 0) return;
        setActive((p) => p - 1);
    }, [loop, active, setActive]);

    const handleNext = React.useCallback(() => {
        if (!loop && active === count - 1) return;
        setActive((p) => p + 1);
    }, [loop, active, count, setActive]);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };

    const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipePower = Math.abs(offset.x) * velocity.x;
        if (swipePower < -10000) handleNext();
        else if (swipePower > 10000) handlePrev();
    };

    const visibleIndices = [-2, -1, 0, 1, 2];

    return (
        <div
            ref={containerRef}
            className={cn(
                "group relative flex min-h-[500px] md:h-[650px] w-full flex-col overflow-hidden bg-transparent text-white outline-none select-none overflow-x-hidden",
                className
            )}
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            {/* Background Ambience - Manuflux Red Tint */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000 group-hover:opacity-30">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={`bg-${activeItem.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={getAssetPath(activeItem.imageSrc)}
                            alt=""
                            className="h-full w-full object-cover blur-3xl saturate-150"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Stage */}
            <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">

                {/* Left/Right Navigation Buttons */}
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[240px] md:-translate-x-[400px] lg:-translate-x-[480px] z-50 hidden sm:flex items-center justify-center -ml-6 pointer-events-auto">
                    <button
                        onClick={handlePrev}
                        className="group flex w-12 h-12 items-center justify-center rounded-full text-white bg-[#e60000] shadow-[0_4px_14px_0_rgba(226,0,0,0.39)] transition-all duration-300 hover:scale-110 hover:bg-[#ff1a1a] hover:shadow-[0_6px_20px_rgba(226,0,0,0.4)] hover:-translate-y-0.5 outline-none cursor-pointer"
                        aria-label="Previous Project"
                    >
                        <ArrowRight className="w-5 h-5 -rotate-180 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
                    </button>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[240px] md:translate-x-[400px] lg:translate-x-[480px] z-50 hidden sm:flex items-center justify-center -ml-6 pointer-events-auto">
                    <button
                        onClick={handleNext}
                        className="group flex w-12 h-12 items-center justify-center rounded-full text-white bg-[#e60000] shadow-[0_4px_14px_0_rgba(226,0,0,0.39)] transition-all duration-300 hover:scale-110 hover:bg-[#ff1a1a] hover:shadow-[0_6px_20px_rgba(226,0,0,0.4)] hover:-translate-y-0.5 outline-none cursor-pointer"
                        aria-label="Next Project"
                    >
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </button>
                </div>

                <motion.div
                    className="relative mx-auto flex h-[360px] md:h-[400px] w-full max-w-6xl items-center justify-center perspective-[1500px] cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                >
                    <AnimatePresence mode="popLayout">
                        {visibleIndices.map((offset) => {
                            const absIndex = active + offset;
                            const index = wrap(0, count, absIndex);
                            const item = items[index];

                            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                            const isCenter = offset === 0;
                            const dist = Math.abs(offset);

                            // Responsive offsets
                            const xBasis = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 340;
                            const xOffset = offset * xBasis;
                            const zOffset = -dist * 250;
                            const scale = isCenter ? 1 : 0.8;
                            const rotateY = offset * -25;
                            const opacity = isCenter ? 1 : Math.max(0, 1 - dist * 0.45);
                            const blur = isCenter ? 0 : dist * 8;

                            return (
                                <motion.div
                                    key={`${absIndex}-${item.id}`}
                                    data-lenis-prevent={isCenter ? "" : undefined}
                                    className={cn(
                                        "group/tile absolute aspect-[16/10] w-[280px] md:w-[600px] rounded-3xl border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500 overflow-hidden",
                                        isCenter ? "z-20 ring-1 ring-red-500/20 shadow-red-500/5 cursor-pointer" : "z-10"
                                    )}
                                    initial={false}
                                    animate={{
                                        x: xOffset,
                                        z: zOffset,
                                        scale: scale,
                                        rotateY: rotateY,
                                        opacity: opacity,
                                        filter: `blur(${blur}px) brightness(${isCenter ? 1 : 0.4})`,
                                    }}
                                    transition={{
                                        ...BASE_SPRING,
                                        scale: TAP_SPRING,
                                    }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    onClick={() => {
                                        if (offset !== 0) setActive((p) => p + offset);
                                    }}
                                >
                                    <img
                                        src={getAssetPath(item.imageSrc)}
                                        alt={item.title}
                                        className="h-full w-full object-cover pointer-events-none transition-transform duration-700 group-active:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                                    {isCenter && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#e60000] shadow-[0_4px_14px_0_rgba(226,0,0,0.39)] flex items-center justify-center text-white z-30 pointer-events-none transition-all duration-300 group-hover/tile:scale-110 group-hover/tile:bg-[#ff1a1a] group-hover/tile:shadow-[0_6px_20px_rgba(226,0,0,0.4)]"
                                        >
                                            <ArrowUpRight size={20} className="transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5" />
                                        </motion.div>
                                    )}

                                    {isCenter && item.href && (
                                        <Link
                                            href={item.href}
                                            className="absolute inset-0 z-40 cursor-pointer"
                                            draggable={false}
                                            aria-label={`View ${item.title}`}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Info & Controls - Brand Styled */}
                <div className="mx-auto mt-12 md:mt-16 flex w-full max-w-5xl flex-col items-center justify-between gap-8 md:flex-row pointer-events-auto pb-12">
                    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left justify-center min-h-[160px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="space-y-3"
                            >
                                {activeItem.meta && (
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                                        {activeItem.meta}
                                    </span>
                                )}
                                <h2 className="text-4xl font-display font-bold tracking-tight md:text-5xl text-white">
                                    {activeItem.title}
                                </h2>
                                {activeItem.description && (
                                    <p className="max-w-md text-white/40 font-light leading-relaxed">
                                        {activeItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-6">
                        {activeItem.href && (
                            <Link
                                href={activeItem.href}
                                className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-red-600 hover:text-white shadow-xl active:scale-95"
                            >
                                Projekt starten
                                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
