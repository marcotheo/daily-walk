import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@daily-walk/trpc/init";
import { appRouter } from "@daily-walk/trpc/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
  });
export { handler as GET, handler as POST };
