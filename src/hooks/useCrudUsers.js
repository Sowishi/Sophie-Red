import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudUsers = () => {
  const addUser = async (data) => {
    try {
      const colRef = collection(db, "users");

      // Check if email already exists
      const q = query(colRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("Email already exists. Please use a different email.");
      }

      // Add new user if email doesn't exist
      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        photoURL: `https://avatar.iran.liara.run/public/boy?username=${data.fullName}`,
      });
    } catch (error) {
      console.log(error.message);
      throw error; // Re-throw to handle it in the calling function if needed
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
