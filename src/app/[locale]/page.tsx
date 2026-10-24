import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/home/Hero';
import {
  BusinessSection,
  ContactSection,
  ExperienceSection,
  ServicesSection,
  SiteFooter,
  WorkSection,
} from '@/components/home/sections';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} t={t} path="" />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero locale={locale} t={t} />
        <WorkSection locale={locale} t={t} />
        <ServicesSection locale={locale} t={t} />
        <ExperienceSection locale={locale} t={t} />
        <BusinessSection locale={locale} t={t} />
        <ContactSection locale={locale} t={t} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
