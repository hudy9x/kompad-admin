import { ChangeEvent, useEffect, useState } from "react";
import Layout from '@/containers/Layout'
import { PaymentMethod, TransactionStatus } from '@/services/_type'

import { trpc } from '@/utils/trpc'
import dayjs from "dayjs";
import { Input } from "@/components";

import paypalImg from "../assets/paypal.png"
import bankImg from "../assets/card.png"
import Image from "next/image";

const BankIcon = ({ method }: { method: string }) => {
  const size = 40
  if (method === PaymentMethod.BANK) {
    return <Image className="inline-block" src={bankImg} width={size} height={size} alt="Bank" />
  }

  if (method === PaymentMethod.PAYPAL) {
    return <Image className="inline-block" src={paypalImg} width={size} height={size} alt="Paypal" />
  }

  return <span>{method}</span>
}

export default function Transaction() {
  const [query, setQuery] = useState({
    term: '',
    nextId: '',
    prevId: '',
    status: TransactionStatus.PENDING
  })

  const { isLoading, data, isSuccess, refetch } = trpc
    .getAllTransactions.useQuery({
      term: query.term,
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
      ...{ nextId: '', prevId: '' }
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
      ...{ nextId: lastId || '', prevId: '' }
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
      ...{ prevId: firstId || '', nextId: '' }
    }))
  }

  useEffect(() => {
    if (mutation.isLoading === false && mutation.isSuccess) {
      console.log('a')
      refetch()
    }
    // eslint-disable-next-line
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

  const onSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setQuery(prev => ({
        ...prev,
        ...{ term: ev.target.value || '' }
      }))
    }, 250);

  }

  return (
    <Layout title="Transactions">
      <div className="bg-white border-t border-t-gray-200 shadow" >
        <div className="header-section">
          <Input placeholder="Search ..." onChange={onSearch} />
        </div>
      </div>
      <div className="container" id="transaction" >
        <h1 className="card-title">Recently activities</h1>
        <div className="card">
          <div className="tab">
            <div className={`tab-item ${isTabActive(TransactionStatus.PENDING)}`} onClick={() => onTabChange(TransactionStatus.PENDING)}>Pending</div>
            <div className={`tab-item ${isTabActive(TransactionStatus.APPROVED)}`} onClick={() => onTabChange(TransactionStatus.APPROVED)} >Approved</div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <table>
              <thead>
                <tr className="row">
                  <th className="text-left">Transaction ID</th>
                  <th className="cell-mobile-hidden text-left">Email</th>
                  <th className="text-left">Amount</th>
                  <th className="cell-mobile-hidden text-center">Method</th>
                  <th>Status</th>
                  <th className="cell-mobile-hidden">Created At</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? <tr className="row">
                  <td className="cell text-center" colSpan={8}>Loading ...</td>
                </tr> : null}
                {isSuccess && !data.transactions.length ? <tr className="row">
                  <td className="cell text-center" colSpan={8}>There is no item found</td>
                </tr> : null}
                {isSuccess ? data.transactions.map(transaction => {
                  const created = dayjs(transaction.createdAtDate)

                  if (query.term && !transaction.email.includes(query.term)) {
                    return null
                  }

                  return <tr key={transaction.id}
                    className="row" >
                    <td className="cell">
                      <span className="truncate w-24 block">
                        {transaction.id}
                      </span>
                      <div className="cell-mobile-show">
                        <div>{transaction.email}</div>
                        <div>{transaction.method}</div>
                        <div>{created.format('DD/MM/YYYY')}</div>
                      </div>
                    </td>
                    <td className="cell cell-mobile-hidden">{transaction.email}</td>
                    <td className="cell">
                      {transaction.amount} <span className="text-xs text-gray-500">{transaction.currency}</span> / {transaction.unit} <span className="text-xs text-gray-400">(month)</span>
                    </td>
                    <td className="cell cell-mobile-hidden text-center"><BankIcon method={transaction.method} /></td>
                    <td className="cell text-center">{
                      transaction.status === TransactionStatus.PENDING
                        ? <button className="btn" onClick={() => onApprove({
                          transId: transaction.id || '',
                          uid: transaction.uid,
                          unit: transaction.unit
                        })}>Approve</button>
                        : <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Approved</span>
                    }</td>
                    <td className="cell cell-mobile-hidden text-center">{created.format('DD/MM/YYYY')}</td>
                  </tr>
                }) : null}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 space-x-2 text-right">
            <button className="btn" onClick={prevPage}>Prev</button>
            <button className="btn" onClick={nextPage} >Next</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
