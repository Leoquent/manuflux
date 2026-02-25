'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, X, ChevronDown } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const steps = [
    {
        id: 'branche',
        question: 'In welchem Gewerk/Bereich sind Sie tätig?',
        isDropdown: true,
        options: [
            'Bau- & Ausbaugewerbe (Maurer, Dachdecker, Maler...)',
            'Holzgewerbe (Tischler, Schreiner, Parkettleger...)',
            'Metall- & Elektrogewerbe (Metallbau, Elektriker...)',
            'Bekleidungs- & Textilgewerbe',
            'Lebensmittelgewerbe (Bäcker, Fleischer...)',
            'Fahrzeug- & Maschinenbau (Kfz...)',
            'Glas- & Keramikgewerbe',
            'Gesundheits- & Pflegegewerbe',
            'Dienstleistungsgewerbe (Friseure...)'
        ],
        placeholder: 'Welchen Handwerksberuf üben Sie genau aus?'
    },
    {
        id: 'painpoint',
        question: 'Was frisst aktuell am meisten Zeit in Ihrem Büro?',
        options: [
            'Angebote & Rechnungen tippen',
            'E-Mail Chaos & Spam bearbeiten',
            'Mitarbeiter & Azubis finden',
            'Kundenanfragen am Telefon klären'
        ],
        placeholder: 'Oder beschreiben Sie hier Ihr größtes Problem...'
    },
    {
        id: 'goal',
        question: 'Was ist Ihr primäres Ziel für dieses Jahr?',
        options: [
            'Wieder freie Wochenenden ohne Zettel',
            'Mehr lukrative Top-Aufträge',
            '2-3 neue Top-Gesellen einstellen',
            'Reibungslose digitale Prozesse'
        ],
        placeholder: 'Oder nennen Sie uns Ihr individuelles Ziel...'
    }
];

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    // Triggered when quiz is done. Passes the collected answers.
    onComplete: (answers: Record<string, string>, user: { name: string, email: string }) => void;
}

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleOptionSelect = (option: string) => {
        setAnswers(prev => ({ ...prev, [steps[currentStep].id]: option }));

        // Disable auto-advance for the first step as requested
        if (currentStep > 0 && currentStep < steps.length - 1) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 400);
        } else if (currentStep > 0 && currentStep === steps.length - 1) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 400);
        }
    };

    const isStepValid = useMemo(() => {
        const step = steps[currentStep];
        if (!step) return true;

        const selection = answers[step.id];
        const text = customInputs[step.id];

        if (step.id === 'branche') {
            return selection && text && text.trim().length > 1;
        }

        return selection || (text && text.trim().length > 0);
    }, [currentStep, answers, customInputs]);

    const handleNext = () => {
        if (currentStep < steps.length && isStepValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        const finalAnswers = { ...answers };
        Object.keys(customInputs).forEach(key => {
            if (customInputs[key]) {
                const combined = (finalAnswers[key] ? finalAnswers[key] + " / Details: " : "") + customInputs[key];
                finalAnswers[key] = combined;
            }
        });

        onComplete(finalAnswers, formData);
    };

    const progress = (currentStep / steps.length) * 100;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center relative z-10 shrink-0">
                            <div>
                                <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Kostenloser Digital-Check</span>
                                <p className="text-white/60 text-sm mt-1">Status-Quo Analyse</p>
                            </div>
                            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                                <X size={20} className="text-white/70" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/5 shrink-0">
                            <motion.div
                                className="h-full bg-red-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 relative overflow-y-auto overflow-x-hidden custom-scrollbar min-h-[400px]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {currentStep < steps.length ? (
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10 h-full flex flex-col"
                                    >
                                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
                                            {steps[currentStep].question}
                                        </h2>

                                        <div className="flex-1 space-y-6">
                                            {steps[currentStep].isDropdown ? (
                                                <div className="relative group">
                                                    <select
                                                        value={answers[steps[currentStep].id] || ''}
                                                        onChange={(e) => handleOptionSelect(e.target.value)}
                                                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all font-medium cursor-pointer"
                                                    >
                                                        <option value="" disabled className="bg-zinc-900">Bitte Branche wählen...</option>
                                                        {steps[currentStep].options.map((opt, i) => (
                                                            <option key={i} value={opt} className="bg-zinc-900 py-2">{opt}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-hover:text-red-500 transition-colors">
                                                        <ChevronDown size={20} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 gap-3">
                                                    {steps[currentStep].options.map((option, idx) => {
                                                        const isSelected = answers[steps[currentStep].id] === option;
                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleOptionSelect(option)}
                                                                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center group
                                                                    ${isSelected
                                                                        ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                                                                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'}`}
                                                            >
                                                                <span className="font-medium text-[15px]">{option}</span>
                                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ml-4
                                                                    ${isSelected ? 'bg-red-500 border-red-500' : 'border-white/20 group-hover:border-white/40'}`}>
                                                                    {isSelected && <CheckCircle2 size={12} className="text-white" />}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            <div className="relative pt-2">
                                                <input
                                                    type="text"
                                                    placeholder={steps[currentStep].placeholder}
                                                    value={customInputs[steps[currentStep].id] || ''}
                                                    onChange={(e) => setCustomInputs(prev => ({ ...prev, [steps[currentStep].id]: e.target.value }))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all font-medium"
                                                />
                                                {steps[currentStep].id === 'branche' && (
                                                    <p className="text-[11px] text-white/30 mt-2 px-1 italic">* Bitte wählen Sie eine Kategorie UND geben Sie Ihren Beruf ein.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-10 mt-auto">
                                            <button
                                                onClick={handlePrev}
                                                className={`text-white/40 hover:text-white transition-colors flex items-center gap-2 ${currentStep === 0 ? 'invisible' : ''}`}
                                            >
                                                Zurück
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                disabled={!isStepValid}
                                                className={`px-8 py-3 rounded-full transition-all flex items-center gap-2 font-bold shadow-lg
                                                    ${isStepValid
                                                        ? 'bg-red-600 hover:bg-red-500 text-white scale-100 hover:scale-105'
                                                        : 'bg-white/5 text-white/20 blur-[0.5px] cursor-not-allowed'}`}
                                            >
                                                Weiter
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative z-10 text-center"
                                    >
                                        <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h2 className="text-3xl font-display font-bold mb-4">Fast geschafft!</h2>
                                        <p className="text-white/60 mb-8 max-w-sm mx-auto">
                                            Wohin dürfen wir die individuelle Analyse für Ihren Betrieb senden?
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto text-left">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all"
                                            />
                                            <input
                                                type="email"
                                                placeholder="E-Mail Adresse"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all"
                                            />

                                            <div className="pt-4">
                                                <LiquidButton type="submit" variant="outline-white" size="xl" className="w-full [&_button]:w-full">
                                                    <span className="flex items-center justify-center gap-3 font-bold text-lg py-2">
                                                        Ergebnis im KI-Chat ansehen
                                                        <ArrowRight size={22} className="ml-1" />
                                                    </span>
                                                </LiquidButton>
                                            </div>
                                            <p className="text-center w-full text-[10px] text-white/40 pt-4 px-4 line-clamp-2">Ihre Daten sind sicher. 100% DSGVO-konform. Mit dem Klick akzeptieren Sie unsere Datenschutzerklärung.</p>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
