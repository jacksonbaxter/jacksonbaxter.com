"use client";

import Image from "next/image";

interface HeroPhotoProps {
  className?: string;
}

export default function HeroPhoto({ className }: HeroPhotoProps) {
  return (
    <div
      className={`relative h-[233px] w-[175px] shrink-0${className ? ` ${className}` : ""}`}
    >
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border bg-card/60 shadow-sm" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border bg-card/80 shadow-sm" />
      <div className="relative h-full w-full overflow-hidden rounded-xl border bg-card shadow-lg">
        <Image
          src="/jackson-professional.jpg"
          alt="Photo of Jackson"
          fill
          sizes="175px"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
