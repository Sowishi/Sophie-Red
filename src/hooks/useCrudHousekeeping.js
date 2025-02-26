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
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudHousekeeping = () => {
  const addTask = async (data) => {
    if (data.housekeeper) {
      const docRef = doc(db, "housekeepers", data.housekeeper.id);
      await updateDoc(docRef, { status: "Unavailable" });
    }

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

  const deleteTask = async (id) => {
    try {
      const docRef = doc(db, "housekeeping", id);
      await deleteDoc(docRef);
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

  const fetchRoomLogs = async (bookingID, userUID, setLogs) => {
    try {
      const colRef = collection(db, "housekeeping");
      const q = query(
        colRef,
        where("selectedRoom.bookingID", "==", bookingID),
        where("selectedRoom.currentUser.uid", "==", userUID)
      );
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
      // Create a query to order by createdAt in descending order
      const q = query(colRef, orderBy("createdAt", "desc"));
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

  const updateTaskStatus = async (
    taskID,
    newStatus,
    roomID,
    housekeeper,
    remarks
  ) => {
    try {
      const taskRef = doc(db, "housekeeping", taskID);
      await updateDoc(taskRef, { status: newStatus, remarks });

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
        const docHousekeeperRef = doc(db, "housekeepers", housekeeper.id);
        await updateDoc(docHousekeeperRef, { status: "Available" });
        await updateDoc(docRef, { status: "vacant" });
        await updateDoc(taskRef, { completedAt: serverTimestamp() });
      } else {
        const docHousekeeperRef = doc(db, "housekeepers", housekeeper.id);
        await updateDoc(docHousekeeperRef, { status: "Unavailable" });
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

  const updateStatusHousekeeper = async (id, status) => {
    try {
      const docRef = doc(db, "housekeepers", id);
      updateDoc(docRef, { status: status });
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
    deleteTask,
    updateStatusHousekeeper,
    fetchRoomLogs,
  };
};

export default useCrudHousekeeping;
