import type { ExperienceItem } from './types';

/** Newest first. */
export const experience: readonly ExperienceItem[] = [
  {
    id: 'freelance',
    role: {
      uk: 'Frontend / Full-stack розробник (фриланс)',
      en: 'Frontend / Full-stack Developer (freelance)',
      pl: 'Frontend / Full-stack Developer (freelance)',
    },
    period: { year: '2026' },
    projects: ['casacast', 'loop', 'ekonom'],
  },
  {
    id: 'school-of-heroes',
    role: {
      uk: 'Frontend-розробник (волонтер)',
      en: 'Frontend Developer (volunteer)',
      pl: 'Frontend Developer (wolontariat)',
    },
    org: {
      uk: 'School of Heroes (благодійна організація)',
      en: 'School of Heroes (charity)',
      pl: 'School of Heroes (organizacja charytatywna)',
    },
    period: { start: '2026-05', end: 'present' },
    summary: {
      uk: 'Сторінка контактів на Next.js з клієнтом для Strapi CMS і валідацією Zod, посилання на соцмережі з CMS, сторінка 404.',
      en: 'Next.js contacts page with a Strapi CMS client and Zod validation, CMS-driven social links, 404 page.',
      pl: 'Strona kontaktowa w Next.js z klientem Strapi CMS i walidacją Zod, linki społecznościowe z CMS, strona 404.',
    },
  },
  {
    id: 'dma-eu',
    role: {
      uk: 'Junior Frontend-розробник (стажування)',
      en: 'Junior Frontend Developer (internship)',
      pl: 'Junior Frontend Developer (staż)',
    },
    org: { uk: 'DMA EU', en: 'DMA EU', pl: 'DMA EU' },
    period: { start: '2026-01', end: '2026-04' },
    summary: {
      uk: 'Внутрішня адмін-панель аналітики з 50+ компонентів, керування користувачами з рівнями доступу, рефакторинг.',
      en: 'Internal analytics admin panel of 50+ components, user management with access levels, refactoring.',
      pl: 'Wewnętrzny panel administracyjny analityki z ponad 50 komponentów, zarządzanie użytkownikami z poziomami dostępu, refaktoryzacja.',
    },
  },
  {
    id: 'studentabroad',
    role: { uk: 'Front-End розробник', en: 'Front-End Developer', pl: 'Front-End Developer' },
    org: { uk: 'StudentAbroad', en: 'StudentAbroad', pl: 'StudentAbroad' },
    period: { start: '2025-05', end: '2025-11' },
    summary: {
      uk: 'Пошук і фільтрація каталогу з debounce-запитами, змішана клієнт-серверна пагінація, сторінки з Figma разом із дизайнером.',
      en: 'Catalogue search and filtering with debounced requests, mixed client/server pagination, pages from Figma with the designer.',
      pl: 'Wyszukiwanie i filtrowanie katalogu z zapytaniami z debounce, mieszana paginacja klient/serwer, strony z Figmy razem z projektantem.',
    },
  },
];
