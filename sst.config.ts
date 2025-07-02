/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: process.env.APP_NAME ?? "daily-walk",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const pool = new aws.cognito.UserPool("UserPool", {
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
    });

    new aws.cognito.UserPoolClient("UserPoolClient", {
      userPoolId: pool.id,
      explicitAuthFlows: [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
      ],
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

    const app = new sst.aws.Nextjs("WebApp", {
      path: "packages/webapp",
    });

    const table = new sst.aws.Dynamo("DynamoTable", {
      fields: {
        pk: "string",
        sk: "string",
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
      ttl: "expireAt",
    });

    return {
      webapp: app.url,
      table: table.name,
      userPool: pool.id,
    };
  },
});
