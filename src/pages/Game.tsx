import { useEffect, useState } from 'react';
import { useGameState } from '../Store/useGameState';
import { CellType, type ICell } from '../components/types/IMap';
import { cellList } from '../data/cellList';
import { useNavigate } from 'react-router-dom';
import { EPages } from './types/Epages.enum';
import ResourcePanel from '../components/ResourcePanel';
import QuestList from '../components/QuestList';
import Map from '../components/Map';

const Game = () => {
  // states
  const { meat, wood, quests } = useGameState();
  // actions
  const { eatMeat, buildCaban, addTime, updateQuests } = useGameState();

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
    updateQuests(id);
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
        <QuestList quests={quests} onValidateQuest={onValidateQuest} />
      </div>
      <Map cells={cells} onUpdateCell={handleUpdateCell} />
    </div>
  );
};
export default Game;
