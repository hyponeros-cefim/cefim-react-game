import survivorIcon from '../assets/icons/survivor.svg';
import meatIcon from '../assets/icons/meat.svg';
import woodIcon from '../assets/icons/wood.svg';
import stoneIcon from '../assets/icons/stone.svg';
import type { FC } from 'react';

const StyleResource = {
  li: 'flex items-center gap-2',
  p: 'text-blue-400 text-3xl font-bold bg-white rounded-2xl  pt-0.5 pb-1 px-4',
};

interface ResourcePanelProps {
  survivor: number;
  availableSurvivor: number;
  meat: number;
  wood: number;
  stone: number;
}

const ResourcePanel: FC<ResourcePanelProps> = ({ survivor, availableSurvivor, meat, wood, stone }) => {
  return (
    <div className="bg-blue-200 p-4 w-full  ">
      <ul className="flex items-center bg-blue-300 p-4 rounded-2xl border-2 border-blue-400 gap-8">
        <li className={StyleResource.li}>
          <img className="w-16" src={survivorIcon} alt="Survivor Icon" />
          <p className={StyleResource.p}>{`${survivor}/${availableSurvivor}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={meatIcon} alt="Meat Icon" />
          <p className={StyleResource.p}>{`${meat}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={woodIcon} alt="Wood Icon" />
          <p className={StyleResource.p}>{`${wood}`}</p>
        </li>
        <li className={StyleResource.li}>
          <img className="w-16" src={stoneIcon} alt="Stone Icon" />
          <p className={StyleResource.p}>{`${stone}`}</p>
        </li>
      </ul>
    </div>
  );
};
export default ResourcePanel;
