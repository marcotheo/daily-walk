import { getSiteUrl } from "./utils";

const baseDomain = getSiteUrl();

export const signUpLambdaFunction = new sst.aws.Function(
  "CognitoVerificationEmailFunction",
  {
    handler: "packages/functions/src/signUpVerification.handler",
    environment: {
      SITE_URL: baseDomain,
    },
  }
);

export const pool = new aws.cognito.UserPool("UserPool", {
  autoVerifiedAttributes: ["email"],
  usernameAttributes: ["email"],
  emailConfiguration: {
    emailSendingAccount: "COGNITO_DEFAULT", // Use Cognito's default email sending
  },
  verificationMessageTemplate: {
    defaultEmailOption: "CONFIRM_WITH_CODE",
    emailMessage: "Your verification code is {####}.",
    emailSubject: "Your verification code",
    smsMessage: "Your verification code is {####}.",
  },
  lambdaConfig: {
    customMessage: signUpLambdaFunction.arn,
  },
});

export const userPoolClient = new aws.cognito.UserPoolClient("UserPoolClient", {
  userPoolId: pool.id,
  explicitAuthFlows: ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"],
  tokenValidityUnits: {
    accessToken: "minutes",
    idToken: "minutes",
    refreshToken: "hours",
  },
  accessTokenValidity: 10,
  idTokenValidity: 10,
  refreshTokenValidity: 3,
  generateSecret: true,

  // google or 3rd party logins
  // allowedOauthFlows: ["code"],
  // allowedOauthScopes: ["email", "openid", "profile"],
  // supportedIdentityProviders: ["COGNITO", "Google"],
});

// Grant permission for Cognito to invoke the Lambda function
new aws.lambda.Permission("CognitoLambdaInvokePermission", {
  action: "lambda:InvokeFunction",
  function: signUpLambdaFunction.nodes.function,
  principal: "cognito-idp.amazonaws.com",
  sourceArn: pool.arn,
});
