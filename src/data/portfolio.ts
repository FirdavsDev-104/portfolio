export interface PortfolioProject {
  id: 'fastbite' | 'playverse' | 'piyozmarket' | 'xiaomi' | 'kronos' | 'aether';
  url: string;
  domain: string;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  number: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'fastbite',
    url: 'https://abdurahmon24.netlify.app',
    domain: 'abdurahmon24.netlify.app',
    accentFrom: '#38bdf8',
    accentTo: '#3b82f6',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    number: '01',
  },
  {
    id: 'playverse',
    url: 'https://mystery014.netlify.app',
    domain: 'mystery014.netlify.app',
    accentFrom: '#8b5cf6',
    accentTo: '#ec4899',
    glowColor: 'rgba(139, 92, 246, 0.38)',
    number: '02',
  },
  {
    id: 'piyozmarket',
    url: 'https://piyozmarket104.netlify.app',
    domain: 'piyozmarket104.netlify.app',
    accentFrom: '#06b6d4',
    accentTo: '#6366f1',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    number: '03',
  },
  {
    id: 'xiaomi',
    url: 'https://xiomi55.netlify.app',
    domain: 'xiomi55.netlify.app',
    accentFrom: '#60a5fa',
    accentTo: '#a855f7',
    glowColor: 'rgba(96, 165, 250, 0.35)',
    number: '04',
  },
  {
    id: 'kronos',
    url: 'https://kronos-104.netlify.app',
    domain: 'kronos-104.netlify.app',
    accentFrom: '#38bdf8',
    accentTo: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    number: '05',
  },
  {
    id: 'aether',
    url: 'https://firdavs104.netlify.app',
    domain: 'firdavs104.netlify.app',
    accentFrom: '#22d3ee',
    accentTo: '#818cf8',
    glowColor: 'rgba(34, 211, 238, 0.38)',
    number: '06',
  },
];

export interface ToolkitSkill {
  id:
    | 'html5'
    | 'css3'
    | 'javascript'
    | 'react'
    | 'nextjs'
    | 'tailwind'
    | 'typescript'
    | 'nodejs'
    | 'uiux'
    | 'responsive';
  name: string;
  accent: string;
}

export const TOOLKIT_SKILLS: ToolkitSkill[] = [
  { id: 'html5', name: 'HTML5', accent: '#38bdf8' },
  { id: 'css3', name: 'CSS3', accent: '#60a5fa' },
  { id: 'javascript', name: 'JavaScript', accent: '#818cf8' },
  { id: 'react', name: 'React', accent: '#00e5ff' },
  { id: 'nextjs', name: 'Next.js', accent: '#cbd5e1' },
  { id: 'tailwind', name: 'Tailwind CSS', accent: '#38bdf8' },
  { id: 'typescript', name: 'TypeScript', accent: '#3b82f6' },
  { id: 'nodejs', name: 'Node.js', accent: '#a855f7' },
  { id: 'uiux', name: 'UI/UX Design', accent: '#c084fc' },
  { id: 'responsive', name: 'Responsive Web Design', accent: '#7dd3fc' },
];

export interface EditableContactItem {
  id: 'telegram' | 'github' | 'instagram' | 'email';
  isPlaceholder: boolean;
  // Replace `href` with your real URL/mailto when ready and set `isPlaceholder: false`
  href: string | null;
  placeholderHandle: string;
}

export const CONTACT_PLACEHOLDERS: EditableContactItem[] = [
  {
    id: 'telegram',
    isPlaceholder: true,
    href: null,
    placeholderHandle: 'https://t.me/your-username',
  },
  {
    id: 'github',
    isPlaceholder: true,
    href: null,
    placeholderHandle: 'https://github.com/your-username',
  },
  {
    id: 'instagram',
    isPlaceholder: true,
    href: null,
    placeholderHandle: 'https://instagram.com/your-username',
  },
  {
    id: 'email',
    isPlaceholder: true,
    href: null,
    placeholderHandle: 'mailto:your-email@example.com',
  },
];

export const PERSONAL_IDENTITY = {
  firstName: 'Firdavs',
  lastName: 'Abdugofurov',
  patronymic: 'Nodirbek o‘g‘li',
  age: '14',
  badgeCode: 'FA // 2012-UZ-014',
};
