import request from 'request-promise';

const host = 'https://highforthis.com/wp-json/wp/v2';

const rp = (path, opts = {}) => {
  const params = Object.assign({
    uri: `${host}${path}`,
    jar: true,
    json: true,
    simple: true,
    strictSSL: false,
  }, opts);

  return request(params);
};

export default rp;
