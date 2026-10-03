const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// ---------- Pokémon (PokeAPI) ----------

app.get('/api/pokemon/:query', async (req, res) => {
  const query = req.params.query.toLowerCase().trim();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    const data = await response.json();

    const movesList = data.moves?.length ? data.moves.map((m) => m.move.name) : [];
    const moves = movesList.length >= 2
      ? movesList
      : [...movesList, ...Array(2 - movesList.length).fill('NA')];

    const image = data.sprites?.other?.['official-artwork']?.front_default ?? null;

    const types = data.types?.length
      ? [...data.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name)
      : [];

    const result = {
      id: data.id,
      name: data.name,
      height: data.height ?? 'NA',
      weight: data.weight ?? 'NA',
      image,
      moves,
      types,
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar PokeAPI' });
  }
});

// ---------- Frutas del Diablo (One Piece API) ----------

const ONE_PIECE_FRUITS_URL = 'https://api.api-onepiece.com/v2/fruits/en';
const FRUIT_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

let fruitsCache = null;
let fruitsCacheTimestamp = 0;

async function getAllFruits() {
  const isCacheFresh = fruitsCache && (Date.now() - fruitsCacheTimestamp) < FRUIT_CACHE_TTL_MS;
  if (isCacheFresh) {
    return fruitsCache;
  }

  const response = await fetch(ONE_PIECE_FRUITS_URL);
  if (!response.ok) {
    throw new Error('No se pudo obtener el listado de frutas de la One Piece API');
  }

  const data = await response.json();
  fruitsCache = data;
  fruitsCacheTimestamp = Date.now();
  return data;
}

app.get('/api/fruit/:query', async (req, res) => {
  const query = req.params.query.toLowerCase().trim();

  try {
    const fruits = await getAllFruits();

    let found;
    if (/^\d+$/.test(query)) {
      const id = parseInt(query, 10);
      found = fruits.find((f) => f.id === id);
    } else {
      // Primero intentamos una coincidencia exacta (nombre en inglés o
      // nombre original en japonés), y si no hay, una coincidencia parcial.
      found = fruits.find(
        (f) => f.name?.toLowerCase() === query || f.roman_name?.toLowerCase() === query
      ) ?? fruits.find(
        (f) => f.name?.toLowerCase().includes(query) || f.roman_name?.toLowerCase().includes(query)
      );
    }

    if (!found) {
      return res.status(404).json({ error: 'Fruta no encontrada' });
    }

    const result = {
      id: found.id,
      name: found.name,
      romanName: found.roman_name ?? 'NA',
      type: found.type ?? 'NA',
      description: found.description?.trim() ? found.description : 'Sin descripción disponible.',
      image: found.filename ?? null,
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la One Piece API' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});