import type { FC } from 'react';
import CabinIcon from '../assets/icons/cabin.svg';
import Forest1Icon from '../assets/icons/tree.svg';
import Forest2Icon from '../assets/icons/tree2.svg';
import MountainIcon from '../assets/icons/mountain.svg';
import { CellType, type ICell } from './types/IMap';

interface MapProps {
  cell: ICell;
  key?: number;
  onClick: () => void;
}

const icons: Record<string, string> = {
  [CellType.HOUSE]: CabinIcon,
  [CellType.FOREST]: Math.random() < 0.5 ? Forest1Icon : Forest2Icon,
  [CellType.MOUNTAIN]: MountainIcon,
};

const cellStyle = 'relative flex justify-center items-center border-1  border-gray-500 hover:bg-gray-700';

const Cell: FC<MapProps> = ({ cell, onClick }) => {
  const { type } = cell;
  return (
    <div className={cellStyle} onClick={onClick}>
      {icons[type] && <img src={icons[type]} alt={type} className="w-12 h-12" />}
    </div>
  );
};
export default Cell;
