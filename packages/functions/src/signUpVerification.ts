import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const siteURL = process.env.SITE_URL || "http://localhost:3000";

  const email = event.request.userAttributes.email;
  const confirmationCode = event.request.codeParameter;

  const verificationURL = `${siteURL}/user/verify?username=${encodeURIComponent(
    email
  )}&code=${encodeURIComponent(confirmationCode)}`;

  const message = `Please confirm your email address by clicking on the following link: ${verificationURL}`;

  event.response.emailMessage = message;
  event.response.smsMessage = message;

  return event;
};
