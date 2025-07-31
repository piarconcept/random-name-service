export interface NameRequest {
  country: string;
  minAge: number;
  maxAge: number;
  sex: 'M' | 'F' | 'NB';
}

export interface NameResponse {
  sex: 'M' | 'F' | 'NB'
  age: number;
  firstName: string;
  secondName?: string;
  thirdName?: string;
  surname1: string;
  surname2?: string;
  nationality: string;
  ancestry: string[];
}


export interface CountryData {
  maleNames: string[];
  femaleNames: string[];
  unisexNames: string[];
  surnames: string[];
  immigration_rate: number;
  immigration_sources: string[];
  rules: {
    firstName: number;
    secondName: number;
    thirdName: number;
    surname1: number;
    surname2: number;
  };
}
