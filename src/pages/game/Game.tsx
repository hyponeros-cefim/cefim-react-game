import { useEffect, useState, type FC } from 'react';
import { useGameState } from '../../Store/useGameState';
import { useQuests } from '../../Store/useQuests';
import { CellType, type ICell } from '../../components/game/types/IMap';
import { cellList } from '../../data/cellList';
import ResourcePanel from '../../components/game/ResourcePanel';
import QuestList from '../../components/game/QuestList';
import Map from '../../components/game/Map';

interface IGameProps {
  onGameOver: () => void;
}

const Game: FC<IGameProps> = ({ onGameOver }) => {
  // states
  const { meat, wood } = useGameState();
  // actions
  const { eatMeat, increasePopulation, buildCaban, setTime } = useGameState();
  const { questList, setQuests } = useQuests();

  const [cells, setCells] = useState<ICell[][]>(cellList);

  // TODO: A voir pour mettre le calcul le store dans une méthode increasePopulation, increaseTime, decreaseMeat, decreaseWood ??
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(1); // Incrémente le temps
      eatMeat(); // Empêche meat de devenir négatif
    }, 1000);

    return () => clearInterval(interval);
  }, [eatMeat, setTime]);

  useEffect(() => {
    if (meat <= 0) {
      // Appelle une fonction ou déclenche une alerte
      alert("Il n'y a plus de nourriture ! La partie est terminée !");
      onGameOver();
    }
  }, [meat, onGameOver]);

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
    // increasePopulation(population);
    increasePopulation();
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
