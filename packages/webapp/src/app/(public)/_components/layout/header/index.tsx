import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import SideBarToggle from "../sidebar/sidebar-toggle";
import HeaderLogo from "./header-logo";
import AccountNavigation from "./account-navigation";

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
