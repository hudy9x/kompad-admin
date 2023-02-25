import { mergeRouters } from "../trpc";
//import { loginRouter } from "./loginRouter";
import { roleRouter } from "./role";
import { loginRouter } from "./login";

export const appRouter = mergeRouters(roleRouter, loginRouter);

export type AppRouter = typeof appRouter;
