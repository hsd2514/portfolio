"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Home, Notebook, LayoutGrid, List } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPageClient({ posts }) {
  const [viewMode, setViewMode] = useState("card");

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 pb-24">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">Blog</h1>
              <p className="text-muted-foreground text-sm">
                My thoughts on software development, AI, and more.
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary border border-border self-start">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "card" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Card View"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="List View"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Posts */}
        <div className={viewMode === "card" ? "grid gap-4" : "space-y-3"}>
          {posts.length === 0 ? (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="py-12 text-center text-muted-foreground">
                <p>No posts yet. Check back soon!</p>
              </div>
            </BlurFade>
          ) : (
            posts.map((post, idx) => (
              <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
                {viewMode === "card" ? (
                  // Card View
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className="overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 bg-card">
                      {post.image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <div className="flex flex-col gap-1 mb-2">
                          <h2 className="font-semibold text-sm sm:text-base group-hover:text-blue-500 transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <time className="text-xs text-muted-foreground tabular-nums">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ) : (
                  // List View
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className="flex gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 bg-card">
                      {post.image && (
                        <div className="flex-shrink-0 w-20 h-16 sm:w-32 sm:h-24 overflow-hidden rounded-md">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-0.5 mb-1">
                          <h2 className="font-semibold text-sm sm:text-base group-hover:text-blue-500 transition-colors line-clamp-1">
                            {post.title}
                          </h2>
                          <time className="text-xs text-muted-foreground tabular-nums">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                )}
              </BlurFade>
            ))
          )}
        </div>
      </div>

      {/* Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 sm:mb-6 flex h-full max-h-14 sm:max-h-16 items-end justify-center px-4">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
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
