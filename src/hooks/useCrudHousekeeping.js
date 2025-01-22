import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudHousekeeping = () => {
  const addTask = async (data) => {
    try {
      const colRef = collection(db, "housekeeping");
      await addDoc(colRef, data);
      const docRef = doc(db, "rooms", data.selectedRoom.id);
      updateDoc(docRef, { status: "assigned" });
    } catch (error) {
      console.log(error.messages);
    }
  };

  return { addTask };
};

export default useCrudHousekeeping;
