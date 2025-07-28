import { Loader } from "lucide-react";
import { Suspense } from "react";

import HeaderLogo from "@/app/(public)/_components/layout/header/header-logo";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { cn } from "@/lib/utils";
import { Verifying } from "./content";

type VerifyPageProps = {
  searchParams: Promise<{
    username?: string;
    code?: string;
  }>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const username = (await searchParams).username ?? "Not Found";
  const code = (await searchParams).code ?? "Not Found";

  return (
    <div className="h-screen flex flex-col">
      <div
        className={cn(
          "w-full absolute top-0",
          "flex justify-between items-center",
          "px-5 xl:px-16"
        )}
      >
        <HeaderLogo />

        <DarkModeToggle />
      </div>

      <div
        className={cn(
          "flex flex-col",
          "justify-center items-center",
          "w-full grow"
        )}
      >
        <Suspense
          fallback={
            <div className="space-y-3 flex flex-col justify-center items-center">
              <Loader className="size-24 animate-spin" />
              <p className="text-3xl">Verifying Account</p>
            </div>
          }
        >
          <Verifying username={username} code={code} />
        </Suspense>
      </div>
    </div>
  );
}
