'use client';

import { Chart, PlotOptions, Series, Title } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';
import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { Column } from '@highcharts/react/series';

interface PropsTypes {
  filnavn: string;
}

const Graph = ({ filnavn }: PropsTypes) => {
  return (
    <div>
      <Chart>
        <Exporting />
        <Data csvURL={'/data/' + filnavn} />
        <PlotOptions series={{ stacking: 'normal' }} />
        <Column.Series />
        <Column.Series />
        <Column.Series />
      </Chart>
    </div>
  );
};

export default Graph;
