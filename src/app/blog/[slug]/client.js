"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Home, Notebook } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPostClient({ post }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const codeBg = isLight ? "bg-gray-100" : "bg-zinc-800";
  const codeBorder = isLight ? "border-gray-200" : "border-zinc-700";
  const codeText = isLight ? "text-gray-800" : "text-zinc-200";
  const tagBg = isLight ? "bg-gray-200 text-gray-700" : "bg-zinc-800 text-zinc-300";
  const borderColor = isLight ? "border-gray-200" : "border-zinc-700";
  const imageBorder = isLight ? "border-gray-200" : "border-zinc-700";

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <article className="mx-auto w-full max-w-2xl px-6 py-12 pb-24">
        {/* Back link */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </BlurFade>

        {/* Cover Image */}
        {post.image && (
          <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
            <div className={`aspect-video overflow-hidden rounded-lg border ${imageBorder} mb-8`}>
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
          <header className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.readTime && <span>{post.readTime}</span>}
            </div>

            {post.description && (
              <p className="text-lg text-muted-foreground">{post.description}</p>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full ${tagBg}`}>
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
                  <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-1">{children}</ol>
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
                  <code className={`${codeBg} px-1.5 py-0.5 rounded text-sm font-mono ${codeText}`}>
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className={`${codeBg} border ${codeBorder} p-4 rounded-lg overflow-x-auto my-4 text-sm`}>
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={`border-l-4 border-blue-500 pl-4 my-4 text-muted-foreground italic ${codeBg}/50 py-2 rounded-r`}>
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className={`my-8 ${borderColor}`} />,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                img: ({ src, alt }) => (
                  <img 
                    src={src} 
                    alt={alt || ""} 
                    className={`rounded-lg my-6 w-full max-w-full border ${imageBorder}`}
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
          <footer className={`mt-12 pt-8 border-t ${borderColor}`}>
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
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-6 flex h-full max-h-16 items-end justify-center">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <Dock className="pointer-events-auto">
            <DockIcon href="/" label="Home">
              <Home className="size-5" />
            </DockIcon>
            {Object.entries(DATA.contact.social).map(([name, social]) => (
              <DockIcon key={name} href={social.url} label={name}>
                <social.icon className="size-5" />
              </DockIcon>
            ))}
            <DockSeparator />
            <DockIcon href="/blog" label="Blog">
              <Notebook className="size-5" />
            </DockIcon>
            <ThemeToggle />
          </Dock>
        </BlurFade>
      </div>
    </main>
  );
}
