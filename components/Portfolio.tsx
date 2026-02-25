'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail';

const projects: FocusRailItem[] = [
  {
    id: 1,
    title: 'Holzbau Müller',
    meta: 'Website & Automatisierung',
    description: 'Vollautomatisierte Kundenanfragen und ein hochmodernes digitales Erscheinungsbild für den traditionellen Holzbau.',
    imageSrc: '/holzbau-mueller.png',
    href: '#',
  },
  {
    id: 2,
    title: 'Elektro Schulz',
    meta: 'Webdesign & KI-Chatbot',
    description: 'Ein intelligenter Assistenzdienst, der Standardanfragen rund um die Uhr beantwortet und Termine koordiniert.',
    imageSrc: '/elektro-schulz.png',
    href: '#',
  },
  {
    id: 3,
    title: 'Metall Design Berlin',
    meta: 'Digitale Markenbildung',
    description: 'Vom Logo bis zum Full-Responsive Webauftritt – eine Marke, die handwerkliche Präzision digital widerspiegelt.',
    imageSrc: '/metall-design.png',
    href: '#',
  },
  {
    id: 4,
    title: 'Dach Profi Nord',
    meta: 'Lead-Qualifizierung',
    description: 'Automatische Filterung und Qualifizierung von Projektanfragen zur Entlastung der Geschäftsführung.',
    imageSrc: '/dach-profi-nord.png',
    href: '#',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState(projects.length);
  const count = projects.length;
  // Standard wrap function
  const activeIndex = ((((active - 0) % count) + count) % count) + 0;

  const handlePrev = useCallback(() => setActive((p) => p - 1), []);
  const handleNext = useCallback(() => setActive((p) => p + 1), []);

  return (
    <section id="portfolio" className="py-24 bg-black overflow-hidden border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="flex-1 min-w-0">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-red-500 font-semibold uppercase tracking-[0.3em] text-sm"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(1.75rem,4vw+1rem,3.75rem)] font-display font-bold mt-4 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Ausgewählte <span className="text-white/40 italic font-serif tracking-normal">Referenzprojekte.</span>
            </motion.h2>
          </div>
        </div>
      </div>

      <div className="w-full">
        <FocusRail
          items={projects}
          active={active}
          setActive={setActive}
          loop={true}
        />
      </div>
    </section>
  );
}
