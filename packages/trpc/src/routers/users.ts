import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createUserAccount } from "@daily-walk/core/cognito";
import { baseProcedure, createTRPCRouter } from "../init";
import { Users } from "@daily-walk/core/electrodb";

export const usersRouter = createTRPCRouter({
  signIn: baseProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.info("users_CreateAccount() :: Creating Account");

        const checkUser = await Users.get({ username: input.username }).go({
          attributes: ["username"],
        });

        if (!checkUser.data?.username)
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });

        const result = await createUserAccount(input.username, input.password);

        if (result.userId)
          await Users.put({
            userId: result.userId,
            username: input.username,
          }).go();

        console.info("users_CreateAccount() :: Creating Account Successful");

        return {
          userId: result.userId,
        };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user account",
          cause: err, // Optional, useful for logging/debugging
        });
      }
    }),
});

// export type definition of API
export type UsersRouter = typeof usersRouter;
