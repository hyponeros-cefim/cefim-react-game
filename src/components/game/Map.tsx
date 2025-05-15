import type { FC } from 'react';
import Cell from './Cell';
import type { ICell } from './types/IMap';

interface MapProps {
  cells: ICell[][];
  onUpdateCell: (cellId: number) => void;
}

const Map: FC<MapProps> = ({ cells, onUpdateCell }) => {
  return (
    <div className="bg-gray-800 grid grid-cols-5 grid-rows-5 min-w-90 h-90 border-collapse border-gray-500 rounded-2xl overflow-hidden shadow-[0_8px_24px_0_rgba(0,0,0,0.35)] ">
      {cells.flat().map((cell) => (
        <Cell key={cell.id} cell={cell} onClick={() => onUpdateCell(cell.id)} />
      ))}
    </div>
  );
};

export default Map;

{
  /* {cells.map((row, rowIndex) =>
  row.map((cell, colIndex) => {
    return <Cell key={`${colIndex}-${rowIndex}`} cell={cell} onClick={() => onUpdateCell(cell.id)} />;
  })
)} */
}
