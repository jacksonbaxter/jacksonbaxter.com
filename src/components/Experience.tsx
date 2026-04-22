import careerData from "@/data/career.json";
import educationData from "@/data/education.json";
import { careerSchema, educationSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Experience() {
  const career = careerSchema.parse(careerData).career;
  const education = educationSchema.parse(educationData).education;

  return (
    <section className="grid grid-cols-2 gap-2">
      <input
        defaultChecked
        id="experience-work"
        name="experience-tab"
        type="radio"
        className="peer/work sr-only"
      />
      <input
        id="experience-education"
        name="experience-tab"
        type="radio"
        className="peer/education sr-only"
      />

      <label
        htmlFor="experience-work"
        className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-muted px-3 py-1 text-sm font-medium text-muted-foreground ring-offset-background transition-all peer-checked/work:bg-background peer-checked/work:text-foreground peer-checked/work:shadow"
      >
        Work
      </label>
      <label
        htmlFor="experience-education"
        className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-muted px-3 py-1 text-sm font-medium text-muted-foreground ring-offset-background transition-all peer-checked/education:bg-background peer-checked/education:text-foreground peer-checked/education:shadow"
      >
        Education
      </label>

      <div className="col-span-2 block peer-checked/education:hidden">
        <Timeline experience={career} />
      </div>
      <div className="col-span-2 hidden peer-checked/education:block">
        <Timeline experience={education} />
      </div>
    </section>
  );
}
