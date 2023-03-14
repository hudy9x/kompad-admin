import { cert, initializeApp, getApps, App } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { getMessaging } from "firebase-admin/messaging";
import { getAuth } from 'firebase-admin/auth'
import { NOTIFY_TOPIC } from '@/types';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

const serviceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
}

let app: App
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  })
} else {
  app = getApps()[0]
}

export const dateToTimestamp = (date: Date) => {
  return Timestamp.fromDate(date)
}

export const verifyFirebaseSessionCookie = async (session: string) => {
  const decoded = await getAuth().verifySessionCookie(session, true)
  return decoded
}

export const fstore = getFirestore(app)

export const verifyIdtoken = (idToken: string) => {
  return getAuth().verifyIdToken(idToken)
}

export const subscribeToTopic = (token: string, topic: NOTIFY_TOPIC) => {
  return getMessaging().subscribeToTopic([token], topic)
}

export const sendNotify = (mess: string, topic: NOTIFY_TOPIC) => {
  const message: Message = {
    notification: {
      title: "Hello bitches",
      body: "I'm tired now"
    },
    webpush: {
      notification: {
        title: "Another title",
        body: "another body",
        icon: "https://kompad-admin.vercel.app/notes.png",

      },
      fcmOptions: {
        link: "https://kompad-admin.vercel.app/transactions?name=123123"
      }
    },
    data: {
      mess
    },
    topic
  }
  console.log('sending notification', message)
  return getMessaging().send(message)
}

// const getUsers = () => {
//   return new Promise((resolve, reject) => {
//     db.collection('users')
//       .get()
//       .then((res) => {
//         const users = {}
//         res.forEach((doc) => {
//           const data = doc.data()
//           // users[doc.id] = data.email;
//         })
//
//         resolve(users)
//       })
//   })
// }
