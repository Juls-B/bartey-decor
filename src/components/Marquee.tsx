import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Pure CSS marquee — duplicates the children track for a seamless loop.
 * Uses the `marquee` keyframe defined in tailwind.config.ts.
 */
export const Marquee = ({ items, speed = "normal", className, pauseOnHover = true }: MarqueeProps) => {
  const duration =
    speed === "slow" ? "60s" : speed === "fast" ? "25s" : "40s";

  return (
    <div className={cn("marquee group", className)}>
      <div
        className={cn(
          "marquee-content gap-6 md:gap-8 pr-6 md:pr-8",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: duration }}
      >
        {items.map((item, i) => (
          <div key={`a-${i}`} className="shrink-0">{item}</div>
        ))}
        {items.map((item, i) => (
          <div key={`b-${i}`} aria-hidden className="shrink-0">{item}</div>
        ))}
      </div>
    </div>
  );
};
