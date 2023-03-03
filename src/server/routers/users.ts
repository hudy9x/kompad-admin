import { getAllUsers } from '@/services/user'
import { z } from 'zod'
import { procedure, router } from '../trpc'

export const userRouters = router({
  getAllUsers: procedure
    .input(
      z.object({
        term: z.string(),
      })
    )
    .query(async ({ input }) => {

      const users = await getAllUsers();

      return {
        users: users
      }
    }),
})
