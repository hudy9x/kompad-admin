import { useEffect, useState } from "react";
import Layout from '@/containers/Layout'
import { TransactionStatus } from '@/services/_type'

import { trpc } from '@/utils/trpc'
import dayjs from "dayjs";

export default function Transaction() {
  const [query, setQuery] = useState({
    nextId: '',
    prevId: '',
    status: TransactionStatus.PENDING
  })

  const { isLoading, data, isSuccess, isError, refetch } = trpc
    .getAllTransactions.useQuery({
      term: '',
      nextId: query.nextId,
      prevId: query.prevId,
      status: query.status
    })
  const mutation = trpc.approveTransaction.useMutation()

  const onApprove = ({ uid, unit, transId }: { uid: string, unit: number, transId: string }) => {
    mutation.mutate({ unit, uid, transId })
  }

  const clearQuery = () => {
    setQuery(prev => ({
      ...prev,
      ...{nextId: '', prevId: ''}
    }))
  }

  const nextPage = () => {
    if (!data?.transactions || !data.transactions.length) {
      clearQuery()
      return;
    }
    const lastId = data.transactions[data.transactions.length - 1].id
    setQuery(prev => ({
      ...prev,
      ...{nextId: lastId || '', prevId: ''}
    }))
  }

  const prevPage = () => {

    if (!data?.transactions || !data?.transactions.length) {
      clearQuery()
      return;
    }

    const firstId = data.transactions[0].id
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

  const onTabChange = (status: TransactionStatus) => {
    console.log(status)
    setQuery(prev => ({
      ...prev,
      ...{ status }
    }))
  }

  const isTabActive = (name: string) => {
    return name === query.status ? 'active' : ''
  }

  return (
    <Layout>
      <div className="container" id="transaction" >
        <h1 className="section-heading">Transactions</h1>
        <div className="card">
          <div className="tab">
            <div className={`tab-item ${isTabActive(TransactionStatus.PENDING)}`} onClick={() => onTabChange(TransactionStatus.PENDING)}>Pending</div>
            <div className={`tab-item ${isTabActive(TransactionStatus.APPROVED)}`} onClick={() => onTabChange(TransactionStatus.APPROVED)} >Approve</div>
          </div>

          <table>
            <thead>
              <tr className="row">
                <th>ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Unit (month)</th>
                <th>Method</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? "Loading" : null}
              {isSuccess && !data.transactions.length ? <tr className="row">
                <td className="cell text-center" colSpan={8}>There is no item found</td>
              </tr> : null}
              {isSuccess ? data.transactions.map(transaction => {
                const created = dayjs(transaction.createdAtDate)
                return <tr key={transaction.id}
                  className="row" >
                  <td className="cell">
                    <span className="truncate w-24 block">
                      {transaction.id}
                    </span>
                  </td>
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
                  <td className="cell">{created.format('DD/MM/YYYY')}</td>
                </tr>
              }) : null}
            </tbody>
          </table>
          <div className="px-4 py-2 space-x-2 text-right">
            <button className="btn" onClick={prevPage}>Prev</button>
            <button className="btn" onClick={nextPage} >Next</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
