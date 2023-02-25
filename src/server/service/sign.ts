import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase";

export const signIn = (email: string, pasword: string) => {
  return signInWithEmailAndPassword(auth, email, pasword);
};
