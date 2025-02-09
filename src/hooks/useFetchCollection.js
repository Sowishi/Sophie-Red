import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";

const useFetchCollection = () => {
  const fetchCollection = (col, callback, setLoading) => {
    setLoading(true);
    const colRef = collection(db, col);
    const q = query(colRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      callback(output.reverse());
      setLoading(false);
    });
  };
  return { fetchCollection };
};

export default useFetchCollection;
