import React from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Boxes,
  Braces,
  Code2,
  Cpu,
  FileCode2,
  LayoutGrid,
  MonitorSmartphone,
  Palette,
  Server,
  Wind,
} from 'lucide-react';
import { TOOLKIT_SKILLS, ToolkitSkill } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionLights } from './SectionLights';

const SKILL_ICONS: Record<ToolkitSkill['id'], React.ReactNode> = {
  html5: <Code2 className="h-6 w-6" />,
  css3: <LayoutGrid className="h-6 w-6" />,
  javascript: <Braces className="h-6 w-6" />,
  react: <Atom className="h-6 w-6 animate-spin" style={{ animationDuration: '12s' }} />,
  nextjs: <Boxes className="h-6 w-6" />,
  tailwind: <Wind className="h-6 w-6" />,
  typescript: <FileCode2 className="h-6 w-6" />,
  nodejs: <Server className="h-6 w-6" />,
  uiux: <Palette className="h-6 w-6" />,
  responsive: <MonitorSmartphone className="h-6 w-6" />,
};

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionLights
      id="skills"
      atmosphere="indigo"
      className="border-t border-white/5 bg-gradient-to-b from-[#040508] via-[#090c17] to-[#040508]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 font-mono text-[11px] tracking-[0.22em] text-indigo-200">
            <Cpu className="h-3.5 w-3.5 text-sky-300" />
            {t.skills.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-metallic sm:text-5xl">
            {t.skills.title}
          </h2>
          <p className="mt-3 text-sm text-slate-300/85 sm:text-base">
            {t.skills.subtitle}
          </p>
          <p className="mt-2 font-mono text-xs text-sky-300/80">
            {t.skills.toolkitNote}
          </p>
        </motion.div>

        {/* Toolkit Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {TOOLKIT_SKILLS.map((skill, idx) => {
            const copy = t.skills.items[skill.id];
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-shadow duration-300 hover:border-sky-400/45 hover:shadow-[0_18px_50px_rgba(0,0,0,0.85),0_0_32px_rgba(56,189,248,0.2)]"
              >
                {/* Hover Top Aura */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: skill.accent }}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-[#0a101c] text-sky-300 transition-all duration-300 group-hover:scale-110 group-hover:border-sky-300/50 group-hover:text-white"
                      style={{
                        boxShadow: `0 0 22px ${skill.accent}33`,
                      }}
                    >
                      {SKILL_ICONS[skill.id]}
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] tracking-widest text-slate-400">
                      {t.skills.toolTag}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-white">
                    {skill.name}
                  </h3>
                  <span className="mt-0.5 block font-mono text-[11px] text-purple-300/90">
                    {copy.category}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {copy.note}
                </p>

                {/* Bottom subtle accent line */}
                <div
                  aria-hidden="true"
                  className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 opacity-50 transition-all duration-300 group-hover:w-full group-hover:opacity-100"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionLights>
  );
};
