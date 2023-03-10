import { cert, initializeApp, getApps, App } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

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
