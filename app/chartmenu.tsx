'use client';

import { Radio, RadioGroup, Switch, TextField } from '@navikt/ds-react';
import { RefObject, Dispatch, SetStateAction } from 'react';

interface chartOptionType {
  title: { text: string };
  chart: { type: string; inverted: boolean };
  plotOptions: { series: { stacking: string } };
}

interface MenuProps {
  chartOptions: chartOptionType;
  setChartOptions: Dispatch<SetStateAction<chartOptionType>>;
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

      <RadioGroup
        legend="Stacking?"
        onChange={(e) => {
          setChartOptions({
            ...chartOptions,
            plotOptions: { series: { stacking: e } },
          });
        }}
        value={chartOptions.plotOptions.series.stacking}
      >
        <Radio value={'normal'}>Normal</Radio>
        <Radio value={'percent'}>Percent</Radio>
      </RadioGroup>
    </div>
  );
};

export default ChartMenu;
