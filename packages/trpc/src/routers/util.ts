import { TRPCError } from "@trpc/server";

export const throwCognitoErrors = (name: string) => {
  switch (name) {
    case "CodeMismatchException":
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid verification code.",
      });
    case "ExpiredCodeException":
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Verification code has expired. Please request a new one.",
      });
    case "UserNotFoundException":
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    case "NotAuthorizedException":
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Email already verified.",
      });
    case "TooManyFailedAttemptsException":
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many failed attempts. Please try again later.",
      });
    case "LimitExceededException":
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please wait and try again.",
      });
    case "InvalidParameterException":
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid input. Please check your email and code.",
      });
    default:
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "We’re sorry, but we couldn’t complete your registration at this time. Please try again shortly.",
      });
  }
};
