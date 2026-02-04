"use client";

import { cn } from "@/lib/utils";
import { TiltCard } from "./tilt-card";

export function BentoGrid({ children, className }) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        "auto-rows-[minmax(140px,auto)] sm:auto-rows-[minmax(160px,auto)] lg:auto-rows-[minmax(180px,auto)]",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  withTilt = true,
  withGlow = false,
  glowColor = "indigo",
}) {
  const glowColors = {
    indigo: "hover:shadow-indigo-500/20",
    purple: "hover:shadow-purple-500/20",
    blue: "hover:shadow-blue-500/20",
    green: "hover:shadow-green-500/20",
    pink: "hover:shadow-pink-500/20",
  };

  const cardContent = (
    <div
      className={cn(
        "relative h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden",
        "bg-card/50 backdrop-blur-sm",
        "border border-border/50 hover:border-border",
        "transition-all duration-500",
        withGlow && `hover:shadow-2xl ${glowColors[glowColor]}`,
        className
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

  if (withTilt) {
    return <TiltCard className="h-full">{cardContent}</TiltCard>;
  }

  return cardContent;
}

// Preset sizes for common bento layouts
export const bentoSizes = {
  // Single cell
  small: "",
  // 2 columns wide
  wide: "sm:col-span-2",
  // 2 rows tall
  tall: "row-span-2",
  // 2x2
  large: "sm:col-span-2 row-span-2",
  // Full width
  full: "sm:col-span-2 lg:col-span-4",
};
