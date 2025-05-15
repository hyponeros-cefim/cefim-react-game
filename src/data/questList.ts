import type { IQuest } from '../components/types/IQuestList';

export const questList: IQuest[] = [
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
