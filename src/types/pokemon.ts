export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
  };
}

export interface PokemonSprites {
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonForm {
  name: string;
  image: string;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number | 'NA';
  weight: number | 'NA';
  image: string | null;
  moves: string[];
  types: string[];
  stats: PokemonStats;
  hasGenderDifference: boolean;
  imageFemale: string | null;
  hasAlternateForms: boolean;
  forms: PokemonForm[];
}