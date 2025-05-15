import { create } from 'zustand';
import { questList } from '../data/questList';
import type { IQuest } from '../components/types/IQuestList';

interface IGameState {
  // états initiaux
  population: number; // TODO: supprimer worker et créer un getter worker qui se mettra à jour en fonction de l'attribution des survivants sur la carte
  meat: number;
  wood: number;
  stone: number;
  time: number;
  quests: IQuest[];

  // getters
  checkMeat: () => boolean;
  getWorkerAvailable: () => number;

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
}

export const useGameState = create<IGameState>((set, get) => ({
  // états initiaux
  population: 0,
  meat: 20,
  wood: 17,
  stone: 0,
  time: 0,
  quests: questList,

  // getters
  checkMeat: () => get().meat > 0,
  getWorkerAvailable: () => {
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
  updateQuests: (id) => {
    const { quests } = get();
    const prevQuests = quests.map((quest) => (quest.id === id ? { ...quest, state: !quest.state } : quest));
    set(() => ({ quests: prevQuests }));
  },
}));
