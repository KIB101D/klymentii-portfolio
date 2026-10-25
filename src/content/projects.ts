import type { Project, ProjectSlug, Projects } from './types';

/** Texts come from the Universal CV (UA / EN / PL). */
export const projects: Projects = [
  {
    slug: 'casacast',
    name: { uk: 'Casacast', en: 'Casacast', pl: 'Casacast' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Повноцінний сайт агенції нерухомості з адмінкою: оголошення публікується на кількох сервісах одночасно, а листування з лідами ведеться через email прямо в інтерфейсі.',
      en: 'A full real-estate agency website with an admin panel: each listing is published to several services at once, and email conversations with leads happen right inside the app.',
      pl: 'Pełnoprawna strona agencji nieruchomości z panelem administracyjnym: ogłoszenie trafia jednocześnie do kilku serwisów, a korespondencja e-mail z leadami odbywa się bezpośrednio w interfejsie aplikacji.',
    },
    points: {
      uk: [
        'Мультипублікація: агент вносить оголошення один раз, і воно виходить на сайт агенції, у XML-фід для порталів і в Telegram-канал. Продане знімається з усіх каналів автоматично.',
        'Черга публікацій з адаптером на кожен канал: повторні спроби з backoff, статуси й журнал синхронізацій в адмінці, без дублів при кількох воркерах (FOR UPDATE SKIP LOCKED).',
        'Листування з лідами: відповідь агента з адмінки йде клієнту на пошту (SMTP), а відповідь клієнта через IMAP повертається в ту саму розмову.',
        'Публічний сайт трьома мовами (ES/EN/UK): фільтри каталогу в URL, мапа, SEO (sitemap, hreflang), кеш каталогу, що оновлюється після змін в адмінці.',
        'Публічне демо з окремою пісочницею на кожного відвідувача і нічним очищенням. 170+ тестів (Vitest), CI на GitHub Actions з реальною PostgreSQL, деплой на Vercel + Neon.',
      ],
      en: [
        'Multi-channel publishing: an agent enters a listing once and it goes out to the agency website, an XML feed for property portals and a Telegram channel. Sold listings are withdrawn everywhere automatically.',
        'Publishing queue with one adapter per channel: retries with backoff, per-channel status and a sync log in the admin, and no duplicate posts with several workers (FOR UPDATE SKIP LOCKED).',
        'Lead conversations: an agent’s reply from the admin reaches the client by email (SMTP), and the client’s answer comes back into the same thread via IMAP.',
        'Public site in three languages (ES/EN/UK): URL-based catalogue filters, a map, SEO (sitemap, hreflang) and a cached catalogue that refreshes after admin edits.',
        'Public demo with a per-visitor sandbox and a nightly reset. 170+ tests (Vitest), CI on GitHub Actions against a real PostgreSQL, deployed on Vercel + Neon.',
      ],
      pl: [
        'Multipublikacja: agent wprowadza ogłoszenie raz, a ono trafia na stronę agencji, do feedu XML dla portali i na kanał Telegram. Sprzedana nieruchomość znika automatycznie ze wszystkich kanałów.',
        'Kolejka publikacji z adapterem dla każdego kanału: ponowienia z backoffem, statusy i log synchronizacji w panelu, brak duplikatów przy kilku workerach (FOR UPDATE SKIP LOCKED).',
        'Korespondencja z leadami: odpowiedź agenta z panelu trafia do klienta e-mailem (SMTP), a odpowiedź klienta wraca przez IMAP do tego samego wątku.',
        'Publiczna strona w trzech językach (ES/EN/UK): filtry katalogu w URL, mapa, SEO (sitemap, hreflang), cache katalogu odświeżany po zmianach w panelu.',
        'Publiczne demo z osobnym sandboxem dla każdego odwiedzającego i nocnym czyszczeniem. 170+ testów (Vitest), CI na GitHub Actions z prawdziwym PostgreSQL, wdrożenie na Vercel + Neon.',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Tailwind CSS'],
    links: {
      demo: 'https://casacast-demo-gamma.vercel.app/',
      demoNote: {
        uk: 'Адмінка: /login, кнопка «Try the demo».',
        en: 'Back office: /login, then “Try the demo”.',
        pl: 'Panel: /login, przycisk „Try the demo”.',
      },
      github: 'https://github.com/KIB101D/casacast-demo',
    },
  },
  {
    slug: 'loop',
    name: { uk: 'LOOP', en: 'LOOP', pl: 'LOOP' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Креативний скрол-лендінг магазину платівок, касет і аудіотехніки у прямій співпраці з дизайнером: 3D-показ товарів, 2D-анімація і музика, що генерується в браузері та синхронізована зі скролом.',
      en: 'A creative scroll-driven landing page for a vinyl, tape and audio-gear shop, built in direct collaboration with a designer: 3D product showcase, 2D animation and in-browser generated music synced to the scroll.',
      pl: 'Kreatywny landing sterowany scrollem dla sklepu z winylami i sprzętem audio, we współpracy z projektantem: produkty w 3D, animacja 2D i muzyka generowana w przeglądarce, zsynchronizowana ze scrollem.',
    },
    points: {
      uk: [
        '3D-показ платівок, конверта й техніки на Three.js з інтерактивом: платівку на столі можна вибрати кліком (raycasting), і вона починає грати; hover-стани й анімація моделей.',
        'Скрол-сцени на GSAP ScrollTrigger і Lenis, 2D-анімація рукописного логотипа (Rough.js), паралакс і кастомний курсор; швидкість обертання платівок залежить від скролу.',
        'Аудіо на Web Audio API: 5 треків синтезуються в браузері без жодного аудіофайлу, відтворення прив’язане до секцій скролу, скретч по кліку на платівку, еквалайзер у реальному часі.',
        'Оптимізація 3D: один WebGL-рендерер на всі сцени (viewport + scissor) з пропуском невидимих секцій, обмежений pixel ratio і легші тіні на мобільних, повне звільнення ресурсів.',
      ],
      en: [
        'Interactive Three.js showcase of records, sleeve and gear: pick a record on the table with a click (raycasting) and it starts playing; hover states and model animation.',
        'Scroll scenes on GSAP ScrollTrigger and Lenis, 2D animation of the hand-drawn logo (Rough.js), parallax and a custom cursor; record spin speed follows the scroll.',
        'Web Audio API sound: 5 tracks synthesised in the browser with no audio files, playback tied to scroll sections, scratch on record click and a real-time equaliser.',
        '3D performance: one WebGL renderer for every scene (viewport + scissor) that skips off-screen sections, capped pixel ratio and lighter shadows on mobile, full resource cleanup.',
      ],
      pl: [
        'Interaktywna prezentacja płyt, okładki i sprzętu w Three.js: płytę na stole można wybrać kliknięciem (raycasting) i zaczyna grać; stany hover i animacja modeli.',
        'Sceny scrollowe na GSAP ScrollTrigger i Lenis, animacja 2D odręcznego logo (Rough.js), paralaksa i własny kursor; prędkość obrotu płyt zależy od scrolla.',
        'Dźwięk w Web Audio API: 5 utworów syntezowanych w przeglądarce bez plików audio, odtwarzanie powiązane z sekcjami scrolla, scratch po kliknięciu płyty, korektor w czasie rzeczywistym.',
        'Optymalizacja 3D: jeden renderer WebGL dla wszystkich scen (viewport + scissor) z pomijaniem niewidocznych sekcji, ograniczony pixel ratio i lżejsze cienie na urządzeniach mobilnych, pełne zwalnianie zasobów.',
      ],
    },
    stack: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Lenis', 'Web Audio'],
    links: { demo: 'https://loop-records.vercel.app/' },
  },
  {
    slug: 'canopy-configurator',
    name: { uk: 'Canopy Configurator', en: 'Canopy Configurator', pl: 'Canopy Configurator' },
    label: 'test-task-product',
    summary: {
      uk: 'Параметричний 3D-конфігуратор дерев’яного навісу: користувач задає розміри й стіни, а модель і 2D-креслення перебудовуються в реальному часі.',
      en: 'A parametric 3D configurator for a timber carport: the user sets dimensions and walls, and the model and 2D drawing rebuild in real time.',
      pl: 'Parametryczny konfigurator 3D drewnianej wiaty: użytkownik ustawia wymiary i ściany, a model i rysunek 2D przebudowują się w czasie rzeczywistym.',
    },
    points: {
      uk: [
        'Чистий Three.js без фреймворків: розміри 2–8 м, конструкція (колони, балки, крокви, покрівля) збирається з OBJ-моделей за правилами монтажу.',
        'Почав як тестове завдання від компанії, що робить 3D-конфігуратори, і довів до функціоналу їхнього продакшн-продукту. Додав власні параметричні моделі: дерев’яні та розсувні скляні стіни, двері, ламелі, комору.',
        '2D-план у SVG з розмірними ланцюжками, розмірні лінії в 3D (CSS2DRenderer, підписи за конструкцією стають напівпрозорими), конфігурація в URL, адаптив для мобільних.',
      ],
      en: [
        'Plain Three.js, no framework: dimensions of 2–8 m, the structure (posts, beams, rafters, roofing) assembled from OBJ models by construction rules.',
        'Started as a test task from a 3D configurator company and extended it to match the features of their production product. Added my own parametric models: timber and sliding glass walls, doors, slat screens, a storage room.',
        'SVG floor plan with dimension chains, 3D dimension lines (CSS2DRenderer, labels hidden by the structure fade out), configuration stored in the URL, mobile layout.',
      ],
      pl: [
        'Czysty Three.js bez frameworków: wymiary 2–8 m, konstrukcja (słupy, belki, krokwie, pokrycie dachu) składana z modeli OBJ według zasad montażu.',
        'Zacząłem jako zadanie testowe od firmy tworzącej konfiguratory 3D i rozbudowałem je do funkcjonalności ich produkcyjnego produktu. Dodałem własne modele parametryczne: drewniane i przesuwne szklane ściany, drzwi, lamele, schowek.',
        'Plan 2D w SVG z łańcuchami wymiarowymi, linie wymiarowe w 3D (CSS2DRenderer, etykiety zasłonięte konstrukcją stają się półprzezroczyste), konfiguracja w URL, wersja mobilna.',
      ],
    },
    stack: ['Three.js', 'TypeScript', 'Vite'],
    links: {
      demo: 'https://canopy-configurator-omega.vercel.app/',
      github: 'https://github.com/KIB101D/canopy-configurator',
    },
  },
  {
    slug: 'ekonom',
    name: { uk: 'Економ', en: 'Ekonom', pl: 'Ekonom' },
    label: 'freelance',
    year: '2026',
    summary: {
      uk: 'Аналітичний дашборд продажів для реального продуктового магазину: від Excel-журналу до рейтингів товарів, порівнянь і підказок, що і скільки дозамовити.',
      en: 'A sales analytics dashboard for a real grocery store: from an Excel sales journal to product rankings, comparisons and hints on what to reorder and how much.',
      pl: 'Dashboard analityki sprzedaży dla prawdziwego sklepu spożywczego: od excelowego dziennika sprzedaży do rankingów produktów, porównań i podpowiedzi, co i ile domówić.',
    },
    points: {
      uk: [
        'Excel-журнал читається прямо в браузері, дашборд хоститься як статика без бекенду. У демо дані згенеровані, щоб не розкривати базу магазину.',
        'Розділи огляду, товарів, рейтингів і порівняння з власними SVG-графіками на d3-scale і d3-shape, без чарт-бібліотеки.',
        'Глобальні фільтри (період, порівняння з минулим періодом, категорії, постачальники, канал) живуть в URL, тож будь-яким звітом можна поділитися посиланням.',
        'Запас у днях і обсяг дозамовлення; свідомо не додав фільтри, які дані журналу не дозволяють порахувати точно (наприклад, за способом оплати).',
      ],
      en: [
        'The Excel journal is parsed directly in the browser and the dashboard is hosted as a static site, no backend. The demo uses generated data to keep the store’s records private.',
        'Overview, products, ranking and comparison views with custom SVG charts on d3-scale and d3-shape, no chart library.',
        'Global filters (period, comparison to the previous period, categories, suppliers, channel) live in the URL, so any report can be shared as a link.',
        'Days of stock left and reorder quantities; deliberately left out filters the journal data cannot compute accurately (for example, by payment method).',
      ],
      pl: [
        'Dziennik Excel jest parsowany bezpośrednio w przeglądarce, a dashboard działa jako strona statyczna bez backendu. W demo dane są wygenerowane, aby nie ujawniać bazy sklepu.',
        'Widoki przeglądu, produktów, rankingów i porównań z własnymi wykresami SVG na d3-scale i d3-shape, bez biblioteki wykresów.',
        'Globalne filtry (okres, porównanie z poprzednim okresem, kategorie, dostawcy, kanał) są zapisywane w URL, więc każdym raportem można podzielić się linkiem.',
        'Zapas w dniach i ilość do domówienia; świadomie pominąłem filtry, których dane z dziennika nie pozwalają rzetelnie policzyć (np. według metody płatności).',
      ],
    },
    stack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'd3'],
    links: {
      demo: 'https://ekonom-dashboard-demo.vercel.app/',
      github: 'https://github.com/KIB101D/ekonom-dashboard',
    },
  },
  {
    slug: 'reactshop',
    name: { uk: 'ReactShop', en: 'ReactShop', pl: 'ReactShop' },
    label: 'pet',
    summary: {
      uk: 'E-commerce вітрина, перенесена з Vite SPA на Next.js App Router заради SEO і швидкого першого рендеру: каталог, фасетний пошук, кошик і checkout.',
      en: 'An e-commerce storefront migrated from a Vite SPA to the Next.js App Router for SEO and a fast first render: catalogue, faceted search, cart and checkout.',
      pl: 'Sklep e-commerce przeniesiony z Vite SPA na Next.js App Router dla SEO i szybkiego pierwszego renderu: katalog, wyszukiwanie fasetowe, koszyk i checkout.',
    },
    points: {
      uk: [
        'Server Components віддають готовий HTML замість порожнього SPA-шела: динамічні metadata й Open Graph для кожного товару і категорії, справжні 404 через not-found.tsx, next/image з priority для LCP.',
        'Фасетний пошук по кількох полях (назва, теги, опис, категорія, ID): категорії, діапазон цін і кількість знижок рахуються з поточних результатів, а не з усього каталогу.',
        'Кошик на Context + useReducer з Undo для видаленого товару (знімок стану + RESTORE_ITEM), toast-сповіщення з переходом у кошик, checkout з валідацією форми.',
        'Skeleton-завантаження на рівні маршрутів (loading.tsx + Suspense), що повторюють реальний layout 1:1, щоб не було зсувів макета (CLS).',
      ],
      en: [
        'Server Components ship real HTML instead of an empty SPA shell: dynamic metadata and Open Graph per product and category, real 404s via not-found.tsx, next/image with priority for LCP.',
        'Faceted search across several fields (title, tags, description, category, ID): categories, price range and sale count are derived from the current results, not the whole catalogue.',
        'Cart on Context + useReducer with Undo for removed items (state snapshot + RESTORE_ITEM), toasts linking to the cart, checkout with form validation.',
        'Route-level skeletons (loading.tsx + Suspense) that mirror the real layout 1:1 to keep layout shift (CLS) at zero.',
      ],
      pl: [
        'Server Components zwracają gotowy HTML zamiast pustej powłoki SPA: dynamiczne metadata i Open Graph dla każdego produktu i kategorii, prawdziwe 404 przez not-found.tsx, next/image z priority dla LCP.',
        'Wyszukiwanie fasetowe po kilku polach (nazwa, tagi, opis, kategoria, ID): kategorie, zakres cen i liczba promocji liczone z bieżących wyników, a nie z całego katalogu.',
        'Koszyk na Context + useReducer z Undo dla usuniętych produktów (snapshot stanu + RESTORE_ITEM), powiadomienia toast z przejściem do koszyka, checkout z walidacją formularza.',
        'Skeletony na poziomie tras (loading.tsx + Suspense) odwzorowujące prawdziwy layout 1:1, aby nie było przesunięć układu (CLS).',
      ],
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'],
    links: {
      demo: 'https://reactshop-next-ochre.vercel.app/',
      github: 'https://github.com/KIB101D/reactshop-next',
      extra: [
        {
          label: { uk: 'Стара версія на Vite', en: 'Old Vite version', pl: 'Stara wersja na Vite' },
          href: 'https://vite-react-ecommerce-jet.vercel.app/',
        },
      ],
    },
  },
];

export const projectSlugs: readonly ProjectSlug[] = projects.map((p) => p.slug);

export function isProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}

export function getProject(slug: ProjectSlug): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
