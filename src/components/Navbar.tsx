import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, TRANSLATIONS } from '../i18n/translations';

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'journey', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: Array<{ id: SectionId; label: string }> = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'journey', label: t.nav.journey },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const languages: Language[] = ['uz', 'en', 'ru'];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-3.5 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? 'glass-cyber shadow-[0_18px_50px_rgba(0,0,0,0.8)]'
            : 'border border-white/10 bg-[#070a12]/65 backdrop-blur-xl'
        }`}
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-sky-400/35 bg-gradient-to-br from-sky-500/20 via-[#0d1322] to-purple-500/25 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4 text-sky-300" />
          </span>
          <div className="leading-tight">
            <span className="block font-heading text-sm font-bold tracking-wider text-white sm:text-base">
              FIRDAVS
            </span>
            <span className="block font-mono text-[10px] tracking-[0.2em] text-sky-300/80">
              ABDU.DEV
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative rounded-xl px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-200 xl:text-sm ${
                  isActive ? 'text-white' : 'text-slate-300/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-xl border border-sky-400/35 bg-gradient-to-r from-sky-500/20 to-purple-500/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Language Switcher + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3-Language Switcher */}
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-[#0b101b]/90 p-1"
          >
            <Globe className="ml-1.5 mr-1 hidden h-3.5 w-3.5 text-sky-300/80 sm:block" />
            {languages.map((lang) => {
              const active = language === lang;
              const meta = TRANSLATIONS[lang].meta;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`relative flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold tracking-wider transition-all sm:px-2.5 sm:text-xs ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="lang-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sky-500/35 to-purple-500/35 ring-1 ring-sky-400/40"
                    />
                  )}
                  <span aria-hidden="true">{meta.flag}</span>
                  <span>{meta.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={mobileOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0b101b]/90 text-slate-200 transition hover:border-sky-400/40 lg:hidden"
          >
            <div className="flex h-4 w-5 flex-col items-center justify-between">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[7px] rotate-45 bg-sky-300' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'scale-x-0 opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[7px] -rotate-45 bg-purple-300' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass-cyber mx-auto mt-2.5 max-w-7xl overflow-hidden rounded-2xl p-3 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? 'border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-white'
                        : 'border border-white/5 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
