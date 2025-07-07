'use client';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { UpdateDataOptionsProps } from '../types/propTypes';

const DataMenu = (props: UpdateDataOptionsProps) => {
  return (
    <div>
      <TestDataSetRadio {...props} />
    </div>
  );
};

const TestDataSetRadio = ({ setDataParams }: UpdateDataOptionsProps) => (
  <RadioGroup
    legend="Hvilket testdatasett vil du se?"
    onChange={(e) => {
      setDataParams((prev: Object) => ({
        ...prev,
        testDataSet: Number(e),
      }));
    }}
  >
    <Radio value={1}>1</Radio>
    <Radio value={2}>2</Radio>
  </RadioGroup>
);

export default DataMenu;
