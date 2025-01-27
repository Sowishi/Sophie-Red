// src/store/useUserStore.js
import { create } from "zustand";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../utils/firebase";

const useUserStore = create((set) => ({
  currentUser: null,
  currentAdmin: null,
  booking: null,

  // Login with Google
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      set({
        currentUser: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  },

  // Persist login state
  initializeUser: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({
          currentUser: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
        });
      } else {
        set({ currentUser: null });
      }
    });
  },

  setCurrentAdmin: (user) => {
    set({ currentAdmin: user });
  },

  setCurrentUser: (user) => {
    set({ currentUser: user });
  },

  setBooking: (data) => {
    set({ booking: data });
  },
}));

export default useUserStore;
