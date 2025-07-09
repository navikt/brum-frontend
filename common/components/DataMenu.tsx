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
    { label: 'Testdatasett 1', value: 'Test1' },
    { label: 'Testdatasett 2', value: 'Test2' },
    { label: 'Real test data w/o tiltaksbehov, OBS: only logs data', value: 'No behov' },
  ];

  return (
    <UNSAFE_Combobox
      label="Velg testdatasett"
      options={options}
      selectedOptions={[options.find((opt) => opt.value === dataParams.dataSet)!]}
      onToggleSelected={(optionValue) => {
        setDataParams((prev: Object) => ({
          ...prev,
          dataSet: optionValue,
        }));
      }}
      shouldAutocomplete
      isMultiSelect={false}
    />
  );
};

export default DataMenu;
