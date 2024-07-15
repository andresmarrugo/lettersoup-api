const fs = require('fs');
const { loadWordsToRedis } = require('./utils');
const client = require('./redisClient');

// Leer el archivo de diccionario
const loadWordsFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      const words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
      resolve(words);
    });
  });
};

// Función para eliminar acentos
const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

(async () => {
  try {
    const filePath = './diccionario.txt'; // Ruta al archivo de diccionario
    const words = await loadWordsFromFile(filePath);
    const wordsWithoutAccents = words.map(word => removeAccents(word));
    await loadWordsToRedis(wordsWithoutAccents);
    console.log('Palabras cargadas en Redis');
  } catch (error) {
    console.error('Error al cargar palabras:', error);
  } finally {
    await client.disconnect();
  }
})();
