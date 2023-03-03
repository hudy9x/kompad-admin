import { z } from 'zod'
import { procedure, router } from '../trpc'

export const postRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      }
    }),
})
