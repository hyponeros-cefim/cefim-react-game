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

  function renderQuest(quest: Quest) {
    return (
      <li key={quest.id} className={'flex items-center w-full p-4 gap-2'}>
        <input type="checkbox" checked={quest.state} />
        <div className="flex flex-col items-start gap-2">
          <p className="text-black text-2xl font-bold bg-blue-200 rounded-2xl pt-0.5 pb-1 px-4">{quest.name}</p>
          <p className="text-black text-base font-normal bg-blue-200 rounded-2xl pt-0.5 pb-1 px-4">
            {quest.description}
          </p>
        </div>
      </li>
    );
  }

  // Créer une liste
  // On clique sur une quête pour la valider
  // Faire un filtre (3 quêtes max)
  // Afficher la prochaine quête à valider

  return (
    <div className="flex items-center justify-end">
      <div className="bg-blue-200 p-4 flex items-center justify-center w-1/3">
        <ul className="flex flex-col items-center bg-blue-300 rounded-2xl border-2 border-blue-400 w-full">
          {questList.map((quest) => renderQuest(quest))}
        </ul>
      </div>
    </div>
  );
};
export default QuestList;
