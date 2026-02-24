'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const missionText = "Dem Handwerk das Upgrade auf 2.0 maximal erleichtern. Mit individuellen Lösungen für jeden Betrieb.";
const words = missionText.split(" ");

const highlights = ["Upgrade", "2.0", "individuellen", "Lösungen"];

function Word({ word, index, total, progress }: { word: string, index: number, total: number, progress: any }) {
  // Animation starts earlier and finishes earlier to give some breathing room at the end
  const animationStart = 0;
  const animationEnd = 0.8;
  const range = animationEnd - animationStart;

  const start = animationStart + (index / total) * range;
  const end = animationStart + ((index + 1) / total) * range;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blurValue = useTransform(progress, [start, end], [10, 0]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const isHighlighted = highlights.some(h => word.includes(h));

  return (
    <motion.span style={{ opacity, filter, y }} className={`text-4xl md:text-7xl font-display font-bold tracking-tight ${isHighlighted ? 'text-red-600 italic font-serif' : 'text-white'}`}>
      {word}
    </motion.span>
  );
}

export default function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-black -mt-32 z-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="max-w-6xl w-full text-center -translate-y-24 md:-translate-y-32">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm mb-12 block">
            Unsere Mission
          </motion.span>

          <div className="flex flex-wrap justify-center gap-x-[0.6em] gap-y-6">
            {words.map((word, i) => (
              <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
            ))}
          </div>

        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] -z-10" />
      </div>
    </section>
  );
}
