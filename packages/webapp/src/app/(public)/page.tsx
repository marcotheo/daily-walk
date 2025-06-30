import { Suspense } from "react";

import { cn } from "@/lib/utils";
import ModelViewer from "./_components/modelviewer";
import Hero from "./_components/hero";
import Reflection from "./_components/reflection";

export default async function Home() {
  return (
    <div className={cn("grow relative", "flex flex-col")}>
      <div className="absolute w-full h-full">
        <ModelViewer />
      </div>

      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <div
        id="reflection"
        className={cn("w-full min-h-full", "flex justify-center items-center")}
      >
        <Reflection />
      </div>
    </div>
  );
}
