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
    const userId = currentUser.uid;
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
      toast.error(error.message);
    }
  };

  //Fetch all ratings
  const fetchRatings = async (setRatings) => {
    const colRef = collection(db, "feedback");
    const querySnapshot = await getDocs(colRef);

    const ratings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRatings(ratings);
  };

  return { addRating, fetchRatings };
};

export default useCrudRating;
