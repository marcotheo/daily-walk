import dayjs from "dayjs";
import * as v from "valibot";

import { signInUser } from "@daily-walk/core/cognito";
import { LoginAttempts } from "@daily-walk/core/electrodb";
import { baseProcedure, createTRPCRouter } from "../init";

export const authRouter = createTRPCRouter({
  signIn: baseProcedure
    .input(
      v.object({
        email: v.pipe(v.string(), v.nonEmpty("Please enter your email.")),
        password: v.pipe(v.string(), v.nonEmpty("Please enter your password.")),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.info("auth_SignIn() :: Signing In");

      const loginAttempt = await LoginAttempts.get({
        username: input.email,
      }).go({ attributes: ["attempts"] });

      if (!!loginAttempt.data?.attempts && loginAttempt.data.attempts >= 3)
        throw new Error("Max Attempt reached");

      const result = await signInUser(input.email, input.password);

      if (
        result.AuthenticationResult?.AccessToken &&
        result.AuthenticationResult.RefreshToken
      ) {
        const cookieExpiresAt = dayjs().add(12, "hour").toDate();

        ctx.setCookie(
          "app_accessToken",
          result.AuthenticationResult.AccessToken,
          {
            httpOnly: true,
            path: "/",
            expires: cookieExpiresAt,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          }
        );

        ctx.setCookie(
          "app_refreshToken",
          result.AuthenticationResult.RefreshToken,
          {
            httpOnly: true,
            path: "/",
            expires: cookieExpiresAt,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          }
        );

        ctx.setCookie("app_refreshTokenExp", cookieExpiresAt.toString(), {
          httpOnly: true,
          path: "/",
          expires: cookieExpiresAt,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }

      if (!!loginAttempt.data)
        await LoginAttempts.delete({ username: input.email }).go();

      console.info("auth_SignIn() :: Signing In Successful");

      return {
        success: true,
      };
    }),
  signOut: baseProcedure.mutation((opts) => {
    return true;
  }),
});

// export type definition of API
export type AuthRouter = typeof authRouter;
