'use client';

import { motion } from 'motion/react';
import { Clock, Banknote, Wrench } from 'lucide-react';

const reasons = [
    {
        icon: Clock,
        title: 'Minimaler Zeitaufwand',
        description: 'Nur 2-4 Stunden Ihrer Zeit für den gesamten Aufbau. Wir wissen, wie wichtig Ihr Kerngeschäft ist.'
    },
    {
        icon: Banknote,
        title: 'Volle Kostentransparenz',
        description: 'Keine versteckten IT-Fallen oder unerwarteten Rechnungen. Wir setzen auf klare monatliche Fixpreise.'
    },
    {
        icon: Wrench,
        title: 'Fokus aufs Handwerk',
        description: 'Wir sprechen Ihre Sprache. Kein IT-Kauderwelsch, sondern pragmatische Lösungen für den echten Baustellen-Alltag.'
    }
];

export default function WhyChooseUs() {
    return (
        <section id="whyus" className="py-24 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-red-500 font-semibold uppercase tracking-widest text-sm">
                        Warum manuflux Studio
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-display font-bold mt-4">
                        Kein Risiko. <br />
                        <span className="text-white/40 italic font-serif tracking-normal">Volle Kontrolle.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                                <reason.icon className="text-red-500 group-hover:text-white transition-colors" size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
                            <p className="text-white/60 leading-relaxed font-medium">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
