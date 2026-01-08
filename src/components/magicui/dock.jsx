"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Dock = ({ children, className }) => {
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{ 
        backgroundColor: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(24, 24, 27, 0.9)" 
      }}
      className={cn(
        "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-xl border rounded-full shadow-2xl transition-colors duration-300",
        isLight ? "border-gray-200" : "border-zinc-700",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const DockIcon = ({ children, className, href, label }) => {
  const pathname = usePathname();
  const isActive = href === pathname || (href === "/" && pathname === "/") || (href === "/blog" && pathname?.startsWith("/blog"));
  const Wrapper = href ? Link : "div";
  const [showTooltip, setShowTooltip] = useState(false);
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
    <Wrapper
      href={href || ""}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110 p-2 sm:p-3 size-10 sm:size-12",
        isLight ? "hover:bg-gray-100" : "hover:bg-zinc-700",
        isActive && !href?.startsWith("http") && (isLight ? "bg-gray-100" : "bg-zinc-700"),
        className
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      
      {/* Active indicator dot */}
      {isActive && !href?.startsWith("http") && (
        <span className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blue-500" />
      )}
      
      {/* Tooltip - hidden on mobile */}
      <AnimatePresence>
        {showTooltip && label && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap shadow-lg border hidden sm:block",
              isLight ? "text-gray-800 bg-white border-gray-200" : "text-white bg-zinc-800 border-zinc-700"
            )}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const DockSeparator = () => {
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
    <div className={cn("w-px h-6 sm:h-8 mx-0.5 sm:mx-1", isLight ? "bg-gray-200" : "bg-zinc-600")} />
  );
};

export { Dock, DockIcon, DockSeparator };
