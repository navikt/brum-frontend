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

  const swapInversion = (e:boolean) => {
    setInverted(e);
    ref.current.chart.update({ chart: { inverted: inverted } });
  };

  if (!tiltaksdata) return <div>Laster data...</div>;

  return (
    <div>
      <PageBlock width="md" gutters>
        <Exporting />
        <RadioGroup legend="Velg avdeling." onChange={setAvdeling} value={avdeling}>
          <Radio value="grot">Grøtavdelingen</Radio>
          <Radio value="suppe">Suppeavdelingen</Radio>
          <Radio value="spag">Spagettiavdelingen</Radio>
        </RadioGroup>
        <Switch checked={prosent} onChange={(e) => setProsent(e.target.checked)}>
          Prosent
        </Switch>
      </PageBlock>
      <PageBlock width="md" gutters>
        <Chart ref={ref}>
          <Title>Andel av tiltak</Title>

          <XAxis categories={['Februar', 'Mars', 'April']} />
          <YAxis min={0} />
          <PlotOptions
            series={{
              stacking: prosent ? 'percent' : undefined,
              dataLabels: {
                enabled: true,
              },
            }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].vedtak}
            options={{ name: 'Vedtakstiltak' }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].opptak}
            options={{ name: 'Opptakstiltak' }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].skippertak}
            options={{ name: 'Skippertakstiltak' }}
          />
        </Chart>
        <RadioGroup legend="Invert?" onChange={swapInversion} value={inverted}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </RadioGroup>
      </PageBlock>
    </div>
  );
};

export default Graph;
