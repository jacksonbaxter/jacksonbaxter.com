import Projects from "@/components/Projects";

export default async function ProjectPage() {
  return (
    <article className="mt-12 flex flex-col gap-10 pb-20">
      <h1 className="title">My Projects.</h1>

      <Projects />
    </article>
  );
}
