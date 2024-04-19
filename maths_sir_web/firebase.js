// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCvpfTkP4h39qBfCe7S6J2m4-s9DWajHo",
  authDomain: "becauseofmaths-17c36.firebaseapp.com",
  projectId: "becauseofmaths-17c36",
  storageBucket: "becauseofmaths-17c36.appspot.com",
  messagingSenderId: "455816122818",
  appId: "1:455816122818:web:7a1b17d3f376dd8ae8c65b",
  measurementId: "G-NL4XJX9BSK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);