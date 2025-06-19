"use client"; // ??

import { PageBlock } from "@navikt/ds-react/Page";
import styles from "./page.module.css";
import { Chart, PlotOptions, Title, XAxis, YAxis } from "@highcharts/react";
import { Column } from "@highcharts/react/series";
import { useState } from "react";
import { Radio, RadioGroup, Switch } from "@navikt/ds-react";

const tiltaksdata = {
  grot: { vedtak: [0, 3, 2], opptak: [1, 6, 5], skippertak: [0, 5, 4] },
  suppe: { vedtak: [3, 1, 1], opptak: [2, 2, 2], skippertak: [2, 0, 1] },
  spag: { vedtak: [6, 6, 4], opptak: [4, 5, 4], skippertak: [2, 1, 4] },
};

const Home = () => {
  const [avdeling, setAvdeling] = useState("grot");
  const [prosent, setProsent] = useState(false);

  return (
    <main>
      <PageBlock width="md" gutters>
        <RadioGroup
          legend="Velg avdeling."
          onChange={setAvdeling}
          value={avdeling}
        >
          <Radio value="grot">Grøtavdelingen</Radio>
          <Radio value="suppe">Suppeavdelingen</Radio>
          <Radio value="spag">Spagettiavdelingen</Radio>
        </RadioGroup>
        <Switch
          checked={prosent}
          onChange={(e) => setProsent(e.target.checked)}
        >
          Prosent
        </Switch>
      </PageBlock>
      <PageBlock width="md" gutters>
        <Chart>
          <Title>Andel av tiltak</Title>

          <XAxis categories={["Februar", "Mars", "April"]} />
          <YAxis min={0} />
          <PlotOptions
            series={{
              stacking: prosent ? "percent" : null,
              dataLabels: {
                enabled: true,
              },
            }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].vedtak}
            options={{ name: "Vedtakstiltak" }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].opptak}
            options={{ name: "Opptakstiltak" }}
          />
          <Column.Series
            data={tiltaksdata[avdeling as keyof typeof tiltaksdata].skippertak}
            options={{ name: "Skippertakstiltak" }}
          />
        </Chart>
      </PageBlock>
    </main>
  );
};

export default Home;
