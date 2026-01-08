"use client";

import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import ProjectCard from "@/components/project-card";
import ResumeCard from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Notebook, Home } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8 sm:space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8 px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="gap-4 flex justify-between items-start">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter"
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <p className="max-w-[600px] text-sm sm:text-base md:text-xl text-muted-foreground">
                  {DATA.description}
                </p>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative flex shrink-0 overflow-hidden rounded-full size-20 sm:size-28 border-2 border-border bg-gradient-to-br from-indigo-500 to-purple-600 glow-hover transition-all duration-300">
                <span className="flex h-full w-full items-center justify-center text-xl sm:text-3xl font-bold text-white">
                  {DATA.initials}
                </span>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      
      <section id="about">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-lg sm:text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="max-w-full text-pretty font-sans text-xs sm:text-sm text-muted-foreground mt-2">
              {DATA.summary}
            </p>
          </BlurFade>
        </div>
      </section>
      
      <section id="work">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs sm:text-sm font-medium">
                Experience
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>
          </BlurFade>
          <div className="relative">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <section id="skills">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <div className="flex min-h-0 flex-col gap-y-2 sm:gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-lg sm:text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
                  <Badge>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section id="projects">
        <div className="space-y-8 sm:space-y-12 w-full py-8 sm:py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center px-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs sm:text-sm">
                  My Projects
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-xl max-w-[600px] mx-auto">
                  I&apos;ve worked on a variety of projects, from AI-powered apps to real-time collaboration tools.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto px-4 sm:px-6">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
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
      </section>
      
      <section id="contact">
        <div className="grid items-center justify-center gap-3 sm:gap-4 px-4 text-center w-full py-8 sm:py-12 pb-24">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-xs sm:text-sm">
                Contact
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl">
                Want to chat? Shoot me a dm on{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </Link>{" "}
                and I&apos;ll respond when I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      
      {/* Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 sm:mb-6 flex h-full max-h-14 sm:max-h-16 items-end justify-center px-4">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
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
