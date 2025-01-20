import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

  const deleteRoom = (roomID) => {
    const docRef = doc(db, "rooms", roomID);
    deleteDoc(docRef);
  };

  const addRoomImage = async (roomID, image) => {
    const colRef = collection(db, "room-images");
    try {
      addDoc(colRef, { roomID, image, createdAt: serverTimestamp() });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRoomImages = async (roomID, setImages) => {
    const colRef = collection(db, "room-images");
    const q = query(colRef, where("roomID", "==", roomID));
    const snapshot = await getDocs(q);

    const output = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setImages(output);
  };

  const deleteRoomImage = (id) => {
    try {
      const docRef = doc(db, "room-images", id);
      deleteDoc(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    addRoom,
    addRoomImage,
    fetchRoomImages,
    deleteRoom,
    deleteRoomImage,
  };
};

export default useCrudRooms;
