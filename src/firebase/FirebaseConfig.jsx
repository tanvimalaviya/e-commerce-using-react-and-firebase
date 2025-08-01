// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOjjFX2rUMTxX1KoFzaOXIAb4s7zVA4Ao",
  authDomain: "myecom-99a80.firebaseapp.com",
  projectId: "myecom-99a80",
  storageBucket: "myecom-99a80.firebasestorage.app",
  messagingSenderId: "894712424208",
  appId: "1:894712424208:web:48415c9ae9be19064ee795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {auth,fireDB}