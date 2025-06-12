import { HydrateClient, trpc } from "@/trpc/server";
import { cn } from "@/lib/utils";

export default async function Home() {
  void trpc.hello.prefetch({ text: "pre-fetch" });
  const greeting = await trpc.hello({ text: "marco " });

  return (
    <HydrateClient>
      <div className={cn("h-[75vh]", "flex justify-center items-center")}>
        <div>
          <h2 className="text-xl font-semibold">Daily Verse</h2>
          <p className="mt-2 text-lg italic">"fast lang pd"</p>
          <p className="mt-1 text-sm text-muted-foreground">– hello</p>
        </div>
      </div>
    </HydrateClient>
  );
}
