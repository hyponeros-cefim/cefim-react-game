import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { IQuest } from '../components/types/IQuestList';
import { questList } from '../data/questList';

export const useQuests = create(
  combine(
    {
      // états initiaux
      quests: questList,
    },

    (set) => ({
      //setters
      setQuests: (quests: IQuest[]) => set(() => ({ quests: quests })),

      // getters
    })
  )
);
