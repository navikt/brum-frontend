'use client';

import { Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { RefObject, Dispatch, SetStateAction } from 'react';

interface MenuProps {
  chartOptions: { title: { text: string }; chart: { type: string; inverted: boolean } };
  setChartOptions: Dispatch<
    SetStateAction<{ title: { text: string }; chart: { type: string; inverted: boolean } }>
  >;
  ref: RefObject<null>;
}

const ChartMenu = ({ chartOptions, setChartOptions, ref }: MenuProps) => {
  return (
    <div>
      <RadioGroup
        legend="Inverted?"
        onChange={(e) => {
          setChartOptions({
            ...chartOptions,
            chart: { type: chartOptions.chart.type, inverted: e },
          });
        }}
        value={chartOptions.chart.inverted}
      >
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </RadioGroup>

      <TextField
        onChange={(e) => {
          setChartOptions({ ...chartOptions, title: { text: e.target.value } });
        }}
        value={chartOptions.title.text}
        label="Sett tittel"
      />
    </div>
  );
};

export default ChartMenu;
