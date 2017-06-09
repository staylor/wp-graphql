import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// This value needs to be the same on the Relay server
const REDIS_PREFIX = 'wpgql:';
export const HASH_KEY = 'queries';

const client = redis.createClient({ prefix: REDIS_PREFIX });
// use this to debug Redis operations
// client.monitor();
client.on('error', err => {
  // eslint-disable-next-line no-console
  console.log(`Error ${err}`);
});

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

client.on('monitor', (time, args) => {
  // eslint-disable-next-line no-console
  console.log('\n', args);
});

export default client;
