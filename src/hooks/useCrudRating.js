import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudRating = () => {
  const addRating = async (data) => {
    try {
      const colRef = collection(db, "feedback");
      await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addRating };
};

export default useCrudRating;
