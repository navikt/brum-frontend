export const defaultChartOptions = {
  title: { text: '' },
  chart: {
    type: 'column',
    inverted: false,
    height: '50%',
  },
  plotOptions: {
    series: { stacking: undefined },
    column: {
      pointPadding: 0.05,
      groupPadding: 0.05,
      centerInCategory: true,
    },
  },
  yAxis: {
    maxPadding: 0.05,
    title: { text: 'Antall deltakere' },
    labels: { format: '{value:,0f}' },
  },
  xAxis: {
    labels: {
      style: { fontSize: '14px' },
    },
  },
  exporting: { enabled: true },
  accessibility: { enabled: true },
};
