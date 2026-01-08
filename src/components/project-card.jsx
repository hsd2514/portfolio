"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProjectCard = ({
  title,
  href,
  description,
  dates,
  tags,
  links,
  className,
}) => {
  return (
    <Link
      href={href || "#"}
      className={cn(
        "flex flex-col overflow-hidden border border-border hover:border-muted-foreground/50 rounded-lg p-2 sm:p-3 h-full bg-card transition-all duration-300 ease-out",
        className
      )}
    >
      <div className="flex flex-col px-1 sm:px-2">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight text-sm sm:text-base mt-1 text-card-foreground line-clamp-1">
            {title}
          </h3>
          <time className="text-[10px] sm:text-xs text-muted-foreground">{dates}</time>
          <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-2 sm:line-clamp-3 mt-1 sm:mt-2">
            {description}
          </p>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-auto pt-2 sm:pt-4 px-1 sm:px-2 flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} className="text-[8px] sm:text-[10px] px-1 py-0" variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
