import { create } from 'zustand';

interface IGameState {
  // états initiaux
  survivor: number;
  population: number;
  meat: number;
  wood: number;
  stone: number;
  time: number;

  // getters
  getCheckMeat: () => boolean;

  // setters
  // setTime: () => void;
  setTime: (val: number) => void;
  increasePopulation: () => void;
  eatMeat: () => void;
  buildCaban: () => void;
  setSurvivor: () => void;
  setStone: () => void;
}

export const useGameState = create<IGameState>((set, get) => ({
  // états initiaux
  survivor: 0,
  population: 0,
  meat: 20,
  wood: 17,
  stone: 0,
  time: 0,

  // getters
  getCheckMeat: () => get().meat > 0,

  // setters
  // setTime: () => set(() => ({ time: get().time + 1 })),
  setTime: (val: number) => set((state) => ({ time: state.time + val })),
  increasePopulation: () => set(() => ({ population: get().population + 2 })),
  eatMeat: () =>
    set(() => {
      const canEat = get().getCheckMeat();
      const population = get().population;
      const meat = get().meat;
      return {
        meat: canEat ? meat - (population > 0 ? 1 * population : 0) : meat,
      };
    }),
  buildCaban: () => set(() => ({ wood: get().wood - 5 })),
  setSurvivor: () => set(() => ({ survivor: get().survivor })),
  setStone: () => set(() => ({ stone: get().stone })),
}));
