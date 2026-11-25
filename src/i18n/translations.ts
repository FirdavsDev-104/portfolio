export type Language = 'uz' | 'en' | 'ru';

export interface TranslationSchema {
  meta: {
    langName: string;
    shortLabel: string;
    flag: string;
  };
  loader: {
    initializing: string;
    loadingAssets: string;
    ready: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    journey: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
  };
  intro: {
    badge: string;
    skip: string;
    replay: string;
    enterPortfolio: string;
    visitWebsite: string;
    carouselHint: string;
    carouselPaused: string;
    webglFallbackNote: string;
    phases: {
      sky: string;
      falling: string;
      impact: string;
      charging: string;
      unlocking: string;
      opening: string;
      revealed: string;
    };
  };
  hero: {
    tag: string;
    headline: string;
    subtitle: string;
    introLine: string;
    scrollIndicator: string;
    exploreProjects: string;
    viewIdentity: string;
  };
  idCard: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    badgeHeader: string;
    verifiedChip: string;
    firstNameLabel: string;
    lastNameLabel: string;
    patronymicLabel: string;
    ageLabel: string;
    roleLabel: string;
    roleValue: string;
    clickToFlip: string;
    flipToBack: string;
    flipToFront: string;
    backHeader: string;
    backTagline: string;
    aboutParagraphs: [string, string, string, string, string];
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreButton: string;
    livePreviewBadge: string;
    loadingPreview: string;
    items: Record<
      string,
      {
        name: string;
        category: string;
        description: string;
      }
    >;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    toolkitNote: string;
    toolTag: string;
    items: Record<
      string,
      {
        category: string;
        note: string;
      }
    >;
  };
  journey: {
    eyebrow: string;
    title: string;
    highlightQuote: string;
    milestones: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    placeholderBannerTitle: string;
    placeholderBannerText: string;
    placeholderTag: string;
    modalTitle: string;
    modalDescription: string;
    modalClose: string;
    links: {
      telegram: string;
      github: string;
      instagram: string;
      email: string;
    };
  };
  finale: {
    preparingSky: string;
    uzbekSkyMessage: string;
    thankYou: string;
    seeYou: string;
    backToTop: string;
    replayFireworks: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  uz: {
    meta: {
      langName: "O'zbekcha",
      shortLabel: 'UZ',
      flag: '🇺🇿',
    },
    loader: {
      initializing: 'TIZIM ISHGA TUSHMOQDA',
      loadingAssets: '3D MUHIT VA INTERFEYS TAYYORLANMOQDA',
      ready: 'TAYYOR',
    },
    nav: {
      home: 'Bosh sahifa',
      about: 'Men haqimda',
      projects: 'Loyihalar',
      skills: "Ko'nikmalar",
      journey: 'Mening yo‘lim',
      contact: 'Aloqa',
      menuOpen: 'Menyuni ochish',
      menuClose: 'Menyuni yopish',
    },
    intro: {
      badge: 'MAXFIY RAQAMLI KEYS // 014',
      skip: 'Kirishni o‘tkazib yuborish',
      replay: 'Keysdan boshlash',
      enterPortfolio: 'Portfolioga kirish',
      visitWebsite: 'SAYTGA O‘TISH',
      carouselHint: "To‘xtatish uchun kartaga olib boring • Aylantirish uchun suring",
      carouselPaused: "Karusel to‘xtatildi — ochish uchun bosing",
      webglFallbackNote: '2D/3D gibrid sahna faol',
      phases: {
        sky: 'OSMONDAN TUSHISH TAYYORLANMOQDA...',
        falling: 'KEYS QULAMOQDA...',
        impact: 'KUCHLI ZARBA — ENERGIYA TO‘LQINI',
        charging: 'TIZIM YORUG‘LIK BILAN TO‘LMOQDA...',
        unlocking: 'QULFLAR KETMA-KET OCHILMOQDA...',
        opening: 'KEYS OCHILMOQDA — LOYIHALAR CHIQMOQDA',
        revealed: 'OLTITA RAQAMLI YARATILISH TAQDIM ETILDI',
      },
    },
    hero: {
      tag: 'RAQAMLI PORTFEL // KELAJAK BUNYODKORI',
      headline: "SALOM, MEN FIRDAVSMAN.",
      subtitle: 'Yosh Dasturchi. Ijodkor Fikrlovchi. Raqamli Bunyodkor.',
      introLine: "Men g‘oyalarni go‘zal raqamli tajribalarga aylantiraman.",
      scrollIndicator: 'Pastga aylantiring',
      exploreProjects: "Loyihalarni ko‘rish",
      viewIdentity: '3D ID Kartani ochish',
    },
    idCard: {
      sectionEyebrow: 'RAQAMLI SHAXSIY GUVOHNOMA',
      sectionTitle: 'INTERAKTIV 3D ID KARTA',
      sectionSubtitle: "Kursor bilan 3D burchakni boshqaring va hikoyamni o‘qish uchun kartani bosing.",
      badgeHeader: 'RAQAMLI IDENTIFIKATSIYA // UZ-014',
      verifiedChip: 'FAOL BUNYODKOR',
      firstNameLabel: 'ISM',
      lastNameLabel: 'FAMILIYA',
      patronymicLabel: 'OTASINING ISMI',
      ageLabel: 'YOSH',
      roleLabel: 'YO‘NALISH',
      roleValue: 'WEB DASTURCHI',
      clickToFlip: 'Aylantirish uchun kartani bosing',
      flipToBack: 'Men haqimda o‘qish (180°)',
      flipToFront: 'Old tomoniga qaytish',
      backHeader: 'MEN HAQIMDA // SHAXSIY HIKOYA',
      backTagline: '2 YIL • YUZLAB SAYTLAR • CHEKSIZ IJOD',
      aboutParagraphs: [
        'Salom! Mening ismim Firdavs Abdugofurov va men 14 yoshli web dasturchiman.',
        "Hozirgacha yuzlab veb-saytlar yaratganman. Ushbu portfolioda loyihalarimning faqat bir nechta namunalari ko‘rsatilgan.",
        'Mening fikrimcha, atigi ikki yil ichida bunday natijaga erishish juda katta yutuqdir.',
        "Men texnologiya, ijodkorlik, web dasturlash va g‘ayrioddiy raqamli tajribalar yaratishga chin dildan qiziqaman.",
        "Bu mening yo‘limning faqat boshlanishi.",
      ],
    },
    projects: {
      eyebrow: 'TANLANGAN VEB-LOYIHALAR',
      title: 'MENING RAQAMLI YARATILISHLARIM',
      subtitle: 'Har bir loyiha o‘z hikoyasiga ega.',
      exploreButton: 'LOYIHANI KO‘RISH',
      livePreviewBadge: 'JONLI VEB-KO‘RINISH',
      loadingPreview: 'Jonli ko‘rinish yuklanmoqda...',
      items: {
        fastbite: {
          name: 'FastBite',
          category: 'Fast-Food Veb-Platforma',
          description: "Tezkor ovqatlanish menyusi va zamonaviy interfeysga ega FastBite — Fast Food veb-sayti.",
        },
        playverse: {
          name: 'PLAYVERSE',
          category: "3D O‘yinlar Platformasi",
          description: "Yangi avlod 3D onlayn o‘yinlar uchun mo‘ljallangan interaktiv PLAYVERSE platformasi.",
        },
        piyozmarket: {
          name: 'PIYOZ MARKET',
          category: "Ko‘p Tilli Marketpleys",
          description: "Zamonaviy savdo tajribasiga qaratilgan ko‘p tilli PIYOZ MARKET onlayn bozor veb-sayti.",
        },
        xiaomi: {
          name: 'Xiaomi Global',
          category: 'Texnologiya & Brend Konsepti',
          description: "Xiaomi Global uslubidagi mahsulot namoyishi va toza texnologik vitrina veb-sayti.",
        },
        kronos: {
          name: 'KRONOS',
          category: 'Kvant Aerokosmik & Robototexnika',
          description: "Kvant aerokosmik va neyron robototexnika mavzusidagi futuristik KRONOS veb-tajribasi.",
        },
        aether: {
          name: 'AETHER',
          category: 'Elektr Mobillik & Toza Energiya',
          description: "Elektr avtomobillar, quyosh va toza energiya texnologiyalariga bag‘ishlangan AETHER sayti.",
        },
      },
    },
    skills: {
      eyebrow: 'TEXNOLOGIYALAR TO‘PLAMI',
      title: 'MENING IJODIY ASBOBLARIM',
      subtitle: 'Raqamli g‘oyalarni jonlantirishda foydalanadigan asosiy veb-texnologiyalarim va vositalarim.',
      toolkitNote: "Ushbu texnologiyalar mening kundalik ishlab chiqish jarayonimdagi asosiy vositalardir.",
      toolTag: 'VOSITA',
      items: {
        html5: { category: 'Tuzilma', note: 'Semantik belgilash va toza hujjat arxitekturasi' },
        css3: { category: 'Vizual uslub', note: '3D transformatsiyalar, animatsiyalar va zamonaviy tartib' },
        javascript: { category: 'Mantiq', note: 'Interaktiv xatti-harakatlar va dinamik funksionallik' },
        react: { category: 'UI kutubxona', note: 'Komponentlarga asoslangan tezkor interfeyslar' },
        nextjs: { category: 'Freymvork', note: 'Zamonaviy veb-ilovalar va marshrutlash tuzilmasi' },
        tailwind: { category: 'Uslub tizimi', note: 'Tezkor va izchil dizayn tizimlari yaratish' },
        typescript: { category: 'Tip xavfsizligi', note: 'Ishonchli va kengaytiriladigan kod bazasi' },
        nodejs: { category: 'Muhit', note: 'Server mantiqi va ishlab chiqish vositalari' },
        uiux: { category: 'Dizayn', note: 'Foydalanuvchi tajribasi va estetik interfeys oqimi' },
        responsive: { category: 'Moslashuvchanlik', note: 'Telefon, planshet va desktop uchun mukammal ko‘rinish' },
      },
    },
    journey: {
      eyebrow: 'RIVOJLANISH XRONOLOGIYASI',
      title: 'MENING YO‘LIM',
      highlightQuote: 'Ikki yil. Yuzlab veb-saytlar. Bitta ijodiy sayohat.',
      milestones: [
        {
          step: '01',
          title: 'Web dasturlash yo‘limni boshladim',
          description: "Ilk kod satrlarini yozib, internet qanday ishlashini kashf etganimdan beri bu soha mening asosiy ishtiyoqimga aylandi.",
        },
        {
          step: '02',
          title: "Veb-saytlar qurishni o‘rgandim",
          description: 'Dizayn asoslari, maketlar, interaktiv skriptlar va zamonaviy veb-texnologiyalarni chuqur o‘zlashtirdim.',
        },
        {
          step: '03',
          title: "Ko‘plab raqamli loyihalar yaratdim",
          description: "Doimiy amaliyot orqali turli yo‘nalishlardagi yuzlab veb-sayt va tajribalarni ishlab chiqdim.",
        },
        {
          step: '04',
          title: "O‘z veb-saytlar to‘plamimni shakllantirdim",
          description: "Har bir g‘oyani mustaqil brend, o‘yin, marketpleys va futuristik konsept ko‘rinishida hayotga tatbiq etdim.",
        },
        {
          step: '05',
          title: 'Ijodiy va texnik mahoratimni oshirishda davom etmoqdaman',
          description: "3D veb, kinematografik animatsiyalar va yangi texnologiyalar bilan yanada balandroq marralar sari intilmoqdaman.",
        },
      ],
    },
    contact: {
      eyebrow: 'HAMKORLIK VA ALOQA',
      title: 'KELING, AJOYIB LOYIHA YARATAMIZ.',
      subtitle: "G‘oyangiz bormi? Keling, uni haqiqatga aylantiramiz.",
      placeholderBannerTitle: 'Tahrirlanadigan aloqa namunalari',
      placeholderBannerText:
        "Haqiqiy elektron pochta, telefon yoki ijtimoiy tarmoq havolalari taqdim etilguniga qadar quyidagi tugmalar tahrirlanadigan namuna sifatida joylashtirilgan.",
      placeholderTag: 'Namuna (Tahrirlash mumkin)',
      modalTitle: 'Aloqa ma’lumotlari hali qo‘shilmagan',
      modalDescription:
        "Ushbu tugma tahrirlanadigan namuna hisoblanadi. Haqiqiy havolani `src/data/portfolio.ts` faylidan osongina ulash mumkin.",
      modalClose: 'Tushunarli',
      links: {
        telegram: 'Telegram (Namuna)',
        github: 'GitHub (Namuna)',
        instagram: 'Instagram (Namuna)',
        email: 'Email (Namuna)',
      },
    },
    finale: {
      preparingSky: 'OSMON CHIROQLARI TAYYORLANMOQDA...',
      uzbekSkyMessage: 'SIZLARGA MENING WEBSITELARIM YOQDI DEB O‘YLAYMAN!',
      thankYou: 'PORTFOLIOMNI TOMOSHA QILGANINGIZ UCHUN RAHMAT.',
      seeYou: 'KEYINGI YARATILISHIMDA KO‘RISHGUNCHA.',
      backToTop: 'YUQORIGA QAYTISH',
      replayFireworks: 'Mushakbozlikni qayta yoqish',
    },
  },

  en: {
    meta: {
      langName: 'English',
      shortLabel: 'EN',
      flag: '🇬🇧',
    },
    loader: {
      initializing: 'INITIALIZING EXPERIENCE',
      loadingAssets: 'PREPARING 3D STAGE & MOTION ENGINE',
      ready: 'ONLINE',
    },
    nav: {
      home: 'Home',
      about: 'About Me',
      projects: 'Projects',
      skills: 'Skills',
      journey: 'My Journey',
      contact: 'Contact',
      menuOpen: 'Open navigation menu',
      menuClose: 'Close navigation menu',
    },
    intro: {
      badge: 'CLASSIFIED DIGITAL CASE // 014',
      skip: 'Skip Intro',
      replay: 'Replay Case Drop',
      enterPortfolio: 'Enter Portfolio',
      visitWebsite: 'VISIT WEBSITE',
      carouselHint: 'Hover any card to pause • Drag or swipe to rotate',
      carouselPaused: 'Carousel paused — click card to open live site',
      webglFallbackNote: 'Hybrid 3D viewport active',
      phases: {
        sky: 'DESCENDING THROUGH ATMOSPHERE...',
        falling: 'INCOMING CASE DROP...',
        impact: 'IMPACT CONFIRMED — SHOCKWAVE DETECTED',
        charging: 'CORE ENERGY CHARGING...',
        unlocking: 'RELEASING SECURITY LOCKS...',
        opening: 'CASE OPENING — REVEALING CREATIONS',
        revealed: 'SIX DIGITAL CREATIONS UNLOCKED',
      },
    },
    hero: {
      tag: 'DIGITAL PORTFOLIO // FUTURE BUILDER',
      headline: "HELLO, I'M FIRDAVS.",
      subtitle: 'Young Developer. Creative Thinker. Digital Builder.',
      introLine: 'I turn ideas into beautiful digital experiences.',
      scrollIndicator: 'Scroll to explore',
      exploreProjects: 'Explore Projects',
      viewIdentity: 'Inspect 3D ID Card',
    },
    idCard: {
      sectionEyebrow: 'DIGITAL IDENTIFICATION BADGE',
      sectionTitle: 'INTERACTIVE 3D ID CARD',
      sectionSubtitle: 'Move your cursor to tilt in 3D space and click the card to reveal my story.',
      badgeHeader: 'DIGITAL IDENTITY // UZ-014',
      verifiedChip: 'ACTIVE BUILDER',
      firstNameLabel: 'FIRST NAME',
      lastNameLabel: 'LAST NAME',
      patronymicLabel: 'PATRONYMIC',
      ageLabel: 'AGE',
      roleLabel: 'ROLE',
      roleValue: 'WEB DEVELOPER',
      clickToFlip: 'Click card to flip',
      flipToBack: 'Read About Me (180°)',
      flipToFront: 'Flip to Front',
      backHeader: 'ABOUT ME // CREATOR DOSSIER',
      backTagline: '2 YEARS • HUNDREDS OF WEBSITES • ONE JOURNEY',
      aboutParagraphs: [
        'Hello! My name is Firdavs Abdugofurov, and I am a 14-year-old web developer.',
        'I have created hundreds of websites so far. Here are just a few examples of my projects displayed in this portfolio.',
        'In my opinion, achieving this level of progress within just two years is a great result.',
        'I am passionate about technology, creativity, web development, and building extraordinary digital experiences.',
        'This is only the beginning of my journey.',
      ],
    },
    projects: {
      eyebrow: 'SELECTED WEB EXPERIENCES',
      title: 'MY DIGITAL CREATIONS',
      subtitle: 'Every project tells a story.',
      exploreButton: 'EXPLORE PROJECT',
      livePreviewBadge: 'LIVE WEBSITE PREVIEW',
      loadingPreview: 'Loading live preview...',
      items: {
        fastbite: {
          name: 'FastBite',
          category: 'Fast Food Web Platform',
          description: 'FastBite — Fast Food website featuring modern food showcase styling and clean navigation.',
        },
        playverse: {
          name: 'PLAYVERSE',
          category: '3D Gaming Platform',
          description: 'PLAYVERSE — next-generation 3D online gaming platform interface built for interactive play.',
        },
        piyozmarket: {
          name: 'PIYOZ MARKET',
          category: 'Multilingual Marketplace',
          description: 'PIYOZ MARKET — a multilingual online marketplace web experience with structured product discovery.',
        },
        xiaomi: {
          name: 'Xiaomi Global',
          category: 'Tech Brand Showcase',
          description: 'Xiaomi Global inspired product showcase website highlighting sleek hardware aesthetics.',
        },
        kronos: {
          name: 'KRONOS',
          category: 'Quantum Aerospace & Robotics',
          description: 'KRONOS — Quantum Aerospace & Neural Robotics futuristic concept web experience.',
        },
        aether: {
          name: 'AETHER',
          category: 'Electric Cars & Clean Energy',
          description: 'AETHER — electric cars, solar, and clean energy futuristic showcase website.',
        },
      },
    },
    skills: {
      eyebrow: 'DEVELOPMENT STACK',
      title: 'MY CREATIVE TOOLKIT',
      subtitle: 'Core technologies and design disciplines inside my everyday web development toolkit.',
      toolkitNote: 'Presented as the technologies and tools I build with across my projects.',
      toolTag: 'TOOLKIT',
      items: {
        html5: { category: 'Structure', note: 'Semantic markup and accessible document foundations' },
        css3: { category: 'Styling', note: 'Modern layouts, 3D transforms, and fluid visual polish' },
        javascript: { category: 'Interactivity', note: 'Dynamic client-side logic and interactive motion' },
        react: { category: 'UI Library', note: 'Component-driven interfaces and reactive state' },
        nextjs: { category: 'Framework', note: 'Structured web apps and modern routing workflows' },
        tailwind: { category: 'Design System', note: 'Rapid utility-first styling and visual consistency' },
        typescript: { category: 'Type Safety', note: 'Predictable, maintainable, and scalable code' },
        nodejs: { category: 'Runtime', note: 'JavaScript tooling and backend runtime foundations' },
        uiux: { category: 'Design', note: 'Human-centered layout flow and visual hierarchy' },
        responsive: { category: 'Adaptation', note: 'Seamless layouts across mobile, tablet, and desktop' },
      },
    },
    journey: {
      eyebrow: 'TIMELINE & MILESTONES',
      title: 'MY JOURNEY',
      highlightQuote: 'Two years. Hundreds of websites. One creative journey.',
      milestones: [
        {
          step: '01',
          title: 'Started my web development journey',
          description: 'Began exploring the web and writing my very first lines of code, turning curiosity into daily creation.',
        },
        {
          step: '02',
          title: 'Learned to build websites',
          description: 'Mastered core layout craft, styling systems, interactivity, and modern frontend workflows.',
        },
        {
          step: '03',
          title: 'Created numerous digital projects',
          description: 'Built hundreds of websites across diverse themes to sharpen speed, quality, and creative vision.',
        },
        {
          step: '04',
          title: 'Developed my own collection of websites',
          description: 'Launched distinct live web experiences spanning gaming, marketplaces, robotics, clean energy, and brands.',
        },
        {
          step: '05',
          title: 'Continued improving my creative and technical skills',
          description: 'Constantly pushing forward into 3D web experiences, cinematic motion, and modern engineering.',
        },
      ],
    },
    contact: {
      eyebrow: 'CONNECT & COLLABORATE',
      title: "LET'S CREATE SOMETHING AMAZING.",
      subtitle: "Have an idea? Let's turn it into reality.",
      placeholderBannerTitle: 'Editable Contact Placeholders',
      placeholderBannerText:
        'No personal email, phone number, or social handles were invented. These buttons act as clearly labeled editable placeholders until real contact details are provided.',
      placeholderTag: 'Editable Placeholder',
      modalTitle: 'Contact Placeholder',
      modalDescription:
        'This social button is an editable placeholder. Replace the link inside `src/data/portfolio.ts` once real contact details are ready.',
      modalClose: 'Got it',
      links: {
        telegram: 'Telegram (Placeholder)',
        github: 'GitHub (Placeholder)',
        instagram: 'Instagram (Placeholder)',
        email: 'Email (Placeholder)',
      },
    },
    finale: {
      preparingSky: 'DIMMING STAGE LIGHTS...',
      uzbekSkyMessage: 'SIZLARGA MENING WEBSITELARIM YOQDI DEB O‘YLAYMAN!',
      thankYou: 'THANK YOU FOR EXPLORING MY PORTFOLIO.',
      seeYou: 'SEE YOU IN MY NEXT CREATION.',
      backToTop: 'BACK TO TOP',
      replayFireworks: 'Replay Fireworks',
    },
  },

  ru: {
    meta: {
      langName: 'Русский',
      shortLabel: 'RU',
      flag: '🇷🇺',
    },
    loader: {
      initializing: 'ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ',
      loadingAssets: 'ЗАГРУЗКА 3D-СЦЕНЫ И АНИМАЦИЙ',
      ready: 'ГОТОВО',
    },
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      projects: 'Проекты',
      skills: 'Навыки',
      journey: 'Мой путь',
      contact: 'Контакты',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
    },
    intro: {
      badge: 'СЕКРЕТНЫЙ ЦИФРОВОЙ КЕЙС // 014',
      skip: 'Пропустить интро',
      replay: 'Повторить дроп кейса',
      enterPortfolio: 'Войти в портфолио',
      visitWebsite: 'ПЕРЕЙТИ НА САЙТ',
      carouselHint: 'Наведите на карточку для паузы • Листайте свайпом',
      carouselPaused: 'Карусель на паузе — нажмите, чтобы открыть сайт',
      webglFallbackNote: 'Активен гибридный 3D-режим',
      phases: {
        sky: 'СНИЖЕНИЕ ИЗ АТМОСФЕРЫ...',
        falling: 'ПАДЕНИЕ КЕЙСА...',
        impact: 'МОЩНОЕ СТОЛКНОВЕНИЕ — УДАРНАЯ ВОЛНА',
        charging: 'НАКОПЛЕНИЕ ЭНЕРГИИ ЯДРА...',
        unlocking: 'СНЯТИЕ ЗАМКОВ ПО ОЧЕРЕДИ...',
        opening: 'ОТКРЫТИЕ КЕЙСА — ЯВЛЕНИЕ ПРОЕКТОВ',
        revealed: 'ШЕСТЬ ЦИФРОВЫХ ПРОЕКТОВ РАСКРЫТО',
      },
    },
    hero: {
      tag: 'ЦИФРОВОЕ ПОРТФОЛИО // СОЗДАТЕЛЬ БУДУЩЕГО',
      headline: 'ПРИВЕТ, Я ФИРДАВС.',
      subtitle: 'Юный Разработчик. Креативный Мыслитель. Цифровой Создатель.',
      introLine: 'Я превращаю идеи в красивые цифровые впечатления.',
      scrollIndicator: 'Листайте вниз',
      exploreProjects: 'Смотреть проекты',
      viewIdentity: 'Открыть 3D ID-карту',
    },
    idCard: {
      sectionEyebrow: 'ЦИФРОВОЕ УДОСТОВЕРЕНИЕ',
      sectionTitle: 'ИНТЕРАКТИВНАЯ 3D ID-КАРТА',
      sectionSubtitle: 'Двигайте курсором для 3D-наклона и нажмите на карту, чтобы прочитать мою историю.',
      badgeHeader: 'ЦИФРОВОЙ ПРОФИЛЬ // UZ-014',
      verifiedChip: 'АКТИВНЫЙ СОЗДАТЕЛЬ',
      firstNameLabel: 'ИМЯ',
      lastNameLabel: 'ФАМИЛИЯ',
      patronymicLabel: 'ОТЧЕСТВО',
      ageLabel: 'ВОЗРАСТ',
      roleLabel: 'РОЛЬ',
      roleValue: 'ВЕБ-РАЗРАБОТЧИК',
      clickToFlip: 'Нажмите, чтобы перевернуть',
      flipToBack: 'Прочитать обо мне (180°)',
      flipToFront: 'Вернуть лицевую сторону',
      backHeader: 'ОБО МНЕ // ИСТОРИЯ РАЗРАБОТЧИКА',
      backTagline: '2 ГОДА • СОТНИ САЙТОВ • ОДИН ТВОРЧЕСКИЙ ПУТЬ',
      aboutParagraphs: [
        'Привет! Меня зовут Фирдавс Абдугофуров, и мне 14 лет, я веб-разработчик.',
        'На данный момент я создал уже сотни веб-сайтов. Здесь представлена лишь небольшая часть моих проектов.',
        'На мой взгляд, достичь такого уровня прогресса всего за два года — отличный результат.',
        'Я увлечён технологиями, креативом, веб-разработкой и созданием необычных цифровых проектов.',
        'И это только начало моего пути.',
      ],
    },
    projects: {
      eyebrow: 'ИЗБРАННЫЕ ВЕБ-РАБОТЫ',
      title: 'МОИ ЦИФРОВЫЕ ТВОРЕНИЯ',
      subtitle: 'Каждый проект рассказывает свою историю.',
      exploreButton: 'ОТКРЫТЬ ПРОЕКТ',
      livePreviewBadge: 'ЖИВОЙ ПРЕДПРОСМОТР',
      loadingPreview: 'Загрузка живого превью...',
      items: {
        fastbite: {
          name: 'FastBite',
          category: 'Веб-платформа Fast Food',
          description: 'Веб-сайт FastBite — Fast Food с современной подачей меню и стильной навигацией.',
        },
        playverse: {
          name: 'PLAYVERSE',
          category: 'Платформа 3D-игр',
          description: 'PLAYVERSE — игровая веб-платформа нового поколения для 3D-онлайн-игр.',
        },
        piyozmarket: {
          name: 'PIYOZ MARKET',
          category: 'Мультиязычный маркетплейс',
          description: 'PIYOZ MARKET — мультиязычный онлайн-маркетплейс со структурированной витриной.',
        },
        xiaomi: {
          name: 'Xiaomi Global',
          category: 'Технологичный бренд-концепт',
          description: 'Веб-витрина в стиле Xiaomi Global с акцентом на эстетику современных устройств.',
        },
        kronos: {
          name: 'KRONOS',
          category: 'Аэрокосмос и робототехника',
          description: 'KRONOS — футуристический концепт-сайт о квантовой аэрокосмической отрасли и робототехнике.',
        },
        aether: {
          name: 'AETHER',
          category: 'Электромобили и чистая энергия',
          description: 'AETHER — веб-проект, посвящённый электромобилям, солнечной и чистой энергии.',
        },
      },
    },
    skills: {
      eyebrow: 'ТЕХНОЛОГИЧЕСКИЙ АРСЕНАЛ',
      title: 'МОЙ КРЕАТИВНЫЙ ИНСТРУМЕНТАРИЙ',
      subtitle: 'Ключевые технологии и инструменты веб-разработки, которые я использую в своих проектах.',
      toolkitNote: 'Представлены как технологии и инструменты в моём рабочем стеке разработки.',
      toolTag: 'СТЕК',
      items: {
        html5: { category: 'Структура', note: 'Семантическая разметка и чистая архитектура страниц' },
        css3: { category: 'Стилизация', note: 'Современная вёрстка, 3D-трансформации и анимации' },
        javascript: { category: 'Логика', note: 'Динамическая интерактивность и клиентские сценарии' },
        react: { category: 'UI-библиотека', note: 'Компонентный подход и отзывчивый интерфейс' },
        nextjs: { category: 'Фреймворк', note: 'Структурированные веб-приложения и маршрутизация' },
        tailwind: { category: 'Дизайн-система', note: 'Быстрая утилитарная стилизация и единый стиль' },
        typescript: { category: 'Типизация', note: 'Надёжный и поддерживаемый код' },
        nodejs: { category: 'Среда', note: 'Инструменты разработки и серверная среда' },
        uiux: { category: 'Дизайн', note: 'Продуманный пользовательский опыт и визуальная эстетика' },
        responsive: { category: 'Адаптивность', note: 'Плавная работа на смартфонах, планшетах и ПК' },
      },
    },
    journey: {
      eyebrow: 'ХРОНОЛОГИЯ РАЗВИТИЯ',
      title: 'МОЙ ПУТЬ',
      highlightQuote: 'Два года. Сотни сайтов. Один творческий путь.',
      milestones: [
        {
          step: '01',
          title: 'Начал свой путь в веб-разработке',
          description: 'Сделал первые шаги в мире кода и сразу понял, что хочу создавать собственные цифровые проекты.',
        },
        {
          step: '02',
          title: 'Научился создавать сайты',
          description: 'Освоил вёрстку, стилизацию, интерактивную логику и современные подходы к фронтенду.',
        },
        {
          step: '03',
          title: 'Создал множество цифровых проектов',
          description: 'Через постоянную практику разработал сотни сайтов в самых разных направлениях.',
        },
        {
          step: '04',
          title: 'Собрал собственную коллекцию сайтов',
          description: 'Запустил живые веб-проекты: от игровых платформ и маркетплейсов до футуристических концептов.',
        },
        {
          step: '05',
          title: 'Продолжаю развивать креативные и технические навыки',
          description: 'Изучаю 3D-графику в вебе, кинематографичную анимацию и новые инженерные практики.',
        },
      ],
    },
    contact: {
      eyebrow: 'СВЯЗЬ И СОТРУДНИЧЕСТВО',
      title: 'ДАВАЙТЕ СОЗДАДИМ ЧТО-ТО ПОТРЯСАЮЩЕЕ.',
      subtitle: 'Есть идея? Давайте воплотим её в реальность.',
      placeholderBannerTitle: 'Редактируемые шаблоны контактов',
      placeholderBannerText:
        'Личная почта, телефон и аккаунты не выдуманы. Кнопки работают как наглядно отмеченные шаблоны до добавления реальных контактов.',
      placeholderTag: 'Шаблон (Редактируемый)',
      modalTitle: 'Контактный шаблон',
      modalDescription:
        'Эта кнопка является редактируемым шаблоном. Реальную ссылку можно указать в файле `src/data/portfolio.ts`.',
      modalClose: 'Понятно',
      links: {
        telegram: 'Telegram (Шаблон)',
        github: 'GitHub (Шаблон)',
        instagram: 'Instagram (Шаблон)',
        email: 'Email (Шаблон)',
      },
    },
    finale: {
      preparingSky: 'ЗАТЕМНЕНИЕ СЦЕНЫ...',
      uzbekSkyMessage: 'SIZLARGA MENING WEBSITELARIM YOQDI DEB O‘YLAYMAN!',
      thankYou: 'СПАСИБО ЗА ПРОСМОТР МОЕГО ПОРТФОЛИО.',
      seeYou: 'ДО ВСТРЕЧИ В МОЁМ СЛЕДУЮЩЕМ ПРОЕКТЕ.',
      backToTop: 'НАВЕРХ',
      replayFireworks: 'Повторить салют',
    },
  },
};
