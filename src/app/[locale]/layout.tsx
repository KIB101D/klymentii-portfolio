import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { alternatesFor, isLocale, localeTags, locales, siteUrl } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { InlineScript } from '@/components/InlineScript';
import '../globals.css';

const onest = localFont({
  src: '../fonts/onest-var.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-onest',
  adjustFontFallback: 'Arial',
});

/** Runs before first paint, so a theme chosen with the toggle wins over the system preference without a flash. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#edeff1' },
    { media: '(prefers-color-scheme: dark)', color: '#131518' },
  ],
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s · ${t.meta.title}` },
    description: t.meta.description,
    alternates: alternatesFor(locale),
    openGraph: {
      type: 'website',
      siteName: t.meta.title,
      locale: localeTags[locale].replace('-', '_'),
      url: `/${locale}`,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={localeTags[locale]} className={onest.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
