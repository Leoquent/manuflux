'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import {
  Globe,
  Zap,
  Mail,
  MessageSquare,
  Search,
  Share2,
  ShieldCheck,
  Star,
  Cpu,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: 'High-End Websites',
    feature: 'Individuelles Design & technische Exzellenz.',
    benefit: 'Ein professioneller Auftritt, der sofort Vertrauen schafft und als automatischer Magnet für Neukunden und Top-Fachkräfte in Ihrer Region wirkt.',
    icon: Globe,
  },
  {
    title: 'Sicheres Hosting & Wartung',
    feature: 'Rundum-Sorglos-Paket & 100% DSGVO-konform.',
    benefit: 'Keine IT-Kopfschmerzen mehr. Wir kümmern uns um alles – zum fairen Festpreis und ohne Knebelverträge. Sie zahlen für Ergebnisse, nicht für unsere Arbeitszeit.',
    icon: ShieldCheck,
  },
  {
    title: 'Regionale SEO-Optimierung',
    feature: 'Gezielte Sichtbarkeit in Suchmaschinen.',
    benefit: 'Werden Sie genau dann gefunden, wenn lukrative Kunden aus Ihrer unmittelbaren Region aktiv nach Hilfe suchen – ohne Streuverluste.',
    icon: Search,
  },
  {
    title: 'Premium KI-Chatbots',
    feature: 'Intelligente 24/7 Dialog-Systeme für Ihre Website.',
    benefit: 'Ihr digitaler Mitarbeiter, der nie schläft. Er qualifiziert Anfragen vor und beantwortet Standardfragen, damit auf dem Gerüst endlich Ruhe herrscht.',
    icon: MessageSquare,
  },
  {
    title: 'E-Mail Vorsortierung',
    feature: 'Automatisierte KI-Filterung Ihrer Postfächer.',
    benefit: 'Schluss mit zeitraubendem Spam und Chaos. Sie erhalten nur noch absolut relevante Anfragen direkt sortiert – das spart Stunden an Administration.',
    icon: Mail,
  },
  {
    title: 'Prozess-Automatisierung',
    feature: 'Digitale Workflows & intelligente Software-Brücken.',
    benefit: 'Wir vernetzen Ihre Systeme. Bis zu 80% Zeitersparnis bei wiederkehrenden administrativen Aufgaben. Das Wochenende gehört wieder der Familie.',
    icon: Zap,
  },
  {
    title: 'Social Media Management',
    feature: 'Redaktionsplanung & KI-generierte Inhalte.',
    benefit: 'Eine constante, professionelle Präsenz auf relevanten Kanälen durch smarte Content-Erstellung – ohne dass Sie selbst vor der Kamera stehen müssen.',
    icon: Share2,
  },
  {
    title: 'Bewertungs-Management',
    feature: 'Zufriedene Kunden automatisch nach Feedback fragen.',
    benefit: 'Sammeln Sie auf Autopilot konstante 5-Sterne-Bewertungen, die Ihre handwerkliche Qualität schwarz auf weiß im Internet belegen.',
    icon: Star,
  },
  {
    title: 'Maßgeschneiderte Digitale Services',
    feature: 'Entwicklung individueller Software-Lösungen.',
    benefit: 'Spezialwerkzeuge, die exakt jene nervigen Engpässe und Abläufe in Ihrem Betrieb lösen, an denen Standard-Software scheitert.',
    icon: Cpu,
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-zinc-950 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
            Leistungen
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-display font-bold mt-4">
            Digitale Werkzeuge für <br />
            <span className="text-white/40 italic font-serif tracking-normal">moderne Handwerksbetriebe.</span>
          </motion.h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Left Column - Directory */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-1 relative">
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div key={service.title} className="flex flex-col group">
                  <button
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left flex items-center justify-between p-3 md:p-3.5 rounded-full transition-all duration-400 border relative overflow-hidden
                      ${isActive
                        ? 'bg-white/[0.04] border-white/10 shadow-[0_0_20px_rgba(220,38,38,0.03)]'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-50 pointer-events-none" />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`absolute -left-3.5 md:-left-4 w-1 h-6 bg-red-500 rounded-r-full transition-all duration-500 origin-left ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                      <service.icon
                        size={18}
                        strokeWidth={1.5}
                        className={`transition-colors duration-500 ${isActive ? 'text-red-500' : 'text-white/40 group-hover:text-white/70'}`}
                      />
                      <h3 className={`text-sm md:text-base font-medium tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                        {service.title}
                      </h3>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-500 relative z-10 ${isActive ? 'rotate-90 md:rotate-0 text-red-500' : 'text-white/10 group-hover:text-white/30'} md:block`}
                    />
                  </button>

                  {/* Mobile Content Display (Accordion style) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden"
                      >
                        <div className="px-4 pb-6 pt-2 space-y-4 border-b border-white/5 group-last:border-none">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Welche Funktion</span>
                            <p className="text-white/70 text-sm mt-1">{service.feature}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Ihr Nutzen</span>
                            <p className="text-white/90 text-sm mt-1 leading-relaxed">{service.benefit}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column - Desktop Content Display */}
          <div className="hidden md:flex flex-col justify-center sticky top-32 md:col-span-8 lg:col-span-9 h-[500px] lg:h-[550px] p-12 lg:p-16 rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden group">
            {/* Background glows */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-red-600/20" />
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-900/10 blur-[80px] rounded-full transition-all duration-700 group-hover:bg-red-900/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="space-y-12">
                  <h3 className="text-4xl lg:text-6xl font-display font-bold text-white tracking-tight">
                    {services[activeService].title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-white/5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Die Funktion</span>
                      </div>
                      <p className="text-xl lg:text-2xl text-white/80 leading-relaxed font-medium">
                        {services[activeService].feature}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Konkreter Nutzen</span>
                      </div>
                      <p className="text-xl lg:text-2xl text-white/50 leading-relaxed font-light italic">
                        {services[activeService].benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scroll progress indicator for the services */}
            <div className="absolute left-0 bottom-0 h-1 bg-white/5 w-full">
              <motion.div
                className="h-full bg-red-500/50"
                initial={false}
                animate={{ width: `${((activeService + 1) / services.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
