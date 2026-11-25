import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  trail: Array<{ x: number; y: number }>;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  trail: Array<{ x: number; y: number }>;
}

const FIREWORK_COLORS = [
  '#38bdf8',
  '#7dd3fc',
  '#818cf8',
  '#a855f7',
  '#c084fc',
  '#f472b6',
  '#e2e8f0',
  '#fde047',
];

export const FireworksFinale: React.FC = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [entered, setEntered] = useState(false);
  const [stage, setStage] = useState<'darkening' | 'active'>(
    reducedMotion ? 'active' : 'darkening'
  );
  const [replayNonce, setReplayNonce] = useState(0);

  // Observe when user reaches final section -> darken, pause, then fire!
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
        }
      },
      { threshold: 0.28 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    if (reducedMotion) {
      setStage('active');
      return;
    }

    setStage('darkening');
    const timer = window.setTimeout(() => {
      setStage('active');
    }, 650);

    return () => clearTimeout(timer);
  }, [entered, reducedMotion, replayNonce]);

  // HTML5 Canvas Realistic Fireworks Engine
  useEffect(() => {
    if (stage !== 'active') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    const explode = (x: number, y: number, primaryColor: string) => {
      const count = reducedMotion ? 24 : width < 640 ? 48 : 82;
      const secondaryColor =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25;
        const speed = 1.6 + Math.random() * 5.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.012,
          color: i % 3 === 0 ? secondaryColor : primaryColor,
          size: 1.5 + Math.random() * 2.2,
          trail: [],
        });
      }
    };

    const launchRocket = () => {
      const color =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      rockets.push({
        x: width * (0.14 + Math.random() * 0.72),
        y: height + 10,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -(6.8 + Math.random() * 3.4),
        targetY: height * (0.16 + Math.random() * 0.34),
        color,
        trail: [],
      });
    };

    // Opening salvo!
    launchRocket();
    const salvo1 = window.setTimeout(launchRocket, 240);
    const salvo2 = window.setTimeout(launchRocket, 520);

    let rafId = 0;
    let frameCount = 0;

    const tick = () => {
      frameCount += 1;

      // Subtle fade trails against deep night sky
      ctx.fillStyle = 'rgba(2, 3, 7, 0.22)';
      ctx.fillRect(0, 0, width, height);

      if (!reducedMotion && frameCount % 36 === 0 && rockets.length < 5) {
        launchRocket();
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.045;

        // Draw rocket trail
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          ctx.globalAlpha = (j / r.trail.length) * 0.85;
          ctx.fillStyle = r.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (r.y <= r.targetY || r.vy >= -0.8) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 6) s.trail.shift();

        s.vx *= 0.985;
        s.vy *= 0.985;
        s.vy += 0.065; // gravity
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        // Glow trail
        if (s.trail.length > 1) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size * 0.75;
          ctx.globalAlpha = s.alpha * 0.55;
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let k = 1; k < s.trail.length; k++) {
            ctx.lineTo(s.trail[k].x, s.trail[k].y);
          }
          ctx.stroke();
        }

        // Spark head
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(salvo1);
      window.clearTimeout(salvo2);
      cancelAnimationFrame(rafId);
    };
  }, [stage, reducedMotion, replayNonce]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="finale"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[#020307] px-5 py-24 text-center sm:px-8"
    >
      {/* Gradual Night Sky Darkening Overlay */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[#010205] transition-opacity duration-1000 ${
          entered ? 'opacity-95' : 'opacity-40'
        }`}
      />

      {/* Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          stage === 'active' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Foreground Sky Messages */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        {stage === 'darkening' && entered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            className="font-mono text-xs tracking-[0.3em] text-sky-300/75"
          >
            {t.finale.preparingSky}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={
            stage === 'active'
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.94, y: 18 }
          }
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-purple-300" />
            <span className="font-mono text-[11px] tracking-[0.24em] text-sky-200">
              FINALE // 014
            </span>
          </div>

          {/* Exact Required Uzbek Sentence in Firework Sky Glow */}
          <h2
            className="font-display text-2xl font-extrabold leading-tight tracking-wide text-white sm:text-4xl md:text-5xl"
            style={{
              textShadow:
                '0 0 24px rgba(56,189,248,0.85), 0 0 55px rgba(168,85,247,0.7), 0 0 90px rgba(56,189,248,0.45)',
            }}
          >
            {t.finale.uzbekSkyMessage}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={stage === 'active' ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="mt-7 font-heading text-lg font-bold tracking-[0.14em] text-electric-gradient sm:text-2xl"
          >
            {t.finale.thankYou}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={stage === 'active' ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.85, delay: 0.8 }}
            className="mt-3 font-mono text-xs tracking-[0.22em] text-slate-300 sm:text-sm"
          >
            {t.finale.seeYou}
          </motion.p>

          {/* Actions: Back To Top + Replay Fireworks */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={stage === 'active' ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.85, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 px-7 py-3.5 font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_55px_rgba(168,85,247,0.65)] sm:text-sm"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              <span>{t.finale.backToTop}</span>
            </button>

            <button
              type="button"
              onClick={() => setReplayNonce((n) => n + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3.5 font-mono text-xs font-medium text-slate-200 backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-500/15 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.finale.replayFireworks}</span>
            </button>
          </motion.div>
        </motion.div>

        <p className="mt-16 font-mono text-[11px] tracking-[0.22em] text-slate-500">
          FIRDAVS ABDUGOFUROV • {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
