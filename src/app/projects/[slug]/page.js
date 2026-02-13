import { getProjectBySlug, getAllProjectSlugs } from "@/lib/project";
import { DATA } from "@/data/resume";
import { notFound } from "next/navigation";
import ProjectPageClient from "./client";

export async function generateStaticParams() {
  const posts = getAllProjectSlugs();
  return posts.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return;
  }

  const { title, description, image } = project;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${DATA.url}/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
