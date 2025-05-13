import { CircleCheckBigIcon, SquircleIcon } from 'lucide-react';
import type { FC } from 'react';
import type { Quest } from './Game';

interface QuestListProps {
  quests: Quest[];
  onValidateQuest: (id: number) => void;
}

const QuestList: FC<QuestListProps> = ({ quests, onValidateQuest }) => {
  // Trouver la dernière quête validée
  const lastQuest = [...quests].reverse().find((quest) => quest.state);

  // Garder toutes les quêtes au-delà de la dernière quête validée (ou depuis le début si aucune quête n'est validée) et ne garder que les 3 premières quêtes
  const questsFilterd = quests.filter((quest) => quest.id >= (lastQuest ? lastQuest.id : 0)).slice(0, 3);

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
