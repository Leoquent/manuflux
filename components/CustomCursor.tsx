'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Mouse } from 'lucide-react';

type CursorVariant = 'default' | 'hover' | 'scroll';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is a touch device to disable custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isClickable = target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      const isScrollable = target.closest('[data-cursor="scroll"]');

      if (isClickable) {
        setCursorVariant('hover');
      } else if (isScrollable) {
        setCursorVariant('scroll');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: cursorVariant === 'scroll' ? 72 : cursorVariant === 'hover' ? 40 : 16,
        height: cursorVariant === 'scroll' ? 72 : cursorVariant === 'hover' ? 40 : 16,
        backgroundColor: cursorVariant === 'scroll' ? 'rgba(220, 38, 38, 0.9)' : 'rgba(220, 38, 38, 1)',
        mixBlendMode: cursorVariant === 'scroll' ? 'normal' : 'difference'
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {cursorVariant === 'scroll' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center justify-center text-white"
          >
            <span className="text-xs font-bold leading-none mb-1">Scroll</span>
            <Mouse size={20} className="opacity-90" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
