import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure this points to your Firebase setup
import { toast } from "react-toastify";

const useCrudVoucher = () => {
  const addVoucher = async (data) => {
    try {
      const colRef = collection(db, "vouchers");
      await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
      console.log("Voucher added:", data);
    } catch (error) {
      console.error("Error adding voucher:", error.message);
    }
  };

  const deleteVoucher = async (id) => {
    try {
      const docRef = doc(db, "vouchers", id);
      await deleteDoc(docRef);
      console.log("Voucher deleted:", id);
    } catch (error) {
      console.error("Error deleting voucher:", error.message);
    }
  };

  const validateVoucher = async (code) => {
    try {
      const colRef = collection(db, "vouchers");
      const voucherQuery = query(colRef, where("code", "==", code));
      const querySnapshot = await getDocs(voucherQuery);

      if (!querySnapshot.empty) {
        const voucher = querySnapshot.docs[0].data();
        console.log("Voucher found:", voucher);
        return voucher.discount; // Assuming `discount` is a field in the voucher
      } else {
        console.log("Voucher not found.");
        return null;
      }
    } catch (error) {
      console.error("Error validating voucher:", error.message);
      return null;
    }
  };

  return { addVoucher, deleteVoucher, validateVoucher };
};

export default useCrudVoucher;
