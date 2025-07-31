import { CountryData } from 'src/types';
import { namesSurnames } from './names-surnames';

export const ES: CountryData = {
    maleNames: namesSurnames.man,
    femaleNames: namesSurnames.woman,
    unisexNames: namesSurnames.unisex,
    surnames: namesSurnames.surnames,
    immigration_rate: 0.10,
    immigration_sources: ['MA', 'CO', 'RO', 'VE', 'AR', 'PE', 'ES', 'IT', 'FR', 'DE', 'PT', 'GB', 'US', 'BR', 'CL', 'UY', 'PY', 'BO', 'EC', 'PA', 'CR', 'GT', 'HN', 'NI', 'SV'],
    rules: {
        firstName: 100,
        secondName: 2,
        thirdName: 0,
        surname1: 100,
        surname2: 95,
    },
}