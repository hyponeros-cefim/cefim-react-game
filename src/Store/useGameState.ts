import { create } from 'zustand';

interface IGameState {
  // états initiaux
  worker: number;
  population: number;
  meat: number;
  wood: number;
  stone: number;
  time: number;

  // getters
  checkMeat: () => boolean;

  // setters
  setWorker: (worker: number) => void;
  setPopulation: (population: number) => void;
  setWood: (wood: number) => void;
  setStone: (stone: number) => void;
  setMeat: (meat: number) => void;

  // actions
  addTime: () => void;
  buildCaban: () => void;
  eatMeat: () => void;
  increasePopulation: (population: number) => number;
}

export const useGameState = create<IGameState>((set, get) => ({
  // états initiaux
  worker: 0,
  population: 0,
  meat: 20,
  wood: 17,
  stone: 0,
  time: 0,

  // getters
  checkMeat: () => get().meat > 0,

  // setters
  setWorker: (worker) => set({ worker }),
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
}));
