import React, { Component, useCallback, useEffect, useState } from 'react';
import { ArrowDown, Lock, RotateCcw, SkipForward, Sparkles, Unlock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CaseDropCanvas, CasePhase } from './CaseDropCanvas';
import { HoloCarousel } from './HoloCarousel';

class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const CaseDropSection: React.FC = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const [webglAvailable] = useState(() => hasWebGLSupport());
  const [phase, setPhase] = useState<CasePhase>(reducedMotion ? 'revealed' : 'sky');
  const [unlockStep, setUnlockStep] = useState<number>(reducedMotion ? 2 : 0);
  const [impactPulse, setImpactPulse] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [runId, setRunId] = useState(0);

  const runSequence = useCallback(() => {
    if (reducedMotion) {
      setPhase('revealed');
      setUnlockStep(2);
      return;
    }

    setPhase('sky');
    setUnlockStep(0);
    setShaking(false);

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase('falling'), 350));
    timers.push(
      window.setTimeout(() => {
        setPhase('impact');
        setImpactPulse((p) => p + 1);
        setShaking(true);
      }, 950)
    );
    timers.push(window.setTimeout(() => setShaking(false), 1650));
    timers.push(window.setTimeout(() => setPhase('charging'), 1750));
    timers.push(
      window.setTimeout(() => {
        setPhase('unlocking');
        setUnlockStep(1);
      }, 2400)
    );
    timers.push(window.setTimeout(() => setUnlockStep(2), 2950));
    timers.push(window.setTimeout(() => setPhase('opening'), 3550));
    timers.push(window.setTimeout(() => setPhase('revealed'), 4450));

    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  useEffect(() => {
    const cleanup = runSequence();
    return cleanup;
  }, [runSequence, runId]);

  const skipIntro = () => {
    setShaking(false);
    setUnlockStep(2);
    setPhase('revealed');
  };

  const replayIntro = () => {
    setRunId((n) => n + 1);
  };

  const scrollToHero = () => {
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isRevealed = phase === 'revealed';
  const isOpeningOrRevealed = phase === 'opening' || phase === 'revealed';

  // Graceful CSS 3D CS2 Case Fallback if WebGL fails or isn't supported
  const cssCaseFallback = (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div
        className={`relative flex h-44 w-72 flex-col items-center justify-center rounded-2xl border transition-all duration-700 sm:w-80 ${
          isOpeningOrRevealed
            ? 'border-sky-400/70 bg-[#0d1526]/90 shadow-[0_0_80px_rgba(56,189,248,0.45),0_0_120px_rgba(168,85,247,0.35)]'
            : 'border-slate-500/40 bg-[#101624]/90 shadow-[0_20px_60px_rgba(0,0,0,0.85)]'
        }`}
        style={{
          transform:
            phase === 'sky'
              ? 'translateY(-140px) scale(0.8)'
              : phase === 'falling'
                ? 'translateY(0px) scale(1.04)'
                : 'translateY(12px) scale(1)',
        }}
      >
        <div className="flex items-center gap-3">
          {unlockStep >= 1 ? (
            <Unlock className="h-5 w-5 text-sky-300" />
          ) : (
            <Lock className="h-5 w-5 text-slate-400" />
          )}
          <span className="font-mono text-xs tracking-[0.25em] text-slate-200">
            CS2 // CASE 014
          </span>
          {unlockStep >= 2 ? (
            <Unlock className="h-5 w-5 text-purple-300" />
          ) : (
            <Lock className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <p className="mt-2 font-mono text-[10px] tracking-widest text-sky-300/75">
          {t.intro.webglFallbackNote}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className={`relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#040508] pb-12 pt-24 sm:pt-28 ${
        shaking ? 'animate-impact-shake' : ''
      }`}
    >
      {/* Atmospheric Dark Sky & Volumetric Clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.42),rgba(4,5,8,0.96)_70%)]" />
        {/* Moving cloud layers */}
        <div className="absolute -left-24 top-10 h-72 w-[620px] rounded-full bg-sky-500/10 blur-[110px]" />
        <div className="absolute -right-24 top-24 h-80 w-[640px] rounded-full bg-purple-600/12 blur-[120px]" />
        {/* Impact light burst */}
        <div
          className={`absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${
            isOpeningOrRevealed
              ? 'bg-gradient-to-tr from-sky-500/25 via-indigo-500/20 to-purple-500/25 opacity-100 blur-[90px] scale-110'
              : phase === 'impact'
                ? 'bg-sky-400/35 opacity-100 blur-[70px] scale-125'
                : 'opacity-0 scale-75'
          }`}
        />
      </div>

      {/* Top HUD Bar */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-8">
        <div className="flex items-center gap-2.5 rounded-full border border-sky-400/25 bg-[#090d16]/80 px-3.5 py-1.5 backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${
              isRevealed
                ? 'bg-sky-400 shadow-[0_0_12px_#38bdf8]'
                : 'animate-pulse bg-purple-400 shadow-[0_0_12px_#a855f7]'
            }`}
          />
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-slate-200">
            {t.intro.phases[phase]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isRevealed ? (
            <button
              type="button"
              onClick={skipIntro}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 font-mono text-xs font-medium text-slate-200 backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-500/15 hover:text-white"
            >
              <span>{t.intro.skip}</span>
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={replayIntro}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 font-mono text-xs font-medium text-slate-300 backdrop-blur-md transition hover:border-purple-400/50 hover:bg-purple-500/15 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.intro.replay}</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Stage: 3D Case Canvas + 3D Circular Website Carousel */}
      <div className="relative z-10 my-auto flex min-h-[470px] w-full flex-col items-center justify-center sm:min-h-[540px]">
        {/* 3D WebGL Case Layer */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isRevealed ? 'opacity-65' : 'opacity-100'
          }`}
        >
          {webglAvailable ? (
            <WebGLErrorBoundary fallback={cssCaseFallback}>
              <CaseDropCanvas
                phase={phase}
                unlockStep={unlockStep}
                impactPulse={impactPulse}
              />
            </WebGLErrorBoundary>
          ) : (
            cssCaseFallback
          )}
        </div>

        {/* Floating 3D Holographic Carousel emerging from inside the opened case */}
        <div className="relative z-20 w-full px-2 sm:px-6">
          <HoloCarousel visible={isRevealed} />
        </div>
      </div>

      {/* Bottom Transition CTA to Main Portfolio */}
      <div className="relative z-20 mx-auto mt-4 flex flex-col items-center px-4 text-center">
        <button
          type="button"
          onClick={scrollToHero}
          className="group inline-flex items-center gap-2.5 rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_32px_rgba(56,189,248,0.22)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-sky-300 hover:shadow-[0_0_45px_rgba(56,189,248,0.4)] sm:text-sm"
        >
          <Sparkles className="h-4 w-4 text-sky-300" />
          <span>{t.intro.enterPortfolio}</span>
          <ArrowDown className="h-4 w-4 text-purple-300 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
};
