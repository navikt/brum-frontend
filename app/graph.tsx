"use client";

import { PageBlock } from '@navikt/ds-react/Page';
import { Chart, PlotOptions, Title, XAxis, YAxis } from '@highcharts/react';
import { Column } from '@highcharts/react/series';
import { useEffect, useRef, useState } from 'react';
import { Radio, RadioGroup, Switch } from '@navikt/ds-react';
import { Exporting } from '@highcharts/react/options/Exporting';

const Graph = () => {
  const [avdeling, setAvdeling] = useState('grot');
  const [prosent, setProsent] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [tiltaksdata, setTiltaksdata] = useState<any>(null);
  const ref = useRef<any>(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL!! + '/getTestData')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setTiltaksdata)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL!! + '/getTestData')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setTiltaksdata)
      .catch(console.error);
  }, []);

  const swapInversion = (e: boolean) => {
    setInverted(e);
    ref.current?.chart.update({ chart: { inverted: inverted } });
  };

  if (!tiltaksdata) return <div>Laster data...</div>;

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
