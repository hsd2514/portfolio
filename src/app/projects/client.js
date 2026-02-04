"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Home, Notebook, LayoutGrid } from "lucide-react";
import ProjectCard from "@/components/project-card";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPageClient() {
  const projects = DATA.projects;
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 pb-24">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter">Projects</h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto sm:mx-0">
              A showcase of my latest work, from AI-powered apps to real-time collaboration tools.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                links={project.links}
              />
            </BlurFade>
          ))}
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
