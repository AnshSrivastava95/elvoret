"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = (scrollTop / documentHeight) * 100;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-16 z-40 h-1 w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-purple-700 transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}