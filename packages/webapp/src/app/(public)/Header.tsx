import { cn } from "@/lib/utils";
import * as React from "react";

import { DarkModeToggle } from "@/components/dark-mode-toggle";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className={cn("p-5 pt-8", "flex justify-between")}>
      <p>logo</p>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
}
