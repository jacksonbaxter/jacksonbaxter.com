import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import PostsSkeleton from "@/components/PostsSkeleton";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import SwipeCards from "@/components/SwipeCards";
import { Button } from "@/components/ui/Button";
import { getPosts } from "@/lib/posts";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRightIcon,
  FileDown,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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

async function RecentPosts() {
  const posts = (await getPosts())
    .filter((post) => !post.draft)
    .slice(0, LIMIT);
  return <Posts posts={posts} />;
}

export default function Home() {
  const currentAge = calculateAge(BIRTHDATE);

  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <SwipeCards className="md:mr-8" />

        <div className="flex max-w-[320px] flex-col sm:max-w-full">
          <h1 className="title text-balance text-4xl sm:text-5xl">
            {homeContent.introduction.greeting}
          </h1>

          <p className="mt-2 whitespace-nowrap text-sm font-medium sm:text-base">
            {currentAge}yo software engineer from Utah 🇺🇸
          </p>

          <p className="mt-4 max-w-sm text-balance text-sm sm:text-base">
            {homeContent.introduction.description}
          </p>

          <div className="mt-6 flex items-center gap-1">
            <p className="text-balance text-sm font-semibold sm:text-base">
              {homeContent.introduction.chatPrompt}
            </p>
            <ArrowDownRight className="hidden size-5 animate-bounce sm:block" />
            <ArrowDown className="block size-5 animate-bounce sm:hidden" />
          </div>

          <p className="mt-1 text-xs font-light">
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

      <Experience />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">Featured Projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="View More"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">Recent Posts</h2>
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="View More"
          />
        </div>
        <Suspense fallback={<PostsSkeleton rows={LIMIT} />}>
          <RecentPosts />
        </Suspense>
      </section>
    </article>
  );
}
