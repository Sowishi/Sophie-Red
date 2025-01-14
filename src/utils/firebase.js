// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqDSOundvHW5fqIHOAmvQ0tTBeYdG9BZc",
  authDomain: "sophieredhotel-31a68.firebaseapp.com",
  projectId: "sophieredhotel-31a68",
  storageBucket: "sophieredhotel-31a68.firebasestorage.app",
  messagingSenderId: "675992434676",
  appId: "1:675992434676:web:75cb7a230399c115e0aba1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { db, storage, auth };
