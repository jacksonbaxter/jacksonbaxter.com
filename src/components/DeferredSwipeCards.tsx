"use client";

import { useEffect, useState } from "react";
import HeroPhoto from "./HeroPhoto";

interface SwipeCardsProps {
  className?: string;
}

export default function DeferredSwipeCards({ className }: SwipeCardsProps) {
  const [SwipeCards, setSwipeCards] =
    useState<React.ComponentType<SwipeCardsProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSwipeCards = async () => {
      const swipeCardsModule = await import("./SwipeCards");

      if (!cancelled) {
        setSwipeCards(() => swipeCardsModule.default);
      }
    };

    const idleCallback =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadSwipeCards, { timeout: 1500 })
        : null;

    const timeoutId =
      idleCallback === null ? window.setTimeout(loadSwipeCards, 800) : null;

    return () => {
      cancelled = true;

      if (idleCallback !== null) {
        window.cancelIdleCallback(idleCallback);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (SwipeCards) {
    return <SwipeCards className={className} />;
  }

  return <HeroPhoto className={className} />;
}
