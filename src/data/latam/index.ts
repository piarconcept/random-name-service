import { CountryData } from 'src/types';
import { namesSurnames } from './names-surnames';

 const LATAM: CountryData = {
    maleNames: namesSurnames.man,
    femaleNames: namesSurnames.woman,
    unisexNames: namesSurnames.unisex,
    surnames: namesSurnames.surnames,
    immigration_rate: 0.10,
    immigration_sources: [
        'ES', 'CO', 'RO', 'VE', 'AR', 'PE', 'IT', 'FR', 'DE', 'PT',
        'GB', 'US', 'BR', 'CL', 'UY', 'PY',
        'BO', 'EC', 'PA', 'CR', 'GT', 'HN',
        'NI', 'SV'
    ],
    rules: {
        firstName: 100,
        secondName: 80,
        thirdName: 60,
        surname1: 100,
        surname2: 45,
    },
}


export const PE: CountryData = {
    ...LATAM,
    immigration_rate: 0.15,
}

export const CO: CountryData = {
    ...LATAM,
    immigration_rate: 0.12,
}

export const AR: CountryData = {
    ...LATAM,
    immigration_rate: 0.08,
}

export const CL: CountryData = {
    ...LATAM,
    immigration_rate: 0.07,
}

export const UY: CountryData = {
    ...LATAM,
    immigration_rate: 0.06,
}

export const BO: CountryData = {
    ...LATAM,
    immigration_rate: 0.04,
}

export const EC: CountryData = {
    ...LATAM,
    immigration_rate: 0.05,
}

export const PA: CountryData = {
    ...LATAM,
    immigration_rate: 0.03,
}

export const CR: CountryData = {
    ...LATAM,
    immigration_rate: 0.02,
}

export const GT: CountryData = {
    ...LATAM,
    immigration_rate: 0.01,
}

export const HN: CountryData = {
    ...LATAM,
    immigration_rate: 0.02,
}

export const NI: CountryData = {
    ...LATAM,
    immigration_rate: 0.01,
}

export const SV: CountryData = {
    ...LATAM,
    immigration_rate: 0.01,
}

export const LATAM_COUNTRIES = {
    PE,
    CO,
    AR,
    CL,
    UY,
    BO,
    EC,
    PA,
    CR,
    GT,
    HN,
    NI,
    SV
};