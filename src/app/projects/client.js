"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { GradientText } from "@/components/magicui/animated-gradient";
import { ArrowLeft, Home, Notebook, LayoutGrid } from "lucide-react";
import ProjectCard from "@/components/project-card";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPageClient() {
  const projects = DATA.projects;
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 pb-24">
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
          <div className="space-y-2 sm:space-y-3 text-center py-4">
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Portfolio</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              My <GradientText>Projects</GradientText>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
              A showcase of my latest work, from AI-powered apps to real-time collaboration tools.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project, idx) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 3 + idx * 0.05}>
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                links={project.links}
              />
            </BlurFade>
          ))}
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
