'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const navLinks = [
  { name: 'Leistungen', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Ablauf', href: '#process' },
  { name: 'Über uns', href: '#about' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: scrolled ? 0 : '-100%', opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none bg-black/95 backdrop-blur-md border-b border-white/10 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={40} />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-display font-bold tracking-tight">manuflux</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-medium">Studio</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
          <LiquidButton variant="red" size="default" onClick={onOpenQuiz}>
            <span className="font-semibold cursor-pointer">
              Kostenloser Digital-Check
            </span>
          </LiquidButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden pointer-events-auto"
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-lg font-medium text-white/70 hover:text-white" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <LiquidButton variant="red" size="xl" onClick={() => { setIsOpen(false); onOpenQuiz?.(); }}>
              <span className="w-full text-center font-semibold cursor-pointer">
                Kostenloser Digital-Check
              </span>
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
