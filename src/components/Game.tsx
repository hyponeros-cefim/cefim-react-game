import { useEffect, useRef, useState } from 'react';
import ResourcePanel from './ResourcePanel';
import QuestList from './QuestList';
import type { IQuest } from './types/IQuestList';
import { CellType, type ICell } from './types/IMap';
import Map from './Map';
import { cellList } from '../data/cellList';
import { questList } from '../data/questList';

const Game = () => {
  const [survivor, setSurvivor] = useState(0);
  const [population, setPopulation] = useState(0);
  const [meat, setMeat] = useState(20);
  const [wood, setWood] = useState(17);
  const [stone, setStone] = useState(0);
  const [quests, setQuests] = useState<IQuest[]>(questList);
  const [cells, setCells] = useState<ICell[][]>(cellList);

  // Créer une ref de population pour éviter les re-renders
  const populationRef = useRef(population);

  //A chaque mise à jour de population, on met à jour la ref
  useEffect(() => {
    populationRef.current = population;
  }, [population]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMeat((prevMeat) => {
        const newMeat = prevMeat - (populationRef.current > 0 ? 1 * populationRef.current : 0); // Consomme 1 viande par survivant disponible
        return newMeat > 0 ? newMeat : 0; // Empêche meat de devenir négatif
      });
    }, 1000);

    // Nettoyage pour éviter les doublons
    return () => clearInterval(intervalId);
  }, []);

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

    // Sinon, on consomme le bois et on reconstruit le tableau
    setWood(wood - 5);
    setPopulation(population + 2);
    setCells((prev) =>
      prev.map((row) => row.map((cell) => (cell.id === cellId ? { ...cell, type: CellType.HOUSE } : cell)))
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-blue-50 p-2">
      <div className="flex items-start w-full gap-2">
        <ResourcePanel survivor={survivor} population={population} meat={meat} wood={wood} stone={stone} />
        <QuestList quests={quests} onValidateQuest={onValidateQuest} />
      </div>
      <Map cells={cells} onUpdateCell={handleUpdateCell} />
    </div>
  );
};
export default Game;
