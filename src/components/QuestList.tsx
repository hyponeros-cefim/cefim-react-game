import { CircleCheckBigIcon, SquircleIcon } from 'lucide-react';
import { useState } from 'react';

interface Quest {
  id: number;
  state: boolean;
  name: string;
  description: string;
}

const QuestList = () => {
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
  const [quests, setQuests] = useState<Quest[]>(questList);

  // Trouver la dernière quête validée
  const lastQuest = [...quests].reverse().find((quest) => quest.state);

  // Garder toutes les quêtes au-delà de la dernière quête validée (ou depuis le début si aucune quête n'est validée) et ne garder que les 3 premières quêtes
  const questsFilterd = quests.filter((quest) => quest.id >= (lastQuest ? lastQuest.id : 0)).slice(0, 3);

  // Rendre cliquable que la première quête

  const onValidateQuest = (id: number) => {
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    setQuests(prevQuests);
  };

  function renderQuest(quest: Quest) {
    const { id, name, description, state } = quest;
    return (
      <li key={id}>
        <div
          onClick={() => onValidateQuest(id)}
          className="flex items-center cursor-pointer w-full p-3 text-base font-bold  rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
          {state ? <CircleCheckBigIcon color="#00ff00" /> : <SquircleIcon color="#c0c7c0" />}
          <div className="flex flex-col items-start gap-2">
            <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
            <span className="flex-1 ms-3  text-gray-300 font-medium ">{description}</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="flex justify-end m-4">
      <div className="w-full max-w-sm p-4 border rounded-lg shadow-sm sm:p-6 bg-gray-800 border-gray-700">
        <h5 className="mb-3 text-base font-semibold  md:text-xl text-white">Liste des quêtes</h5>
        <ul className="my-4 space-y-3">{questsFilterd.map((quest) => renderQuest(quest))}</ul>
      </div>
    </div>
  );
};
export default QuestList;
