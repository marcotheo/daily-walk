import { trpc } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { ToReflection } from "./toreflection";

export default async function Hero() {
  const dailyVerse = await trpc.dailyVerse.getDailyVerse();

  return (
    <div
      className={cn("w-full min-h-full", "flex justify-center items-center")}
    >
      <div className="max-w-4xl z-10 space-y-3">
        <h2 className="text-4xl font-semibold">Daily Verse</h2>
        <p className="mt-2 text-lg md:text-2xl italic">
          "{dailyVerse.verse ?? "N/A"}"
        </p>
        <p className="mt-1 text-sm md:text-lg text-muted-foreground">
          – {dailyVerse.reference ?? "N/A"}
        </p>
        <ToReflection />
      </div>
    </div>
  );
}
