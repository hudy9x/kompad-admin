import { updateUserPlan } from '@/services/plans'
import { getAllTransactions } from '@/services/transactions'
import { z } from 'zod'
import { procedure, router } from '../trpc'

export const transactionRouter = router({
  getAllTransactions: procedure
    .input(
      z.object({
        term: z.string(),
        nextId: z.string(),
        prevId: z.string(),
        status: z.string(),
      })
    )
    .query(async ({ input }) => {
      const transactions = await getAllTransactions({
        term: input.term,
        nextId: input.nextId,
        prevId: input.prevId,
        status: input.status,
      })

      return {
        transactions: transactions,
      }
    }),
  approveTransaction: procedure
    .input(
      z.object({
        unit: z.number(),
        transId: z.string(),
        uid: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const status = await updateUserPlan(input.transId, input.uid, input.unit)

      return { status: 0 }
    }),
})
