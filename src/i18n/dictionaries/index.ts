import type { Locale } from '../config';
import { en, type Dictionary } from './en';
import { pl } from './pl';
import { uk } from './uk';

const dictionaries: Record<Locale, Dictionary> = { uk, en, pl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
