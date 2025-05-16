import { CellType, type ICell } from '../components/types/IMap';

const row1: ICell[] = [
  {
    id: 1,
    type: CellType.MOUNTAIN,
    x: 0,
    y: 0,
    worker: 0,
  },
  {
    id: 2,
    type: CellType.MOUNTAIN,
    x: 1,
    y: 0,
    worker: 0,
  },
  {
    id: 3,
    type: CellType.EMPTY,
    x: 2,
    y: 0,
    worker: 0,
  },
  {
    id: 4,
    type: CellType.EMPTY,
    x: 3,
    y: 0,
    worker: 0,
  },
  {
    id: 5,
    type: CellType.EMPTY,
    x: 4,
    y: 0,
    worker: 0,
  },
];
const row2: ICell[] = [
  {
    id: 6,
    type: CellType.FOREST,
    x: 0,
    y: 1,
    worker: 0,
  },
  {
    id: 7,
    type: CellType.FOREST,
    x: 1,
    y: 1,
    worker: 0,
  },
  {
    id: 8,
    type: CellType.EMPTY,
    x: 2,
    y: 1,
    worker: 0,
  },
  {
    id: 9,
    type: CellType.EMPTY,
    x: 3,
    y: 1,
    worker: 0,
  },
  {
    id: 10,
    type: CellType.EMPTY,
    x: 4,
    y: 1,
    worker: 0,
  },
];
const row3: ICell[] = [
  {
    id: 11,
    type: CellType.EMPTY,
    x: 0,
    y: 2,
    worker: 0,
  },
  {
    id: 12,
    type: CellType.FOREST,
    x: 1,
    y: 2,
    worker: 0,
  },
  {
    id: 13,
    type: CellType.EMPTY,
    x: 2,
    y: 2,
    worker: 0,
  },
  {
    id: 14,
    type: CellType.EMPTY,
    x: 3,
    y: 2,
    worker: 0,
  },
  {
    id: 15,
    type: CellType.EMPTY,
    x: 4,
    y: 2,
    worker: 0,
  },
];
const row4: ICell[] = [
  {
    id: 16,
    type: CellType.EMPTY,
    x: 0,
    y: 3,
    worker: 0,
  },
  {
    id: 17,
    type: CellType.EMPTY,
    x: 1,
    y: 3,
    worker: 0,
  },
  {
    id: 18,
    type: CellType.EMPTY,
    x: 2,
    y: 3,
    worker: 0,
  },
  {
    id: 19,
    type: CellType.MOUNTAIN,
    x: 3,
    y: 3,
    worker: 0,
  },
  {
    id: 20,
    type: CellType.FOREST,
    x: 4,
    y: 3,
    worker: 0,
  },
];
const row5: ICell[] = [
  {
    id: 21,
    type: CellType.EMPTY,
    x: 0,
    y: 4,
    worker: 0,
  },
  {
    id: 22,
    type: CellType.EMPTY,
    x: 1,
    y: 4,
    worker: 0,
  },
  {
    id: 23,
    type: CellType.EMPTY,
    x: 2,
    y: 4,
    worker: 0,
  },
  {
    id: 24,
    type: CellType.FOREST,
    x: 3,
    y: 4,
    worker: 0,
  },
  {
    id: 25,
    type: CellType.MOUNTAIN,
    x: 4,
    y: 4,
    worker: 0,
  },
];
export const cellList = [row1, row2, row3, row4, row5];
