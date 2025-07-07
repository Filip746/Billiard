// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdFYqANKMZ2d4aaGDwukEuDADdRny_EJg",
  authDomain: "billiard-ee4dc.firebaseapp.com",
  projectId: "billiard-ee4dc",
  storageBucket: "billiard-ee4dc.firebasestorage.app",
  messagingSenderId: "327785519622",
  appId: "1:327785519622:web:f6a4038d21b53969d60187",
  measurementId: "G-GL4GYV3FE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);