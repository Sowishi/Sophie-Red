import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

const useFetchCollection = () => {
  const fetchCollection = (col, callback) => {
    const colRef = collection(db, col);
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      callback(output);
    });
  };
  return { fetchCollection };
};

export default useFetchCollection;
