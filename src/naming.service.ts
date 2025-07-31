// src/naming.service.ts
import { COUNTRY_DATA, SupportedCountry } from './country-data';
import { NameRequest, NameResponse } from './types';

export class NamingService {
  private static randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static chance(percent: number): boolean {
    return Math.random() * 100 < percent;
  }

  private static pick<T>(arr: T[]): T {
    return arr[this.randInt(0, arr.length - 1)];
  }

  private static uniquePick<T>(arr: T[], exclude: (T | undefined)[]): T {
    let item = this.pick(arr);
    while (exclude.includes(item)) item = this.pick(arr);
    return item;
  }

  private static getRandomAge(min: number, max: number): number {
    return this.randInt(min, max);
  }

  private static getRandomAncestry(country: SupportedCountry): SupportedCountry[] {
    const c = COUNTRY_DATA[country];
    const rate = c.immigration_rate;          // probability that a GP is immigrant
    const pool = c.immigration_sources;

    return [0, 1, 2, 3].map(() =>
      this.chance(rate * 100)
        ? (this.pick(pool) as SupportedCountry)
        : country,
    );
  }

  private static buildNamesPool(
    sex: 'M' | 'F' | 'NB',
    country: SupportedCountry,
    ancestry: SupportedCountry[],
  ): string[] {
    // local pool first
    const local = COUNTRY_DATA[country];
    const poolLocal =
      sex === 'M'
        ? [...local.maleNames, ...local.unisexNames]
        : sex === 'F'
          ? [...local.femaleNames, ...local.unisexNames]
          : [...local.unisexNames, ...local.maleNames, ...local.femaleNames];

    const gpPools: string[] = [];
    ancestry.forEach((ctry) => {
      if (ctry === country) return; // skip duplicates with local
      const data = COUNTRY_DATA[ctry];
      if (!data) return;
      const arr =
        sex === 'M'
          ? [...data.maleNames, ...data.unisexNames]
          : sex === 'F'
            ? [...data.femaleNames, ...data.unisexNames]
            : [...data.unisexNames, ...data.maleNames, ...data.femaleNames];
      gpPools.push(...arr);
    });

    return [...poolLocal, ...gpPools];
  }

  private static generateGivenNames(
    country: SupportedCountry,
    sex: 'M' | 'F' | 'NB',
    ancestry: SupportedCountry[],
  ): { firstName: string; secondName?: string; thirdName?: string } {
    const c = COUNTRY_DATA[country];
    const pool = this.buildNamesPool(sex, country, ancestry);

    const firstName = this.pick(pool);

    const secondName = this.chance(c.rules.secondName)
      ? this.uniquePick(pool, [firstName])
      : undefined;

    const thirdName = this.chance(c.rules.thirdName)
      ? this.uniquePick(pool, [firstName, secondName])
      : undefined;

    return { firstName, secondName, thirdName };
  }

  private static generateSurnames(
    country: SupportedCountry,
    ancestry: SupportedCountry[],
  ): { surname1: string; surname2?: string } {
    const paternalCountry = ancestry[0] ?? country;
    const paternalData = COUNTRY_DATA[paternalCountry] ?? COUNTRY_DATA[country];
    const surname1 = this.pick(paternalData.surnames);
    const maternalCountry = ancestry[2] ?? country;
    const maternalData = COUNTRY_DATA[maternalCountry] ?? COUNTRY_DATA[country];

    const hasSecond = this.chance(COUNTRY_DATA[country].rules.surname2);
    const surname2 = hasSecond ? this.uniquePick(maternalData.surnames, [surname1]) : undefined;

    return { surname1, surname2 };
  }

  /* ─── API ─────────────────────────────────────────────── */
  static generate(req: NameRequest): NameResponse {
    const { country, sex, minAge, maxAge } = req;
    const ctry = country as SupportedCountry;

    const ancestry = this.getRandomAncestry(ctry);

    const { firstName, secondName, thirdName } = this.generateGivenNames(
      ctry,
      sex as 'M' | 'F' | 'NB',
      ancestry,
    );

    const { surname1, surname2 } = this.generateSurnames(ctry, ancestry);

    const age = this.getRandomAge(minAge, maxAge);

    const response: NameResponse = {
      sex,
      age,
      firstName,
      surname1,
      nationality: ctry,
      ancestry,
    };

    if (secondName !== undefined) response.secondName = secondName;
    if (thirdName !== undefined) {
      if (!response.secondName) {
        response.secondName = thirdName;
      } else {
        response.thirdName = thirdName;
      }
    }
    if (surname2 !== undefined) response.surname2 = surname2;

    return response;
  }
}
