"use client";

import { ReactNode } from "react";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

export function SideBarNavItem({ children }: { children: ReactNode }) {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenuButton asChild onClick={toggleSidebar}>
      {children}
    </SidebarMenuButton>
  );
}
