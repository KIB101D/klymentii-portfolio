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
    intro: { skip: "to skip intro", skipAria: "Skip intro" },
    about: {
      eyebrow: "About",
      bio: "Frontend Developer based in Alicante, Spain, with hands-on experience in React, Next.js, TypeScript, SCSS, Tailwind CSS, REST APIs, and CMS platforms. I build responsive interfaces, search and filtering flows, localized experiences, and maintainable component architecture.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "SCSS",
        "Tailwind CSS",
        "REST API",
        "Strapi CMS",
        "i18n",
      ],
    },
    experience: {
      eyebrow: "Experience",
      entries: [
        ["May 2026 — present", "Frontend Developer", "School of Heroes"],
        ["Jan 2026 — Apr 2026", "Internship", "DMA EU - analytics admin panel"],
        ["May 2025 — Nov 2025", "Freelance", "StudentAbroad - EdTech platform"],
      ],
      recommendations: "Recommendations",
      recommendationMeta: "Recommendation letter",
      recommendationActions: { en: "EN", uk: "UA" },
    },
    projects: {
      eyebrow: "Projects",
      entries: [
        ["ReactShop", "Next.js", "https://github.com/KIB101D/react-shop"],
        ["Task List", "Vite", "https://github.com/KIB101D/Task-List"],
        ["DAG Demo", "Webpack", "https://github.com/KIB101D/dag-demo"],
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
    intro: { skip: "щоб пропустити intro", skipAria: "Пропустити intro" },
    about: {
      eyebrow: "Про мене",
      bio: "Frontend Developer з Аліканте, Іспанія, з практичним досвідом у React, Next.js, TypeScript, SCSS, Tailwind CSS, REST API та CMS-платформах. Створюю адаптивні інтерфейси, пошук і фільтрацію, локалізовані досвіди та підтримувану компонентну архітектуру.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "SCSS",
        "Tailwind CSS",
        "REST API",
        "Strapi CMS",
        "i18n",
      ],
    },
    experience: {
      eyebrow: "Досвід",
      entries: [
        ["Травень 2026 — дотепер", "Frontend Developer", "School of Heroes"],
        [
          "Січень 2026 — квітень 2026",
          "Internship",
          "DMA EU - analytics admin panel",
        ],
        [
          "Травень 2025 — листопад 2025",
          "Freelance",
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
        ["ReactShop", "Next.js", "https://github.com/KIB101D/react-shop"],
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
    intro: { skip: "aby pominąć intro", skipAria: "Pomiń intro" },
    about: {
      eyebrow: "O mnie",
      bio: "Frontend Developer z Alicante w Hiszpanii, z praktycznym doświadczeniem w React, Next.js, TypeScript, SCSS, Tailwind CSS, REST API i platformach CMS. Tworzę responsywne interfejsy, wyszukiwanie i filtrowanie, lokalizowane doświadczenia oraz łatwą w utrzymaniu architekturę komponentów.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "SCSS",
        "Tailwind CSS",
        "REST API",
        "Strapi CMS",
        "i18n",
      ],
    },
    experience: {
      eyebrow: "Doświadczenie",
      entries: [
        ["Maj 2026 — obecnie", "Frontend Developer", "School of Heroes"],
        [
          "Styczeń 2026 — kwiecień 2026",
          "Internship",
          "DMA EU - analytics admin panel",
        ],
        [
          "Maj 2025 — listopad 2025",
          "Freelance",
          "StudentAbroad - EdTech platform",
        ],
      ],
      recommendations: "Rekomendacje",
      recommendationMeta: "List rekomendacyjny",
      recommendationActions: { en: "EN", uk: "UA" },
    },
    projects: {
      eyebrow: "Projekty",
      entries: [
        ["ReactShop", "Next.js", "https://github.com/KIB101D/react-shop"],
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
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
