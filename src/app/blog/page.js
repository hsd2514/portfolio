"use client";

import { getAllPosts } from "@/lib/blog";
import { DATA } from "@/data/resume";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Home, Notebook } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="mx-auto w-full max-w-2xl px-6 py-12 space-y-8">
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
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Blog</h1>
            <p className="text-muted-foreground text-sm">
              My thoughts on software development, AI, and more.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="py-12 text-center text-muted-foreground">
                <p>No posts yet. Check back soon!</p>
              </div>
            </BlurFade>
          ) : (
            posts.map((post, idx) => (
              <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="py-4 border-b border-border hover:bg-accent/30 transition-colors rounded-lg px-4 -mx-4">
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
                  </article>
                </Link>
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
