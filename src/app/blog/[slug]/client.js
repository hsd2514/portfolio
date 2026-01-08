"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Home, Notebook } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPostClient({ post }) {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <article className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 pb-24">
        {/* Back link */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </BlurFade>

        {/* Cover Image */}
        {post.image && (
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <div className="aspect-video overflow-hidden rounded-lg border border-border mb-6 sm:mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </BlurFade>
        )}

        {/* Header */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <header className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-3 sm:size-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.readTime && <span>{post.readTime}</span>}
            </div>

            {post.description && (
              <p className="text-base sm:text-lg text-muted-foreground">{post.description}</p>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 sm:px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </BlurFade>

        {/* Content */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 sm:mb-4 text-muted-foreground leading-relaxed text-sm sm:text-base">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 text-muted-foreground space-y-1 text-sm sm:text-base">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 text-muted-foreground space-y-1 text-sm sm:text-base">{children}</ol>
                ),
                li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-secondary px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-foreground">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-secondary border border-border p-3 sm:p-4 rounded-lg overflow-x-auto my-3 sm:my-4 text-xs sm:text-sm">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-3 sm:pl-4 my-3 sm:my-4 text-muted-foreground italic bg-secondary/50 py-2 rounded-r text-sm sm:text-base">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-6 sm:my-8 border-border" />,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                img: ({ src, alt }) => (
                  <img 
                    src={src} 
                    alt={alt || ""} 
                    className="rounded-lg my-4 sm:my-6 w-full max-w-full border border-border"
                    loading="lazy"
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </BlurFade>

        {/* Footer */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to all posts
            </Link>
          </footer>
        </BlurFade>
      </article>

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
