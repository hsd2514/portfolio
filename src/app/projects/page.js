import { DATA } from "@/data/resume";
import ProjectsPageClient from "./client";

export const metadata = {
  title: "Projects | Harsh Dange",
  description: "A showcase of my latest work, from AI-powered apps to real-time collaboration tools.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
