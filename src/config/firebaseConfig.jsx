// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM6DgUy3zqCoEDifuh9SpGL2YYdDiRKgY",
  authDomain: "flipcart-clone-4cb56.firebaseapp.com",
  projectId: "flipcart-clone-4cb56",
  storageBucket: "flipcart-clone-4cb56.firebasestorage.app",
  messagingSenderId: "571314381461",
  appId: "1:571314381461:web:008a37b929bd48d17eb19c",
  measurementId: "G-VWZB68HFLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);