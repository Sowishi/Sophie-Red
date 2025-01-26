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
    console.log(data);
  };

  return { addRating };
};

export default useCrudRating;
