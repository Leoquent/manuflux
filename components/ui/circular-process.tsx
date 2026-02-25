"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface Step {
    title: string;
    description: string;
}

interface CircularProcessProps {
    steps: Step[];
}

function StepNode({ i, W, circleRotate, scrollYProgress }: { i: number, W: number, circleRotate: MotionValue<number>, scrollYProgress: MotionValue<number> }) {
    const nodeRotate = useTransform(circleRotate, (c) => -(c + W));

    const p = i / 3;
    const input = i === 0
        ? [0, 0.05, 0.16]
        : i === 3
            ? [0.84, 0.95, 1]
            : [p - 0.16, p - 0.05, p + 0.05, p + 0.16];

    const outputClasses = i === 0
        ? [1, 1, 0]
        : i === 3
            ? [0, 1, 1]
            : [0, 1, 1, 0];

    const scaleOutput = i === 0
        ? [1.2, 1.2, 1]
        : i === 3
            ? [1, 1.2, 1.2]
            : [1, 1.2, 1.2, 1];

    const scale = useTransform(scrollYProgress, input, scaleOutput);
    const activeRatio = useTransform(scrollYProgress, input, outputClasses);
    const inactiveRatio = useTransform(activeRatio, v => 1 - v);

    return (
        <div className="absolute inset-0" style={{ transform: `rotate(${W}deg)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    style={{ rotate: nodeRotate, scale }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-display font-bold text-sm md:text-xl pointer-events-none"
                >
                    {/* Active State Element (Red, glowing) */}
                    <motion.div
                        style={{ opacity: activeRatio }}
                        className="absolute inset-0 rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] border border-red-400"
                    />
                    {/* Inactive State Element (Dark, neutral) */}
                    <motion.div
                        style={{ opacity: inactiveRatio }}
                        className="absolute inset-0 rounded-full bg-zinc-900 border border-white/20"
                    />
                    <span className="relative z-10 text-white">0{i + 1}</span>
                </motion.div>
            </div>
        </div>
    );
}

function StepText({ i, step, scrollYProgress }: { i: number, step: Step, scrollYProgress: MotionValue<number> }) {
    const p = i / 3;
    const input = i === 0
        ? [0, 0.05, 0.16]
        : i === 3
            ? [0.84, 0.95, 1]
            : [p - 0.16, p - 0.05, p + 0.05, p + 0.16];

    const opacityOutput = i === 0
        ? [1, 1, 0]
        : i === 3
            ? [0, 1, 1]
            : [0, 1, 1, 0];

    const opacity = useTransform(scrollYProgress, input, opacityOutput);

    const yMapped = useTransform(
        scrollYProgress,
        input,
        i === 0 ? [0, 0, -30] : i === 3 ? [30, 0, 0] : [30, 0, 0, -30]
    );

    return (
        <motion.div style={{ opacity, y: yMapped }} className="absolute left-0 top-0 w-full flex flex-col items-center text-center px-4 drop-shadow-xl">
            <span className="text-red-500 font-bold tracking-widest text-xs md:text-sm mb-2">SCHRITT 0{i + 1}</span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight">{step.title}</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed drop-shadow-md">{step.description}</p>
        </motion.div>
    );
}

export function CircularProcess({ steps }: CircularProcessProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Circle rotation from 45deg to -45deg
    const circleRotate = useTransform(scrollYProgress, [0, 1], [45, -45]);

    // Angle for each step node along the top edge of the circle
    const angles = [-45, -15, 15, 45]; // Total 90deg spread

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black w-full" data-cursor="scroll">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center">

                {/* Header Section (Full Width, Centered) */}
                <div className="pt-24 md:pt-[15vh] px-6 w-full text-center z-10 relative">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-500 font-semibold uppercase tracking-widest text-sm mb-4 block"
                    >
                        Ablauf
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6"
                    >
                        Vom ersten Kontakt <br className="hidden md:block" />
                        <span className="text-white/40 italic font-serif font-normal">bis zum fertigen System.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-white/50 text-base md:text-xl leading-relaxed"
                    >
                        Ein strukturierter Prozess sorgt für Ergebnisse, die Ihren Arbeitsalltag spürbar entlasten. Wir begleiten Sie bei jedem Schritt.
                    </motion.p>
                </div>

                {/* The Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[45vh] md:top-[50vh] w-[180vw] md:w-[130vw] lg:w-[100vw] aspect-square rounded-full border border-zinc-800 bg-zinc-950/20 backdrop-blur-[20px] md:backdrop-blur-[40px] shadow-[0_0_100px_rgba(255,255,255,0.02)_inset]">
                    <motion.div style={{ rotate: circleRotate }} className="w-full h-full relative rounded-full">
                        {steps.map((_, i) => (
                            <StepNode
                                key={i}
                                i={i}
                                W={angles[i]}
                                circleRotate={circleRotate}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Text Items Inside Arc */}
                <div className="absolute top-[55vh] md:top-[60vh] left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-2xl px-6 z-40 pointer-events-none">
                    {steps.map((step, i) => (
                        <StepText
                            key={i}
                            i={i}
                            step={step}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Bottom Fade Mask to elegantly blend the lower arc into black emptiness */}
                <div className="absolute bottom-0 left-0 right-0 h-[30vh] md:h-[35vh] bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-30" />

            </div>
        </div>
    );
}
