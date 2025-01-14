// src/store/useUserStore.js
import { create } from "zustand";

const useAppContext = create((set) => ({
  currentUser: null, // Initial state is null
  setCurrentUser: (user) => set({ currentUser: user }), // Set the current user
}));

export default useAppContext;
