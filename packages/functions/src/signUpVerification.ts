import { CustomMessageTriggerEvent, Handler } from "aws-lambda";

export const handler: Handler<CustomMessageTriggerEvent> = async (event) => {
  const { triggerSource, request, response } = event;

  // Only customize message for sign-up flow
  if (triggerSource === "CustomMessage_SignUp") {
    const siteURL = process.env.SITE_URL || "http://localhost:3000";
    const email = request.userAttributes.email;
    const code = request.codeParameter;

    const verificationURL = `${siteURL}/user/verify?username=${encodeURIComponent(
      email
    )}&code=${encodeURIComponent(code)}`;

    const newLine = "\r\n";

    const message = [
      "Hi there,",
      "",
      "Thank you for signing up! Please verify your email by clicking the link below:",
      "",
      verificationURL,
      "",
      `Or enter the verification code manually: ${code}`,
      "",
      "Blessings,",
      "Your Daily Walk Team",
    ].join(newLine);

    response.emailSubject = "Please confirm your email address";
    response.emailMessage = message;
    response.smsMessage = `Verify your email: ${verificationURL} or use code ${code}`;

    console.log("Final emailMessage:", JSON.stringify(message, null, 2));
  }

  return event;
};
