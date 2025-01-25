import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure this points to your Firebase setup
import { toast } from "react-toastify";

const useCrudRatings = () => {
  const addRating = (data) => {
    console.log(data);
  };
  return { addRating };
};

export default useCrudRatings;
