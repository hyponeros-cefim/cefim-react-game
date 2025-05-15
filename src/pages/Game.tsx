import { useEffect, useState } from 'react';
import { useGameState } from '../Store/useGameState';
import { useQuests } from '../Store/useQuests';
import { CellType, type ICell } from '../components/game/types/IMap';
import { cellList } from '../data/cellList';
import ResourcePanel from '../components/game/ResourcePanel';
import QuestList from '../components/game/QuestList';
import Map from '../components/game/Map';
import { useNavigate } from 'react-router-dom';
import { EPages } from './types/Epages.enum';

const Game = () => {
  // states
  const { meat, wood } = useGameState();
  // actions
  const { eatMeat, buildCaban, addTime } = useGameState();
  const { questList, setQuests } = useQuests();

  const [cells, setCells] = useState<ICell[][]>(cellList);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      addTime(); // Incrémente le temps de 1
      eatMeat(); // Empêche meat de devenir négatif
    }, 1000);
    return () => clearInterval(interval);
  }, [eatMeat, addTime]);

  useEffect(() => {
    if (meat <= 0) {
      // Appelle une fonction ou déclenche une alerte
      alert("Il n'y a plus de nourriture ! La partie est terminée !");
      navigate(`/${EPages.LEADERBOARD}`);
    }
  }, [meat, navigate]);

  const onValidateQuest = (id: number) => {
    const prevQuests = questList.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    setQuests(prevQuests);
  };

  const handleUpdateCell = (cellId: number) => {
    // Recherche de la cellule cliquée
    const clickedCell = cells.flat().find((cell) => cell.id === cellId);
    if (!clickedCell) {
      return;
    }

    // Si déjà occupée, on ne fait rien
    if (clickedCell.type !== CellType.EMPTY) {
      return;
    }

    // Si pas assez de bois, on ne fait rien
    if (wood < 5) {
      console.log('Pas assez de bois pour construire !');
      return;
    }

    // Sinon, on consomme le bois et on reconstruit le tableau
    buildCaban();
    setCells((prev) =>
      prev.map((row) => row.map((cell) => (cell.id === cellId ? { ...cell, type: CellType.HOUSE } : cell)))
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-gray-500 p-2">
      <div className="flex items-start w-full gap-2">
        <ResourcePanel />
        <QuestList quests={questList} onValidateQuest={onValidateQuest} />
      </div>
      <Map cells={cells} onUpdateCell={handleUpdateCell} />
    </div>
  );
};
export default Game;
