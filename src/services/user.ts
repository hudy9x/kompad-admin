import { fstore } from '@/libs/firebase-admin'
import { updatePassword } from 'firebase/auth'
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '../libs/firebase-client'

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUser {
  id?: string
  fullname: string
  email: string
  photoURL: string
  address: string
  dateOfBirth: Timestamp
  createdAt?: Timestamp
  createdAtDate?: Date
  status?: EUserStatus
  role?: string
}

export const getAllUsers = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    fstore
      .collection('users')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          reject([])
          return
        }

        const users: IUser[] = []
        snapshot.forEach((s) => {
          const dt = s.data() as IUser
          dt.createdAtDate = dt.createdAt?.toDate()
          users.push({ ...dt, ...{ id: s.id } })
        })

        resolve(users)
      })
  })
}

export const getUserById = (uid: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    fstore.doc(`users/${uid}`).get().then(userSnap => {
      if (!userSnap.exists) {
        return;
      }

      const data = userSnap.data() as IUser
      resolve({...data, ...{id: userSnap.id}})

    }).catch(err => {
        reject(err)
      })
  })
}

export const addUser = async (user: IUser) => {
  const { id, address, email, dateOfBirth, fullname, photoURL } = user

  await setDoc(doc(db, 'users', id || ''), {
    address,
    email,
    createdAt: Timestamp.now(),
    dateOfBirth: dateOfBirth,
    fullname,
    photoURL,
    status: EUserStatus.ACTIVE,
  })

  return 1
}

export const updateUserById = async (uid: string, user: Partial<IUser>) => {
  try {
    const { fullname, photoURL, dateOfBirth, address } = user
    await updateDoc(doc(db, 'users', uid), {
      fullname,
      photoURL,
      dateOfBirth,
      address,
    })

    return 1
  } catch (error) {
    console.log(error)
  }
  // const { uid, address, email, dateOfBirth, fullname, photoURL } = user;

  // await setDoc(doc(db, "users", uid || ""), {
  //   address,
  //   email,
  //   createdAt: Timestamp.now(),
  //   dateOfBirth: dateOfBirth,
  //   fullname,
  //   photoURL,
  //   status: EUserStatus.ACTIVE,
  // });

  // return 1;
}

export const changeUserPassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser

    if (!user) return 0
    console.log(user)
    await updatePassword(user, newPassword)

    return 1
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const getUser = async (uid: string): Promise<IUser | null> => {
  const user = await getDoc(doc(db, 'users', uid))

  if (user.exists()) {
    return user.data() as IUser
  } else {
    return null
  }
}
