'use client';

import { motion } from 'motion/react';
import {
  Globe,
  Zap,
  Mail,
  MessageSquare,
  Search,
  Share2,
  ShieldCheck,
  Star,
  Cpu
} from 'lucide-react';

const services = [
  {
    title: 'High-End Websites',
    description: 'Individuelles Webdesign, das Ihre Qualität sichtbar macht und Kunden überzeugt.',
    icon: Globe,
  },
  {
    title: 'Prozess-Automatisierung',
    description: 'Wir automatisieren nervige Computeraufgaben, damit Sie mehr Zeit für Ihr Handwerk haben.',
    icon: Zap,
  },
  {
    title: 'E-Mail Vorsortierung',
    description: 'Automatische Kategorisierung von Rechnungen, Bewerbungen und Anfragen.',
    icon: Mail,
  },
  {
    title: 'KI-Chatbots',
    description: '24/7 Support auf Ihrer Seite, der einfache Anfragen automatisch beantwortet.',
    icon: MessageSquare,
  },
  {
    title: 'SEO-Optimierung',
    description: 'Damit Sie in Ihrer Region gefunden werden, wenn Kunden nach Ihren Leistungen suchen.',
    icon: Search,
  },
  {
    title: 'Social Media',
    description: 'Professionelle Kommunikation auf den Kanälen, die für Ihr Handwerk zählen.',
    icon: Share2,
  },
  {
    title: 'Hosting & Wartung',
    description: 'Wir kümmern uns um die Technik, damit Ihre Seite immer sicher und schnell läuft.',
    icon: ShieldCheck,
  },
  {
    title: 'Bewertungs-Management',
    description: 'Automatisierte Prozesse für mehr 5-Sterne Bewertungen auf Google.',
    icon: Star,
  },
  {
    title: 'Digitale Services',
    description: 'Maßgeschneiderte Lösungen, die individuell auf Ihren Betrieb zugeschnitten sind.',
    icon: Cpu,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-950">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="group relative p-8 rounded-[2rem] bg-transparent border border-transparent transition-all duration-700 hover:bg-white/[0.03] hover:border-white/10 hover:backdrop-blur-xl overflow-hidden"
            >
              {/* Dark Red Background Spot - "Light turns on" effect */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-900/0 blur-[80px] rounded-full group-hover:bg-red-600/20 transition-all duration-700" />
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-red-950/0 blur-[60px] rounded-full group-hover:bg-red-900/10 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <service.icon size={22} strokeWidth={1.5} className="text-white/40 group-hover:text-red-500 transition-colors duration-500 relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white/70 group-hover:text-red-500 transition-colors duration-500">{service.title}</h3>
                </div>
                <p className="text-white/30 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
