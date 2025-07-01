'use client';
import { ChartOptionsProps, PercentModeProps, StackingRadioProps } from '@/common/types/chartTypes';
import { Radio, RadioGroup, Switch, TextField } from '@navikt/ds-react';
import { useState } from 'react';

const ChartMenu = (props: ChartOptionsProps) => {
  const [percentMode, setPercentMode] = useState(false);

  return (
    <div>
      <TitleField {...props} />
      <PercentModeSwitch {...props} percentMode={percentMode} setPercentMode={setPercentMode} />
      <InversionRadio {...props} />
      <StackingRadio {...props} percentMode={percentMode} />
    </div>
  );
};

const TitleField = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <TextField
    onChange={(e) => {
      setChartOptions({ ...chartOptions, title: { text: e.target.value } });
    }}
    value={chartOptions.title!.text}
    label="Sett tittel"
  />
);

const InversionRadio = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <RadioGroup
    legend="Inverted?"
    onChange={(e) => {
      setChartOptions((prev) => ({
        ...prev,
        chart: { type: prev.chart!.type, inverted: e },
      }));
    }}
    value={chartOptions.chart!.inverted}
  >
    <Radio value={true}>Yes</Radio>
    <Radio value={false}>No</Radio>
  </RadioGroup>
);

const StackingRadio = ({ chartOptions, setChartOptions, percentMode }: StackingRadioProps) => (
  <RadioGroup
    legend="Stacking?"
    onChange={(e) => {
      setChartOptions({
        ...chartOptions,
        plotOptions: { series: { stacking: e === '' ? undefined : e } },
      });
    }}
    value={chartOptions.plotOptions!.series!.stacking ?? ''}
  >
    <Radio value={''}>Nei</Radio>
    <Radio value={percentMode ? 'percent' : 'normal'}>Ja</Radio>
  </RadioGroup>
);

const PercentModeSwitch = ({
  chartOptions,
  setChartOptions,
  percentMode,
  setPercentMode,
}: PercentModeProps) => (
  <Switch
    checked={percentMode}
    onChange={(e) => {
      setPercentMode(e.target.checked);
      setChartOptions({
        ...chartOptions,
        yAxis: { labels: { format: e.target.checked ? '{value}%' : '{value}' } },
        tooltip: {
          pointFormat: e.target.checked ? '{series.name}: {point.y}%' : '{series.name}: {point.y}',
        },
        plotOptions: {
          series: {
            stacking:
              chartOptions.plotOptions!.series!.stacking != undefined
                ? e.target.checked
                  ? 'percent'
                  : 'normal'
                : undefined,
          },
        },
      });
    }}
  >
    Prosentmodus
  </Switch>
);

export default ChartMenu;
