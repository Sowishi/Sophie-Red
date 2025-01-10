import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

const useCrudRooms = () => {
  const addRoom = async (data) => {
    const colRef = collection(db, "rooms");
    try {
      await addDoc(colRef, data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addRoom };
};

export default useCrudRooms;
