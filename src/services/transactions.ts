import { fstore } from '@/libs/firebase-admin'
import { ITransaction } from './_type'

type GetAllTransactionsFunc = ({
  nextId,
  prevId
}: {
  nextId?: string,
  prevId?: string
}) => Promise<ITransaction[]>

export const getAllTransactions: GetAllTransactionsFunc = ({
  nextId,
  prevId
}) => {
  return new Promise(async (resolve, reject) => {
    const tcollection = fstore.collection('transactions')

    const handler = (snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
      if (snapshot.empty) {
        resolve([])
        return
      }

      const transactions: ITransaction[] = []

      snapshot.forEach((tr) => {
        const data = tr.data() as ITransaction
        console.log(tr.id)
        transactions.push({ ...data, ...{ id: tr.id } })
      })

      console.log('resolved')
      resolve(transactions)
    }

    console.log('----------------')

    if (nextId) {
      console.log('next', nextId)
      const lastRef = await fstore.doc(`/transactions/${nextId}`).get()
      tcollection
        .orderBy("createdAt", "desc")
        .startAfter(lastRef)
        .limit(2)
        .get()
        .then(handler)
    }

    if (prevId) {
      console.log('prev')
      const prevRef = await fstore.doc(`/transactions/${prevId}`).get()
      tcollection
        .orderBy("createdAt", "desc")
        .endBefore(prevRef)
        .limit(2)
        .get()
        .then(handler)
    }

    if (!nextId && !prevId) {
      tcollection
        .orderBy("createdAt", "desc")
        .limit(2)
        .get()
        .then(handler)
    }

  })
}



