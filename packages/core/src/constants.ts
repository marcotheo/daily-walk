export const dynamodbTable = process.env.DYNAMODB_TABLE ?? "";

// AWS COGNITO
export const poolId = process.env.POOL_ID ?? "ap-southeast-1_1Htsnc213X"; // dummy value to avoid build time error
export const poolClientId = process.env.POOL_CLIENT_ID ?? "";
export const poolClientSecret = process.env.POOL_CLIENT_SECRET ?? "";
