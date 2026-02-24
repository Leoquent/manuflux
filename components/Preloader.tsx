'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface PreloaderProps {
    isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
    // Verhindert das Scrollen während des Ladevorgangs
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            // Auch verhindern, dass Lenis scrollt, falls asynchron gestartet
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    <div className="text-center px-4 max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-7xl font-display font-bold leading-[1.1]"
                        >
                            Exzellenz im Handwerk <br />
                            <motion.span
                                initial={{ opacity: 0, backgroundSize: "0% 2px" }}
                                animate={{ opacity: 1, backgroundSize: "100% 2px" }}
                                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                                className="text-red-600 italic font-serif relative"
                                style={{
                                    paddingBottom: "8px",
                                    backgroundImage: "linear-gradient(to right, #dc2626, #dc2626)",
                                    backgroundPosition: "0 100%",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                effektiv im Netzwerk.
                            </motion.span>
                        </motion.h2>
                    </div>

                    {/* Ladeindikator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex gap-1.5">
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-1.5 h-1.5 rounded-full bg-red-600"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-1.5 h-1.5 rounded-full bg-red-600"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-1.5 h-1.5 rounded-full bg-red-600"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
