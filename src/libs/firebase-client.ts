import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB5sIk3WGEdJtNGcJ5DnBXgXYlPzAmsr0k",
  authDomain: "kompad-a9b60.firebaseapp.com",
  projectId: "kompad-a9b60",
  storageBucket: "kompad-a9b60.appspot.com",
  messagingSenderId: "431772304435",
  appId: "1:431772304435:web:aafe5ce57f7954e4d88f46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);

export const initializeMessaging = () => {
  const messaging = getMessaging(app)

  getToken(messaging, {
    vapidKey: "BJGX3jQpOWtVZ6mg_z65Y3CCNZXRo6v68WFmdZbPPRWEz6e3x6uLK7aHi5YABvXllfdxHXIX00DNd58lDWQoZok"
  }).then(currentToken => {
      console.log(currentToken)

      fetch('/api/notification/client-registration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: currentToken
        })
      }).then(data => {
          console.log(data)
        })
  }).catch(err => {
    console.log('error', err)
  })

}
