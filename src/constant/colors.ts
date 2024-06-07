interface ColorInterface {
  id: number;
  name: string;
  code: string;
  boderCode?: string;
}

const colors: ColorInterface[] = [
  {
    id: 0,
    name: 'White',
    code: '#ffffff',
    boderCode: '#00000029',
  },
  {
    id: 1,
    name: 'Gray',
    code: '#EDF2F7',
    boderCode: '#CBD5E0',
  },
  {
    id: 2,
    name: 'Red',
    code: '#E53E3E',
    boderCode: '#C53030',
  },
  {
    id: 3,
    name: 'Orange',
    code: '#F6AD55',
    boderCode: '#DD6B20',
  },
  {
    id: 4,
    name: 'Yellow',
    code: '#F6E05E',
    boderCode: '#D69E2E',
  },
  {
    id: 5,
    name: 'Green',
    code: '#48BB78',
    boderCode: '#2F855A',
  },
  {
    id: 6,
    name: 'Blue',
    code: '#4299E1',
    boderCode: '#2B6CB0',
  },
  {
    id: 7,
    name: 'Pink',
    code: '#ED64A6',
    boderCode: '#B83280',
  },
  {
    id: 8,
    name: 'Black',
    code: '#000000',
    boderCode: '#00000080',
  },
];
export type { ColorInterface };
export { colors };
