import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import SignUpForm from "./_components/signup-form";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export default function Page() {
  return (
    <div className="h-screen w-full flex">
      <div className={cn("w-1/2 xl:w-2/3 p-5", "max-lg:hidden")}>
        <div
          className={cn("w-full h-full", "rounded-3xl", "bg-gray-400")}
        ></div>
      </div>

      <div
        className={cn(
          "w-full lg:w-1/2 xl:w-1/3",
          "flex justify-center items-center"
        )}
      >
        <div className="absolute top-5 right-5">
          <DarkModeToggle />
        </div>

        <div className="space-y-10">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl">Create an account</h1>

            <div className="flex gap-1 text-sm">
              <p className="text-gray-500">Already have an account?</p>
              <Link href="/login">
                <p className="underline text-info">Sign in</p>
              </Link>
              .
            </div>
          </div>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
