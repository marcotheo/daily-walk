import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import LoginForm from "./_components/login-form";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import HeaderLogo from "@/app/(public)/_components/layout/header/header-logo";

export default function Page() {
  return (
    <div className="h-screen w-full flex">
      <div className={cn("w-2/3 py-5 pl-5", "max-lg:hidden")}>
        <div
          className={cn("w-full h-full", "rounded-3xl", "bg-gray-400")}
        ></div>
      </div>

      <div
        className={cn(
          "relative",
          "w-full lg:w-1/3",
          "flex justify-center items-center"
        )}
      >
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

        <div className="space-y-10 w-full px-5 xl:px-16">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl">Sign In</h1>

            <div className="flex gap-1 text-sm">
              <p className="text-gray-500">Don't have an account?</p>
              <Link href="/login">
                <p className="underline text-info">Sign up here</p>
              </Link>
              .
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
