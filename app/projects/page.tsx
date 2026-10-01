import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getProjects } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/projects");
}

export default async function ProjectsPage() {
  const [intro, projects] = await Promise.all([pageContent("/projects"), getProjects()]);

  return (
    <>
      <ProjectsIndex intro={intro} projects={projects} />
      <NewsletterCta />
    </>
  );
}
