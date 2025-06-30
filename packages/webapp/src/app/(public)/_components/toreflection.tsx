"use client";

import { Button } from "@/components/ui/button";

export const ToReflection = () => {
  const handleClick = () => {
    document
      .getElementById("reflection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return <Button onClick={handleClick}>Reflection</Button>;
};
