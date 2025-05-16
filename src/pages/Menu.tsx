import type { FC } from 'react';
import shedIcon from '../assets/icons/cabin.svg';
import { Link } from 'react-router-dom';
import { EPages } from './types/EPages.enum';

interface MenuProps {
  version: string;
}

const Menu: FC<MenuProps> = ({ version }) => {
  const sentences = [
    'Seuls les plus malins survivront. ',
    'Bâtissez. Luttez. Survivez.',
    'Perdez tout… ou dominez la terre. ',
  ];
  const subtitle = sentences[Math.floor(Math.random() * sentences.length)];

  function handleClick() {
    alert('Game created by Survive Team');
  }

  return (
    <nav className="w-full h-full flex flex-col justify-center items-center bg-gray-700">
      <img className="w-16" src={shedIcon} alt="Shed Icon" />
      <h1 className="text-white font-bold text-6xl">Survive React</h1>
      <h2 className="rotate-5 ml-16 mb-8 text-white animate-pulse">{subtitle}</h2>
      <div className="flex flex-col items-stretch max-w-md gap-2 my-4">
        <Link className="bg-white rounded px-4 py-2 w-32 text-center " to={EPages.GAME}>
          Play
        </Link>
        <button className="bg-white rounded px-4 py-2 w-32 cursor-pointer" onClick={handleClick}>
          Credits
        </button>
        <p className="text-white text-center">v. {version}</p>
      </div>
    </nav>
  );
};
export default Menu;
