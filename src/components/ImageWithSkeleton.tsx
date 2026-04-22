"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ImageWithSkeletonProps = Omit<ImageProps, "onLoadingComplete"> & {
  containerClassName?: string;
  skeletonClassName?: string;
};

export default function ImageWithSkeleton({
  alt,
  containerClassName,
  skeletonClassName,
  className,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden${containerClassName ? ` ${containerClassName}` : ""}`}
    >
      {!isLoaded && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-10 animate-pulse rounded-none bg-muted${
            skeletonClassName ? ` ${skeletonClassName}` : ""
          }`}
        />
      )}
      <Image
        alt={alt}
        {...props}
        className={`relative z-0${className ? ` ${className}` : ""}`}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
    </div>
  );
}
