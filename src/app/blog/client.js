"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { GradientText } from "@/components/magicui/animated-gradient";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Home, Notebook, LayoutGrid, List, ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPageClient({ posts }) {
  const [viewMode, setViewMode] = useState("card");

  return (
    <main className="flex flex-col min-h-dvh">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 pb-24">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-500 transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 py-4">
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Writing</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                My <GradientText>Blog</GradientText>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Thoughts on software development, AI, and more.
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/50 self-center sm:self-auto">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "card" 
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
                title="Card View"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
                title="List View"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Posts */}
        <div className={viewMode === "card" ? "grid gap-4 sm:gap-5" : "space-y-3"}>
          {posts.length === 0 ? (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="py-16 text-center text-muted-foreground rounded-2xl border border-dashed border-border/50 bg-card/30 backdrop-blur-sm">
                <Notebook className="size-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="font-medium">No posts yet</p>
                <p className="text-sm">Check back soon!</p>
              </div>
            </BlurFade>
          ) : (
            posts.map((post, idx) => (
              <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
                {viewMode === "card" ? (
                  // Card View
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className="overflow-hidden rounded-2xl border border-border/50 hover:border-indigo-500/30 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-500/10">
                        {post.image && (
                          <div className="aspect-video overflow-hidden bg-secondary/30 flex items-center justify-center border-b border-border/30">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-col gap-1.5 mb-3">
                            <div className="flex items-start justify-between gap-2">
                              <h2 className="font-bold text-base sm:text-lg group-hover:text-indigo-500 transition-colors line-clamp-2">
                                {post.title}
                              </h2>
                              <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                            </div>
                            <time className="text-xs text-muted-foreground tabular-nums font-medium">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground font-medium hover:bg-indigo-500/20 hover:text-indigo-500 transition-colors"
                                >
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
                    <article className="flex gap-4 p-3 sm:p-4 rounded-xl border border-border/50 hover:border-indigo-500/30 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10">
                      {post.image && (
                        <div className="flex-shrink-0 w-24 h-20 sm:w-36 sm:h-28 overflow-hidden rounded-lg bg-secondary/30 flex items-center justify-center border border-border/30">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h2 className="font-bold text-sm sm:text-base group-hover:text-indigo-500 transition-colors line-clamp-1">
                              {post.title}
                            </h2>
                            <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                          </div>
                          <time className="text-[10px] sm:text-xs text-muted-foreground tabular-nums font-medium">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 hidden sm:block">
                            {post.description}
                          </p>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-muted-foreground"
                              >
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
          <Dock className="pointer-events-auto glass">
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
