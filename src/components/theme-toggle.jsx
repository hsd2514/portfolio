"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = !document.documentElement.classList.contains("light");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("light", !newIsDark);
  };

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110 p-2 sm:p-3 size-10 sm:size-12",
        isLight ? "hover:bg-gray-100" : "hover:bg-zinc-700",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="size-4 sm:size-5 text-yellow-400" />
      ) : (
        <Moon className="size-4 sm:size-5 text-blue-500" />
      )}
    </button>
  );
}
