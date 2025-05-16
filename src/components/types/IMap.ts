export enum CellType {
  EMPTY = 'empty',
  HOUSE = 'house',
  FOREST = 'forest',
  MOUNTAIN = 'mountain',
}

export interface ICell {
  id: number;
  type: CellType;
  x: number;
  y: number;
  worker: number;
}
