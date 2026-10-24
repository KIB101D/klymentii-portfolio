import type { Capability, Offer } from './types';

export const capabilities: readonly Capability[] = [
  {
    id: 'product-ui',
    title: { uk: 'Інтерфейси продуктів', en: 'Product interfaces', pl: 'Interfejsy produktowe' },
    body: {
      uk: 'Складні інтерфейси зі станами завантаження, помилок і порожніх даних, фільтрами в URL, кешуванням і SEO. Продумую деталі там, де немає макета.',
      en: 'Complex UIs with loading, error and empty states, URL-based filters, caching and SEO. I design the details where there is no mockup.',
      pl: 'Złożone interfejsy ze stanami ładowania, błędów i braku danych, filtrami w URL, cache i SEO. Projektuję detale tam, gdzie nie ma makiety.',
    },
    proof: ['casacast', 'ekonom', 'reactshop'],
  },
  {
    id: '3d-creative',
    title: { uk: '3D і креатив', en: '3D and creative', pl: '3D i kreacja' },
    body: {
      uk: 'Інтерактивні сцени на Three.js, скрол-анімація на GSAP, звук на Web Audio. Оптимізую під телефони і роблю версію зі зменшеним рухом.',
      en: 'Interactive Three.js scenes, GSAP scroll animation, Web Audio sound. Tuned for mobile, with a reduced-motion version.',
      pl: 'Interaktywne sceny Three.js, animacje przewijania w GSAP, dźwięk z Web Audio. Dopracowane pod telefony, z wersją z ograniczonym ruchem.',
    },
    proof: ['loop', 'canopy-configurator'],
  },
  {
    id: 'fullstack-next',
    title: { uk: 'Full-stack на Next.js', en: 'Full-stack on Next.js', pl: 'Full-stack na Next.js' },
    body: {
      uk: 'PostgreSQL і Drizzle, Server Actions, черги з повторними спробами, автентифікація, пошта через SMTP/IMAP, unit- та інтеграційні тести, CI.',
      en: 'PostgreSQL and Drizzle, Server Actions, queues with retries, auth, email via SMTP/IMAP, unit and integration tests, CI.',
      pl: 'PostgreSQL i Drizzle, Server Actions, kolejki z ponawianiem, uwierzytelnianie, poczta przez SMTP/IMAP, testy jednostkowe i integracyjne, CI.',
    },
    proof: ['casacast'],
  },
  {
    id: 'data',
    title: { uk: 'Дані й аналітика', en: 'Data and analytics', pl: 'Dane i analityka' },
    body: {
      uk: 'Перетворюю сирі дані на бізнес-рішення: парсинг файлів у браузері, власні графіки на d3, метрики, порівняння періодів, рейтинги.',
      en: 'I turn raw data into business decisions: in-browser file parsing, custom d3 charts, metrics, period comparisons, rankings.',
      pl: 'Zamieniam surowe dane na decyzje biznesowe: parsowanie plików w przeglądarce, własne wykresy w d3, metryki, porównania okresów, rankingi.',
    },
    proof: ['ekonom'],
  },
];

export const offers: readonly Offer[] = [
  {
    id: 'landing',
    title: { uk: 'Лендинг, який чіпляє', en: 'A landing page that hooks', pl: 'Landing, który wciąga' },
    body: {
      uk: 'Історія, що розгортається на скролі, 3D, рух і звук. Швидко працює на телефонах.',
      en: 'Scroll storytelling, 3D, motion and sound. Fast on phones.',
      pl: 'Opowieść prowadzona przewijaniem, 3D, ruch i dźwięk. Szybki na telefonach.',
    },
    proof: [{ slug: 'loop' }],
  },
  {
    id: 'admin-dashboard',
    title: { uk: 'Адмін-панель або дашборд', en: 'An admin panel or dashboard', pl: 'Panel administracyjny lub dashboard' },
    body: {
      uk: 'Ваші дані в одному місці: рейтинги, порівняння, що дозамовити.',
      en: 'Your data in one place: rankings, comparisons, what to reorder.',
      pl: 'Twoje dane w jednym miejscu: rankingi, porównania, co zamówić ponownie.',
    },
    proof: [
      { slug: 'ekonom' },
      { slug: 'casacast', note: { uk: 'бек-офіс', en: 'back office', pl: 'panel' } },
    ],
  },
  {
    id: 'multichannel',
    title: { uk: 'Публікуєте раз, видно всюди', en: 'Publish once, appear everywhere', pl: 'Publikujesz raz, widać wszędzie' },
    body: {
      uk: 'Один запис потрапляє на ваш сайт та в інші канали, зі статусами й повторними спробами.',
      en: 'One entry goes to your site and other channels, with statuses and retries.',
      pl: 'Jeden wpis trafia na Twoją stronę i do innych kanałów, ze statusami i ponawianiem.',
    },
    proof: [{ slug: 'casacast' }],
  },
];
