import { useEffect, useState } from "react";
import Layout from '@/containers/Layout'
import { TransactionStatus } from '@/services/_type'

import { trpc } from '@/utils/trpc'

export default function Transaction() {
  const [query, setQuery] = useState({
    nextId: '',
    prevId: ''
  })

  const { isLoading, data, isSuccess, refetch } = trpc
    .getAllTransactions.useQuery({
      term: '',
      nextId: query.nextId,
      prevId: query.prevId
    })
  const mutation = trpc.approveTransaction.useMutation()

  const onApprove = ({ uid, unit, transId }: { uid: string, unit: number, transId: string }) => {
    mutation.mutate({ unit, uid, transId })
  }

  const nextPage = () => {
    if (!data?.transactions) {
      return;
    }

    const lastId = data.transactions[data.transactions.length - 1].id
    console.log('called')
    setQuery(prev => ({
      ...prev,
      ...{nextId: lastId || '', prevId: ''}
    }))
  }

  const prevPage = () => {

    if (!data?.transactions) {
      return;
    }

    const firstId = data.transactions[0].id
    console.log('called', firstId)
    setQuery(prev => ({
      ...prev,
      ...{prevId: firstId || '', nextId: ''}
    }))
  }

  useEffect(() => {
    if (mutation.isLoading === false && mutation.isSuccess) {
      console.log('a')
      refetch()
    }
  }, [mutation])


  console.log(data?.transactions)

  return (
    <Layout>
      <div className="container" id="transaction" >
        <h1 className="section-heading">Transactions</h1>
        <div className="card">
          {isLoading ? "Loading" : null}
          <table>
            <thead>
              <tr className="row">
                <th>ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Unit</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isSuccess ? data.transactions.map(transaction => {
                return <tr key={transaction.id}
                  className="row" >
                  <td className="cell truncate overflow-hidden">{transaction.id}</td>
                  <td className="cell">{transaction.email}</td>
                  <td className="cell">{transaction.amount}</td>
                  <td className="cell">{transaction.currency}</td>
                  <td className="cell">{transaction.unit}</td>
                  <td className="cell">{transaction.method}</td>
                  <td className="cell">{
                    transaction.status === TransactionStatus.PENDING
                      ? <button className="btn" onClick={() => onApprove({
                        transId: transaction.id || '',
                        uid: transaction.uid,
                        unit: transaction.unit
                      })}>Approve</button>
                      : "APPROVED"
                  }</td>
                </tr>
              }) : null}
            </tbody>
          </table>
          <div className="px-4 pt-2 space-x-2 text-right">
            <button className="btn" onClick={prevPage}>Prev</button>
            <button className="btn" onClick={nextPage} >Next</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
