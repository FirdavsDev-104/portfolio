import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Fingerprint, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { PERSONAL_IDENTITY } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionLights } from './SectionLights';

export const IdCardSection: React.FC = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardWrapperRef.current) return;
    const rect = cardWrapperRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 24;
    const rotateX = (0.5 - py) * 20;

    setTilt({ rotateX, rotateY });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.75 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const toggleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <SectionLights
      id="about"
      atmosphere="purple"
      className="border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#090d18] to-[#040508]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 font-mono text-[11px] tracking-[0.22em] text-purple-200">
            <Fingerprint className="h-3.5 w-3.5 text-sky-300" />
            {t.idCard.sectionEyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-metallic sm:text-5xl">
            {t.idCard.sectionTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-300/85 sm:text-base">
            {t.idCard.sectionSubtitle}
          </p>
        </motion.div>

        {/* Interactive 3D Identification Card */}
        <div className="mx-auto flex max-w-[660px] flex-col items-center">
          <div
            ref={cardWrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={toggleFlip}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={t.idCard.clickToFlip}
            className="perspective-1600 group relative w-full cursor-pointer select-none focus:outline-none"
          >
            {/* Outer ambient aura */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[36px] bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-purple-500/20 opacity-75 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Tilt Wrapper (follows mouse) */}
            <div
              className="preserve-3d relative w-full transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              {/* Flip Wrapper (rotates 180deg on click) */}
              <div
                className="preserve-3d relative grid w-full transition-transform duration-700"
                style={{
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* ==================== FRONT SIDE ==================== */}
                <div className="backface-hidden animated-cyber-border brushed-titanium relative col-start-1 row-start-1 overflow-hidden rounded-[28px] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)] sm:p-8 md:p-9">
                  {/* Holographic Scanlines & Specular Mouse Glare */}
                  <div aria-hidden="true" className="holo-scanlines pointer-events-none absolute inset-0 opacity-60" />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                      opacity: glare.opacity,
                      background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(56,189,248,0.28), rgba(168,85,247,0.14) 40%, transparent 72%)`,
                    }}
                  />

                  {/* Top Metadata Strip */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-300/15 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-300/40 bg-sky-400/15 shadow-[0_0_18px_rgba(56,189,248,0.3)]">
                        <ShieldCheck className="h-4 w-4 text-sky-300" />
                      </span>
                      <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-slate-200">
                        {t.idCard.badgeHeader}
                      </span>
                    </div>
                    <span className="rounded-full border border-sky-400/35 bg-sky-500/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-sky-200">
                      {t.idCard.verifiedChip}
                    </span>
                  </div>

                  {/* Card Main Grid */}
                  <div className="relative z-10 mt-6 grid gap-6 sm:grid-cols-[150px_1fr] sm:items-center">
                    {/* Holographic Silver-Blue Emblem & Chip */}
                    <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-stretch">
                      <div className="relative flex h-32 w-28 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-300/30 bg-gradient-to-br from-slate-200/15 via-sky-500/10 to-purple-500/20 shadow-inner sm:h-40 sm:w-full">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.35),transparent_65%)]" />
                        <span className="relative font-display text-5xl font-extrabold tracking-tighter text-metallic">
                          FA
                        </span>
                        <span className="relative mt-1.5 font-mono text-[10px] tracking-[0.25em] text-sky-300">
                          ID // 014
                        </span>
                      </div>

                      {/* Metallic Smart Chip + ID Code */}
                      <div className="flex flex-1 flex-col gap-2 rounded-xl border border-white/10 bg-black/30 p-3 sm:flex-initial">
                        <div className="flex items-center justify-between">
                          <Cpu className="h-5 w-5 text-slate-300" />
                          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                        </div>
                        <span className="font-mono text-[10px] tracking-wider text-slate-400">
                          {PERSONAL_IDENTITY.badgeCode}
                        </span>
                      </div>
                    </div>

                    {/* Identity Fields */}
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-[#070b14]/75 px-3.5 py-2.5">
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-sky-300/80">
                          {t.idCard.firstNameLabel}
                        </span>
                        <span className="mt-0.5 block font-heading text-lg font-bold tracking-wide text-white">
                          {PERSONAL_IDENTITY.firstName}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-[#070b14]/75 px-3.5 py-2.5">
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-sky-300/80">
                          {t.idCard.lastNameLabel}
                        </span>
                        <span className="mt-0.5 block font-heading text-lg font-bold tracking-wide text-white">
                          {PERSONAL_IDENTITY.lastName}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-[#070b14]/75 px-3.5 py-2.5 sm:col-span-2">
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-sky-300/80">
                          {t.idCard.patronymicLabel}
                        </span>
                        <span className="mt-0.5 block font-heading text-base font-semibold tracking-wide text-slate-100 sm:text-lg">
                          {PERSONAL_IDENTITY.patronymic}
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-[#070b14]/75 px-3.5 py-2.5">
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-purple-300/85">
                          {t.idCard.ageLabel}
                        </span>
                        <span className="mt-0.5 block font-heading text-xl font-bold text-electric-gradient">
                          {PERSONAL_IDENTITY.age}
                        </span>
                      </div>

                      <div className="rounded-xl border border-sky-400/25 bg-gradient-to-br from-sky-500/15 to-purple-500/15 px-3.5 py-2.5">
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-sky-300">
                          {t.idCard.roleLabel}
                        </span>
                        <span className="mt-0.5 block font-heading text-sm font-bold tracking-wider text-white sm:text-base">
                          {t.idCard.roleValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Micro-UI & Flip Hint */}
                  <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-300/15 pt-3.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                      <span className="inline-block h-1.5 w-8 rounded-full bg-gradient-to-r from-sky-400 to-purple-400" />
                      <span>HOLO-AUTH // V2</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-sky-300">
                      <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
                      {t.idCard.clickToFlip}
                    </span>
                  </div>
                </div>

                {/* ==================== BACK SIDE (ABOUT ME) ==================== */}
                <div
                  className="backface-hidden animated-cyber-border relative col-start-1 row-start-1 flex flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b1120] via-[#070a13] to-[#110b22] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.92)] sm:p-8 md:p-9"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  {/* Animated subtle background glows */}
                  <div aria-hidden="true" className="holo-scanlines pointer-events-none absolute inset-0 opacity-50" />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-sky-500/15 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-purple-500/15 blur-3xl"
                  />

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-300" />
                      <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-sky-200">
                        {t.idCard.backHeader}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-purple-300/90">
                      {t.idCard.backTagline}
                    </span>
                  </div>

                  {/* Exact About Me Story */}
                  <div className="relative z-10 my-auto space-y-3 py-5 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                    {t.idCard.aboutParagraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === t.idCard.aboutParagraphs.length - 1
                            ? 'pt-1 font-heading font-semibold text-electric-gradient'
                            : ''
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[10px] tracking-widest text-slate-400">
                      {PERSONAL_IDENTITY.firstName.toUpperCase()} {PERSONAL_IDENTITY.lastName.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-purple-300">
                      <RefreshCw className="h-3.5 w-3.5" />
                      {t.idCard.flipToFront}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit accessible button below card */}
          <button
            type="button"
            onClick={toggleFlip}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-[#0a101d]/85 px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.18)] transition hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{flipped ? t.idCard.flipToFront : t.idCard.flipToBack}</span>
          </button>
        </div>
      </div>
    </SectionLights>
  );
};
