import Dataloader from 'dataloader';
import fetchData from 'data/utils';
import Chart from 'data/Chart';

// there is no batch mechanism on this endpoint
const endpoint = Chart.getEndpoint();

export default function getChartLoaders() {
  const chartLoader = new Dataloader(chartPaths =>
    Promise.all(
      chartPaths.map(chartPath =>
        fetchData(chartPath).then(({ data: { body } }) => body.feed)
      )
    )
  );

  return {
    load: async () => {
      const chart = await chartLoader.load(endpoint);
      return chart ? Object.assign(new Chart(), chart) : null;
    },
  };
}
