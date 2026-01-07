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
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 space-y-8 pb-24">
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
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Blog</h1>
              <p className="text-muted-foreground text-sm">
                My thoughts on software development, AI, and more.
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800 border border-zinc-700">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "card" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                }`}
                title="Card View"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
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
                    <article className="overflow-hidden rounded-lg border border-zinc-700 hover:border-zinc-500 transition-all duration-300 bg-zinc-900/50 hover:bg-zinc-800/50">
                      {post.image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h2 className="font-semibold group-hover:text-blue-500 transition-colors">
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
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ) : (
                  // List View - Image on left, content on right
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className="flex gap-4 p-3 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-all duration-300 bg-zinc-900/50 hover:bg-zinc-800/50">
                      {post.image && (
                        <div className="flex-shrink-0 w-32 h-24 sm:w-40 sm:h-28 overflow-hidden rounded-md">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                          <h2 className="font-semibold group-hover:text-blue-500 transition-colors truncate">
                            {post.title}
                          </h2>
                          <time className="text-xs text-muted-foreground tabular-nums flex-shrink-0">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
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
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-6 flex h-full max-h-16 items-end justify-center">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
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
