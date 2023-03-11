import { Timestamp } from 'firebase/firestore'

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export enum PaymentMethod {
  BANK = 'BANK',
  PAYPAL = 'PAYPAL',
}

export interface ITransaction {
  id?: string
  uid: string
  createdAt: Timestamp
  createdAtDate?: Date
  updatedAt: Timestamp
  updatedAtDate?: Date
  amount: number
  unit: number
  method: PaymentMethod
  currency: string
  email: string
  status: TransactionStatus
  history: string
  code: string
}
