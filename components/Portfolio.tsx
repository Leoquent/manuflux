'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const projects = [
  {
    title: 'Holzbau Müller',
    category: 'Website & Automatisierung',
    image: 'https://picsum.photos/seed/holzbau/1200/800',
  },
  {
    title: 'Elektro Schulz',
    category: 'Webdesign & KI-Chatbot',
    image: 'https://picsum.photos/seed/elektro/1200/800',
  },
  {
    title: 'Metall Design Berlin',
    category: 'Digitale Markenbildung',
    image: 'https://picsum.photos/seed/metall/1200/800',
  },
  {
    title: 'Dach Profi Nord',
    category: 'Lead-Qualifizierung',
    image: 'https://picsum.photos/seed/dach/1200/800',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
              Portfolio
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-display font-bold mt-4">
              Ausgewählte <br />
              <span className="text-white/40 italic font-serif tracking-normal">Referenzprojekte.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-white/5">
                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">{project.title}</h3>
                  <p className="text-white/40 font-medium">{project.category}</p>
                </div>
                <LiquidButton size="icon" className="w-12 h-12">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </LiquidButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
