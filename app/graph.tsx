'use client';

import { Chart, PlotOptions } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';
import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { Radio, RadioGroup } from '@navikt/ds-react';
import { useRef, useState } from 'react';

interface GraphProps {
  filnavn: string;
}

const Graph = ({ filnavn }: GraphProps) => {
  const [inverted, setInverted] = useState(true);
  const ref = useRef<any>(null);

  const swapInversion = (e: boolean) => {
    setInverted(e);
    ref.current?.chart.update({ chart: { inverted: inverted } });
  };

  const chartOptions = { chart: { type: 'column', inverted: inverted } };

  return (
    <div>
      <Chart options={chartOptions} ref={ref}>
        <Exporting />
        <Data csvURL={'/data/' + filnavn} />
        <PlotOptions series={{ stacking: 'normal' }} />
      </Chart>

      <RadioGroup legend="Inverted?" onChange={swapInversion} value={inverted}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </RadioGroup>
    </div>
  );
};

export default Graph;
