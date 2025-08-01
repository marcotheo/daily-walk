export * as Cognito from "./cognito";

import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  SignUpCommand,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  RevokeTokenCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import crypto from "crypto";

import { poolId, poolClientId, poolClientSecret } from "./constants";

const client = new CognitoIdentityProviderClient();

const verifier = CognitoJwtVerifier.create({
  userPoolId: poolId,
  tokenUse: "access",
  clientId: poolClientId,
});

const generateHash = (username: string) => {
  const hmac = crypto.createHmac("sha256", poolClientSecret);
  const data = hmac.update(username + poolClientId);
  const gen_hmac = data.digest("base64");

  return gen_hmac;
};

export const createUserAccount = async (email: string, password: string) => {
  const secretHash = generateHash(email);

  const command = new SignUpCommand({
    ClientId: poolClientId,
    Username: email,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  });

  const result = await client.send(command);

  return {
    userId: result.UserSub,
  };
};

export async function confirmUserSignup({
  username,
  code,
}: {
  username: string;
  code: string;
}) {
  const secretHash = generateHash(username);

  const command = new ConfirmSignUpCommand({
    Username: username,
    SecretHash: secretHash,
    ConfirmationCode: code,
    ClientId: poolClientId,
  });

  const response = await client.send(command);

  return response.Session;
}

export const signInUser = async (email: string, password: string) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: poolClientId,
    AuthParameters: {
      USERNAME: email,
      SECRET_HASH: generateHash(email),
      PASSWORD: password,
    },
  });

  const result = await client.send(command);

  return result;
};

export const revokeAccessToken = async (accessToken: string) => {
  await client.send(
    new GlobalSignOutCommand({
      AccessToken: accessToken,
    })
  );

  return true;
};

export const revokeRefreshToken = async (token: string) => {
  const command = new RevokeTokenCommand({
    ClientId: poolClientId,
    ClientSecret: poolClientSecret,
    Token: token,
  });

  await client.send(command);

  return true;
};
