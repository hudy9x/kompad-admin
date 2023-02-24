import { getAuth, GoogleAuthProvider } from "firebase/auth";
import admin from 'firebase-admin';
import { serviceAccount } from "@/config/serviceAccount";

// Initialize Firebase
export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
