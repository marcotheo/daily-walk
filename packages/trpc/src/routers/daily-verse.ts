import { DailyVerse } from "@daily-walk/core/daily-verse";
import { baseProcedure, createTRPCRouter } from "../init";

export const dailyVerseRouter = createTRPCRouter({
  getDailyVerse: baseProcedure.query((opts) => {
    return DailyVerse.getDailyVerse();
  }),
});

// export type definition of API
export type DailyVerseRouter = typeof dailyVerseRouter;
