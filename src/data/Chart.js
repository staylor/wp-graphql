// https://itunes.apple.com/us/rss/topalbums/limit=25/explicit=true/json

import { toGlobalId } from 'graphql-relay';
import { fetchData } from 'data';

// Dataloader expects IDs that can be read by the REST API

// there is no batch mechanism on this endpoint
const path = 'https://itunes.apple.com/us/rss/topalbums/limit=25/explicit=true/json';

class Chart {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }

  static async load() {
    const { data: { body } } = await fetchData(path);
    return body.feed;
  }
}

export default Chart;
