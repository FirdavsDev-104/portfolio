import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionLights } from './SectionLights';
import { WebsitePreview } from './WebsitePreview';

gsap.registerPlugin(ScrollTrigger);

const ProjectTiltCard: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const info = t.projects.items[project.id];

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 9,
      ry: (px - 0.5) * 11,
    });
    setSpot({ x: px * 100, y: py * 100, active: true });
  };

  const onMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSpot((s) => ({ ...s, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="project-card-item perspective-1600 group"
    >
      <article
        className="animated-cyber-border glass-panel relative flex h-full flex-col overflow-hidden rounded-[26px] p-4 transition-transform duration-200 ease-out sm:p-5"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          boxShadow: spot.active
            ? `0 28px 70px rgba(0,0,0,0.9), 0 0 42px ${project.glowColor}`
            : '0 22px 60px rgba(0,0,0,0.82)',
        }}
      >
        {/* Dynamic cursor reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spot.active ? 1 : 0,
            background: `radial-gradient(circle 240px at ${spot.x}% ${spot.y}%, rgba(56,189,248,0.16), transparent 70%)`,
          }}
        />

        {/* Website Live Preview Frame */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10"
        >
          <WebsitePreview project={project} loadLiveFrame={true} className="h-full w-full" />

          {/* Top overlay badges */}
          <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            <span className="rounded-lg border border-white/15 bg-[#04060c]/85 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-slate-200 backdrop-blur-md">
              #{project.number}
            </span>
            <span className="rounded-full border border-sky-400/35 bg-[#04060c]/85 px-2.5 py-1 font-mono text-[9px] tracking-wider text-sky-300 backdrop-blur-md">
              {t.projects.livePreviewBadge}
            </span>
          </div>
        </a>

        {/* Content */}
        <div className="relative z-10 mt-5 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] font-medium tracking-wider text-purple-300">
                  {info.category}
                </span>
                <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight text-white">
                  {info.name}
                </h3>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${info.name} — ${t.projects.exploreButton}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-slate-200 transition-all duration-300 group-hover:border-sky-400/60 group-hover:bg-sky-500/15 group-hover:text-sky-200"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
              {info.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="truncate font-mono text-xs text-slate-400">
              {project.domain}
            </span>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 px-4 py-2.5 font-heading text-xs font-bold tracking-wider text-sky-100 ring-1 ring-sky-400/35 transition-all duration-300 hover:from-sky-400 hover:to-purple-500 hover:text-slate-950 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]"
            >
              <span>{t.projects.exploreButton}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 46, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            delay: (index % 2) * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <SectionLights
      id="projects"
      atmosphere="cyan"
      className="border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#070d16] to-[#040508]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 font-mono text-[11px] tracking-[0.22em] text-sky-200">
            <Layers className="h-3.5 w-3.5 text-purple-300" />
            {t.projects.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-metallic sm:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-3 font-heading text-base text-slate-300/85 sm:text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        {/* 6 Interactive Website Cards */}
        <div ref={gridRef} className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-9">
          {PORTFOLIO_PROJECTS.map((project) => (
            <ProjectTiltCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </SectionLights>
  );
};
