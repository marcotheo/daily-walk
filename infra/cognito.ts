import { getSiteUrl } from "./utils";

export const createCognitoPool = () => {
  const baseDomain = getSiteUrl();

  const pool = new sst.aws.CognitoUserPool("MyUserPool", {
    usernames: ["email"],
    triggers: {
      customMessage: {
        handler: "./packages/functions/src/signUpVerification.handler",
        environment: {
          SITE_URL: baseDomain,
        },
      },
    },
    transform: {
      userPool: {
        autoVerifiedAttributes: ["email"],
        emailConfiguration: {
          emailSendingAccount: "COGNITO_DEFAULT",
        },
        verificationMessageTemplate: {
          defaultEmailOption: "CONFIRM_WITH_CODE",
          emailMessage: "Your code is {####}",
          emailSubject: "Verify your email",
        },
      },
    },
  });

  pool.addClient("UserPoolClient", {
    transform: {
      client: {
        generateSecret: true,
        explicitAuthFlows: [
          "ALLOW_USER_PASSWORD_AUTH",
          "ALLOW_REFRESH_TOKEN_AUTH",
        ],
        allowedOauthFlows: ["code"],
        tokenValidityUnits: {
          accessToken: "minutes",
          idToken: "minutes",
          refreshToken: "hours",
        },
        accessTokenValidity: 10,
        idTokenValidity: 10,
        refreshTokenValidity: 3,
        allowedOauthScopes: ["email", "openid", "profile"],
        supportedIdentityProviders: ["COGNITO"],
      },
    },
  });
};
