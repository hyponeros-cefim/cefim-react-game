import { useState } from 'react';
import skullIcon from '../assets/icons/skull.svg';

interface IPlayer {
  name: string;
  score: number;
}

const LeaderBoard = () => {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name);
    const newPlayer: IPlayer = {
      name,
      score: 0,
    };
    console.log('🏷️ ~ LeaderBoad.tsx:20 ~ newPlayer : ', newPlayer.name);

    setPlayers([...players, newPlayer]);
    console.log('🏷️ ~ LeaderBoad.tsx:25 ~ players : ', players);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-600">
      <img className="w-16" src={skullIcon} alt="Skull Icon" />
      <h1 className="text-white font-bold text-6xl">Game Over</h1>
      <h2 className=" mb-8 text-white">Leaderboard</h2>

      <form onSubmit={handleSubmit} className=" flex justify-between items-center mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Jean Michel"
          className=" px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={name.length < 3}
          className="ml-2 px-6 py-2 rounded-lg bg-white cursor-pointer text-gray-800 font-bold shadow hover:bg-gray-100 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
          Envoyer
        </button>
      </form>

      <ul className="w-64  overflow-clip text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {players &&
          players.length > 0 &&
          players.map((player, index) => (
            <li
              key={index}
              aria-current="true"
              className="w-full flex flex-col gap-0.5 px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-auto focus:outline-none dark:bg-gray-800 dark:border-gray-600">
              <p className="text-lg font-bold">{player.name}</p>
              <p>Score: {player.score}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default LeaderBoard;
