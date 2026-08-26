import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "uk" | "pl";

const LOCALE_KEY = "klymentii:locale";

const dictionaries = {
  en: {
    board: {
      header: "frontend / board",
      quickGitHub: "GitHub ↗",
      quickEmail: "Email ↗",
      hint: "click a point",
      coords: (x: number, y: number) =>
        `x ${x.toString().padStart(4, "0")} · y ${y.toString().padStart(4, "0")}`,
      close: "Close",
      copied: "copied ✓",
      copy: "copy",
      open: "open ↗",
      status: "Open to remote frontend roles",
      nodes: {
        about: "About",
        experience: "Experience",
        projects: "Projects",
        contacts: "Contacts",
      },
    },
    intro: {
      skip: "to skip intro",
      skipHold: "HOLD TO SKIP",
      skipAria: "Skip intro",
    },
    about: {
      eyebrow: "About",
      bio: "Frontend Developer with commercial experience building and maintaining web applications with React, Next.js and TypeScript. Experienced in working with existing codebases, REST APIs, component architecture, state management, and edge cases. I focus on building frontend features that remain understandable and maintainable as the product grows.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "REST API",
        "State Management",
        "i18n",
        "Component Architecture",
        "Responsive UI",
        "Strapi CMS",
        "SCSS / Tailwind CSS",
      ],
    },
    experience: {
      eyebrow: "Experience",
      entries: [
        ["May 2026 — present", "Frontend Developer", "School of Heroes"],
        [
          "Jan 2026 — Apr 2026",
          "Frontend Developer Intern",
          "DMA EU - Analytics Admin Panel",
        ],
        [
          "May 2025 — Nov 2025",
          "Frontend Developer",
          "StudentAbroad - EdTech platform",
        ],
      ],
      recommendations: "Recommendations",
      recommendationMeta: "Recommendation letter",
      recommendationActions: { en: "EN", uk: "UA" },
    },
    projects: {
      eyebrow: "Projects",
      entries: [
        [
          "ReactShop",
          "Next.js",
          "https://github.com/KIB101D/reactshop-next/tree/main",
        ],
        ["Task List", "Vite", "https://github.com/KIB101D/Task-List"],
        ["DAG Demo", "Webpack", "https://github.com/KIB101D/dagforge.git"],
        ["CATS", "Vanilla JS", "https://github.com/KIB101D/cats"],
      ],
    },
    contacts: {
      eyebrow: "Contacts",
    },
  },

  uk: {
    board: {
      header: "frontend / board",
      quickGitHub: "GitHub ↗",
      quickEmail: "Email ↗",
      hint: "натисни на точку",
      coords: (x: number, y: number) =>
        `x ${x.toString().padStart(4, "0")} · y ${y.toString().padStart(4, "0")}`,
      close: "Закрити",
      copied: "скопійовано ✓",
      copy: "копіювати",
      open: "відкрити ↗",
      status: "Відкритий до remote frontend позицій",
      nodes: {
        about: "Про мене",
        experience: "Досвід",
        projects: "Проєкти",
        contacts: "Контакти",
      },
    },
    intro: {
      skip: "щоб пропустити intro",
      skipHold: "ЗАТИСНИ, ЩОБ ПРОПУСТИТИ",
      skipAria: "Пропустити intro",
    },
    about: {
      eyebrow: "Про мене",
      bio: "Frontend Developer із комерційним досвідом розробки та підтримки web-застосунків на React, Next.js і TypeScript. Маю досвід роботи з існуючими codebase, REST API, компонентною архітектурою, керуванням станом та edge cases. Фокусуюсь на створенні frontend-функціональності, яку легко розуміти й підтримувати в міру розвитку продукту.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "REST API",
        "Керування станом",
        "i18n",
        "Компонентна архітектура",
        "Responsive UI",
        "Strapi CMS",
        "SCSS / Tailwind CSS",
      ],
    },
    experience: {
      eyebrow: "Досвід",
      entries: [
        ["Травень 2026 — дотепер", "Frontend Developer", "School of Heroes"],
        [
          "Січень 2026 — квітень 2026",
          "Frontend Developer Intern",
          "DMA EU - Analytics Admin Panel · 50+ компонентів",
        ],
        [
          "Травень 2025 — листопад 2025",
          "Frontend Developer",
          "StudentAbroad - EdTech platform",
        ],
      ],
      recommendations: "Рекомендації",
      recommendationMeta: "Рекомендаційний лист",
      recommendationActions: { en: "EN", uk: "UA" },
    },
    projects: {
      eyebrow: "Проєкти",
      entries: [
        [
          "ReactShop",
          "Next.js",
          "https://github.com/KIB101D/reactshop-next/tree/main",
        ],
        ["Task List", "Vite", "https://github.com/KIB101D/Task-List"],
        ["DAG Demo", "Webpack", "https://github.com/KIB101D/dagforge.git"],
        ["CATS", "Vanilla JS", "https://github.com/KIB101D/cats"],
      ],
    },
    contacts: {
      eyebrow: "Контакти",
    },
  },

  pl: {
    board: {
      header: "frontend / board",
      quickGitHub: "GitHub ↗",
      quickEmail: "Email ↗",
      hint: "kliknij punkt",
      coords: (x: number, y: number) =>
        `x ${x.toString().padStart(4, "0")} · y ${y.toString().padStart(4, "0")}`,
      close: "Zamknij",
      copied: "skopiowano ✓",
      copy: "kopiuj",
      open: "otwórz ↗",
      status: "Otwarty na zdalne role frontendowe",
      nodes: {
        about: "O mnie",
        experience: "Doświadczenie",
        projects: "Projekty",
        contacts: "Kontakt",
      },
    },
    intro: {
      skip: "aby pominąć intro",
      skipHold: "PRZYTRZYMAJ, ABY POMINĄĆ",
      skipAria: "Pomiń intro",
    },
    about: {
      eyebrow: "O mnie",
      bio: "Frontend Developer z doświadczeniem komercyjnym w tworzeniu i rozwijaniu aplikacji webowych z wykorzystaniem React, Next.js i TypeScript. Mam doświadczenie w pracy z istniejącymi codebase’ami, REST API, architekturą komponentów, zarządzaniem stanem i obsługą edge case’ów. Skupiam się na tworzeniu funkcjonalności frontendu, które pozostają czytelne i łatwe w utrzymaniu wraz z rozwojem produktu.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "REST API",
        "Zarządzanie stanem",
        "i18n",
        "Architektura komponentów",
        "Responsive UI",
        "Strapi CMS",
        "SCSS / Tailwind CSS",
      ],
    },
    experience: {
      eyebrow: "Doświadczenie",
      entries: [
        ["Maj 2026 — obecnie", "Frontend Developer", "School of Heroes"],
        [
          "Styczeń 2026 — kwiecień 2026",
          "Frontend Developer Intern",
          "DMA EU - Analytics Admin Panel · 50+ komponentów",
        ],
        [
          "Maj 2025 — listopad 2025",
          "Frontend Developer",
          "StudentAbroad - platforma EdTech",
        ],
      ],
      recommendations: "Rekomendacje",
      recommendationMeta: "List rekomendacyjny",
      recommendationActions: { en: "EN", uk: "UA" },
    },
    projects: {
      eyebrow: "Projekty",
      entries: [
        [
          "ReactShop",
          "Next.js",
          "https://github.com/KIB101D/reactshop-next/tree/main",
        ],
        ["Task List", "Vite", "https://github.com/KIB101D/Task-List"],
        ["DAG Demo", "Webpack", "https://github.com/KIB101D/dagforge.git"],
        ["CATS", "Vanilla JS", "https://github.com/KIB101D/cats"],
      ],
    },
    contacts: {
      eyebrow: "Kontakt",
    },
  },
} as const;

type Dictionary = (typeof dictionaries)[Locale];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
  const stored = window.localStorage.getItem(LOCALE_KEY);

  return stored === "uk" || stored === "pl" || stored === "en" ? stored : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_KEY, next);
  };

  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return value;
}
