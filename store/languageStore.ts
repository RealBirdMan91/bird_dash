import { create } from "zustand";

type LanguageStore = {
  language: string;
  setLanguage: (language: string) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "de",
  setLanguage: (language) => set({ language }),
}));
