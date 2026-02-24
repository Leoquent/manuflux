'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Logo size={32} />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-display font-bold tracking-tight">manuflux</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-red-500 font-medium">Studio</span>
              </div>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Wir begleiten Handwerksbetriebe auf dem Weg in die digitale Zukunft. Mit High-End Webdesign und intelligenten Automatisierungen.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link href="#services" className="hover:text-red-500 transition-colors">Leistungen</Link></li>
              <li><Link href="#portfolio" className="hover:text-red-500 transition-colors">Portfolio</Link></li>
              <li><Link href="#process" className="hover:text-red-500 transition-colors">Ablauf</Link></li>
              <li><Link href="#about" className="hover:text-red-500 transition-colors">Über uns</Link></li>
              <li><Link href="#faq" className="hover:text-red-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Rechtliches</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link href="#" className="hover:text-red-500 transition-colors">Impressum</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition-colors">Datenschutz</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} manuflux Studio. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/40 hover:text-red-500 transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-white/40 hover:text-red-500 transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="text-white/40 hover:text-red-500 transition-colors">
              <Facebook size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
