export * as Cognito from "./cognito";

import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  SignUpCommand,
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
