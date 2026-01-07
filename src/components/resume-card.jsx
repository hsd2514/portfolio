"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={cn(
          "rounded-lg p-4 hover:bg-accent/50 transition-all duration-200 group",
          className
        )}
      >
        <div className="flex items-start gap-4">
          {/* Logo/Avatar */}
          <div className="flex-none">
            <span className="relative flex shrink-0 overflow-hidden rounded-full border border-border size-12 bg-muted">
              <span className="flex h-full w-full items-center justify-center font-semibold text-sm text-foreground">
                {altText?.slice(0, 2) || title?.slice(0, 2)}
              </span>
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 group">
            <div className="flex items-center justify-between gap-x-2">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-sm text-foreground">
                {title}
                {badges && badges.length > 0 && (
                  <span className="ml-1 inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-[10px]">
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRight
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs tabular-nums text-muted-foreground text-right whitespace-nowrap">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="font-sans text-xs text-muted-foreground">{subtitle}</div>
            )}
            {description && (
              <div
                className={cn(
                  "mt-2 text-xs text-muted-foreground",
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
  );
};

export default ResumeCard;
