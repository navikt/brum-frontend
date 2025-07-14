import { Dispatch, SetStateAction } from 'react';
import { BrumData } from './brumData';

export interface FilterType {
  label: string;
  comp_function: ((z: number) => boolean) | ((z: string) => boolean);
}

export interface FilterMenuProps {
  data: BrumData;
  setFilters: Dispatch<SetStateAction<FilterType[]>>;
}
