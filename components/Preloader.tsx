'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface PreloaderProps {
    isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
    const [animationDone, setAnimationDone] = useState(false);
    const [showContent, setShowContent] = useState(true);

    // Verhindert das Scrollen während des Ladevorgangs
    useEffect(() => {
        if (showContent) {
            document.body.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [showContent]);

    // Steuerungslogik für das Ausblenden
    useEffect(() => {
        if (!isLoading && animationDone) {
            // Kleiner Puffer nach Animationsende für bessere Wirkung
            const timer = setTimeout(() => {
                setShowContent(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isLoading, animationDone]);

    const line1 = "Exzellenz im Handwerk";
    const line2 = "effizient im Netzwerk.";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                delayChildren: 0.5,
            }
        }
    };

    const charVariants: any = {
        hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const underlineVariants: any = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 1.5,
                delay: 2.5,
                ease: "circOut"
            }
        }
    };

    return (
        <AnimatePresence onExitComplete={() => setAnimationDone(true)}>
            {showContent && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    {/* Subtiler Hintergrund-Effekt */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_0)] bg-[size:40px_40px]" />

                    <div className="text-center px-4 max-w-5xl mx-auto z-10">
                        <motion.h2
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            onAnimationComplete={() => {
                                // Verzögertes Signal für "Bereit zum Ausblenden"
                                setTimeout(() => setAnimationDone(true), 2000);
                            }}
                            className="text-3xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight"
                        >
                            <div className="overflow-hidden mb-4">
                                {line1.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        variants={charVariants}
                                        className="inline-block text-white"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="overflow-hidden flex flex-wrap justify-center items-center">
                                {line2.split(" ").map((word, i) => (
                                    <span key={i} className="relative inline-block py-2 mx-2">
                                        {word.split("").map((char, j) => (
                                            <motion.span
                                                key={j}
                                                variants={charVariants}
                                                className="inline-block text-red-600 italic font-serif"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                        {i === line2.split(" ").length - 1 && (
                                            <motion.span
                                                variants={underlineVariants}
                                                className="absolute bottom-1 left-0 w-full h-[3px] bg-red-600 origin-left"
                                            />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </motion.h2>
                    </div>

                    {/* Ladeindikator - Modern & Fortschrittlich */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                    >
                        <div className="w-56 h-[1px] bg-white/5 relative overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: isLoading ? "0%" : "100%" }}
                                transition={{
                                    duration: isLoading ? 4 : 1,
                                    ease: isLoading ? "linear" : "circOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <motion.span
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-medium"
                            >
                                {isLoading ? "System-Architektur wird geladen" : "Bereit für den Start"}
                            </motion.span>
                            {!isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[9px] text-red-600/50 uppercase tracking-widest font-bold"
                                >
                                    Eintauchen
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


