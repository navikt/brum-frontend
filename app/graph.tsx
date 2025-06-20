'use client';

import { Chart, Title } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';

interface PropsTypes {
  filnavn: string;
}

const Graph = ({ filnavn }: PropsTypes) => {
  return (
    <div>
      <Chart>
        <Title>t</Title>
        <Data csvURL={'/data/' + filnavn} />
      </Chart>
    </div>
  );
};

export default Graph;
