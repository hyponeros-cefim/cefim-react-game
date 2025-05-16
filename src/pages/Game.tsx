import { useEffect } from 'react';
import { useGameState } from '../Store/useGameState';
import { useNavigate } from 'react-router-dom';
import { EPages } from './types/EPages.enum';
import ResourcePanel from '../components/ResourcePanel';
import QuestList from '../components/QuestList';
import Map from '../components/Map';

const Game = () => {
  // states
  const { meat, quests } = useGameState();
  // actions
  const { eatMeat, addTime, updateQuests, updateCellType, reset } = useGameState();

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      addTime(); // Incrémente le temps de 1
      eatMeat(); // Empêche meat de devenir négatif
    }, 10000);
    return () => clearInterval(interval);
  }, [eatMeat, addTime]);

  useEffect(() => {
    if (meat <= 1) {
      // Appelle une fonction ou déclenche une alerte
      alert("Il n'y a plus de nourriture ! La partie est terminée !");
      navigate(`/${EPages.LEADERBOARD}`);
    }
  }, [meat, navigate, reset]);

  const onValidateQuest = (id: number) => {
    updateQuests(id);
  };

  const handleUpdateCell = (cellId: number) => {
    updateCellType(cellId);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-gray-500 p-2">
      <div className="flex items-start w-full gap-2">
        <ResourcePanel />
        <QuestList quests={quests} onValidateQuest={onValidateQuest} />
      </div>
      <Map onUpdateCell={handleUpdateCell} />
    </div>
  );
};
export default Game;
