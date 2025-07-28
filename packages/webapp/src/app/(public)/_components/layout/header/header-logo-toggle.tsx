"use client";

import { ReactNode } from "react";

import { useSidebar } from "@/components/ui/sidebar";

export function HeaderLogoToggle({ children }: { children: ReactNode }) {
  const { toggleSidebar } = useSidebar();

  return <div onClick={toggleSidebar}>{children}</div>;
}
