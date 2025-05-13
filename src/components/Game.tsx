import { useEffect, useState } from 'react';
import ResourcePanel from './ResourcePanel';
import QuestList from './QuestList';
import type { IQuest } from './types/IQuestList';

const questList: IQuest[] = [
  { id: 1, state: true, name: 'Une bonne nuit de sommeil', description: 'Description of Quest 1' },
  { id: 2, state: true, name: 'Chasser des lapins', description: 'Description of Quest 2' },
  { id: 3, state: false, name: 'Miner de la pierre', description: 'Description of Quest 3' },
  { id: 4, state: false, name: 'Couper du bois', description: 'Description of Quest 4' },
  { id: 5, state: false, name: 'Pêcher du poisson', description: 'Description of Quest 5' },
  { id: 6, state: false, name: 'Construire un abri', description: 'Description of Quest 6' },
  { id: 7, state: false, name: 'Trouver de la nourriture', description: 'Description of Quest 7' },
  { id: 8, state: false, name: 'Explorer la forêt', description: 'Description of Quest 8' },
  { id: 9, state: false, name: 'Construire un feu de camp', description: 'Description of Quest 9' },
  { id: 10, state: false, name: 'Trouver un abri', description: 'Description of Quest 10' },
];

const Game = () => {
  // const [survivor, setSurvivor] = useState(0);
  const [survivor, setSurvivor] = useState(7);
  const [availableSurvivor, setAvailableSurvivor] = useState(0);
  // const [meat, setMeat] = useState(0);
  const [meat, setMeat] = useState(20);
  const [wood, setWood] = useState(0);
  const [stone, setStone] = useState(0);
  const [quests, setQuests] = useState<IQuest[]>(questList);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMeat((prevMeat) => {
        const newMeat = prevMeat - 1 * survivor;
        return newMeat > 0 ? newMeat : 0; // Empêche meat de devenir négatif
      });
    }, 1000);

    // Nettoyage pour éviter les doublons
    return () => clearInterval(intervalId);
  }, [survivor]);

  // const [life, setLife] = useState(100);
  // useEffect(() => {
  //   if (life <= 0) {
  //     setLife(0);
  //   }
  // }, [life]);

  const onValidateQuest = (id: number) => {
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    setQuests(prevQuests);
  };

  return (
    <>
      <ResourcePanel survivor={survivor} availableSurvivor={availableSurvivor} meat={meat} wood={wood} stone={stone} />
      <QuestList quests={quests} onValidateQuest={onValidateQuest} />
    </>
  );
};
export default Game;
