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

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: PokemonMove[];
  types: PokemonType[];
  sprites: PokemonSprites;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number | 'NA';
  weight: number | 'NA';
  image: string | null;
  moves: string[];
  types: string[];
}