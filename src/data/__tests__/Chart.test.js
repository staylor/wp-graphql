import Chart from 'data/Chart';

describe('Test Chart data access', () => {
  test('Get endpoint', () => {
    expect(Chart.getEndpoint()).toMatchSnapshot();
  });

  test('Load a chart', async () => {
    const chart = await Chart.load();
    expect(chart.getID()).toMatchSnapshot();
    expect(chart).toMatchSnapshot();
  });
});
