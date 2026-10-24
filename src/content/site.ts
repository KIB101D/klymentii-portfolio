import { todo, type Site } from './types';

export const site: Site = {
  name: { uk: 'Климентій Бойко', en: 'Klymentii Boiko', pl: 'Klymentii Boiko' },
  title: 'Frontend / Product Engineer',
  stackLine: 'React · Next.js · TypeScript · Three.js',
  status: {
    uk: 'Відкритий до пропозицій · Віддалено · Аліканте, Іспанія',
    en: 'Open to work · Remote · Alicante, Spain',
    pl: 'Otwarty na oferty · Zdalnie · Alicante, Hiszpania',
  },
  experienceLine: {
    uk: 'Комерційний досвід з 2025 року',
    en: 'Commercial experience since 2025',
    pl: 'Doświadczenie komercyjne od 2025 roku',
  },
  statement: {
    uk: 'Frontend-розробник, який доводить продукти від ідеї та брифу до продакшену. У 2026 році я здав три фриланс-проєкти для клієнтів: сайт агентства нерухомості з адмін-панеллю та публікацією в кілька каналів, креативний 3D-лендинг для магазину платівок і дашборд аналітики продажів.',
    en: 'Frontend developer who takes products from idea and brief to production. In 2026 I delivered three freelance client projects: a real-estate agency website with an admin panel and multi-channel publishing, a creative 3D landing page for a record shop, and a sales analytics dashboard.',
    pl: 'Frontend developer, który prowadzi produkty od pomysłu i briefu do produkcji. W 2026 roku zrealizowałem trzy projekty freelance dla klientów: stronę agencji nieruchomości z panelem administracyjnym i publikacją w wielu kanałach, kreatywny landing 3D dla sklepu z płytami oraz dashboard analityki sprzedaży.',
  },
  contacts: {
    email: 'boiko.klymentii.ua@gmail.com',
    linkedin: 'https://www.linkedin.com/in/klymentii-boiko-a92539303/',
    github: 'https://github.com/KIB101D',
    telegram: todo('Telegram handle'),
  },
  cv: {
    uk: '/cv/Klymentii_Boiko_CV_UA.pdf',
    en: '/cv/Klymentii_Boiko_CV_EN.pdf',
    pl: '/cv/Klymentii_Boiko_CV_PL.pdf',
  },
};
