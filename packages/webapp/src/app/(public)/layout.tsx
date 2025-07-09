import * as React from "react";

import Header from "./_components/layout/header";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/layout/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div
        className={cn(
          "h-screen w-full",
          // "px-3 sm:px-10 md:px-24 lg:px-56",
          "flex flex-col"
        )}
      >
        <Header />
        <AppSidebar />

        <div
          className={cn("flex flex-col", "grow overflow-auto", "max-lg:px-5")}
        >
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
