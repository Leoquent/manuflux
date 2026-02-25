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
import WhyChooseUs from '@/components/WhyChooseUs';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import Chatbot, { QuizData } from '@/components/Chatbot';
import Preloader from '@/components/Preloader';
import QuizModal from '@/components/QuizModal';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleQuizComplete = (answers: Record<string, string>, user: { name: string, email: string }) => {
    setIsQuizOpen(false);
    setQuizData({ answers, user });
    setIsChatbotOpen(true);
  };

  useEffect(() => {
    // Fallback: Falls Spline nach 3.5 Sekunden nicht geladen hat, Seite trotzdem anzeigen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <Preloader isLoading={isLoading} />
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
      <Hero onLoaded={() => setIsLoading(false)} onOpenQuiz={() => setIsQuizOpen(true)} />
      <Mission />

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
                  manuflux Studio wurde gegründet, um die Lücke zwischen traditionellem Handwerk und moderner Technologie zu schließen. Schluss mit der Zettelwirtschaft am Sonntag und dem ständigen Telefonklingeln auf dem Gerüst. Wir wissen, dass Sie keine Zeit für komplizierte IT-Projekte haben.
                </p>
                <p>
                  Deshalb bieten wir Lösungen, die messbar entlasten. Wir arbeiten direkt mit Ihnen zusammen – ohne Agentur-Strukturen, dafür mit voller Leidenschaft für das perfekte Ergebnis.
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

      <WhyChooseUs />
      <FAQ />
      <ContactCTA onOpenQuiz={() => setIsQuizOpen(true)} />
      <Footer />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
      <Chatbot
        quizData={quizData}
        isOpenProp={isChatbotOpen}
        onCloseSync={setIsChatbotOpen}
      />
    </main>
  );
}
