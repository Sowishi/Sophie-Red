import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { toast } from "react-toastify";

const useCrudRating = () => {
  const addRating = async (data) => {
    const { currentUser, room } = data;
    const userId = currentUser.id;
    const roomId = room.id;

    try {
      const colRef = collection(db, "feedback");
      const querySnapshot = await getDocs(colRef);

      const userAlreadyReviewed = querySnapshot.docs.some(
        (doc) => doc.data().userId === userId && doc.data().roomId === roomId
      );

      if (userAlreadyReviewed) {
        throw new Error("User has already reviewed this room.");
      }

      await addDoc(colRef, {
        ...data,
        userId,
        roomId,
        createdAt: serverTimestamp(),
      });

      toast.success("Thank you for your feedback");
    } catch (error) {
      toast.error("You are already reviewed this room");
    }
  };

  return { addRating };
};

export default useCrudRating;
