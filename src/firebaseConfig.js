// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS2HWBQ6M7gJi8UZej6RPWRjFZAuruXSw",
  authDomain: "keep-clone-d735b.firebaseapp.com",
  projectId: "keep-clone-d735b",
  storageBucket: "keep-clone-d735b.firebasestorage.app",
  messagingSenderId: "314076876566",
  appId: "1:314076876566:web:90b7f7fefa69ec02888a37",
  measurementId: "G-7YBKVXDP1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();