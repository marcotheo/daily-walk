// store/useAuth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLogin: boolean;
  setLogin: (status: boolean) => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: (status) => set({ isLogin: status }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);
