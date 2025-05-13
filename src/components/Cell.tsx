import type { FC } from 'react';
import type { ICell } from './types/IMap';

interface MapProps {
  cell: ICell;
  key?: string;
}

const Cell: FC<MapProps> = ({ cell }) => {
  return <div className="relative flex justify-center items-center border-1  border-gray-500 hover:bg-gray-700"></div>;
};
export default Cell;
