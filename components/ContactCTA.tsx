'use client';

import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function ContactCTA() {
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
                Kontakt
              </motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-display font-bold mt-4 mb-8">
                Bereit für den <br />
                <span className="text-red-600 italic font-serif">nächsten Schritt?</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-lg text-white/60 mb-12 leading-relaxed">
                Lassen Sie uns in einem 15-minütigen Gespräch klären, wie wir Ihren Betrieb digital nach vorne bringen können. Unverbindlich und ehrlich.
              </motion.p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Mail size={20} className="text-red-500 group-hover:text-white" />
                  </div>
                  <span className="text-lg font-medium">hallo@manuflux.studio</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Phone size={20} className="text-red-500 group-hover:text-white" />
                  </div>
                  <span className="text-lg font-medium">+49 (0) 123 456 789</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <MapPin size={20} className="text-red-500 group-hover:text-white" />
                  </div>
                  <span className="text-lg font-medium">Berlin, Deutschland</span>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-8 text-center">Jetzt Termin anfragen</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" suppressHydrationWarning className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" />
                  <input type="text" placeholder="Betrieb" suppressHydrationWarning className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" />
                </div>
                <input type="email" placeholder="E-Mail" suppressHydrationWarning className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors" />
                <textarea placeholder="Wie können wir helfen?" rows={4} suppressHydrationWarning className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors resize-none" />
                <LiquidButton variant="red" size="xl" className="w-full">
                  <span className="flex items-center justify-center gap-2 font-bold text-lg">
                    Anfrage senden
                    <ArrowRight size={20} />
                  </span>
                </LiquidButton>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
