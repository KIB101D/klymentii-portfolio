import { todo, type Project, type ProjectSlug, type Projects } from './types';

const stillTodo = todo('Pre-rendered still from /dev/studio');

export const projects: Projects = [
  {
    slug: 'casacast',
    name: { uk: 'Casacast', en: 'Casacast', pl: 'Casacast' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Повноцінний сайт агентства нерухомості з адмін-панеллю: кожне оголошення публікується в кілька сервісів одночасно, а листування з лідами відбувається прямо в застосунку.',
      en: 'A full real-estate agency website with an admin panel: each listing is published to several services at once, and email conversations with leads happen right inside the app.',
      pl: 'Pełna strona agencji nieruchomości z panelem administracyjnym: każde ogłoszenie trafia do kilku serwisów naraz, a korespondencja e-mail z leadami toczy się wewnątrz aplikacji.',
    },
    stack: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Tailwind CSS 4', 'Vitest'],
    links: {
      live: 'https://casacast-demo.vercel.app',
      liveNote: {
        uk: 'Бек-офіс: /login, кнопка «Try the demo»',
        en: 'Back office: /login, then “Try the demo”',
        pl: 'Panel: /login, przycisk „Try the demo”',
      },
      github: 'https://github.com/KIB101D/casacast-demo',
      githubNote: {
        uk: 'Публічний демо-репозиторій, клієнтський код закритий',
        en: 'Public demo repo, client code is private',
        pl: 'Publiczne repo demo, kod klienta jest prywatny',
      },
    },
    card: { kind: 'still', still: stillTodo },
  },
  {
    slug: 'loop',
    name: { uk: 'LOOP', en: 'LOOP', pl: 'LOOP' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Креативний лендинг зі скрол-анімацією для магазину вінілу, касет і аудіотехніки, зроблений у прямій співпраці з дизайнером: 3D-вітрина товарів, 2D-анімація і музика, що генерується в браузері синхронно зі скролом.',
      en: 'A creative scroll-driven landing page for a vinyl, tape and audio-gear shop, built in direct collaboration with a designer: 3D product showcase, 2D animation and in-browser generated music synced to the scroll.',
      pl: 'Kreatywny landing sterowany przewijaniem dla sklepu z winylami, kasetami i sprzętem audio, zrobiony we współpracy z projektantem: prezentacja produktów w 3D, animacja 2D i muzyka generowana w przeglądarce w rytm przewijania.',
    },
    stack: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Lenis', 'Web Audio API', 'Rough.js'],
    links: { live: 'https://loop-records.vercel.app/' },
    card: { kind: 'live3d', model: 'cassette', still: stillTodo },
  },
  {
    slug: 'canopy-configurator',
    name: { uk: 'Canopy Configurator', en: 'Canopy Configurator', pl: 'Canopy Configurator' },
    label: 'test-task-product',
    year: '2026',
    summary: {
      uk: 'Параметричний 3D-конфігуратор дерев’яного навісу: користувач задає розміри й стіни, а модель і 2D-креслення перебудовуються в реальному часі.',
      en: 'A parametric 3D configurator for a timber carport: the user sets dimensions and walls, and the model and 2D drawing rebuild in real time.',
      pl: 'Parametryczny konfigurator 3D drewnianej wiaty: użytkownik ustawia wymiary i ściany, a model oraz rysunek 2D przebudowują się na bieżąco.',
    },
    stack: ['Three.js', 'TypeScript', 'Vite'],
    links: {
      live: 'https://canopy-configurator-omega.vercel.app/',
      github: 'https://github.com/KIB101D/canopy-configurator',
    },
    card: { kind: 'still', still: stillTodo },
  },
  {
    slug: 'ekonom',
    name: { uk: 'Економ', en: 'Ekonom', pl: 'Ekonom' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Дашборд аналітики продажів для реального продуктового магазину: від Excel-журналу продажів до рейтингів товарів, порівнянь і підказок, що й скільки дозамовити.',
      en: 'A sales analytics dashboard for a real grocery store: from an Excel sales journal to product rankings, comparisons and hints on what to reorder and how much.',
      pl: 'Dashboard analityki sprzedaży dla prawdziwego sklepu spożywczego: od excelowego dziennika sprzedaży do rankingów produktów, porównań i podpowiedzi, co i ile zamówić ponownie.',
    },
    stack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'd3'],
    links: {
      live: 'https://ekonom-dashboard-demo.vercel.app/',
      liveNote: {
        uk: 'Демо працює на згенерованих даних',
        en: 'The demo runs on generated data',
        pl: 'Demo działa na wygenerowanych danych',
      },
      github: 'https://github.com/KIB101D/ekonom-dashboard',
    },
    card: { kind: 'still', still: stillTodo },
  },
  {
    slug: 'reactshop',
    name: { uk: 'ReactShop', en: 'ReactShop', pl: 'ReactShop' },
    label: 'pet',
    summary: {
      uk: 'Інтернет-магазин, перенесений з Vite SPA на Next.js App Router заради SEO і швидкого першого рендеру: каталог, фасетний пошук, кошик і оформлення замовлення.',
      en: 'An e-commerce storefront migrated from a Vite SPA to the Next.js App Router for SEO and a fast first render: catalogue, faceted search, cart and checkout.',
      pl: 'Sklep internetowy przeniesiony z Vite SPA na Next.js App Router dla SEO i szybkiego pierwszego renderu: katalog, wyszukiwanie fasetowe, koszyk i checkout.',
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'],
    links: {
      live: 'https://reactshop-next-ochre.vercel.app/',
      github: 'https://github.com/KIB101D/reactshop-next',
      extra: [
        {
          label: { uk: 'Стара версія на Vite', en: 'Old Vite version', pl: 'Stara wersja na Vite' },
          href: 'https://vite-react-ecommerce-jet.vercel.app/',
        },
      ],
    },
    card: { kind: 'still', still: stillTodo },
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: ProjectSlug): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
