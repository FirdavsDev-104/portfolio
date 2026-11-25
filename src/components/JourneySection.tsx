import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionLights } from './SectionLights';

gsap.registerPlugin(ScrollTrigger);

export const JourneySection: React.FC = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 72%',
              end: 'bottom 78%',
              scrub: true,
            },
          }
        );
      }

      const nodes = gsap.utils.toArray<HTMLElement>('.journey-milestone');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <SectionLights
      id="journey"
      atmosphere="silver"
      className="border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#080b14] to-[#040508]"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/25 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] tracking-[0.22em] text-slate-200">
            <Compass className="h-3.5 w-3.5 text-sky-300" />
            {t.journey.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-metallic sm:text-5xl">
            {t.journey.title}
          </h2>
        </div>

        {/* Highlighted Centerpiece Quote */}
        <div className="animated-cyber-border glass-cyber mx-auto mb-16 max-w-3xl rounded-3xl px-6 py-7 text-center sm:px-10">
          <Sparkles className="mx-auto mb-3 h-5 w-5 text-sky-300" />
          <p className="font-heading text-xl font-bold tracking-tight text-electric-gradient sm:text-2xl md:text-3xl">
            “{t.journey.highlightQuote}”
          </p>
        </div>

        {/* Cinematic Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-3xl pl-8 sm:pl-12">
          {/* Background track spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-3 top-2 w-0.5 bg-slate-800/90 sm:left-5"
          />
          {/* Animated glowing progress spine */}
          <div
            ref={progressBarRef}
            aria-hidden="true"
            className="absolute bottom-2 left-3 top-2 w-0.5 origin-top bg-gradient-to-b from-sky-400 via-indigo-400 to-purple-500 shadow-[0_0_18px_rgba(56,189,248,0.85)] sm:left-5"
          />

          <div className="space-y-8">
            {t.journey.milestones.map((item) => (
              <div key={item.step} className="journey-milestone relative">
                {/* Glowing Milestone Node */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[29px] top-6 flex h-5 w-5 items-center justify-center rounded-full border border-sky-300 bg-[#050811] shadow-[0_0_18px_rgba(56,189,248,0.7)] sm:-left-[37px]"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-sky-300 to-purple-400" />
                </div>

                <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-sky-400/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.12)] sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-sky-400/35 bg-sky-500/10 px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-sky-300">
                      {item.step}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLights>
  );
};
