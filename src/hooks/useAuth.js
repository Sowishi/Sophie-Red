import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure this points to your Firebase setup
import { toast } from "react-toastify";

const useAuth = () => {
  const login = async (email, password) => {
    try {
      // Query the 'users' collection to find the user with the matching email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no user with the given email is found
        toast.error("Invalid email or password.");
        return;
      }

      let user = null;
      querySnapshot.forEach((doc) => {
        // Fetch the user data
        user = { id: doc.id, ...doc.data() };
      });

      // Check if the password matches
      if (user.password === password) {
        toast.success("Login successful!");
        console.log("Authenticated User:", user);
        // Return the authenticated user or handle it as needed
        return user;
      } else {
        toast.error("Invalid email or password.");
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return { login };
};

export default useAuth;
