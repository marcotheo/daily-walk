import * as React from "react";

import Header from "./Header";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("h-screen", "px-32", "flex flex-col")}>
      <Header />
      <div className="flex flex-col grow overflow-auto">{children}</div>
    </div>
  );
}
