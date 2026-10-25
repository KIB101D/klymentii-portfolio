/** English is the schema: uk.ts and pl.ts are typed as `Dictionary`, so a missing or extra key is a type error. */
export const en = {
  meta: {
    title: 'Klymentii Boiko, Frontend / Product Engineer',
    description: 'Projects by Klymentii Boiko: Casacast, LOOP, Canopy Configurator, Ekonom, ReactShop.',
  },
  nav: {
    skip: 'Skip to content',
    language: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
  },
  home: {
    heading: 'Projects',
  },
  project: {
    labels: {
      freelance: 'Freelance',
      'test-task-product': 'Test task → product',
      pet: 'Pet project',
    },
    back: 'All projects',
    demo: 'Live demo',
    github: 'GitHub',
    stack: 'Stack',
    opensInNewTab: 'opens in a new tab',
  },
};

export type Dictionary = typeof en;
