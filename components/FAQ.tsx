'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Was kostet eine Website bei manuflux Studio?',
    answer: 'Wir arbeiten ausschließlich mit fairen Festpreisen. Warum? Weil wir das klassische System "Geld gegen Zeit" ablehnen. Sie zahlen für das fertige Produkt und Ihre Zeitersparnis, nicht für unsere Arbeitsstunden. Ein hochwertiges Paket startet meist im mittleren vierstelligen Bereich – ohne versteckte Kosten.',
  },
  {
    question: 'Wie lange dauert die Umsetzung?',
    answer: 'In der Regel dauert ein Projekt von der Strategie bis zum Launch zwischen 4 und 8 Wochen, je nachdem wie schnell Inhalte bereitgestellt werden und wie komplex die digitalen Lösungen sind.',
  },
  {
    question: 'Muss ich mich um das Hosting kümmern?',
    answer: 'Nein, wir bieten ein Rundum-Sorglos-Paket an. Wir kümmern uns um Hosting, Wartung und Updates – zum monatlichen Fixpreis und ohne Knebelverträge. Sie können flexibel abspringen, denn wir überzeugen durch Leistung, nicht durch lange Laufzeiten.',
  },
  {
    question: 'Können bestehende Systeme angebunden werden?',
    answer: 'Ja, wir prüfen im Erstgespräch Ihre aktuelle Software (z.B. Branchensoftware für Handwerker) und schauen, wie wir diese sinnvoll mit Ihrer neuen Website oder Automatisierungen verknüpfen können.',
  },
  {
    question: 'Bieten Sie auch SEO und Marketing an?',
    answer: 'Absolut. Eine Website bringt nur etwas, wenn sie auch gefunden wird. Wir optimieren Ihre Seite für lokale Suchanfragen und unterstützen Sie bei Bedarf auch bei Social Media und Google Ads.',
  },
];

export default function FAQ({ onOpenChat }: { onOpenChat?: () => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
            Häufige Fragen
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-display font-bold mt-4">
            Alles, was Sie <br />
            <span className="text-white/40 italic font-serif tracking-normal">wissen müssen.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold pr-8">{faq.question}</span>
                <ChevronDown className={`text-red-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="p-6 pt-0 text-white/50 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-full text-center"
        >
          <p className="text-white/40 text-sm">
            Noch Fragen offen? Unser <button onClick={onOpenChat} className="text-red-500 font-semibold italic hover:underline decoration-red-500/30 underline-offset-4 transition-all">KI-Bot</button> steht Ihnen rund um die Uhr zur Verfügung!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
