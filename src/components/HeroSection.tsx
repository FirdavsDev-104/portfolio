import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, BadgeCheck, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionLights } from './SectionLights';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SectionLights
      id="hero"
      atmosphere="blue"
      className="flex min-h-[92vh] items-center justify-center border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#070b14] to-[#040508]"
    >
      {/* Subtle architectural cyber grid */}
      <div aria-hidden="true" className="cyber-grid pointer-events-none absolute inset-0 opacity-45" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-[#0b1120]/85 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_28px_rgba(56,189,248,0.18)]"
        >
          <Sparkles className="h-3.5 w-3.5 text-sky-300" />
          <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-sky-200">
            {t.hero.tag}
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-metallic sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          {t.hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-3xl font-heading text-lg font-semibold tracking-wide text-electric-gradient sm:text-2xl md:text-3xl"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Animated Intro Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.34 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
        >
          {t.hero.introLine}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.46 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 px-6 py-3.5 font-heading text-sm font-bold tracking-wide text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
          >
            <Layers className="h-4 w-4" />
            <span>{t.hero.exploreProjects}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-400/25 bg-white/[0.04] px-6 py-3.5 font-heading text-sm font-semibold tracking-wide text-slate-100 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-500/10"
          >
            <BadgeCheck className="h-4 w-4 text-sky-300" />
            <span>{t.hero.viewIdentity}</span>
          </button>
        </motion.div>

        {/* Glowing Animated Scroll Indicator */}
        <motion.button
          type="button"
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="group mt-16 flex flex-col items-center gap-2.5 focus:outline-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-400 transition-colors group-hover:text-sky-300">
            {t.hero.scrollIndicator}
          </span>
          <div className="relative flex h-12 w-7 items-start justify-center rounded-full border border-sky-400/40 bg-[#080d18]/80 p-1.5 shadow-[0_0_24px_rgba(56,189,248,0.28)]">
            <span className="h-2.5 w-1.5 animate-bounce rounded-full bg-gradient-to-b from-sky-300 to-purple-400 shadow-[0_0_12px_#38bdf8]" />
          </div>
          <ArrowDown className="h-3.5 w-3.5 text-sky-400/80 transition-transform group-hover:translate-y-1" />
        </motion.button>
      </div>
    </SectionLights>
  );
};
