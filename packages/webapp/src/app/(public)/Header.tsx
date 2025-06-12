import { cn } from "@/lib/utils";
import * as React from "react";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className={cn("bg-red-500 p-5", "flex justify-between")}>
      <p>logo</p>
      <div>dark mode</div>
    </div>
  );
}
