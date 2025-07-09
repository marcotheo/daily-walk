import * as React from "react";

import Header from "./_components/layout/header";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "h-screen",
        // "px-3 sm:px-10 md:px-24 lg:px-56",
        "flex flex-col"
      )}
    >
      <Header />
      <div className={cn("flex flex-col", "grow overflow-auto", "max-lg:px-5")}>
        {children}
      </div>
    </div>
  );
}
