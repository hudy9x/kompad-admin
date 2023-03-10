import { mergeRouters } from '../trpc'
import { postRouter } from './post'
import { transactionRouter } from './transactions'
import { userRouters } from './users'

export const appRouter = mergeRouters(
  userRouters,
  postRouter,
  transactionRouter
)

// export type definition of API
export type AppRouter = typeof appRouter
