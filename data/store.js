import redis from 'redis';

let client = null;

export const getClient = () => {
  if (client !== null) {
    return client;
  }

  client = redis.createClient();
  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(`Error ${err}`);
  });

  client.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('Redis client connected');
  });

  return client;
};

export default redis;
