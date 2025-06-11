import { HydrateClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";

export default async function Home() {
  void trpc.hello.prefetch({ text: "pre-fetch" });
  const greeting = await trpc.hello({ text: "marco " });

  return (
    <HydrateClient>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        from server: {greeting.greeting}
        <ClientGreeting />
      </div>
    </HydrateClient>
  );
}
