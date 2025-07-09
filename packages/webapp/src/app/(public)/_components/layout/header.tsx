import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { SideNav } from "./sidenav";

const HeaderLogo = () => {
  return (
    <>
      <div className="max-md:hidden">
        <Image
          src="/logo-dark-mode.png"
          alt="Daily Walk Logo dark"
          width={120}
          height={120}
          className="hidden dark:block"
        />
        <Image
          src="/logo-light-mode.png"
          alt="Daily Walk Logo light"
          width={120}
          height={120}
          className="block dark:hidden"
        />
      </div>

      <div className="md:hidden">
        <Image
          src="/logo-dark-mode.png"
          alt="Daily Walk Logo dark"
          width={100}
          height={100}
          className="hidden dark:block"
        />
        <Image
          src="/logo-light-mode.png"
          alt="Daily Walk Logo light"
          width={100}
          height={100}
          className="block dark:hidden"
        />
      </div>
    </>
  );
};

export default function Header() {
  return (
    <div
      className={cn(
        "px-5 md:px-16 xl:px-24",
        "flex justify-between items-center",
        "bg-transparent"
      )}
    >
      <HeaderLogo />

      <div className={cn("space-x-0 md:space-x-2", "flex items-end")}>
        <SideNav />

        <div className={cn("space-x-2", "flex items-end", "max-lg:hidden")}>
          <Link href="/login">
            <Button
              variant="outline"
              className={cn("h-full py-4 min-w-24", "rounded-3xl")}
            >
              Log in
            </Button>
          </Link>

          <Link href="/login">
            <Button
              className={cn(
                "h-full py-4 min-w-24",
                "rounded-3xl",
                "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              )}
            >
              Sign Up
            </Button>
          </Link>
        </div>

        <DarkModeToggle />
      </div>
    </div>
  );
}
