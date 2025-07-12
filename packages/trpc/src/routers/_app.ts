import * as v from "valibot";
import { baseProcedure, createTRPCRouter } from "../init";
import { dailyVerseRouter } from "./daily-verse";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      v.object({
        text: v.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  dailyVerse: dailyVerseRouter,
  users: usersRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
