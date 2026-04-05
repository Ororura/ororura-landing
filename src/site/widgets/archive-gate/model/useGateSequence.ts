"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/shared/lib/use-prefers-reduced-motion";

const useGateSequence = (lineCount: number) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(lineCount);
      setIsRevealed(true);
      return;
    }

    const timeouts: number[] = [];

    timeouts.push(
      window.setTimeout(() => {
        setIsRevealed(true);
      }, 420)
    );

    Array.from({ length: lineCount }).forEach((_, index) => {
      timeouts.push(
        window.setTimeout(() => {
          setVisibleCount(index + 1);
        }, 220 + index * 240)
      );
    });

    return () => {
      timeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
    };
  }, [lineCount, prefersReducedMotion]);

  const completeSequence = () => {
    setVisibleCount(lineCount);
    setIsRevealed(true);
  };

  return {
    completeSequence,
    isRevealed,
    visibleCount
  };
};

export { useGateSequence };

