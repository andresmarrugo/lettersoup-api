const express = require('express');
const { getRandomWords } = require('./utils');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/random-words', async (req, res) => {
  const minLength = parseInt(req.query.minLength, 10) || 0;
  const maxLength = parseInt(req.query.maxLength, 10) || Infinity;
  const count = parseInt(req.query.count, 10) || null;

  try {
    const words = await getRandomWords(minLength, maxLength, count);
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener palabras aleatorias' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
