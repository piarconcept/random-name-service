import { CountryData } from 'src/types';
import { namesSurnames } from './names-surnames';

export const MA: CountryData = {
    maleNames: namesSurnames.man,
    femaleNames: namesSurnames.woman,
    unisexNames: namesSurnames.unisex,
    surnames: namesSurnames.surnames,
    immigration_rate: 0.05,
    immigration_sources: ['ES', 'FR', 'IT', 'BE', 'DE'],
    rules: {
        firstName: 100,
        secondName: 5,
        thirdName: 0,
        surname1: 100,
        surname2: 90,
    },
}