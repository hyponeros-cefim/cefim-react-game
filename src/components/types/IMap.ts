export enum CellType {
  EMPTY = 'empty',
  HOUSE = 'house',
  TREE = 'tree',
}

export interface ICell {
  type: CellType;
}
