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
        "flex flex-col overflow-hidden border border-border hover:border-muted-foreground/50 rounded-lg p-3 h-full bg-card transition-all duration-300 ease-out",
        className
      )}
    >
      <div className="flex flex-col px-2">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight text-base mt-1 text-card-foreground">
            {title}
          </h3>
          <time className="text-xs text-muted-foreground">{dates}</time>
          <p className="text-muted-foreground text-xs line-clamp-3 mt-2">
            {description}
          </p>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-auto pt-4 px-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} className="text-[10px] px-1 py-0" variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
