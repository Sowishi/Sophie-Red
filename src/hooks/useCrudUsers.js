import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudUsers = () => {
  const addUser = async (data) => {
    try {
      const colRef = collection(db, "users");
      await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addUser };
};

export default useCrudUsers;
