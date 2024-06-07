interface FilterInterface {
  id: number;
  label: string;
  value: string;
}

const filters: FilterInterface[] = [
  {
    id: 0,
    label: 'Car',
    value: 'Car',
  },
  {
    id: 1,
    label: 'Bike',
    value: 'Bike',
  },
  {
    id: 3,
    label: 'Truck',
    value: 'Truck',
  },
];

export type { FilterInterface };
export { filters };
