import data from "@/data/projects.json";
import { projectSchema } from "@/lib/schemas";

interface Props {
  limit?: number;
}

export default async function Projects({ limit }: Props) {
  let projects = projectSchema.parse(data).projects;
  if (limit) {
    projects = projects.slice(0, limit);
  }

  if (projects.length === 0) {
    return <section className="grid grid-cols-1 gap-6 sm:grid-cols-2"></section>;
  }

  const { default: ProjectsGrid } = await import("./ProjectsGrid");

  return <ProjectsGrid projects={projects} />;
}
