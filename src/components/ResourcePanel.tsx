import SurvivorIcon from '../assets/icons/survivor.svg';
import MeatIcon from '../assets/icons/meat.svg';
import WoodIcon from '../assets/icons/wood.svg';
import StoneIcon from '../assets/icons/stone.svg';
import type { FC } from 'react';

const StyleResource = {
  li: 'flex items-center gap-2',
  p: 'text-white text-3xl font-bold bg-gray-800 rounded-2xl  pt-0.5 pb-1 px-4',
};

interface ResourcePanelProps {
  survivor: number;
  population: number;
  meat: number;
  wood: number;
  stone: number;
}

const ResourcePanel: FC<ResourcePanelProps> = ({ survivor, population, meat, wood, stone }) => {
  return (
    <div className="bg-gray-800 border-gray-700 p-4 w-full  ">
      <ul className="flex items-center bg-gray-600 p-4 rounded-2xl border-2 border-gray-700 gap-8">
        <li className={StyleResource.li}>
          <img className="w-16" src={SurvivorIcon} alt="Survivor Icon" />
          <p className={StyleResource.p}>{`${survivor}/${population}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={MeatIcon} alt="Meat Icon" />
          <p className={StyleResource.p}>{`${meat}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={WoodIcon} alt="Wood Icon" />
          <p className={StyleResource.p}>{`${wood}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={StoneIcon} alt="Stone Icon" />
          <p className={StyleResource.p}>{`${stone}`}</p>
        </li>
      </ul>
    </div>
  );
};
export default ResourcePanel;
