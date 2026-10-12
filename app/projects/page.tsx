import type { Metadata } from "next";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getLinkedArticles, getProjects } from "@/lib/cms";
import { pageContent, pageMetadata } from "@/lib/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/projects");
}

export default async function ProjectsPage() {
  const [intro, projects, articles] = await Promise.all([
    pageContent("/projects"),
    getProjects(),
    getLinkedArticles("project"),
  ]);

  return (
    <>
      <ProjectsIndex intro={intro} projects={projects} articles={articles} />
      <NewsletterCta />
    </>
  );
}
