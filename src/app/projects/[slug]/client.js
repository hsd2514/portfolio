"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectPageClient({ project }) {
  const [activeId, setActiveId] = useState("");
  const [toc, setToc] = useState([]);
  
  // Create TOC from markdown content
  useEffect(() => {
    if (!project?.content) return;
    
    // Simple regex to extract headings from markdown
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items = [];
    let match;
    
    while ((match = headingRegex.exec(project.content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
        
      items.push({ id, text, level });
    }
    
    setToc(items);
  }, [project]);

  // Handle scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [toc]);

  const generateSlug = (string) => {
    return string
      ?.toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className="relative min-h-screen py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 sm:gap-12 relative">
        <div className="min-w-0">
          {/* Header */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              ← Back to Projects
            </Link>
            
            <div className="flex flex-col space-y-4 mb-12">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground/80 bg-secondary px-3 py-1 rounded-full">
                  {project.tags?.[0] || "Project"}
                </span>
                <time className="text-sm text-muted-foreground/60">
                  {formatDate(project.date)}
                </time>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                {project.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Project Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                {DATA.projects.find((p) => p.title === project.title)?.links?.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm"
                  >
                    {link.icon && <link.icon className="size-4" />}
                    {link.type}
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Banner Image */}
          {project.image && (
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="relative mb-16 rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </BlurFade>
          )}

          {/* Content */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="prose prose-zinc dark:prose-invert max-w-none w-full break-words prose-headings:break-words prose-p:break-words prose-a:break-words prose-pre:max-w-[85vw] sm:prose-pre:max-w-none mx-auto">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 id={generateSlug(children)} className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-16 mb-4 sm:mb-8 text-foreground scroll-mt-24 border-b border-border/50 pb-3 sm:pb-4 tracking-tight">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 id={generateSlug(children)} className="text-xl sm:text-2xl font-bold mt-8 sm:mt-12 mb-3 sm:mb-6 text-foreground/90 scroll-mt-24 tracking-tight">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 id={generateSlug(children)} className="text-lg sm:text-xl font-semibold mt-6 sm:mt-10 mb-2 sm:mb-4 text-foreground/80 scroll-mt-24 tracking-tight">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 sm:mb-6 text-muted-foreground/90 leading-relaxed text-base sm:text-lg selection:bg-primary/20">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 sm:pl-7 mb-6 sm:mb-8 text-muted-foreground/90 space-y-3 text-base sm:text-lg">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 sm:pl-7 mb-6 sm:mb-8 text-muted-foreground/90 space-y-3 text-base sm:text-lg">{children}</ol>
                  ),
                  li: ({ children }) => <li className="pl-2">{children}</li>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target={href.startsWith("#") ? undefined : "_blank"}
                      rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
                      className="relative inline-block font-semibold text-foreground transition-colors hover:text-indigo-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-100 after:bg-indigo-500/30 after:transition-all after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:bg-indigo-500 break-words"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    
                    if (isInline) {
                      return (
                        <code className="bg-primary/10 border border-primary/10 px-1.5 py-0.5 rounded-md text-[13px] sm:text-sm font-mono text-primary/90 font-bold break-words px-1">
                          {children}
                        </code>
                      );
                    }
                    
                    return (
                      <div className="relative group my-8 w-full max-w-full">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <pre className="relative bg-secondary/40 border border-border/50 p-4 sm:p-7 rounded-2xl overflow-x-auto text-[13px] sm:text-base font-mono shadow-2xl backdrop-blur-sm w-full">
                          <div className="flex items-center gap-1.5 mb-4 border-b border-border/30 pb-3">
                            <div className="size-2.5 rounded-full bg-red-500/30" />
                            <div className="size-2.5 rounded-full bg-amber-500/30" />
                            <div className="size-2.5 rounded-full bg-emerald-500/30" />
                            <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-foreground/30">
                              {match[1]}
                            </span>
                          </div>
                          <code className={className}>{children}</code>
                        </pre>
                      </div>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/30 pl-4 sm:pl-8 my-6 sm:my-14 text-muted-foreground/90 italic bg-primary/5 py-4 sm:py-6 rounded-r-2xl text-base sm:text-xl shadow-sm border-y border-r border-border/10 break-words">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-14 sm:my-20 border-border/40" />,
                  strong: ({ children }) => (
                    <strong className="font-extrabold text-foreground">{children}</strong>
                  ),
                  img: ({ src, alt }) => {
                    const isVideo = src?.endsWith(".mp4");
                    return (
                      <span className="block rounded-3xl my-6 sm:my-14 overflow-hidden border border-border shadow-2xl bg-white p-1 sm:p-3 group hover:border-primary/40 transition-all duration-500 hover:shadow-primary/5 max-w-full">
                        {isVideo ? (
                          <video 
                            src={src} 
                            controls 
                            className="w-full h-full rounded-2xl"
                          />
                        ) : (
                          <img 
                            src={src} 
                            alt={alt || ""} 
                            className="w-full h-auto rounded-2xl block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        )}
                        <span className="block text-center text-sm text-muted-foreground mt-2 italic">{alt}</span>
                      </span>
                    );
                  },
                }}
              >
                {project.content}
              </ReactMarkdown>
            </div>
          </BlurFade>
        </div>

        {/* Sidebar TOC */}
        <div className="hidden lg:block relative">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="sticky top-24 border-l border-border/50 pl-4">
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">On This Page</h4>
              <nav className="flex flex-col space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm transition-colors hover:text-foreground line-clamp-1 block
                      ${activeId === item.id 
                        ? "text-indigo-500 font-medium" 
                        : "text-muted-foreground"
                      }
                      ${item.level === 3 ? "pl-4" : ""}
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth"
                      });
                    }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
