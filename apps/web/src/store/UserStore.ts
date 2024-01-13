import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));

const storedUser = localStorage.getItem("user");
if (storedUser) {
  useUserStore.getState().login(JSON.parse(storedUser));
}

export default useUserStore;
