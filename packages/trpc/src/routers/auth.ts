import dayjs from "dayjs";
import * as v from "valibot";
import { TRPCError } from "@trpc/server";

import {
  revokeAccessToken,
  revokeRefreshToken,
  signInUser,
} from "@daily-walk/core/cognito";
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
  signOut: baseProcedure.mutation(async ({ ctx }) => {
    try {
      const atoken = ctx.getCookie("app_accessToken");
      const rtoken = ctx.getCookie("app_refreshToken");

      if (atoken) await revokeAccessToken(atoken);
      if (rtoken) await revokeRefreshToken(rtoken);

      const expiredDate = new Date(0); // Unix epoch time

      ctx.setCookie("app_accessToken", "", {
        httpOnly: true,
        path: "/",
        expires: expiredDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      ctx.setCookie("app_refreshToken", "", {
        httpOnly: true,
        path: "/",
        expires: expiredDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      ctx.setCookie("app_refreshTokenExp", "", {
        httpOnly: true,
        path: "/",
        expires: expiredDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return true;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong during sign out.",
        cause: err,
      });
    }
  }),
});

// export type definition of API
export type AuthRouter = typeof authRouter;
