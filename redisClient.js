require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on("connect", () => {
  console.log('Connected to Redis');
});

client.on('error', err => {
  console.error('Redis Client Error', err);
});

(async () => {
  await client.connect();
})();

module.exports = client;
