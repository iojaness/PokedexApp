import { createContext, ReactNode, useContext, useState } from 'react';
import { FRUIT_API_URL } from '../constants/api';
import { FruitData } from '../types/fruit';

interface FruitContextType {
  query: string;
  setQuery: (q: string) => void;
  fruit: FruitData | null;
  loading: boolean;
  errorMsg: string | null;
  searchFruit: () => Promise<void>;
}

const FruitContext = createContext<FruitContextType | undefined>(undefined);

export function FruitProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [fruit, setFruit] = useState<FruitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const searchFruit = async () => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg('Escribe el nombre o el número de una Akuma no Mi');
      return;
    }

    setLoading(true);
    setFruit(null);
    setErrorMsg(null);

    try {
      const response = await fetch(`${FRUIT_API_URL}/api/fruit/${encodeURIComponent(trimmed)}`);
      if (!response.ok) throw new Error('Fruit not found');
      const data: FruitData = await response.json();
      setFruit(data);
    } catch (e) {
      setErrorMsg('Fruta del Diablo no encontrada. Verifica el nombre o número.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FruitContext.Provider
      value={{ query, setQuery, fruit, loading, errorMsg, searchFruit }}
    >
      {children}
    </FruitContext.Provider>
  );
}

export function useFruit() {
  const ctx = useContext(FruitContext);
  if (!ctx) throw new Error('useFruit debe usarse dentro de FruitProvider');
  return ctx;
}