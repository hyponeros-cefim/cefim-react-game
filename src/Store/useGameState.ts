import { create } from 'zustand';
import { questList } from '../data/questList';
import type { IQuest } from '../components/types/IQuestList';
import { cellList } from '../data/cellList';
import { CellType, type ICell } from '../components/types/IMap';

export enum ESeason {
  WINTER = 'winter',
  SUMMER = 'summer',
}

interface IGameState {
  // états initiaux
  population: number; // TODO: supprimer worker et créer un getter worker qui se mettra à jour en fonction de l'attribution des survivants sur la carte
  meat: number;
  wood: number;
  stone: number;
  time: number;
  quests: IQuest[];
  cells: ICell[][];
  season: ESeason;

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
  buildCaban: (id: number) => void;
  eatMeat: () => void;
  increasePopulation: (population: number) => number;
  updateQuests: (id: number) => void;
  updateCellType: (cellId: number) => void;
  reset: () => void;
  affectWorker: (id: number) => void;
  changeSeason: () => void;
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
  season: ESeason.SUMMER,

  // getters
  checkMeat: () => get().meat > 0,
  getAvailableWorker: () => {
    // TODO:prévoir de faire le contrôle selon le type de case
    const { population, cells } = get();
    // somme des workers déjà affectés
    const assigned = cells.flat().reduce((total, cell) => total + (cell.worker ?? 0), 0);
    // nombre de workers non affectés
    return population - assigned;
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
  buildCaban: (id: number) => {
    const { cells, wood, population } = get();
    const increasePopulation = get().increasePopulation;

    set(() => {
      return {
        wood: wood - 5,
        population: increasePopulation(population),
        cells: cells.map((row) => row.map((cell) => (cell.id === id ? { ...cell, type: CellType.HOUSE } : cell))),
      };
    });
  },
  affectWorker: (id: number) => {
    const { cells } = get();

    set(() => {
      return {
        cells: cells.map((row) => row.map((cell) => (cell.id === id ? { ...cell, worker: cell.worker + 1 } : cell))),
      };
    });
  },
  updateCellType: (cellId) => {
    const { cells, wood, getAvailableWorker } = get();

    // Recherche de la cellule cliquée
    const clickedCell = cells.flat().find((cell) => cell.id === cellId);
    if (!clickedCell) return;

    // 1) Si case vide et assez de bois → construire caban
    if (clickedCell.type === CellType.EMPTY && wood >= 5) {
      get().buildCaban(cellId);
      return;
    }

    // 2) Si FOREST et population > 0 → placer un worker
    if (clickedCell.type === CellType.FOREST && getAvailableWorker() > 0) {
      get().affectWorker(cellId);
      return;
    }
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
      season: ESeason.SUMMER,
    }));
  },
  changeSeason: () => {
    set((state) => ({
      season: state.season === ESeason.WINTER ? ESeason.SUMMER : ESeason.WINTER,
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
  // TODO: Faire en sorte qu'un worker dans une forêt récolte 1 bois et 1 nourriture toute les 5 secondes
  // TODO: Ajouter un changement de saison toute les 20 secondes, en hiver la forêt ne produit plus de nourriture. A chaque changement de saison, on affiche une pop-up
  // TODO:
  // TODO:
  // TODO: Utiliser persist pour stocker les scores d'une partie à l'autre

  updateQuests: (id) => {
    const { quests } = get();
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    set(() => ({ quests: prevQuests }));
  },
}));

// TODO:Mettre la condition pour l'assignation de la case selon le statut dans le handleUpdateCell soit updateCellType, addCellWorker
// TODO:Afficher un span si worker > 0 sur la case en absolute
// TODO:
// TODO:
// TODO:
// TODO:
// TODO:
// TODO: Prévoir d'ajouter un menu pour chosir les actions
