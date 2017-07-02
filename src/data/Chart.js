import { toGlobalId } from 'graphql-relay';

const path = 'https://itunes.apple.com/us/rss/topalbums/limit=25/explicit=true/json';

class Chart {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }
}

export default Chart;
