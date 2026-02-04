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
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-border hover:border-muted-foreground/50 rounded-lg p-2 sm:p-3 h-full bg-card transition-all duration-300 ease-out",
        className
      )}
    >
      <Link href={href || "#"} className="flex flex-col px-1 sm:px-2 flex-1 group/content">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight text-sm sm:text-base mt-1 text-card-foreground group-hover/content:text-blue-500 transition-colors line-clamp-1">
            {title}
          </h3>
          <time className="text-[10px] sm:text-xs text-muted-foreground">{dates}</time>
          <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-2 sm:line-clamp-3 mt-1 sm:mt-2">
            {description}
          </p>
        </div>
      </Link>
      
      {tags && tags.length > 0 && (
        <div className="mt-2 sm:mt-4 px-1 sm:px-2 flex flex-wrap gap-1 mb-2 sm:mb-3">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} className="text-[8px] sm:text-[10px] px-1 py-0 font-medium" variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {links && links.length > 0 && (
        <div className="mt-auto pt-2 px-1 sm:px-2 flex flex-wrap gap-2 border-t border-border/50">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {link.icon && <link.icon className="size-3 sm:size-3.5" />}
              <span>{link.type}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
