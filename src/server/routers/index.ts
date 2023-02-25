import { mergeRouters } from "../trpc";
//import { loginRouter } from "./loginRouter";
import { roleRouter } from "./roleRouter";
import { loginRouter } from "./loginRouter";

export const appRouter = mergeRouters(roleRouter, loginRouter);

export type AppRouter = typeof appRouter;
