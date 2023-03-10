import { useEffect } from "react";
import Layout from '@/containers/Layout'
import { TransactionStatus } from '@/services/_type'

import { trpc } from '@/utils/trpc'

export default function Transaction() {
  const { isLoading, data, isSuccess, refetch } = trpc.getAllTransactions.useQuery({term: ''})
  const mutation = trpc.approveTransaction.useMutation()

  const onApprove = ({uid, unit, transId}: {uid: string, unit: number, transId: string}) => {
    mutation.mutate({unit, uid, transId})
  }

  useEffect(() => {
    if (mutation.isLoading === false && mutation.isSuccess) {
      refetch()
    }
  }, [mutation])

  return (
    <Layout>
      <div className="container" id="transaction" >
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
        </div>
      </div>
    </Layout>
  )
}
