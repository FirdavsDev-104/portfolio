import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 950;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 350);
        }, 180);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040508] px-6"
          aria-live="polite"
        >
          {/* Ambient radial glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#38bdf8]/15 via-[#8b5cf6]/15 to-transparent blur-3xl" />
          </div>

          <div className="relative flex w-full max-w-sm flex-col items-center text-center">
            {/* Metallic hex emblem */}
            <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-400/30 bg-[#0b101b]/90 shadow-[0_0_45px_rgba(56,189,248,0.25)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/20 via-transparent to-purple-500/20" />
              <span className="font-display text-3xl font-extrabold tracking-tight text-electric-gradient">
                F
              </span>
              <span className="absolute -bottom-1.5 rounded-full border border-sky-400/40 bg-[#05070d] px-2 py-0.5 font-mono text-[10px] tracking-widest text-sky-300">
                014
              </span>
            </div>

            <p className="font-mono text-xs tracking-[0.28em] text-sky-300/90">
              {progress < 100 ? t.loader.initializing : t.loader.ready}
            </p>
            <p className="mt-2 text-xs tracking-wider text-slate-400">
              {t.loader.loadingAssets}
            </p>

            {/* Progress bar */}
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 p-[1px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a855f7] shadow-[0_0_16px_rgba(56,189,248,0.75)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex w-full items-center justify-between font-mono text-[11px] text-slate-400">
              <span>FIRDAVS.DEV</span>
              <span className="text-sky-300">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
