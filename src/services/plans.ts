import { dateToTimestamp, fstore } from '@/libs/firebase-admin'
import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'
import { ITransaction, TransactionStatus } from './_type'

export interface IPlan {
  id?: string
  uid: string
  maxRecord: number
  currentRecord: number
  maxStorageSize: number
  currentStorageSize: number
  expiredTime: Timestamp
  prevExpiredTime?: Timestamp
}

export const updateUserPlan = async (
  transId: string,
  uid: string,
  unit: number
) => {
  return new Promise(async (resolve, reject) => {
    const writeBatch = fstore.batch()

    const docRef = fstore.doc(`plans/${uid}`)
    const transactionRef = fstore.doc(`transactions/${transId}`)

    const tranSnap = await transactionRef.get()

    if (!tranSnap.exists) {
      console.log(`Transaction ${transId} does not exist`)
      return resolve(0)
    }

    const transData = tranSnap.data() as ITransaction

    if (transData.status === TransactionStatus.APPROVED) {
      console.log('This transaction has been approved')
      return resolve(1)
    }

    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      // TODO: create new plan if doesn't exist
      return resolve(0)
    }

    const planData = docSnap.data() as IPlan
    const expiredDate = dayjs(planData.expiredTime.toDate())
    const newExpiredDate = expiredDate.add(unit, 'month')
    const newExpiredTime = dateToTimestamp(newExpiredDate.toDate())

    writeBatch.update(docRef, {
      expiredTime: newExpiredTime,
      prevExpiredTime: planData.expiredTime,
    })

    writeBatch.update(transactionRef, {
      status: TransactionStatus.APPROVED,
    })

    writeBatch.commit().then((res) => {
      resolve(1)
    })

    // docRef.update({
    //   expiredTime: newExpiredTime,
    //   prevExpiredTime: planData.expiredTime
    // }).then(res => {
    //   console.log(res)
    //   resolve(1)
    // })
  })
}
