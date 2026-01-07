"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const Dock = ({ children, className }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "flex items-center gap-2 px-4 py-3 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const DockIcon = ({ children, className, href, label }) => {
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      href={href || ""}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "relative flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:scale-110 p-3 size-12",
        className
      )}
      title={label}
    >
      {children}
    </Wrapper>
  );
};

const DockSeparator = () => (
  <div className="w-px h-8 bg-border mx-1" />
);

export { Dock, DockIcon, DockSeparator };
