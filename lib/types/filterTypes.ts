import { Dispatch, RefObject, SetStateAction } from 'react';

export interface FilterType {
  avdelinger: string[];
  innsatsgrupper: string[];
  selectedTiltak: boolean[];
  tiltakMin: number[];
  tiltakMaks: number[];
  allAvdelinger: string[];
  allInnsatsgrupper: string[];
}

export interface FilterMenuProps {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  tiltak: string[];
  filterTabRef: RefObject<any>;
}
