import { useEffect, useRef, useState, type FC } from 'react';
import ResourcePanel from './ResourcePanel';
import QuestList from './QuestList';
import type { IQuest } from './types/IQuestList';
import { CellType, type ICell } from './types/IMap';
import Map from './Map';
import { cellList } from '../data/cellList';
import { questList } from '../data/questList';
import { useResources } from '../Store/useResources';

interface IGameProps {
  onGameOver: () => void;
}

const Game: FC<IGameProps> = ({ onGameOver }) => {
  const { meat, eatMeat, population, increasePopulation, wood, buildCaban } = useResources();

  const [quests, setQuests] = useState<IQuest[]>(questList);
  const [cells, setCells] = useState<ICell[][]>(cellList);
  const [time, setTime] = useState(0);

  // Créer une ref de population pour éviter les re-renders
  const populationRef = useRef(population);
  const meatRef = useRef(meat);

  //A chaque mise à jour de population, on met à jour la ref
  useEffect(() => {
    populationRef.current = population;
    meatRef.current = meat;
  }, [population, meat]);

  // TODO: A voir pour mettre le calcul le store dans une méthode increasePopulation, increaseTime, decreaseMeat, decreaseWood ??
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1); // Incrémente le temps
      eatMeat(meat); // Empêche meat de devenir négatif
    }, 1000);

    return () => clearInterval(interval);
  }, [eatMeat, meat]);

  useEffect(() => {
    if (meat <= 0) {
      // Appelle une fonction ou déclenche une alerte
      alert("Il n'y a plus de nourriture ! La partie est terminée !");
      onGameOver();
    }
  }, [meat, onGameOver]);

  const onValidateQuest = (id: number) => {
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    setQuests(prevQuests);
  };

  const handleUpdateCell = (cellId: number) => {
    /// Recherche de la cellule cliquée
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

    // TODO: Utiliser le store pour

    // Sinon, on consomme le bois et on reconstruit le tableau
    buildCaban(wood);
    increasePopulation(population);
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
