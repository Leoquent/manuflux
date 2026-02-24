'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Mission />

      {/* Trust Section */}
      <section className="py-16 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-white/20 text-[10px] uppercase tracking-[0.4em] mb-12">
            Vertraut von führenden Betrieben
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-50 transition-all duration-700">
            {/* Mock Logos */}
            <div className="text-xl font-bold font-display tracking-tighter">HOLZBAU MÜLLER</div>
            <div className="text-xl font-bold font-display tracking-tighter">ELEKTRO SCHULZ</div>
            <div className="text-xl font-bold font-display tracking-tighter">METALL DESIGN</div>
            <div className="text-xl font-bold font-display tracking-tighter">DACH PROFI</div>
          </div>
        </div>
      </section>

      <Services />
      <Portfolio />
      <Process />

      {/* About Section */}
      <section id="about" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image src="https://picsum.photos/800/800" alt="Das Team" fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-2xl font-bold">Dominik & Taima</p>
                <p className="text-red-500 font-medium">Gründer von manuflux Studio</p>
              </div>
            </motion.div>

            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-red-500 font-semibold uppercase tracking-widest text-sm"
              >
                Über uns
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-display font-bold mt-4 mb-8"
              >
                Wir verstehen <br />
                <span className="text-white/40 italic font-serif tracking-normal">das Handwerk.</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6 text-lg text-white/60 leading-relaxed"
              >
                <p>
                  manuflux Studio wurde gegründet, um die Lücke zwischen traditionellem Handwerk und moderner Technologie zu schließen. Wir wissen, dass Sie keine Zeit für komplizierte IT-Projekte haben.
                </p>
                <p>
                  Deshalb bieten wir Lösungen, die einfach funktionieren. Wir arbeiten direkt mit Ihnen zusammen – ohne Agentur-Strukturen, dafür mit voller Leidenschaft für das beste Ergebnis.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-3 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Direkte Ansprechpartner
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Fokus auf messbare Entlastung
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Langfristige Partnerschaft
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <ContactCTA />
      <Footer />
      <Chatbot />
    </main>
  );
}
