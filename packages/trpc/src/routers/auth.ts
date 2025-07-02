import { z } from "zod";
import dayjs from "dayjs";

import { signInUser } from "@daily-walk/core/cognito";
import { LoginAttempts } from "@daily-walk/core/electrodb";
import { baseProcedure, createTRPCRouter } from "../init";

export const authRouter = createTRPCRouter({
  signIn: baseProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.info("auth_SignIn() :: Signing In");

      const loginAttempt = await LoginAttempts.get({
        username: input.username,
      }).go({ attributes: ["attempts"] });

      if (!!loginAttempt.data?.attempts && loginAttempt.data.attempts >= 3)
        throw new Error("Max Attempt reached");

      const result = await signInUser(input.username, input.password);

      if (result.ChallengeName === "NEW_PASSWORD_REQUIRED" && !!result.Session)
        return {
          changePassword: true,
          session: result.Session,
        };

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
        await LoginAttempts.delete({ username: input.username }).go();

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
