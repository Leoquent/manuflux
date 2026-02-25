'use client';

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface PricingProps {
    onOpenQuiz: () => void;
}

const tiers = [
    {
        name: 'Starter',
        subtitle: 'Digitales Fundament',
        price: '199',
        description: 'Für Betriebe, die erstmal "sauber" im Netz stehen wollen.',
        features: [
            'Professionelles Basis-Hosting',
            'Lokales SEO (Google Unternehmensprofil)',
            'Automatisches Bewertungssystem',
        ],
        notIncluded: [
            'KI-Chatbot & Terminbuchung',
            'Social Recruiting Funnels',
            'KI-Telefonassistent',
        ],
        buttonText: 'Jetzt unverbindlich anfragen',
        highlighted: false,
    },
    {
        name: 'Meistgekauft',
        subtitle: 'Automatisierungs-Turbo',
        price: '499',
        description: 'Der Sweet Spot, der administrativ am meisten Zeit spart.',
        features: [
            'Alles aus dem Starter-Paket',
            'KI-Chatbot für 24/7 Kunden-Service',
            '"Anruf-verpasst"-Automatisierung',
            'Smarte Terminbuchung & Qualifizierung',
        ],
        notIncluded: [
            'Social Recruiting Funnels',
            'KI-Telefonassistent',
        ],
        buttonText: 'Jetzt unverbindlich anfragen',
        highlighted: true,
    },
    {
        name: 'Premium',
        subtitle: 'Wachstum & Recruiting',
        price: '999',
        prefix: 'ab ',
        description: 'Für Betriebe mit akutem Fachkräftemangel & Expansionsplänen.',
        features: [
            'Das komplette Automatisierungs-Paket',
            'Social Recruiting Funnels (Mitarbeitergewinnung)',
            'Intelligenter KI-Telefonassistent',
            'Laufendes Social Media Management',
        ],
        notIncluded: [],
        buttonText: 'Jetzt unverbindlich anfragen',
        highlighted: false,
    },
];

export default function Pricing({ onOpenQuiz }: PricingProps) {
    return (
        <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-500 font-semibold uppercase tracking-widest text-sm"
                    >
                        Investition
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-white"
                    >
                        Transparente <span className="text-white/40 italic font-serif tracking-normal">Preise.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg"
                    >
                        Ein digitales Betriebssystem, das sich rechnet.
                        Vergleichen Sie diese Investition mit den Kosten eines ineffizienten Büros oder einer unbesetzten Stelle.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (index + 1) }}
                            className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 ${tier.highlighted
                                ? 'bg-white/[0.04] border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.05)]'
                                : 'bg-white/[0.02] border-white/5'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(220,38,38,0.5)] z-20 whitespace-nowrap">
                                    Meistgekauft
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-red-400 font-medium mb-4 text-sm uppercase tracking-wider">{tier.subtitle}</p>
                                <div className="flex items-baseline gap-2 mb-4 h-[60px]">
                                    {tier.prefix && <span className="text-white/60 text-lg">{tier.prefix}</span>}
                                    <span className="text-5xl font-bold text-white">{tier.price}€</span>
                                    <span className="text-white/60">/ Monat</span>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed min-h-[60px]">{tier.description}</p>
                            </div>

                            <div className="flex-1 space-y-6 mb-8">
                                <ul className="space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-3 text-sm text-white/80">
                                            <Check className="w-5 h-5 text-red-500 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {tier.notIncluded.map((feature) => (
                                        <li key={feature} className="flex gap-3 text-sm text-white/30">
                                            <X className="w-5 h-5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/5 text-center">
                                <LiquidButton
                                    onClick={onOpenQuiz}
                                    variant={tier.highlighted ? 'red' : 'outline-white'}
                                    noScale={!tier.highlighted}
                                    className="w-full justify-center"
                                >
                                    {tier.buttonText}
                                </LiquidButton>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-left max-w-3xl">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <span className="text-red-500">*</span> Wichtiger Hinweis
                        </h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Die hier genannten Preise sind grobe Schätzungen und Erfahrungswerte zur Orientierung.
                            Jeder Betrieb ist einzigartig. Der finale Preis variiert und richtet sich immer individuell nach
                            Ihren genauen Zielen, Vorstellungen und dem tatsächlichen Arbeitsaufwand.
                            Einmalige Einrichtungs- und Setup-Kosten können je nach System-Umfang zusätzlich anfallen.
                        </p>
                    </div>
                </motion.div>

            </div>

            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
