import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, type Locale } from './i18n/config';

/** Picks the best supported locale from Accept-Language (q-values respected). */
function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.trim().toLowerCase().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { base: tag.split('-')[0] ?? '', q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) {
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1] ?? '';
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiate(request.headers.get('accept-language'))}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Vary', 'Accept-Language');
  return response;
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension (cv, fonts, images).
  matcher: ['/((?!_next|_vercel|api|sitemap.xml|robots.txt|.*\\..*).*)'],
};
