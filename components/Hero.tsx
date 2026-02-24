'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { SplineScene } from '@/components/ui/spline-scene';

interface HeroProps {
  onLoaded?: () => void;
}

export default function Hero({ onLoaded }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Bottom fade out to black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* Background Elements - Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        {/* Mobile-optimized radial gradients instead of expensive blur effects */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_60%)] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(153,27,27,0.1)_0%,transparent_60%)] -z-10" />
        <div
          className="absolute inset-0 pointer-events-none sm:pointer-events-auto"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 75%)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 75%)'
          }}
        >
          <SplineScene
            scene="https://prod.spline.design/pB30VHJTW9pXUfet/scene.splinecode"
            className="w-full h-full"
            onLoad={onLoaded}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-red-500 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Digitalisierung für das Handwerk
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[0.9]"
        >
          Webdesign & <br />
          <span className="text-red-600 italic font-serif">Digitale Lösungen</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Wir bauen Websites, die mehr sind als nur eine Visitenkarte. manuflux Studio ist Ihr Partner für Automatisierung, KI-Chatbots und maßgeschneiderte digitale Prozesse im Handwerk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <LiquidButton asChild variant="red" size="xl">
            <Link href="#contact" className="group flex items-center gap-2 font-semibold">
              Projekt starten
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </LiquidButton>
          <LiquidButton asChild size="xl" className="opacity-70 hover:opacity-100 transition-opacity">
            <Link href="#services" className="text-white font-semibold">
              Unsere Leistungen
            </Link>
          </LiquidButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-light text-white/40">
          Scroll
        </span>
        <div className="relative w-[1px] h-16 bg-white/5 overflow-hidden">
          {/* Pulsing Base Line */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-red-600"
          />
          {/* Animated Flowing Gradient */}
          <motion.div
            animate={{
              y: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeIn"
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
