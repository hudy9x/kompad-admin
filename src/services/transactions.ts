import { fstore } from '@/libs/firebase-admin'
import { ITransaction, TransactionStatus } from './_type'

type GetAllTransactionsFunc = (params: {
  term?: string
  nextId?: string
  prevId?: string
  status: string
}) => Promise<ITransaction[]>

const LIMIT = 20

export const rejectTransactionById = async (id: string) => {
  await fstore.doc(`transactions/${id}`).update({
    status: TransactionStatus.REJECTED,
  })
}

export const getAllTransactions: GetAllTransactionsFunc = ({
  term,
  nextId,
  prevId,
  status,
}) => {
  return new Promise(async (resolve, reject) => {
    const tcollection = fstore
      .collection('transactions')
      .where('status', '==', status)

    const handler = (
      snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    ) => {
      if (snapshot.empty) {
        resolve([])
        return
      }

      const transactions: ITransaction[] = []

      snapshot.forEach((tr) => {
        const data = tr.data() as ITransaction
        transactions.push({
          ...data,
          ...{
            id: tr.id,
            createdAtDate: data.createdAt?.toDate(),
            updatedAtDate: data.updatedAt?.toDate(),
          },
        })
      })

      resolve(transactions)
    }

    if (nextId) {
      const lastRef = await fstore.doc(`/transactions/${nextId}`).get()
      tcollection
        .orderBy('createdAt', 'desc')
        .startAfter(lastRef)
        .limit(LIMIT)
        .get()
        .then(handler)
    }

    if (prevId) {
      const prevRef = await fstore.doc(`/transactions/${prevId}`).get()
      tcollection
        .orderBy('createdAt', 'desc')
        .endBefore(prevRef)
        .limitToLast(LIMIT)
        .get()
        .then(handler)
    }

    if (!nextId && !prevId) {
      tcollection.orderBy('createdAt', 'desc').limit(LIMIT).get().then(handler)
    }
  })
}
