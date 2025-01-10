import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

const useFetchCollection = () => {
  const fetchCollection = (col, callback, setLoading) => {
    setLoading(true);
    const colRef = collection(db, col);
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      callback(output);
      setLoading(false);
    });
  };
  return { fetchCollection };
};

export default useFetchCollection;
