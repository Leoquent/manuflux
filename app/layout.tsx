import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import { LiquidFilters } from '@/components/ui/liquid-glass-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'manuflux Studio | Digitale Lösungen für das Handwerk',
  description: 'Wir automatisieren und vereinfachen Ihren Arbeitsalltag. High-End Websites & maßgeschneiderte digitale Lösungen für Handwerksbetriebe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          {children}
          <LiquidFilters />
        </SmoothScroll>
      </body>
    </html>
  );
}

