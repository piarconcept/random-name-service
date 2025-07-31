import { CountryData } from 'src/types';
import { namesSurnames } from './names-surnames';

export const US: CountryData = {
    maleNames: namesSurnames.man,
    femaleNames: namesSurnames.woman,
    unisexNames: namesSurnames.unisex,
    surnames: namesSurnames.surnames,
    immigration_rate: 75,
    immigration_sources: [
        'CA', 'MX', 'IN', 'CN', 'UK', 'PH', 'DE', 'FR', 'JP', 'KR', 'BR', 'IT', 'ES', 'RU', 
        'NL', 'PL', 'TR', 'ID', 'SA', 'AR', 'CH', 'BE', 'SE', 'NO', 'FI', 'DK', 'IE', 'PT', 
        'GR', 'CZ', 'HU', 'AT', 'RO', 'BG', 'SK', 'SI', 'HR', 'EE', 'LV', 'LT', 'IS',
        'LU', 'MT', 'CY', 'AL', 'BA', 'MK', 'RS', 'ME', 'XK', 'MD', 'UA', 'BY', 'KZ', 
        'UZ', 'TJ', 'TM', 'KG', 'GE', 'AM', 'AZ', 'EG', 'MA', 'TN', 'DZ', 'LY', 'SD', 'SY', 
        'IQ', 'IR', 'AF', 'PK', 'LK', 'BD', 'NP', 'MM', 'TH', 'VN', 'KH', 'LA', 'MY', 
        'SG', 'ID', 'PH', 'TL', 'BN', 'AU', 'NZ', 'PG', 'FJ', 'SB', 'VU', 'WS', 'TO', 
        'TV', 'KI', 'FM', 'MH', 'PW', 'NR', 'NU', 'TK', 'AS', 'GU', 'MP', 'VI', 'PR', 'UM', 'FM'
    ],
    rules: {
        firstName: 100,
        secondName: 75,
        thirdName: 15,
        surname1: 100,
        surname2: 5,
    },
}