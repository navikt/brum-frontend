'use client';

import { Chart, Title } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';
import { Series } from '@highcharts/react';

const Graph = ({ data_url }) => {
  return (
    <div>
      <Chart>
        <Title>t</Title>
        <Data csvURL={data_url} />
      </Chart>
    </div>
  );
};

export default Graph;
