import { serviceAccount } from "@/config/serviceAccount";
import admin from "firebase-admin";


// Initialize Firebase
if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const adminAuth = admin.auth();

export { adminAuth };
