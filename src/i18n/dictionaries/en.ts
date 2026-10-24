/** English is the schema: uk.ts and pl.ts are typed as `Dictionary`, so a missing or extra key is a type error. */
export const en = {
  meta: {
    title: 'Klymentii Boiko, Frontend / Product Engineer',
    description:
      'Frontend developer who takes products from idea and brief to production. Case studies: Casacast, LOOP, Canopy Configurator, Ekonom, ReactShop.',
  },
  nav: {
    skip: 'Skip to content',
    main: 'Main',
    work: 'Work',
    services: 'What I do',
    experience: 'Experience',
    business: 'For businesses',
    contact: 'Contact',
    language: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
  },
  hero: {
    ctaProjects: 'See projects',
    ctaCv: 'Download CV',
    ctaContact: 'Contact me',
  },
  work: {
    heading: 'Selected work',
    labels: {
      freelance: 'Freelance',
      'test-task-product': 'Test task → product',
      pet: 'Pet project',
    },
    stack: 'Stack',
    live: 'Live demo',
    caseStudy: 'Case study',
    github: 'GitHub',
    opensInNewTab: 'opens in a new tab',
  },
  services: {
    heading: 'What I do',
    proof: 'See it in',
  },
  experience: {
    heading: 'Experience',
    present: 'present',
  },
  business: {
    heading: 'For businesses',
    proof: 'Example',
    cta: 'Discuss your project',
  },
  contact: {
    heading: 'Contact',
    lead: 'The fastest way to reach me is email.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    telegram: 'Telegram',
    cvHeading: 'CV',
    cv: {
      uk: 'Ukrainian',
      en: 'English',
      pl: 'Polish',
    },
    pdf: 'PDF',
  },
  footer: {
    rights: 'Klymentii Boiko',
  },
};

export type Dictionary = typeof en;
