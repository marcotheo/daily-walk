import { HydrateClient, trpc } from "@/trpc/server";
import { cn } from "@/lib/utils";

export default async function Home() {
  const dailyVerse = await trpc.dailyVerse.getDailyVerse();

  return (
    <div className={cn("h-[75vh]", "flex justify-center items-center")}>
      <div>
        <h2 className="text-xl font-semibold">Daily Verse</h2>
        <p className="mt-2 text-lg italic">"{dailyVerse.verse ?? "N/A"}"</p>
        <p className="mt-1 text-sm text-muted-foreground">
          – {dailyVerse.reference ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
