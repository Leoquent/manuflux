'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const missionText = "Das Upgrade 2.0 dem Handwerk maximal erleichtern. Mit individuellen Lösungen für jeden Betrieb.";
const words = missionText.split(" ");

const highlights = ["Upgrade", "2.0", "individuellen", "Lösungen"];

function Word({ word, index, total, progress }: { word: string, index: number, total: number, progress: any }) {
  // Animation timing for the words
  const animationStart = 0.0;
  const animationEnd = 0.7;
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
    // Start tracking when the container starts entering the screen limit (60% down)
    offset: ['start 60%', 'end end'],
  });

  // Trust section slies in right after the text finishes building up
  const trustOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const trustY = useTransform(scrollYProgress, [0.75, 0.85], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black -mt-32 z-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="max-w-6xl w-full text-center -translate-y-24 md:-translate-y-36">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm mb-12 block">
            Unsere Mission
          </motion.span>

          <div className="flex flex-wrap justify-center gap-x-[0.6em] gap-y-6 mb-20 md:mb-0">
            {words.map((word, i) => (
              <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Integrated Trust Section sliding up, moved further up */}
        <motion.div
          style={{ opacity: trustOpacity, y: trustY }}
          className="absolute bottom-32 md:bottom-48 left-0 right-0 w-full"
        >
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-white/20 text-[10px] uppercase tracking-[0.4em] mb-12">
              Vertraut von führenden Betrieben
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-50 transition-all duration-700">
              <div className="text-xl font-bold font-display tracking-tighter">HOLZBAU MÜLLER</div>
              <div className="text-xl font-bold font-display tracking-tighter">ELEKTRO SCHULZ</div>
              <div className="text-xl font-bold font-display tracking-tighter">METALL DESIGN</div>
              <div className="text-xl font-bold font-display tracking-tighter">DACH PROFI</div>
            </div>
          </div>
        </motion.div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] -z-10" />
      </div>
    </section>
  );
}
