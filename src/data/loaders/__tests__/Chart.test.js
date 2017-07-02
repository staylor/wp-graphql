import getChartLoaders from 'data/loaders/Chart';

const Chart = getChartLoaders();

describe('Test Chart loader', () => {
  test('Load a chart', async () => {
    const chart = await Chart.load();
    expect(chart.getID()).toMatchSnapshot();
    expect(chart).toMatchSnapshot();
  });
});
