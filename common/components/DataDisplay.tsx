'use client';

import { useFetchTestData } from '@/common/utils/fetchTestData';
import { useState } from 'react';
import { DataOptionsProps } from '../types/propTypes';
import DataMenu from './DataMenu';
import DataTable from './DataTable';
import DataChart from './DataChart';

const DataDisplay = () => {
  const [data, setData] = useState<string>('');
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ dataSet: 'Mini.csv' });

  useFetchTestData(setData, dataParams);

  return (
    <div>
      <DataChart data={data} />
      <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
      <DataTable data={data} />
    </div>
  );
};

export default DataDisplay;
