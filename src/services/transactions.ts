import { fstore } from '@/libs/firebase-admin'
import { ITransaction } from './_type'


export const getAllTransactions = (): Promise<ITransaction[]> => {
  return new Promise((resolve, reject) => {
    fstore
      .collection('transactions')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve([])
          return
        }

        const transactions: ITransaction[] = []

        snapshot.forEach((tr) => {
          const data = tr.data() as ITransaction
          transactions.push({ ...data, ...{ id: tr.id } })
        })

        resolve(transactions)
      })
  })
}



