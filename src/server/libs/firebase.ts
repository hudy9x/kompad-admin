import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
 apiKey: "AIzaSyCrXAmPHyTibS6xMLUBpJJL3C2Sdl2TQg4",
 authDomain: "kompad-84f61.firebaseapp.com",
 projectId: "kompad-84f61",
 storageBucket: "kompad-84f61.appspot.com",
 messagingSenderId: "160972435770",
 appId: "1:160972435770:web:02264d7e00867699e02003",
 measurementId: "G-PW0C9TZ3M2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();