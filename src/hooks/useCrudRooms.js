import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
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

  const addRoomImage = async (roomID, image) => {
    const colRef = collection(db, "room-images");
    try {
      addDoc(colRef, { roomID, image, createdAt: serverTimestamp() });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRoomImages = (roomID, setImages) => {
    const colRef = collection(db, "room-images");
    const q = query(colRef, where("roomID", "==", roomID));
    onSnapshot(q, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setImages(output);
    });
  };

  return { addRoom, addRoomImage, fetchRoomImages };
};

export default useCrudRooms;
