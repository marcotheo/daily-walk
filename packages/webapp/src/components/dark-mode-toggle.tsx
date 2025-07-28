"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className={cn("px-8 h-full", "rounded-xl duration-300")}
        onClick={toggle}
      >
        <Sun
          className={cn(
            "size-5",
            "scale-220 rotate-0",
            "transition-all dark:scale-0 dark:-rotate-90",
            "animate-fade-in-slide dark:animate-fade-out-slide duration-200"
          )}
        />
        <Moon
          className={cn(
            "absolute size-5",
            "scale-0 rotate-90",
            "transition-all dark:scale-220 dark:rotate-0",
            "animate-fade-out-slide dark:animate-fade-in-slide dark:duration-200"
          )}
        />
      </Button>
    </div>
  );
}
