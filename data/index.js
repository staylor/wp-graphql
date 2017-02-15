import request from 'request-promise';

const rp = (path, opts = {}) => {
  const params = Object.assign({
    uri: `${process.env.WP_API_HOST}${path}`,
    jar: true,
    json: true,
    simple: true,
    strictSSL: false,
  }, opts);

  return request(params);
};

export default rp;
