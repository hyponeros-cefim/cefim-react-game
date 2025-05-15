import type { FC } from 'react';
import CabinIcon from '../../assets/icons/cabin.svg';
import ForestIcon from '../../assets/icons/shed.svg';
import { CellType, type ICell } from './types/IMap';

interface MapProps {
  cell: ICell;
  key?: number;
  onClick: () => void;
}

const icons: Record<string, string> = {
  [CellType.HOUSE]: CabinIcon,
  [CellType.FOREST]: ForestIcon,
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
