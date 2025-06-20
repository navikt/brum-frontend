'use client'; // ??

import { PageBlock } from '@navikt/ds-react/Page';
import { Chart, PlotOptions, Title, XAxis, YAxis } from '@highcharts/react';
import { Column } from '@highcharts/react/series';
import { useRef, useState } from 'react';
import { Radio, RadioGroup, Switch } from '@navikt/ds-react';
import { Exporting } from '@highcharts/react/options/Exporting';

const tiltaksdata = {
  grot: { vedtak: [0, 3, 2], opptak: [1, 6, 5], skippertak: [0, 5, 4] },
  suppe: { vedtak: [3, 1, 1], opptak: [2, 2, 2], skippertak: [2, 0, 1] },
  spag: { vedtak: [6, 6, 4], opptak: [4, 5, 4], skippertak: [2, 1, 4] },
};

const Graph = () => {
  const [avdeling, setAvdeling] = useState('grot');
  const [prosent, setProsent] = useState(false);
  const [inverted, setInverted] = useState(false);
  const ref = useRef();

  const swapInversion = (e) => {
    setInverted(e);
    ref.current.chart.update({ chart: { inverted: inverted } });
  };

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
              stacking: prosent ? 'percent' : null,
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
