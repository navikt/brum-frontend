'use client';
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
    { label: 'Mini', value: 'Mini' },
    { label: 'Full real', value: 'Real' },
  ];

  return <div>data menu missing</div>; /* 
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
  );  */
};

export default DataMenu;
