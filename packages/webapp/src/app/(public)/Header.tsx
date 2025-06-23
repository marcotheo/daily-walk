import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

const HeaderLogo = () => {
  return (
    <div className="">
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
  );
};

export default function Header() {
  return (
    <div
      className={cn(
        "px-5",
        "flex justify-between items-center",
        "bg-transparent"
      )}
    >
      <HeaderLogo />
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
}
