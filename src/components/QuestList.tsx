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
    { id: 2, state: false, name: 'Chasser des lapins', description: 'Description of Quest 2' },
    { id: 3, state: false, name: 'Miner de la pierre', description: 'Description of Quest 3' },
    { id: 4, state: true, name: 'Couper du bois', description: 'Description of Quest 4' },
  ];
  const [quests, setQuests] = useState<Quest[]>(questList);

  const toggleQuestState = (id: number) => {
    setQuests((prevQuests) => prevQuests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest)));
  };

  function renderQuest(quest: Quest) {
    const { id, name, description, state } = quest;
    return (
      <li key={id}>
        <button
          onClick={() => toggleQuestState(id)}
          className="flex items-center cursor-pointer w-full p-3 text-base font-bold  rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white">
          {state ? <CircleCheckBigIcon color="#00ff00" /> : <SquircleIcon color="#c0c7c0" />}
          <div className="flex flex-col items-start gap-2">
            <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
            <span className="flex-1 ms-3  text-gray-300 font-medium ">{description}</span>
          </div>
        </button>
      </li>
    );
  }

  // Créer une liste
  // On clique sur une quête pour la valider
  // Faire un filtre (3 quêtes max)
  // Afficher la prochaine quête à valider

  return (
    <div className="flex justify-end m-4">
      <div className="w-full max-w-sm p-4 border rounded-lg shadow-sm sm:p-6 bg-gray-800 border-gray-700">
        <h5 className="mb-3 text-base font-semibold  md:text-xl text-white">Liste des quêtes</h5>
        <ul className="my-4 space-y-3">{quests.map((quest) => renderQuest(quest))}</ul>
      </div>
    </div>
  );
};
export default QuestList;
