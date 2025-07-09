"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "./useInVIew";

const HeaderComp = () => {
  const { ref, inView } = useInView({
    threshold: 0.2, // start animating when 20% is visible
  });

  return (
    <h2
      ref={ref}
      className={cn("text-4xl font-semibold", inView && "animate-fade-in-up")}
    >
      Reflection
    </h2>
  );
};

const Line = ({ idx, line }: { idx: number; line: string }) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // start animating when 20% is visible
  });

  return (
    <p
      key={idx}
      ref={ref}
      className={cn(
        "opacity-0",
        "text-lg md:text-xl",
        "leading-relaxed text-left whitespace-nowrap",
        inView && "animate-fade-in-up"
      )}
      style={{ animationDelay: `${(idx + 1) * 0.3}s` }}
    >
      {line}
    </p>
  );
};

function splitByLineLength(text: string, maxLen: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];

  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length + 1 <= maxLen) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

export default function Reflection({ reflection }: { reflection: string }) {
  const [maxLen, setMaxLen] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      let newMaxLen = maxLen;

      if (window.innerWidth > 640) newMaxLen = 80;
      else if (window.innerWidth > 400) newMaxLen = 45;
      else newMaxLen = 30;

      setMaxLen(newMaxLen);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lines = splitByLineLength(reflection, maxLen);

  return (
    <div className="space-y-4 w-fit">
      <HeaderComp />

      {lines.map((line, i) => (
        <Line key={i} idx={i} line={line} />
      ))}
    </div>
  );
}
