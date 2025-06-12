import * as React from "react";
import Header from "./Header";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("px-16")}>
      <Header />
      {children}
    </div>
  );
}
