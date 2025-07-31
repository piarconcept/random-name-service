import { ES } from './data/es/index';
import { LATAM_COUNTRIES } from './data/latam';
import { MA } from './data/ma/index';
import { US } from './data/us/index';
import { CountryData } from './types';

export type SupportedCountry = 'ES' | 'MA' | 'US';
export const COUNTRY_DATA: {
  [key: string]: CountryData;
} = {
  ...LATAM_COUNTRIES,
  ES,
  MA,
  US,
} as const;

