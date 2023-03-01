import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { inferAsyncReturnType } from '@trpc/server';

export const createContext = async (opts: CreateNextContextOptions) => {
 const { req, res } = opts;
 return {
  req,
  res,
 }
}

export type Context = inferAsyncReturnType<typeof createContext>;
