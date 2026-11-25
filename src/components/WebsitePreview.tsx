import React, { useEffect, useRef, useState } from 'react';
import { Globe, Monitor } from 'lucide-react';
import { PortfolioProject } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';

interface WebsitePreviewProps {
  project: PortfolioProject;
  /** Only mount the live iframe when visible or hovered to keep 60fps */
  loadLiveFrame?: boolean;
  className?: string;
}

/**
 * Renders a crisp, zero-layout-shift website preview with an instant cyber-browser
 * fallback layer plus a lazy-loaded scaled live iframe of the actual Netlify website.
 */
export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  project,
  loadLiveFrame = true,
  className = '',
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scale, setScale] = useState(0.32);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [frameError, setFrameError] = useState(false);

  const info = t.projects.items[project.id];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && width > 0) {
        setScale(width / 1280);
      }
    });
    ro.observe(el);

    if (!loadLiveFrame) {
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '180px' }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [loadLiveFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#060912] ${className}`}
    >
      {/* Stylish instant architectural preview (always rendered cleanly underneath) */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-4"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${project.glowColor}, transparent 55%), linear-gradient(145deg, #0b101b 0%, #05070d 100%)`,
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          </div>
          <span className="truncate rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-slate-300">
            {project.domain}
          </span>
        </div>

        <div className="my-auto flex flex-col items-center justify-center text-center">
          <div
            className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 shadow-lg"
            style={{ boxShadow: `0 0 28px ${project.glowColor}` }}
          >
            <Globe className="h-5 w-5 text-sky-300" />
          </div>
          <p className="font-heading text-base font-bold tracking-wide text-white sm:text-lg">
            {info.name}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-sky-300/85">
            {info.category}
          </p>
          {loadLiveFrame && inView && !frameLoaded && !frameError && (
            <div className="mt-3 flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
              <Monitor className="h-3 w-3 animate-pulse" />
              <span>{t.projects.loadingPreview}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span>HTTPS // LIVE</span>
          <span>#{project.number}</span>
        </div>
      </div>

      {/* Real live website iframe scaled cleanly from 1280x800 */}
      {loadLiveFrame && inView && !frameError && (
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            frameLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <iframe
            src={project.url}
            title={info.name}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setFrameLoaded(true)}
            onError={() => setFrameError(true)}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none origin-top-left border-0 bg-[#05070d]"
            style={{
              width: '1280px',
              height: '800px',
              transform: `scale(${scale})`,
            }}
          />
        </div>
      )}

      {/* Subtle glass reflection sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/[0.06]"
      />
    </div>
  );
};
