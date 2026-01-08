"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border group-last:hidden" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary -translate-x-[3px] sm:-translate-x-[4px] ring-4 ring-background" />
      
      <Link
        href={href || "#"}
        className="block cursor-pointer"
        onClick={handleClick}
      >
        <div
          className={cn(
            "rounded-xl p-3 sm:p-4 border border-border bg-card hover:bg-accent/50 hover:border-muted-foreground/30 transition-all duration-200",
            className
          )}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Logo/Avatar */}
            <div className="flex-none">
              <span className="relative flex shrink-0 overflow-hidden rounded-lg border border-border size-10 sm:size-12 bg-secondary">
                <span className="flex h-full w-full items-center justify-center font-bold text-xs sm:text-sm text-foreground">
                  {altText?.slice(0, 2) || title?.slice(0, 2)}
                </span>
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="inline-flex items-center font-semibold leading-tight text-sm sm:text-base text-foreground">
                    {title}
                    <ChevronRight
                      className={cn(
                        "size-3 sm:size-4 ml-1 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                        isExpanded ? "rotate-90" : "rotate-0"
                      )}
                    />
                  </h3>
                  {subtitle && (
                    <div className="font-medium text-xs sm:text-sm text-muted-foreground mt-0.5">{subtitle}</div>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs font-medium tabular-nums text-muted-foreground bg-secondary px-2 py-1 rounded-md whitespace-nowrap self-start">
                  {period}
                </div>
              </div>
              
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
              
              {description && (
                <div
                  className={cn(
                    "mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed",
                    isExpanded ? "" : "line-clamp-2"
                  )}
                >
                  {description}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCard;
