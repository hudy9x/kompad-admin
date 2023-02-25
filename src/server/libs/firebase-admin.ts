import admin from "firebase-admin";
import serviceAccount  from "@/config/serviceAccount.json";
import { Auth } from "firebase-admin/lib/auth/auth";

// Initialize Firebase
if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const adminAuth: Auth = admin.auth();

export { adminAuth };
