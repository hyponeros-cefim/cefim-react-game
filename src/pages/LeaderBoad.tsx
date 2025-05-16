import { useState } from 'react';
import skullIcon from '../assets/icons/skull.svg';
import type IPlayer from './types/Iplayers';
import { useGameState } from '../Store/useGameState';
import { Link } from 'react-router-dom';
import { EPages } from './types/EPages.enum';

const style = {
  input:
    'px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400',
  button:
    'ml-2 px-6 py-2 rounded-lg bg-white cursor-pointer text-gray-800 font-bold shadow hover:bg-gray-100 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
  ul: 'w-64  overflow-clip text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white',
  li: 'w-full flex flex-col gap-0.5 px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-auto focus:outline-none dark:bg-gray-800 dark:border-gray-600',
};

const LeaderBoard = () => {
  const { time, reset } = useGameState();

  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [players, setPlayers] = useState<IPlayer[]>([
    { name: 'Michel', score: 94 },
    { name: 'Jean', score: 72 },
    { name: 'Pierre', score: 11 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer: IPlayer = {
      name,
      score: time,
    };
    setIsSubmitted(true);
    setPlayers([...players, newPlayer]);
  };

  const handleReset = () => {
    reset();
  };

  const playersOrder = players.sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-600">
      <img className="w-16" src={skullIcon} alt="Skull Icon" />
      <h1 className="text-white font-bold text-6xl">Game Over</h1>
      <h2 className=" mb-8 text-white">Leaderboard</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className=" flex justify-between items-center mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Jean Michel"
            className={style.input}
          />
          <button type="submit" disabled={name.length < 3} className={style.button}>
            Envoyer
          </button>
        </form>
      ) : (
        <div className="flex  gap-2 items-center mb-8">
          <Link
            className="bg-gray-900 text-white font-bold rounded px-4 py-2 w-32 text-center hover:bg-gray-800 "
            to={EPages.GAME}
            onClick={handleReset}>
            Play again
          </Link>
          <Link
            className="border border-gray-300 rounded px-4 py-2 w-auto text-gray-300 text-center bg-transparent hover:border-white hover:text-white transition-colors"
            to={EPages.MENU}
            onClick={handleReset}>
            Back to menu
          </Link>
        </div>
      )}
      <ul className={style.ul}>
        {playersOrder &&
          playersOrder.length > 0 &&
          playersOrder.map((player, index) => (
            <li key={index} aria-current="true" className={style.li}>
              <p className="text-lg font-bold">
                <i>{index + 1}</i> - <b>{player.name}</b>
              </p>
              <p>Score: {player.score}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default LeaderBoard;
