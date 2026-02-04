"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({
  title,
  href,
  description,
  dates,
  tags,
  image,
  links,
  className,
}) => {
  return (
    <div className={cn("h-full", className)}>
      <div className="flex flex-col overflow-hidden border border-border/50 hover:border-indigo-500/30 rounded-2xl p-4 sm:p-5 h-full bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group">
        {/* Image */}
        {image && (
          <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden bg-secondary/30 mb-4 -mt-1 flex items-center justify-center border border-border/30">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        <Link href={href || "#"} className="flex flex-col flex-1 group/content">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold tracking-tight text-base sm:text-lg text-card-foreground group-hover/content:text-indigo-500 transition-colors line-clamp-1">
                {title}
              </h3>
              <ArrowUpRight className="size-5 text-muted-foreground group-hover/content:text-indigo-500 group-hover/content:translate-x-0.5 group-hover/content:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            <time className="text-[11px] sm:text-xs text-muted-foreground font-medium">{dates}</time>
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>
        </Link>
        
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((tag) => (
              <Badge 
                key={tag} 
                className="text-[10px] sm:text-xs px-2 py-0.5 font-medium bg-foreground/5 hover:bg-indigo-500/20 hover:text-indigo-500 transition-colors cursor-default" 
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-3 border-t border-border/30">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-indigo-500 transition-colors group/link"
              >
                {link.icon && <link.icon className="size-3.5 group-hover/link:scale-110 transition-transform" />}
                <span className="font-medium">{link.type}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
