import { useEffect, useState } from 'react';
import ResourcePanel from './ResourcePanel';
import QuestList from './QuestList';
import type { IQuest } from './types/IQuestList';

const Game = () => {
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

  const line1 = [
    { id: 1, type: 'empty' },
    { id: 2, type: 'empty' },
    { id: 3, type: 'empty' },
    { id: 4, type: 'empty' },
    { id: 5, type: 'empty' },
  ];
  const line2 = [
    { id: 6, type: 'empty' },
    { id: 7, type: 'empty' },
    { id: 8, type: 'empty' },
    { id: 9, type: 'empty' },
    { id: 10, type: 'empty' },
  ];
  const line3 = [
    { id: 11, type: 'empty' },
    { id: 12, type: 'empty' },
    { id: 13, type: 'empty' },
    { id: 14, type: 'empty' },
    { id: 15, type: 'empty' },
  ];
  const line4 = [
    { id: 16, type: 'empty' },
    { id: 17, type: 'empty' },
    { id: 18, type: 'empty' },
    { id: 19, type: 'empty' },
    { id: 20, type: 'empty' },
  ];
  const line5 = [
    { id: 21, type: 'empty' },
    { id: 22, type: 'empty' },
    { id: 23, type: 'empty' },
    { id: 24, type: 'empty' },
    { id: 25, type: 'empty' },
  ];
  const cells = [line1, line2, line3, line4, line5];

  const [survivor, setSurvivor] = useState(0);
  const [availableSurvivor, setAvailableSurvivor] = useState(0);
  const [meat, setMeat] = useState(0);
  const [wood, setWood] = useState(0);
  const [stone, setStone] = useState(0);
  const [quests, setQuests] = useState<IQuest[]>(questList);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMeat((prevMeat) => {
        const newMeat = prevMeat - 1;
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

  return (
    <>
      <ResourcePanel survivor={survivor} availableSurvivor={availableSurvivor} meat={meat} wood={wood} stone={stone} />
      <QuestList quests={quests} onValidateQuest={onValidateQuest} />
    </>
  );
};
export default Game;
