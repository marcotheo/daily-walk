import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { SideNav } from "./sidenav";
import HeaderLogo from "./headerlogo";

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
