import DeferredSwipeCards from "@/components/DeferredSwipeCards";
import Experience from "@/components/Experience";
import FadeIn from "@/components/FadeIn";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, FileDown } from "lucide-react";
import Link from "next/link";

import homeContent from "@/data/home.json";

const BIRTHDATE = new Date(1999, 9, 20); // Oct 20, 1999 (month is 0-indexed)
const LIMIT = 2; // max show 2

function calculateAge(birthdate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
}

export default function Home() {
  const currentAge = calculateAge(BIRTHDATE);

  return (
    <article className="mt-12 flex flex-col gap-20 pb-20">
      <FadeIn delay={0}>
        <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
          <DeferredSwipeCards className="md:mr-8" />

          <div className="flex max-w-[320px] flex-col sm:max-w-full">
            <h1 className="title text-balance text-4xl font-bold sm:text-5xl">
              {homeContent.introduction.greeting}
            </h1>

            <p className="mt-3 whitespace-nowrap text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
              {currentAge}yo Software Engineer from Utah 🇺🇸
            </p>

            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed sm:text-base">
              {homeContent.introduction.description}
            </p>

            <p className="mt-6 text-xs font-light">
              {homeContent.introduction.escalation.text}&nbsp;
              <Link
                href={homeContent.escalationLink.href}
                target="_blank"
                className="link font-semibold underline"
                title={homeContent.escalationLink.title}
              >
                {homeContent.introduction.escalation.linkText}
              </Link>
              &nbsp;
              {homeContent.introduction.escalation.suffix}
            </p>

            <section className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/resume.pdf" target="_blank">
                <Button variant="outline">
                  <span className="font-semibold">Resume</span>
                  <FileDown className="ml-2 size-5" />
                </Button>
              </Link>
              <Socials />
            </section>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Experience />
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="title text-2xl font-bold sm:text-3xl">
              Featured Projects
            </h2>
            <LinkWithIcon
              href="/projects"
              position="right"
              icon={<ArrowRightIcon className="size-5" />}
              text="View More"
            />
          </div>
          <Projects limit={LIMIT} />
        </section>
      </FadeIn>
    </article>
  );
}
