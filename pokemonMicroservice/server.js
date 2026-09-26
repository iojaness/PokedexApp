const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});