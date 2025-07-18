// default verdier for charten. vi styrer alt som har med charten å gjøre, fra utseende til data gjennom å oppdatere en state med dette som utgangspunkt (opprettes i dashboard/page.tsx)

export const defaultChartOptions = {
  title: { text: '' },
  chart: {
    type: 'column',
    inverted: false,
    height: '50%',
  },
  plotOptions: {
    column: {
      pointPadding: 0.05,
      groupPadding: 0.05,
      centerInCategory: true,
      stacking: undefined,
      dataSorting: { enabled: true },
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
