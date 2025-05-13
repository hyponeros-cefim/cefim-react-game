import { useState } from 'react';
import ResourcePanel from './ResourcePanel';
import QuestList from './QuestList';

export interface Quest {
  id: number;
  state: boolean;
  name: string;
  description: string;
}

const Game = () => {
  const questList: Quest[] = [
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

  // const [survivor, setSurvivor] = useState(0);
  const [survivor, setSurvivor] = useState(2);
  const [availableSurvivor, setAvailableSurvivor] = useState(0);
  // const [meat, setMeat] = useState(0);
  const [meat, setMeat] = useState(20);
  const [wood, setWood] = useState(0);
  const [stone, setStone] = useState(0);
  const [quests, setQuests] = useState<Quest[]>(questList);

  const onValidateQuest = (id: number) => {
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    setQuests(prevQuests);
  };

  //? Déconseiller de modifier l'état directement dans le tableau d'origine, car cela peut entraîner des problèmes de performance et de prévisibilité dans React. Il est préférable de créer une nouvelle référence pour le tableau d'état.
  //   const onValidateQuest = (id: number) => {
  //   const prevQuests = quests.map((quest) => {
  //     if (quest.id === id) {
  //       quest.state = !quest.state; // Modification directe
  //     }
  //     return quest; // Retourne l'objet modifié ou non
  //   });
  //   setQuests([...prevQuests]); // Crée une nouvelle référence pour le tableau
  // };

  return (
    <>
      <ResourcePanel survivor={survivor} availableSurvivor={availableSurvivor} meat={meat} wood={wood} stone={stone} />
      <QuestList quests={quests} onValidateQuest={onValidateQuest} />
    </>
  );
};
export default Game;
