export interface FilterState {
  [columnIndex: number]: {
    type: 'string' | 'number' | 'date';
    // String filters
    contains?: string;
    starts_with?: string;
    // Number filters
    exactly?: number;
    over?: number;
    under?: number;
    between?: { min: number; max: number };
  };
}

export interface FilterActions {
  addStringFilter: (columnIndex: number, contains: string) => void;
  addNumberFilter: (
    columnIndex: number,
    filterType: 'exactly' | 'over' | 'under',
    value: number,
  ) => void;
  addNumberRangeFilter: (columnIndex: number, min: number, max: number) => void;
  removeFilter: (columnIndex: number) => void;
  clearAllFilters: () => void;
}
