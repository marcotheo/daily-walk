import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { dailyVerseRouter } from "./daily-verse";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  dailyVerse: dailyVerseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
