import { TRPCError } from "@trpc/server";
import * as v from "valibot";

import { createUserAccount, confirmUserSignup } from "@daily-walk/core/cognito";
import { RegexValidations } from "@daily-walk/core/util";
import { baseProcedure, createTRPCRouter } from "../init";
import { Users } from "@daily-walk/core/electrodb";
import { throwCognitoErrors } from "./util";

export const usersRouter = createTRPCRouter({
  createAccount: baseProcedure
    .input(
      v.object({
        email: v.pipe(
          v.string(),
          v.nonEmpty("Please enter your email."),
          v.email("The email address is badly formatted.")
        ),
        password: v.pipe(
          v.string(),
          v.nonEmpty("Please enter your password."),
          v.minLength(8, "Your password must have 8 characters or more."),
          v.maxLength(
            64,
            "Your password must not have more than 64 characters"
          ),
          v.regex(
            RegexValidations.hasSpecialChar,
            "Your password must have special character"
          ),
          v.regex(
            RegexValidations.hasLowerCase,
            "Your password must have lower case"
          ),
          v.regex(
            RegexValidations.hasUpperCase,
            "Your password must have upper case"
          ),
          v.regex(
            RegexValidations.hasNumber,
            "Your password must have a number"
          )
        ),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log("users_CreateAccount() :: Creating Account");

        const checkUser = await Users.get({ username: input.email }).go({
          attributes: ["username"],
        });

        if (checkUser.data?.username)
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });

        const result = await createUserAccount(input.email, input.password);

        if (result.userId)
          await Users.put({
            userId: result.userId,
            username: input.email,
          }).go();

        console.log("users_CreateAccount() :: Creating Account Successful");

        return {
          userId: result.userId,
        };
      } catch (err: any) {
        console.log(err);

        if (err.code || err.__type === "UsernameExistsException")
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already exists",
          });

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "We’re sorry, but we couldn’t complete your registration at this time. Please try again shortly",
          cause: err,
        });
      }
    }),
  verifyAccount: baseProcedure
    .input(
      v.object({
        username: v.pipe(v.string(), v.nonEmpty("Please enter your email.")),
        code: v.pipe(v.string(), v.nonEmpty("Please enter verification code")),
      })
    )
    .query(async ({ input }) => {
      try {
        await confirmUserSignup(input);
        return true;
      } catch (err: any) {
        throwCognitoErrors(err.name);
      }
    }),
});

// export type definition of API
export type UsersRouter = typeof usersRouter;
