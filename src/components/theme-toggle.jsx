"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    document.documentElement.classList.toggle("light", !newIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:scale-110 p-3 size-12",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="size-5 text-yellow-400" />
      ) : (
        <Moon className="size-5 text-blue-400" />
      )}
    </button>
  );
}
