import { createContext, ReactNode, useContext, useState } from 'react';
import { API_BASE_URL } from '../constants/api';
import { PokemonData } from '../types/pokemon';

interface PokemonContextType {
  query: string;
  setQuery: (q: string) => void;
  pokemon: PokemonData | null;
  loading: boolean;
  errorMsg: string | null;
  searchPokemon: () => Promise<void>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const searchPokemon = async () => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg('Escribe un nombre o número de Pokédex');
      return;
    }

    setLoading(true);
    setPokemon(null);
    setErrorMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/pokemon/${trimmed}`);
      if (!response.ok) throw new Error('Pokemon not found');
      const data: PokemonData = await response.json();
      setPokemon(data);
    } catch (e) {
      setErrorMsg('Pokémon no encontrado. Verifica el nombre o número.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PokemonContext.Provider
      value={{ query, setQuery, pokemon, loading, errorMsg, searchPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemon debe usarse dentro de PokemonProvider');
  return ctx;
}