import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SectionLightsProps {
  id: string;
  atmosphere?: 'blue' | 'purple' | 'cyan' | 'indigo' | 'silver';
  className?: string;
  children: React.ReactNode;
}

const ATMOSPHERE_STYLES: Record<
  NonNullable<SectionLightsProps['atmosphere']>,
  { topBeam: string; leftGlow: string; rightGlow: string; divider: string }
> = {
  blue: {
    topBeam: 'from-sky-400/25 via-blue-500/10 to-transparent',
    leftGlow: 'bg-sky-500/15',
    rightGlow: 'bg-indigo-500/12',
    divider: 'via-sky-400/50',
  },
  purple: {
    topBeam: 'from-purple-500/25 via-violet-500/10 to-transparent',
    leftGlow: 'bg-purple-500/16',
    rightGlow: 'bg-sky-500/12',
    divider: 'via-purple-400/50',
  },
  cyan: {
    topBeam: 'from-cyan-400/24 via-sky-500/10 to-transparent',
    leftGlow: 'bg-cyan-500/14',
    rightGlow: 'bg-purple-500/12',
    divider: 'via-cyan-400/50',
  },
  indigo: {
    topBeam: 'from-indigo-400/24 via-purple-500/10 to-transparent',
    leftGlow: 'bg-indigo-500/16',
    rightGlow: 'bg-sky-400/12',
    divider: 'via-indigo-400/50',
  },
  silver: {
    topBeam: 'from-slate-300/20 via-sky-400/10 to-transparent',
    leftGlow: 'bg-slate-400/12',
    rightGlow: 'bg-purple-500/12',
    divider: 'via-slate-300/40',
  },
};

/**
 * Wraps each full-screen portfolio section so its stage lights gradually turn on
 * when the visitor scrolls it into the viewport.
 */
export const SectionLights: React.FC<SectionLightsProps> = ({
  id,
  atmosphere = 'blue',
  className = '',
  children,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [lit, setLit] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setLit(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const palette = ATMOSPHERE_STYLES[atmosphere];

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden py-24 sm:py-32 ${className}`}
    >
      {/* Top hairline light divider */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${palette.divider} to-transparent transition-opacity duration-1000 ${
          lit ? 'opacity-100' : 'opacity-15'
        }`}
      />

      {/* Overhead volumetric spotlight that gradually turns on */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-0 h-[440px] w-[min(92vw,960px)] -translate-x-1/2 rounded-b-full bg-gradient-to-b ${palette.topBeam} blur-3xl transition-all duration-[1400ms] ease-out ${
          lit ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      />

      {/* Side atmospheric ambient glows */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full ${palette.leftGlow} blur-[110px] transition-opacity duration-[1600ms] ${
          lit ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full ${palette.rightGlow} blur-[110px] transition-opacity duration-[1600ms] delay-200 ${
          lit ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Section contents with gradual illumination */}
      <div
        className={`relative z-10 transition-all duration-[1000ms] ease-out ${
          lit ? 'opacity-100 translate-y-0' : 'opacity-35 translate-y-6'
        }`}
      >
        {children}
      </div>
    </section>
  );
};
