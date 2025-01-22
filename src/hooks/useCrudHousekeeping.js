import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudHousekeeping = () => {
  const addTask = async (data) => {
    try {
      const colRef = collection(db, "housekeeping");
      await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
      const docRef = doc(db, "rooms", data.selectedRoom.id);
      updateDoc(docRef, { status: "assigned" });
    } catch (error) {
      console.log(error.messages);
    }
  };

  const fetchRoomTasks = async (roomID, setLogs) => {
    try {
      const colRef = collection(db, "housekeeping");
      const q = query(colRef, where("selectedRoom.id", "==", roomID));
      const snapshot = await getDocs(q);
      const output = [];
      snapshot.docs.map((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setLogs(output);
    } catch (error) {
      console.log(error.messages);
    }
  };

  const fetchUserTasks = async (userID, setTasks) => {
    try {
      const colRef = collection(db, "housekeeping");
      const q = query(colRef, where("housekeeper.id", "==", userID));
      const snapshot = await getDocs(q);
      const output = [];
      snapshot.docs.map((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setTasks(output);
    } catch (error) {
      console.log(error.messages);
    }
  };

  return { addTask, fetchRoomTasks, fetchUserTasks };
};

export default useCrudHousekeeping;
