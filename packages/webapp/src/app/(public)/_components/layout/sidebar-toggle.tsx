"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export default function SideBarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-[1.6rem] lg:hidden"
      onClick={() => toggleSidebar()}
    >
      <MenuIcon className={cn("size-7")} />
    </Button>
  );
}
