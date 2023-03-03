import { z } from 'zod';
import { mergeRouters, procedure, router } from '../trpc';
import { postRouter } from './post';
import { userRouters } from './users';

export const appRouter = mergeRouters(userRouters, postRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
