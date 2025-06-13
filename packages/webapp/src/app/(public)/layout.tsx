import * as React from "react";

import Header from "./Header";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("h-screen", "px-3 md:px-32", "flex flex-col")}>
      <Header />
      <div className={cn("flex flex-col", "grow overflow-auto", "max-lg:px-5")}>
        {children}
      </div>
    </div>
  );
}
