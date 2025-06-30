import { trpc } from "@/trpc/server";
import { cn } from "@/lib/utils";

import ModelViewer from "./_components/modelviewer";
import Hero from "./_components/hero";
import Reflection from "./_components/reflection";

export default async function Home() {
  const dailyVerse = await trpc.dailyVerse.getDailyVerse();

  return (
    <div className={cn("grow relative", "flex flex-col")}>
      <div className="absolute w-full h-full">
        <ModelViewer />
      </div>

      <Hero reference={dailyVerse.reference} verse={dailyVerse.verse} />

      <div
        id="reflection"
        className={cn("w-full min-h-full", "flex justify-center items-center")}
      >
        <Reflection reflection={dailyVerse.reflection} />
      </div>
    </div>
  );
}
