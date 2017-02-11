const metaResolver = (data) => {
  if (!data.meta || !data.meta.length) {
    return null;
  }
  return Object.keys(data.meta).map(key => ({
    key,
    value: data.meta[key],
  }));
};

export default {
  metaResolver,
};
