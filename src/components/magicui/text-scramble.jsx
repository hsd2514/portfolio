"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({ 
  text, 
  className, 
  delay = 0,
  duration = 1000,
}) {
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length;
      const intervalTime = duration / (maxIterations * 3);

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, intervalTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, duration]);

  return (
    <span className={cn(className)}>
      {displayText}
    </span>
  );
}
