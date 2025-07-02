import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { cookies as nextCookies } from "next/headers";

export const createTRPCContext = cache(async (opts?: { req?: Request }) => {
  if (opts?.req) {
    const cookieStore = await nextCookies();

    return {
      getCookie: (name: string) => {
        return cookieStore.get(name)?.value ?? null;
      },

      setCookie: (
        name: string,
        value: string,
        options?: Parameters<typeof cookieStore.set>[2]
      ) => {
        cookieStore.set(name, value, options);
      },
    };
  }

  // Fallback context for environments without Request (e.g., server.ts)
  return {
    getCookie: () => null,
    setCookie: () => {
      // no-op
    },
  };
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
