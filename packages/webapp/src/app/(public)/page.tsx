import { HydrateClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "../client-greeting";

export default async function Home() {
  void trpc.hello.prefetch({ text: "pre-fetch" });
  const greeting = await trpc.hello({ text: "marco " });

  return (
    <HydrateClient>
      <div className="rounded-2xl bg p-6 text-center ">
        <h2 className="text-xl font-semibold">Daily Verse</h2>
        <p className="mt-2 text-lg italic">"fast lang pd"</p>
        <p className="mt-1 text-sm text-muted-foreground">– hello</p>
      </div>
    </HydrateClient>
  );
}
