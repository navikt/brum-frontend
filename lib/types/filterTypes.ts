import { Dispatch, RefObject, SetStateAction } from 'react';
import { BrumData } from './brumData';
/**
 * Type for filter-funksjon
 */
export interface FilterType {
  label: string;
  comp_function: ((z: number) => boolean) | ((z: string) => boolean);
}
/**
 * Props for FilterMenu-komponent
 */
export interface FilterMenuProps {
    data: BrumData;
    setFilters: Dispatch<SetStateAction<FilterType[]>>;
}