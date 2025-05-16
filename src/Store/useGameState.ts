import { create } from 'zustand';
import { questList } from '../data/questList';
import type { IQuest } from '../components/types/IQuestList';
import { cellList } from '../data/cellList';
import { CellType, type ICell } from '../components/types/IMap';

interface IGameState {
  // états initiaux
  population: number; // TODO: supprimer worker et créer un getter worker qui se mettra à jour en fonction de l'attribution des survivants sur la carte
  meat: number;
  wood: number;
  stone: number;
  time: number;
  quests: IQuest[];
  cells: ICell[][];

  // getters
  checkMeat: () => boolean;
  getAvailableWorker: () => number;

  // setters
  setPopulation: (population: number) => void;
  setWood: (wood: number) => void;
  setStone: (stone: number) => void;
  setMeat: (meat: number) => void;

  // actions
  addTime: () => void;
  buildCaban: () => void;
  eatMeat: () => void;
  increasePopulation: (population: number) => number;
  updateQuests: (id: number) => void;
  updateCellType: (cellId: number) => void;
  reset: () => void;
}

export const useGameState = create<IGameState>((set, get) => ({
  // états initiaux
  population: 0,
  meat: 20,
  wood: 17,
  stone: 0,
  time: 0,
  quests: [...questList], // faire une copie de questList pour éviter les références directes
  cells: [...cellList], // faire une copie de cellList pour éviter les références directes

  // getters
  checkMeat: () => get().meat > 0,
  getAvailableWorker: () => {
    const { population } = get();
    return population;
  },

  // setters
  setPopulation: (population) => set({ population }),
  setMeat: (meat) => set({ meat }),
  setWood: (wood) => set({ wood }),
  setStone: (stone) => set({ stone }),

  // actions
  addTime: () => set(() => ({ time: get().time + 1 })),
  increasePopulation: (population) => population + 2,
  eatMeat: () =>
    set(() => {
      const canEat = get().checkMeat();
      const population = get().population;
      const meat = get().meat;
      return {
        meat: canEat ? meat - (population > 0 ? 1 * population : 0) : meat,
      };
    }),
  buildCaban: () => {
    const { wood, population } = get();
    const increasePopulation = get().increasePopulation;

    set(() => {
      return {
        wood: wood - 5,
        population: increasePopulation(population),
      };
    });
  },
  updateCellType: (cellId) => {
    // Recherche de la cellule cliquée
    const clickedCell = get()
      .cells.flat()
      .find((cell) => cell.id === cellId);
    if (!clickedCell) {
      return;
    }

    // Si déjà occupée, on ne fait rien
    if (clickedCell.type !== CellType.EMPTY) {
      return;
    }

    // Si pas assez de bois, on ne fait rien
    if (get().wood < 5) {
      console.log('Pas assez de bois pour construire !');
      return;
    }
    get().buildCaban();
    set(() => {
      const { cells } = get();
      return {
        cells: cells.map((row) => row.map((cell) => (cell.id === cellId ? { ...cell, type: CellType.HOUSE } : cell))),
      };
    });
  },
  reset: () => {
    set(() => ({
      population: 0,
      meat: 20,
      wood: 17,
      stone: 0,
      time: 0,
      quests: [...questList],
      cells: [...cellList],
    }));
  },
  // Ajouter le passage de time à leaderboard pour faire l'affichage du tableau des scores
  //  Ajouter un bouton pour le retour au menu principal ou pour rejouer
  //  Ajouter le reset du jeu dans le cas où on rejoue ou que l'on revienne au menu principal
  //  Faire en sorte que le timer se reset également lorsqu'on revient au menu principal ou qu'on rejoue
  //  Masquer le formulaire du score dès validations et affichage du tableau des scores et des boutons de retour au jeu / menu
  // TODO: Affecter un ouvrier à une forêt et ajouter la logique de récolte de bois
  // TODO: Compter le nombre de workers sur la carte pour déterminer le nomnbre de survivants sans activités
  // TODO: Limiter l'affectation des workers sur la carte au nombre restant de workers disponibles
  // TODO: Utiliser persist pour stocker les scores d'une partie à l'autre

  updateQuests: (id) => {
    const { quests } = get();
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    set(() => ({ quests: prevQuests }));
  },
}));
