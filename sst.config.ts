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
    new sst.aws.Nextjs("MyWeb", {
      path: "packages/webapp",
    });
  },
});
