const cache = {};

const client = {
  createClient: () => client,
  get: (key, cb) => cb(null, cache[key]),
  set: (key, value) => {
    cache[key] = value;
  },
  on: () => {},
  expire: () => {},
};

export default client;
