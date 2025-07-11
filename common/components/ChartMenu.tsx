'use client';
import { ChartOptionsProps, PercentModeProps, StackingRadioProps } from '@/common/types/propTypes';
import { ChevronDownIcon, PencilIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Radio, RadioGroup, Switch, TextField } from '@navikt/ds-react';
import { useState } from 'react';

const ChartMenu = (props: ChartOptionsProps) => {
  const [percentMode, setPercentMode] = useState(false);

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button icon={<ChevronDownIcon aria-hidden />}>Modifiser graf</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <TitleField {...props} />
        <PercentModeSwitch {...props} percentMode={percentMode} setPercentMode={setPercentMode} />
        <InversionSwitch {...props} />
        <StackingSwitch {...props} percentMode={percentMode} />
      </ActionMenu.Content>
    </ActionMenu>
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

const InversionSwitch = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <Switch
    checked={chartOptions.chart!.inverted}
    onChange={(e) => {
      setChartOptions((prev) => ({
        ...prev,
        chart: { type: prev.chart!.type, inverted: e.target.checked },
      }));
    }}
  >
    Inverter graf
  </Switch>
);

const StackingSwitch = ({ chartOptions, setChartOptions, percentMode }: StackingRadioProps) => (
  <Switch
    checked={chartOptions.plotOptions!.series!.stacking !== undefined}
    onChange={(e) => {
      setChartOptions({
        ...chartOptions,
        plotOptions: {
          series: { stacking: e.target.checked ? (percentMode ? 'percent' : 'normal') : undefined },
        },
      });
    }}
  >
    Stable serier
  </Switch>
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
