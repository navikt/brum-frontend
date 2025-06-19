'use client';
import { Chart, Title } from '@highcharts/react';

import { Area, Line } from '@highcharts/react/series';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { convertCsvToHighchartsData } from '../../utils/convert';
import { useEffect, useState } from 'react';
import type { MonthDataItem } from '../../types/MonthData';

export default function HighchartsPage() {
  const [data, setData] = useState<MonthDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.csv');
      const csv = await response.text();
      const convertedData = convertCsvToHighchartsData(csv);
      setData(convertedData);
      console.log(convertedData);
    };
    fetchData();
  }, []);

  const month = Array.from(new Set(data.map((item) => item.month)));
  const avdeling = Array.from(new Set(data.map((item) => item.Avdeling)));

  const series = avdeling.map((avd) => ({
    name: avd,
    data: month.map((m) => {
      const item = data.find((d) => d.month === m && d.Avdeling === avd);
      return item ? item.AntallPaTiltak : 0;
    }),
  }));

  const Option = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Antall på tiltak per avdeling per måned',
    },
    xAxis: {
      categories: month,
      title: {
        text: 'Måned',
      },
    },
    yAxis: {
      title: {
        text: 'Antall på tiltak',
      },
    },
    series: series,
  };

  return (
    <div className="p-8">
      <HighchartsReact highcharts={Highcharts} options={Option} />
    </div>
  );
}
