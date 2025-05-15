export enum CellType {
  EMPTY = 'empty',
  HOUSE = 'house',
  FOREST = 'forest',
}

export interface ICell {
  id: number;
  type: CellType;
  x: number;
  y: number;
}
