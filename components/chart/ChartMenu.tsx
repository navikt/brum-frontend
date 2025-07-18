'use client';
import { ChartOptionsProps } from '@/lib/types/propTypes';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Radio, RadioGroup, Switch, TextField } from '@navikt/ds-react';
import { SeriesColumnOptions } from 'highcharts/highcharts.src';
import { useMemo, useState } from 'react';

const ChartMenu = (props: ChartOptionsProps) => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button variant="secondary" icon={<ChevronDownIcon aria-hidden />}>
          Modifiser graf
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ChartTypeRadio {...props} />
        <ActionMenu.Divider />
        <TitleField {...props} />
        <ActionMenu.Divider />
        <PercentModeSwitch {...props} />
        <InversionSwitch {...props} />
        {/* foreløpig er stacking linka 100% til column som chart type. se stackingswitch for mer */}
        {props.chartOptions.chart!.type === 'column' && <StackingSwitch {...props} />}
      </ActionMenu.Content>
    </ActionMenu>
  );
};

const ChartTypeRadio = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <RadioGroup
    onChange={(e) => {
      setChartOptions({
        ...chartOptions,
        chart: { type: e },
      });
    }}
    value={chartOptions.chart!.type}
    legend="Velg graftype"
  >
    <Radio value="column">Column</Radio>
    <Radio value="line">Line</Radio>
  </RadioGroup>
);

const TitleField = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <TextField
    onChange={(e) => {
      setChartOptions({ ...chartOptions, title: { text: e.target.value } });
    }}
    value={chartOptions.title!.text}
    label="Sett tittel på grafen"
    htmlSize={14}
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

// hardkoda for column som serietype, om flere serier legges til som kan ha stacking må man endre så det funker for dem også
const StackingSwitch = ({ chartOptions, setChartOptions }: ChartOptionsProps) => (
  <Switch
    checked={chartOptions.plotOptions!.series!.stacking !== undefined}
    onChange={(e) => {
      setChartOptions({
        ...chartOptions,
        plotOptions: {
          column: { stacking: e.target.checked ? 'normal' : undefined },
        },
      });
    }}
  >
    Stable serier
  </Switch>
);

const PercentModeSwitch = ({ chartOptions, setChartOptions }: ChartOptionsProps) => {
  const [percentMode, setPercentMode] = useState(false);
  const [absoluteValueSeries, setAbsoluteValueSeries] = useState<SeriesColumnOptions[] | null>(
    null,
  );

  const percentSeries: SeriesColumnOptions[] | null = useMemo(() => {
    if (!absoluteValueSeries) return null;
    const dataArrays = absoluteValueSeries.map((s) => s.data as number[]);

    const totalsAtEachPosition = dataArrays[0].map((_, position) =>
      dataArrays.reduce((sum, dataArray) => sum + dataArray[position], 0),
    );

    const percentageArrays = dataArrays.map((array) =>
      array.map((value, position) => {
        const totalAtPosition = totalsAtEachPosition[position];
        return totalAtPosition === 0 ? 0 : (value / totalAtPosition) * 100;
      }),
    );

    return absoluteValueSeries.map((s, index) => ({
      ...s,
      data: percentageArrays[index],
    }));
  }, [absoluteValueSeries]);

  return (
    <Switch
      checked={percentMode}
      onChange={(e) => {
        const isChecked = e.target.checked;
        setPercentMode(isChecked);

        // lagrer opprinnelige serier første gang prosentmodues blir aktivtert
        if (isChecked && !absoluteValueSeries) {
          setAbsoluteValueSeries(chartOptions.series as SeriesColumnOptions[]);
        }

        setChartOptions({
          ...chartOptions,
          yAxis: { labels: { format: e.target.checked ? '{value}%' : '{value}' } },
          tooltip: {
            pointFormat: '{series.name}' + e.target.checked ? '{point.y:.1f}%' : '{point.y}',
          },
          series: e.target.checked ? percentSeries! : absoluteValueSeries!,
        });
      }}
    >
      Prosentmodus
    </Switch>
  );
};

export default ChartMenu;
