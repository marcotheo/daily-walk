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
    const userPool = await import("./infra/cognito");

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
      userPool: userPool.pool.id,
    };
  },
});
