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

  const addRoomImage = (roomID, image) => {
    const colRef = collection(db, "room-images");
    try {
      addDoc(colRef, { roomID, image, createdAt: serverTimestamp() });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addRoom, addRoomImage };
};

export default useCrudRooms;
