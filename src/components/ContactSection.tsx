import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Info,
  Instagram,
  Mail,
  MessageSquare,
  Send,
  X,
} from 'lucide-react';
import { CONTACT_PLACEHOLDERS, EditableContactItem } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionLights } from './SectionLights';

const CONTACT_ICONS: Record<EditableContactItem['id'], React.ReactNode> = {
  telegram: <Send className="h-5 w-5 text-sky-300" />,
  github: <Github className="h-5 w-5 text-slate-200" />,
  instagram: <Instagram className="h-5 w-5 text-purple-300" />,
  email: <Mail className="h-5 w-5 text-indigo-300" />,
};

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<EditableContactItem | null>(null);

  const handleAction = (item: EditableContactItem) => {
    if (item.href && !item.isPlaceholder) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedPlaceholder(item);
  };

  return (
    <SectionLights
      id="contact"
      atmosphere="purple"
      className="border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#090c17] to-[#030407]"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 font-mono text-[11px] tracking-[0.22em] text-purple-200">
            <MessageSquare className="h-3.5 w-3.5 text-sky-300" />
            {t.contact.eyebrow}
          </span>

          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-metallic sm:text-5xl md:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-heading text-base text-slate-300/90 sm:text-xl">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Contact Buttons Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_PLACEHOLDERS.map((item, idx) => {
            const label = t.contact.links[item.id];
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleAction(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="animated-cyber-border glass-panel group flex flex-col items-start justify-between gap-4 rounded-2xl p-5 text-left transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_32px_rgba(168,85,247,0.22)]"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#0a101d] transition-transform duration-300 group-hover:scale-110">
                    {CONTACT_ICONS[item.id]}
                  </span>
                  {item.isPlaceholder && (
                    <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-sky-300">
                      {t.contact.placeholderTag}
                    </span>
                  )}
                </div>

                <div>
                  <span className="block font-heading text-base font-bold text-white">
                    {label}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[11px] text-slate-400">
                    {item.placeholderHandle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Transparent Editable Placeholder Notice */}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-slate-400/15 bg-[#090d17]/80 px-5 py-4 text-left backdrop-blur-md">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
          <div className="text-xs leading-relaxed text-slate-300/85">
            <p className="font-semibold text-slate-100">{t.contact.placeholderBannerTitle}</p>
            <p className="mt-1">{t.contact.placeholderBannerText}</p>
          </div>
        </div>
      </div>

      {/* Modal for Editable Placeholder Info */}
      <AnimatePresence>
        {selectedPlaceholder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlaceholder(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-cyber relative w-full max-w-md rounded-3xl p-6"
            >
              <button
                type="button"
                onClick={() => setSelectedPlaceholder(null)}
                aria-label={t.contact.modalClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/15">
                  {CONTACT_ICONS[selectedPlaceholder.id]}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {t.contact.modalTitle}
                  </h3>
                  <span className="font-mono text-xs text-sky-300">
                    {t.contact.links[selectedPlaceholder.id]}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {t.contact.modalDescription}
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-slate-300">
                {selectedPlaceholder.placeholderHandle}
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlaceholder(null)}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-sky-400 to-purple-500 py-2.5 font-heading text-sm font-bold text-slate-950 transition hover:opacity-95"
              >
                {t.contact.modalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionLights>
  );
};
