import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useResources = create(
  combine(
    {
      // états initiaux
      survivor: 0,
      population: 0,
      meat: 20,
      wood: 17,
      stone: 0,
      time: 0,
    },

    // TODO: Modifier les setters pour intégrer la logique
    (set, get) => ({
      // setters
      setTime: (time: number) => set(() => ({ time: time + 1 })),
      increasePopulation: (population: number) => set(() => ({ population: population + 2 })),
      eatMeat: (meat: number) =>
        set(() => ({ meat: meat > 0 ? meat - (get().population > 0 ? 1 * get().population : 0) : 0 })),
      buildCaban: (wood: number) => set(() => ({ wood: wood - 5 })),
      setSurvivor: (survivor: number) => set(() => ({ survivor })),
      setStone: (stone: number) => set(() => ({ stone })),
    })
  )
);
