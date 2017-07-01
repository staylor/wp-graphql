import { toGlobalId } from 'graphql-relay';
import Dataloader from 'dataloader';
import fetchData from 'data/utils';

// there is no batch mechanism on this endpoint
const path = 'https://itunes.apple.com/us/rss/topalbums/limit=25/explicit=true/json';
const chartLoader = new Dataloader(chartPaths =>
  Promise.all(
    chartPaths.map(chartPath =>
      fetchData(chartPath).then(({ data: { body } }) => body.feed)
    )
  )
);

class Chart {
  getID() {
    return toGlobalId(this.constructor.name, 'me');
  }

  static getEndpoint() {
    return path;
  }

  static async load() {
    const chart = await chartLoader.load(path);
    return chart ? Object.assign(new Chart(), chart) : null;
  }
}

export default Chart;
