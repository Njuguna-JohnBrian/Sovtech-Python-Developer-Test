export interface People {
  count: number;
  next?: number;
  previous?: number;
  results: [Person];
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

export interface Results {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films?: [];
  species: [];
  vehicles: [];
  starships: [];
  created: [];
  edited: [];
  url: [];
  length: number;
  results: [];
}
