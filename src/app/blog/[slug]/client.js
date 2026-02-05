"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Home, Notebook, ChevronRight, ChevronDown, LayoutGrid } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPostClient({ post }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const lines = post.content.split("\n");
  const headings = [];
  let currentParent = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    const match = trimmed.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateSlug(text);
      
      const heading = { level, text, id, children: [] };
      
      if (level === 2) {
        headings.push(heading);
        currentParent = heading;
      } else if (level === 3) {
        if (currentParent) {
          currentParent.children.push(heading);
        } else {
          headings.push(heading);
        }
      }
    }
  });

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-12 pb-24 flex flex-col lg:flex-row gap-10">
        <article className="flex-1 min-w-0 max-w-2xl mx-auto lg:mx-0">
          {/* Back link */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all hover:-translate-x-1 mb-6 sm:mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </BlurFade>

          {/* Cover Image */}
          {post.image && (
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <div className="overflow-hidden rounded-2xl border border-border shadow-2xl mb-8 sm:mb-10 bg-white/5 flex items-center justify-center max-h-[400px]">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
            </BlurFade>
          )}

          {/* Header */}
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <header className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-foreground">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-2">
                    <Notebook className="size-4" />
                    {post.readTime}
                  </span>
                )}
              </div>

              {post.description && (
                <p className="text-lg sm:text-xl text-muted-foreground/80 leading-relaxed font-medium">{post.description}</p>
              )}
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 transparent-blur rounded-full bg-primary/5 text-primary/80 border border-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </BlurFade>

          {/* Table of Contents - Mobile Only */}
          {headings.length > 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 2.5} className="lg:hidden">
              <div className="mb-10 p-5 rounded-2xl border border-border bg-secondary/10 shadow-sm backdrop-blur-sm">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-foreground/40 flex items-center gap-2 px-1">
                  <Notebook className="size-3" />
                  Outline
                </h2>
                <ul className="space-y-3">
                  {headings.map((heading) => (
                    <li key={heading.id} className="space-y-2">
                      <div className="flex items-center gap-1">
                        {heading.children.length > 0 && (
                          <button 
                            onClick={() => toggleSection(heading.id)}
                            className="p-1 hover:bg-foreground/5 rounded transition-colors"
                          >
                            {expandedSections[heading.id] ? (
                              <ChevronDown className="size-3 text-foreground/40" />
                            ) : (
                              <ChevronRight className="size-3 text-foreground/40" />
                            )}
                          </button>
                        )}
                        <a 
                          href={`#${heading.id}`}
                          className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex-1"
                        >
                          {heading.text}
                        </a>
                      </div>
                      
                      {heading.children.length > 0 && expandedSections[heading.id] && (
                        <ul className="ml-6 space-y-2 border-l border-border pl-4">
                          {heading.children.map((child) => (
                            <li key={child.id}>
                              <a 
                                href={`#${child.id}`}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors block py-0.5"
                              >
                                {child.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          )}

          {/* Content */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="prose prose-zinc dark:prose-invert max-w-none w-full break-words prose-headings:break-words prose-p:break-words prose-a:break-words overflow-x-hidden">
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
                        <code className="bg-primary/10 border border-primary/10 px-1.5 py-0.5 rounded-md text-[12px] sm:text-sm font-mono text-primary/90 font-bold break-all">
                          {children}
                        </code>
                      );
                    }
                    
                    return (
                      <div className="relative group my-6 sm:my-8 w-full overflow-hidden">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <pre className="relative bg-secondary/40 border border-border/50 p-3 sm:p-7 rounded-xl sm:rounded-2xl overflow-x-auto text-[11px] sm:text-base font-mono shadow-2xl backdrop-blur-sm w-full">
                          <div className="flex items-center gap-1.5 mb-3 sm:mb-4 border-b border-border/30 pb-2 sm:pb-3">
                            <div className="size-2 sm:size-2.5 rounded-full bg-red-500/30" />
                            <div className="size-2 sm:size-2.5 rounded-full bg-amber-500/30" />
                            <div className="size-2 sm:size-2.5 rounded-full bg-emerald-500/30" />
                            <span className="ml-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-foreground/30">
                              {match[1]}
                            </span>
                          </div>
                          <code className={`${className} block overflow-x-auto`}>{children}</code>
                        </pre>
                      </div>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/30 pl-3 sm:pl-8 pr-3 sm:pr-6 my-4 sm:my-14 text-muted-foreground/90 italic bg-primary/5 py-3 sm:py-6 rounded-r-xl sm:rounded-r-2xl text-sm sm:text-xl shadow-sm border-y border-r border-border/10 break-words overflow-hidden">
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
                      <span className="block rounded-xl sm:rounded-3xl my-4 sm:my-14 overflow-hidden border border-border shadow-2xl bg-white p-1 sm:p-3 group hover:border-primary/40 transition-all duration-500 hover:shadow-primary/5 w-full max-w-full">
                        {isVideo ? (
                          <video 
                            src={src} 
                            controls 
                            playsInline
                            className="w-full h-auto max-w-full rounded-lg sm:rounded-2xl"
                          />
                        ) : (
                          <img 
                            src={src} 
                            alt={alt || ""} 
                            className="w-full h-auto max-w-full rounded-lg sm:rounded-2xl block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        )}
                      </span>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </BlurFade>

          {/* Footer */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <footer className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-border/50">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-primary transition-all hover:-translate-x-2 group"
              >
                <ArrowLeft className="size-5 transition-transform group-hover:scale-125" />
                Back to all posts
              </Link>
            </footer>
          </BlurFade>
        </article>

        {/* Sidebar Outline - Desktop Only */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-hide">
              <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
                <div className="space-y-8">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2 px-1">
                    <Notebook className="size-3" />
                    Outline
                  </h2>
                  <nav>
                    <ul className="space-y-1 ml-1">
                      {headings.map((heading) => (
                        <li key={heading.id} className="space-y-1">
                          <div className="flex items-center gap-2 group/item">
                            {heading.children.length > 0 ? (
                              <button 
                                onClick={() => toggleSection(heading.id)}
                                className="p-1 hover:bg-foreground/5 rounded transition-colors"
                              >
                                {expandedSections[heading.id] ? (
                                  <ChevronDown className="size-3 text-foreground/30 transition-transform group-hover/item:text-primary/50" />
                                ) : (
                                  <ChevronRight className="size-3 text-foreground/30 transition-transform group-hover/item:text-primary/50" />
                                )}
                              </button>
                            ) : (
                              <div className="size-5" />
                            )}
                            <a 
                              href={`#${heading.id}`}
                              className="flex-1 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-all py-1.5 truncate"
                            >
                              {heading.text}
                            </a>
                          </div>
                          
                          {heading.children.length > 0 && expandedSections[heading.id] && (
                            <ul className="ml-6 space-y-1 border-l border-border/50 pl-4">
                              {heading.children.map((child) => (
                                <li key={child.id}>
                                  <a 
                                    href={`#${child.id}`}
                                    className="group flex items-center gap-3 text-[12px] text-muted-foreground/60 hover:text-primary transition-all py-1"
                                  >
                                    <div className="h-px w-2 bg-border/50 group-hover:w-3 group-hover:bg-primary transition-all" />
                                    <span className="truncate">{child.text}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </BlurFade>
            </div>
          </aside>
        )}
      </div>

      {/* Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 sm:mb-6 flex h-full max-h-14 sm:max-h-16 items-end justify-center px-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <Dock className="pointer-events-auto">
            <DockIcon href="/" label="Home">
              <Home className="size-4 sm:size-5" />
            </DockIcon>
            {Object.entries(DATA.contact.social).map(([name, social]) => (
              <DockIcon key={name} href={social.url} label={name}>
                <social.icon className="size-4 sm:size-5" />
              </DockIcon>
            ))}
            <DockSeparator />
            <DockIcon href="/projects" label="Projects">
              <LayoutGrid className="size-4 sm:size-5" />
            </DockIcon>
            <DockIcon href="/blog" label="Blog">
              <Notebook className="size-4 sm:size-5" />
            </DockIcon>
            <ThemeToggle />
          </Dock>
        </BlurFade>
      </div>
    </main>
  );
}
