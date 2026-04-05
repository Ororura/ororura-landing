"use client";

import { startTransition, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

const useArchiveTransition = () => {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const beginTransition = (href: string, delay = 900) => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    timeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        router.push(href);
      });
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    beginTransition,
    isTransitioning
  };
};

export { useArchiveTransition };

