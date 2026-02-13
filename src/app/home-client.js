"use client";

import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { AnimatedGradient, GradientText } from "@/components/magicui/animated-gradient";
import { TextScramble } from "@/components/magicui/text-scramble";
import { MagneticButton } from "@/components/magicui/magnetic-button";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Notebook, 
  Home, 
  LayoutGrid, 
  MapPin, 
  Briefcase,
  ArrowUpRight,
  Mail,
  Zap
} from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function HomePageClient({ latestPost }) {
  const firstName = DATA.name.split(" ")[0]; // Just "Harsh"
  
  return (
    <main className="flex flex-col min-h-dvh">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-12 pb-24">
        {/* Bento Grid Layout */}
        <BentoGrid className="gap-3 sm:gap-4">
          
          {/* ===== ROW 1: HERO ===== */}
          
          {/* Main Hero Card - Name + About */}
          <BlurFade delay={BLUR_FADE_DELAY} className="col-span-1 sm:col-span-2 lg:col-span-4">
            <BentoCard className="h-full relative" withTilt={false} withGlow glowColor="indigo">
              <AnimatedGradient className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-20" />
              <div className="relative z-10 flex flex-col h-full">
                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-green-500 font-medium uppercase tracking-wider">Available for work</span>
                </div>
                
                {/* Name - First name only */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-2 sm:mb-3">
                  <TextScramble 
                    text={`Hey, I'm ${firstName}`}
                    duration={1200}
                    delay={200}
                  />
                  <span className="inline-block ml-2 animate-float">👋</span>
                </h1>
                
                {/* Title */}
                <p className="text-base sm:text-lg lg:text-xl text-indigo-500 font-semibold mb-4 sm:mb-6">
                  {DATA.description.split(".")[0]}
                </p>
                
                {/* About - Summary */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {DATA.summary}
                </p>
                
                {/* Location */}
                <div className="flex items-center gap-2 mt-4 sm:mt-6 pt-4 border-t border-border/30">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{DATA.location}</span>
                </div>
              </div>
            </BentoCard>
          </BlurFade>

          {/* ===== ROW 2: EXPERIENCE ===== */}

          {/* Experience Card */}
          <BlurFade delay={BLUR_FADE_DELAY * 3} className="col-span-1 sm:col-span-2 lg:col-span-4">
            <BentoCard className="h-full" withTilt={false} withGlow glowColor="green">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-green-500/10">
                  <Briefcase className="size-4 text-green-500" />
                </div>
                <h2 className="text-sm sm:text-base font-bold">Experience</h2>
              </div>
              <div className="space-y-4">
                {DATA.work.map((job, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-green-500/30 hover:border-green-500/60 transition-colors">
                    <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-green-500" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold">{job.company}</h3>
                        <p className="text-xs sm:text-sm text-indigo-500 font-medium">{job.title}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] sm:text-xs text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-full">
                          {job.start} - {job.end || "Present"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                    {job.badges && job.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {job.badges.map((badge) => (
                          <span key={badge} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </BentoCard>
          </BlurFade>

          {/* ===== ROW 2: SKILLS + LATEST BLOG ===== */}

          {/* Skills Card */}
          <BlurFade delay={BLUR_FADE_DELAY * 4} className="col-span-1 sm:col-span-2 lg:col-span-3">
            <BentoCard className="h-full" withTilt={false}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Zap className="size-4 text-indigo-500" />
                <h2 className="text-sm sm:text-base font-bold">Skills & Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {DATA.skills.map((skill, idx) => (
                  <BlurFade key={skill} delay={BLUR_FADE_DELAY * 5 + idx * 0.015}>
                    <Badge 
                      className="text-[10px] sm:text-xs cursor-default hover:bg-indigo-500/20 hover:text-indigo-500 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </BlurFade>
                ))}
              </div>
            </BentoCard>
          </BlurFade>

          {/* Latest Blog Card */}
          {latestPost && (
            <BlurFade delay={BLUR_FADE_DELAY * 5} className="col-span-1 lg:col-span-1">
              <Link href={`/blog/${latestPost.slug}`} className="block h-full group">
                <BentoCard className="h-full hover:border-indigo-500/50" withTilt={false} withGlow glowColor="indigo">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10">
                        <Notebook className="size-3.5 text-indigo-500" />
                      </div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-indigo-500 font-bold">Latest Post</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold group-hover:text-indigo-500 transition-colors line-clamp-2 flex-1">
                      {latestPost.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mt-2">
                      {latestPost.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-indigo-500 font-medium mt-3 group-hover:gap-2 transition-all">
                      <span>Read article</span>
                      <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </BentoCard>
              </Link>
            </BlurFade>
          )}

          {/* ===== ROW 3: PROJECTS ===== */}
          
          {/* Projects Section Header */}
          <BlurFade delay={BLUR_FADE_DELAY * 6} className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center justify-between py-4 sm:py-6">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Portfolio</span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  Featured <GradientText>Projects</GradientText>
                </h2>
              </div>
              <Link href="/projects" className="text-xs sm:text-sm text-indigo-500 hover:underline inline-flex items-center gap-1 group font-medium">
                View all <ArrowUpRight className="size-3 sm:size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </BlurFade>

          {/* Project Cards */}
          {DATA.projects
            .filter((p) => p.title !== "Legal AI Chat Bot")
            .slice(0, 4)
            .map((project, idx) => (
              <BlurFade 
                key={project.title} 
                delay={BLUR_FADE_DELAY * 7 + idx * 0.05}
                className="col-span-1"
              >
                <BentoCard 
                    className="h-full hover:border-indigo-500/30 group relative flex flex-col" 
                    withTilt={false}
                    withGlow 
                    glowColor={["indigo", "purple", "blue", "pink"][idx % 4]}
                  >
                    <div className="flex flex-col h-full w-full">
                      <Link href={project.href || "#"} className="flex flex-col flex-1">
                        {project.image && (
                          <div className="w-full h-20 sm:h-24 rounded-xl overflow-hidden bg-secondary/30 mb-3 -mt-1 flex items-center justify-center border border-border/30">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold group-hover:text-indigo-500 transition-colors line-clamp-1">
                              {project.title}
                            </h3>
                            <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </Link>

                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span 
                              key={tech} 
                              className="text-[9px] px-1.5 py-0.5 rounded-md bg-foreground/5 text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Links */}
                      {project.links && project.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-dashed border-border/40">
                          {project.links.map((link, i) => (
                            <Link 
                              key={i} 
                              href={link.href}
                              target="_blank"
                              className="flex items-center gap-1 text-[10px] sm:text-xs font-medium bg-secondary/50 hover:bg-indigo-500/10 hover:text-indigo-500 px-2 py-1 rounded-md transition-colors border border-border/30"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.icon && <link.icon className="size-3" />}
                              {link.type}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </BentoCard>
              </BlurFade>
            ))}

          {/* ===== ROW 4: CONTACT ===== */}

          {/* Contact CTA Card */}
          <BlurFade delay={BLUR_FADE_DELAY * 11} className="col-span-1 sm:col-span-2 lg:col-span-4">
            <BentoCard className="h-full flex flex-col justify-center text-center sm:text-left" withTilt={false}>
              <AnimatedGradient className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-15" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-1">
                    Let's work together
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Have a project in mind? I'd love to hear about it.
                  </p>
                </div>
                <MagneticButton className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow shrink-0">
                  <Mail className="size-4" />
                  <Link href={DATA.contact.social.LinkedIn.url}>
                    Get in Touch
                  </Link>
                </MagneticButton>
              </div>
            </BentoCard>
          </BlurFade>

        </BentoGrid>
      </div>

      {/* Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 sm:mb-6 flex h-full max-h-14 sm:max-h-16 items-end justify-center px-4">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
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
