import { Dispatch, RefObject, SetStateAction } from 'react';

export default interface FilterType {
  avdelinger: string[];
  innsatsgrupper: string[];
  selectedTiltak: boolean[];
  allAvdelinger: string[];
  allInnsatsgrupper: string[];
}

export interface FilterMenuProps {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  tiltak: string[];
  filterTabRef: RefObject<any>;
}
