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

const useCrudUsers = () => {
  const addUser = async (data) => {
    try {
      const colRef = collection(db, "users");
      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        photoURL: `https://avatar.iran.liara.run/public/boy?username=${data.fullName}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (id, data) => {
    try {
      const docRef = doc(db, "users", id);
      updateDoc(docRef, data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addUser, updateUser, deleteUser };
};

export default useCrudUsers;
