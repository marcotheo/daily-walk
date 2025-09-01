import Link from "next/link";
import * as React from "react";

import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { cn } from "@/lib/utils";
import SideBarToggle from "../sidebar/sidebar-toggle";
import AccountNavigation from "./account-navigation";
import HeaderLogo from "./header-logo";

export default function Header() {
  return (
    <div
      className={cn(
        "px-5 md:px-16 xl:px-24",
        "flex items-center justify-between",
        "bg-transparent"
      )}
    >
      <HeaderLogo />

      <nav className="hidden min-[980px]:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/journal"
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm",
            "transition-all duration-200 ease-in-out",
            "hover:bg-muted hover:text-foreground",
            "text-muted-foreground hover:scale-105"
          )}
        >
          Journal
        </Link>
        <Link
          href="/prayer-wall"
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm",
            "transition-all duration-200 ease-in-out",
            "hover:bg-muted hover:text-foreground",
            "text-muted-foreground hover:scale-105"
          )}
        >
          Prayer Wall
        </Link>
        <Link
          href="/hope"
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm",
            "transition-all duration-200 ease-in-out",
            "hover:bg-muted hover:text-foreground",
            "text-muted-foreground hover:scale-105"
          )}
        >
          Hope
        </Link>
      </nav>

      <div className={cn("space-x-0 md:space-x-2", "flex")}>
        <div className="lg:hidden">
          <SideBarToggle />
        </div>

        <AccountNavigation />

        <DarkModeToggle />
      </div>
    </div>
  );
}
