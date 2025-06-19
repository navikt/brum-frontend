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
        <Button
          icon={<ThumbUpIcon title="a11y tittel" />}
          className={styles.limeButton}
        >
          Knapp
        </Button>
      </PageBlock>
    </main>
  );
};

export default Home;
