import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudRooms = () => {
  const addRoom = async (data) => {
    const colRef = collection(db, "rooms");
    try {
      await addDoc(colRef, {
        ...data,
        status: "vacant",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addRoom };
};

export default useCrudRooms;
