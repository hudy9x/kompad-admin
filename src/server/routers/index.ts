import { mergeRouters } from "../trpc";
//import { loginRouter } from "./loginRouter";
import { roleRouter } from "./role";
import { addUserTokenRouter } from "./login";

export const appRouter = mergeRouters(roleRouter, addUserTokenRouter);

export type AppRouter = typeof appRouter;
