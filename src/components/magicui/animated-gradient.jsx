"use client";

import { cn } from "@/lib/utils";

export function AnimatedGradient({ className, children }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100px] opacity-50">
          {/* Primary orb */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
          {/* Secondary orb */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          {/* Tertiary orb */}
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function GradientText({ children, className }) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}
