import redis from 'redis';

export const client = redis.createClient();
client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Error ${err}`);
});

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

export default redis;
