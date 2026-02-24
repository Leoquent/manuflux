'use client';

import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Analyse & Strategie',
    description: 'Wir verstehen Ihren Betrieb und identifizieren die größten Hebel für Digitalisierung.',
  },
  {
    number: '02',
    title: 'Konzept & Design',
    description: 'Wir entwickeln ein individuelles Design und die technische Architektur Ihrer Lösung.',
  },
  {
    number: '03',
    title: 'Umsetzung',
    description: 'Unsere Experten bauen Ihre Website und implementieren die gewünschten Automatisierungen.',
  },
  {
    number: '04',
    title: 'Launch & Optimierung',
    description: 'Nach dem Go-Live begleiten wir Sie und optimieren die Prozesse für maximale Effizienz.',
  },
];

function StepCard({ step, index, progress }: { step: typeof steps[0], index: number, progress: MotionValue<number> }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;

  // Slide up from bottom
  const y = useTransform(progress, [start - 0.15, start, end], [600, 0, 0]);

  // Fade in, then stay visible
  const opacity = useTransform(progress, [start - 0.15, start], [0, 1]);

  // Slight scale down as next cards come in to create depth
  const scale = useTransform(progress, [start, end, end + 0.1], [1, 1, 0.95]);

  // Darken as next cards come in
  const brightness = useTransform(progress, [start, end, end + 0.1], [1, 1, 0.5]);

  // Random rotation that straightens out
  const rotations = [-3, 2, -1.5, 3];
  const initialRotate = rotations[index % rotations.length];
  const rotate = useTransform(progress, [start - 0.15, start], [initialRotate, 0]);

  return (
    <motion.div style={{ y, opacity, scale, rotate, filter: `brightness(${brightness})`, zIndex: index }} className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-8 md:p-12 rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        {/* Background Number */}
        <div className="absolute -right-4 -bottom-8 text-[12rem] font-display font-black text-white/[0.03] select-none">
          {step.number}
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center mb-8">
            <span className="text-xl font-display font-bold text-red-600">{step.number}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{step.title}</h3>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} id="process" className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side: Static Header */}
            <div className="py-12">
              <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
                Ablauf
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-display font-bold mt-4 mb-8">
                Vom ersten Kontakt <br />
                <span className="text-white/40 italic font-serif tracking-normal">bis zum fertigen System.</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/40 text-lg max-w-sm leading-relaxed">
                Ein strukturierter Prozess sorgt für Ergebnisse, die Ihren Arbeitsalltag spürbar entlasten. Wir begleiten Sie bei jedem Schritt.
              </motion.p>

              {/* Progress Indicator */}
              <div className="mt-12 flex gap-2">
                {steps.map((_, i) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const dotOpacity = useTransform(scrollYProgress, [i * 0.25, (i + 1) * 0.25], [0.2, 1]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const dotScale = useTransform(scrollYProgress, [i * 0.25, (i + 1) * 0.25], [1, 1.5]);
                  return (
                    <motion.div key={i} style={{ opacity: dotOpacity, scale: dotScale }} className="w-2 h-2 rounded-full bg-red-600" />
                  );
                })}
              </div>
            </div>

            {/* Right Side: Animated Cards */}
            <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
              {steps.map((step, index) => (
                <StepCard key={step.number} step={step} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


