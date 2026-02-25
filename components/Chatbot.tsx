'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Du bist der KI-Beratungsassistent von manuflux Studio, einer Digitalagentur exklusiv für Handwerksbetriebe.
Dein primäres Ziel ist die interaktive "Lead-Qualifizierung" im Chat (Conversational Lead Generation) und die direkte Terminvereinbarung für ein Gespräch.

Ablauf des Gesprächs (Conversational Quiz):
1. Wenn der Nutzer aus dem "Digital-Check" übergeben wurde, hast du bereits Kontext zu ihm. Zeige, dass du seine Situation kennst, ordne sie professionell ein und präsentiere pragmatische Lösungsansätze (z.B. KI-Mitarbeiter bei Telefongelingel). Mach das direkt in deiner allerersten Antwort auf seine initiale Nachricht oder Begrüßung.
2. Wenn der Nutzer normal (ohne Quiz) reinschreibt, stellst du zu Beginn offene, einladende Fragen, um das Gewerk und den größten Schmerzpunkt (z.B. Zettelwirtschaft, Azubi-Mangel) herauszufinden.
3. Direkte Lead-Generierung: Verweise NICHT auf ein Kontaktformular. Frage stattdessen direkt im Chat nach einem Termin (z.B. "Lass uns dazu gerne kurz quatschen. Wann würde es dir für 15 Minuten ans Telefon passen?").
4. Wenn der Nutzer einen Zeitraum nennt, frage nach der Telefonnummer/E-Mail zur Bestätigung des Termins.

Key Information über manuflux Studio:
- Leistungen: Premium Websites (Fachkräfte-Magnet), Prozess-Automatisierung, KI-Chatbots, E-Mail-Vortsortierung.
- Nutzen: Bis zu 80% Zeitersparnis, endlich freie Wochenenden ohne Papierkram.
- Tonalität: Professionell, auf Augenhöhe, "Handwerker-Sprache" (kein IT-Fachchinesisch). Du schreibst menschlich und pragmatisch.
- Du bleibst immer in deiner Rolle. Versprich keine fixen Preise im Chat, sondern verweise auf das Erstgespräch.
`;

export interface QuizData {
  answers: Record<string, string>;
  user: { name: string; email: string };
}

interface ChatbotProps {
  quizData?: QuizData | null;
  isOpenProp?: boolean;
  onCloseSync?: (state: boolean) => void;
}

export default function Chatbot({ quizData, isOpenProp = false, onCloseSync }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync with external opener (e.g., from Quiz CTA)
  useEffect(() => {
    if (isOpenProp) {
      setIsOpen(true);
    }
  }, [isOpenProp]);

  // Handle initialization of messages based on quizData presence
  useEffect(() => {
    if (quizData && quizData.user.name) {
      // Create a heavily personalized greeting context if coming from quiz
      const branch = quizData.answers['branche'] || 'Handwerk';
      const pain = quizData.answers['painpoint'] || 'zu viel Büroarbeit';
      const goal = quizData.answers['goal'] || 'eine Lösung';

      const personalizedGreeting = `Moin ${quizData.user.name}! Ich habe Ihre Auswertung des Digital-Checks vorliegen. 
Sie sind im Bereich **${branch}** tätig und kämpfen am meisten mit **"${pain}"**. Ihr Ziel: **"${goal}"**.
      
Basierend auf diesen echten Handwerker-Problemen habe ich direkt ein paar Ansätze parat. Wollen Sie wissen, wie wir genau dieses Zeit-Problem in der Praxis für Sie lösen können?`;

      setMessages([
        // Internal prompt structure we inject as 'model' thought or system prompt context is not directly supported by this simple API structure mid-chat, so we just set the chat history context heavily
        { role: 'model', text: personalizedGreeting }
      ]);
    } else if (messages.length === 0) {
      // Default greeting if no quiz data
      setMessages([
        { role: 'model', text: 'Moin! Ich bin der KI-Berater von manuflux. Damit wir nicht um den heißen Brei reden: Aus welchem Gewerk kommen Sie und was stört Sie aktuell am meisten im Büro-Alltag?' }
      ]);
    }
  }, [quizData]);

  // Sync closing state upwards
  const handleToggle = (state: boolean) => {
    setIsOpen(state);
    if (onCloseSync) onCloseSync(state);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat({ role: 'user', text: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const response = await model;
      const responseText = response.text || "Entschuldigung, ich konnte keine Antwort generieren. Bitte versuchen Sie es später erneut.";

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Da ist wohl etwas schiefgelaufen. Bitte kontaktieren Sie uns direkt per E-Mail." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-red-600 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-white">manuflux Assistent</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-red-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ihre Frage..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
                />
                <button onClick={handleSend} disabled={isLoading} className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleToggle(!isOpen)}
        className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}
