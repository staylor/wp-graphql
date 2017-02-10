import fetch from 'node-fetch';

const host = 'http://demo.wp-api.org/wp-json/wp/v2';

export default (path, opts) => {
  const params = Object.assign({
    method: 'GET',
    credentials: 'same-origin',
  }, opts);

  return fetch(`${host}${path}`, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(response => response.json());
};
