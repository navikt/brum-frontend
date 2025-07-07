'use client';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { UpdateDataOptionsProps } from '../types/propTypes';

const DataMenu = (props: UpdateDataOptionsProps) => {
  return (
    <div>
      <DataSetSelect {...props} />
    </div>
  );
};

const DataSetSelect = ({ dataParams, setDataParams }: UpdateDataOptionsProps) => {
  const options = [
    { label: 'Testdatasett 1', value: '1' },
    { label: 'Testdatasett 2', value: '2' },
  ];

  return (
    <UNSAFE_Combobox
      label="Velg testdatasett"
      options={options}
      selectedOptions={[options.find((opt) => opt.value === String(dataParams.testDataSet))!]}
      onToggleSelected={(optionValue) => {
        setDataParams((prev: Object) => ({
          ...prev,
          testDataSet: Number(optionValue),
        }));
      }}
      shouldAutocomplete
      isMultiSelect={false}
    />
  );
};

export default DataMenu;
