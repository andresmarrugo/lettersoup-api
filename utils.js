const client = require('./redisClient');

// Cargar las palabras en Redis de una sola vez
const loadWordsToRedis = async (words) => {
  await client.sAdd('words', words);
};

// Obtener palabras aleatorias con longitud mínima y máxima
const getRandomWords = async (minLength, maxLength, count) => {
  const allWords = await client.sMembers('words');
  const filteredWords = allWords.filter(word => word.length >= minLength && word.length <= maxLength);
  const shuffledWords = filteredWords.sort(() => 0.5 - Math.random());
  return count ? shuffledWords.slice(0, count) : shuffledWords;
};

module.exports = { loadWordsToRedis, getRandomWords };
