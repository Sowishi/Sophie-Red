import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  where,
  query,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudHousekeeping = () => {
  const addTask = async (data) => {
    try {
      const colRef = collection(db, "housekeeping");
      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        status: "Pending",
      });
      const docRef = doc(db, "rooms", data.selectedRoom.id);
      await updateDoc(docRef, { status: "ongoing" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRoomTasks = async (roomID, setLogs) => {
    try {
      const colRef = collection(db, "housekeeping");
      const q = query(colRef, where("selectedRoom.id", "==", roomID));
      const snapshot = await getDocs(q);
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLogs(output);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserTasks = async (userID, setTasks) => {
    try {
      const colRef = collection(db, "housekeeping");
      const q = query(colRef, where("housekeeper.id", "==", userID));
      const snapshot = await getDocs(q);
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(output);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllTasks = async (setTasks) => {
    try {
      const colRef = collection(db, "housekeeping");
      const snapshot = await getDocs(colRef);
      const output = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(output);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTaskStatus = async (taskID, newStatus, roomID) => {
    try {
      const taskRef = doc(db, "housekeeping", taskID);
      await updateDoc(taskRef, { status: newStatus });

      console.log(`Task ID: ${taskID} updated to ${newStatus}`);

      // Fetch updated tasks
      const colRef = collection(db, "housekeeping");
      const snapshot = await getDocs(colRef);
      const updatedTasks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (newStatus == "Completed") {
        const docRef = doc(db, "rooms", roomID);
        await updateDoc(docRef, { status: "vacant" });

        await updateDoc(taskRef, { completedAt: serverTimestamp() });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addHousekeeper = async (data) => {
    try {
      const colRef = collection(db, "housekeepers");
      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        status: "Available",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteHousekeeper = async (id) => {
    try {
      const docRef = doc(db, "housekeepers", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    addTask,
    fetchRoomTasks,
    fetchUserTasks,
    updateTaskStatus,
    fetchAllTasks,
    addHousekeeper,
    deleteHousekeeper,
  };
};

export default useCrudHousekeeping;
