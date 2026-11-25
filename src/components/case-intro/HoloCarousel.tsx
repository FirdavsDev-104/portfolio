import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Pause, RotateCw, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WebsitePreview } from '../WebsitePreview';

interface HoloCarouselProps {
  visible: boolean;
}

export const HoloCarousel: React.FC<HoloCarouselProps> = ({ visible }) => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const [angle, setAngle] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [touchPaused, setTouchPaused] = useState(false);
  const [radius, setRadius] = useState(330);

  const angleRef = useRef(0);
  const velocityRef = useRef(0.18); // deg per frame (~11 deg/sec)
  const isPausedRef = useRef(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragLastXRef = useRef<number>(0);
  const didDragRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = Boolean(hoveredId) || touchPaused;
  }, [hoveredId, touchPaused]);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(205);
      else if (w < 768) setRadius(255);
      else if (w < 1024) setRadius(320);
      else setRadius(380);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    let rafId = 0;
    const tick = () => {
      const targetVel = isPausedRef.current || dragStartXRef.current !== null ? 0 : 0.2;
      velocityRef.current += (targetVel - velocityRef.current) * 0.08;
      if (Math.abs(velocityRef.current) > 0.001) {
        angleRef.current = (angleRef.current + velocityRef.current) % 360;
        setAngle(angleRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [visible, reducedMotion]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    dragStartXRef.current = e.touches[0].clientX;
    dragLastXRef.current = e.touches[0].clientX;
    didDragRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartXRef.current === null || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - dragLastXRef.current;
    if (Math.abs(currentX - dragStartXRef.current) > 8) {
      didDragRef.current = true;
    }
    dragLastXRef.current = currentX;
    angleRef.current = (angleRef.current + deltaX * 0.42) % 360;
    setAngle(angleRef.current);
  };

  const handleTouchEnd = () => {
    dragStartXRef.current = null;
  };

  const openWebsite = (project: PortfolioProject) => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  const stepAngle = 360 / PORTFOLIO_PROJECTS.length;

  return (
    <div
      className={`relative mx-auto flex w-full max-w-6xl flex-col items-center transition-all duration-1000 ${
        visible ? 'pointer-events-auto opacity-100 translate-y-0 scale-100' : 'pointer-events-none opacity-0 translate-y-10 scale-95'
      }`}
    >
      {/* 3D Stage */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="perspective-1600 relative flex h-[350px] w-full select-none items-center justify-center touch-pan-y sm:h-[400px] md:h-[430px]"
      >
        {/* Central vertical energy pillar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-500/25 via-indigo-500/20 to-purple-500/25 blur-3xl"
        />

        {/* Rotating Ring */}
        <div
          className="preserve-3d relative flex h-full w-full items-center justify-center"
          style={{
            transform: `rotateX(-6deg) rotateY(${angle}deg)`,
          }}
        >
          {PORTFOLIO_PROJECTS.map((project, idx) => {
            const itemAngle = idx * stepAngle;
            const isHovered = hoveredId === project.id;
            const info = t.projects.items[project.id];

            // Compute normalized facing angle so back cards gently dim for realistic depth
            const totalDeg = (((itemAngle + angle) % 360) + 360) % 360;
            const facingRad = (totalDeg * Math.PI) / 180;
            const frontness = (Math.cos(facingRad) + 1) / 2; // 1 = front, 0 = back
            const cardRadius = isHovered ? radius + 44 : radius;

            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`${info.name} — ${t.intro.visitWebsite}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId((cur) => (cur === project.id ? null : cur))}
                onFocus={() => setHoveredId(project.id)}
                onBlur={() => setHoveredId((cur) => (cur === project.id ? null : cur))}
                onClick={() => {
                  if (didDragRef.current) return;
                  openWebsite(project);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openWebsite(project);
                  }
                }}
                className="group absolute cursor-pointer focus:outline-none"
                style={{
                  width: 'clamp(200px, 44vw, 276px)',
                  transform: `rotateY(${itemAngle}deg) translateZ(${cardRadius}px) scale(${
                    isHovered ? 1.1 : 0.88 + frontness * 0.12
                  })`,
                  transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease',
                  zIndex: isHovered ? 40 : Math.round(frontness * 20),
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border bg-[#070b14]/92 p-2.5 backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? 'border-sky-300/80 shadow-[0_24px_65px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.45),0_0_70px_rgba(168,85,247,0.3)]'
                      : 'border-sky-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(56,189,248,0.14)]'
                  }`}
                  style={{
                    opacity: isHovered ? 1 : 0.62 + frontness * 0.38,
                  }}
                >
                  {/* Animated holographic top reflection */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent"
                  />

                  {/* Website Live Preview */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                    <WebsitePreview
                      project={project}
                      loadLiveFrame={visible}
                      className="h-full w-full"
                    />
                    <span className="absolute left-2 top-2 rounded-md border border-sky-400/35 bg-[#050811]/85 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-sky-300">
                      #{project.number}
                    </span>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-2.5 px-1 pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-heading text-sm font-bold text-white sm:text-base">
                        {info.name}
                      </h3>
                      <Sparkles
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                          isHovered ? 'text-sky-300' : 'text-purple-400/70'
                        }`}
                      />
                    </div>
                    <p className="truncate font-mono text-[10px] text-slate-400">
                      {project.domain}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWebsite(project);
                      }}
                      className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold tracking-wider transition-all ${
                        isHovered
                          ? 'bg-gradient-to-r from-sky-400 to-purple-500 text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.5)]'
                          : 'border border-sky-400/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20'
                      }`}
                    >
                      <span>{t.intro.visitWebsite}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Status & Touch Controls */}
      <div className="mt-1 flex flex-wrap items-center justify-center gap-3 px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#090d16]/85 px-3.5 py-1.5 font-mono text-[11px] text-slate-300 backdrop-blur-md">
          {hoveredId || touchPaused ? (
            <>
              <Pause className="h-3 w-3 text-sky-300" />
              <span className="text-sky-200">{t.intro.carouselPaused}</span>
            </>
          ) : (
            <>
              <RotateCw className="h-3 w-3 animate-spin text-purple-300" style={{ animationDuration: '5s' }} />
              <span>{t.intro.carouselHint}</span>
            </>
          )}
        </span>

        {/* Helpful mobile touch pause/resume toggle */}
        <button
          type="button"
          onClick={() => setTouchPaused((p) => !p)}
          className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 font-mono text-[11px] text-sky-200 transition hover:bg-sky-500/20 sm:hidden"
        >
          {touchPaused ? '▶' : '⏸'}
        </button>
      </div>
    </div>
  );
};
