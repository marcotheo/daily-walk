// import { DailyVerse } from "@daily-walk/core/daily-verse";
import { baseProcedure, createTRPCRouter } from "../init";

export const authRouter = createTRPCRouter({
  signIn: baseProcedure.mutation((opts) => {
    return true;
  }),
  signOut: baseProcedure.mutation((opts) => {
    return true;
  }),
});

// export type definition of API
export type AuthRouter = typeof authRouter;
