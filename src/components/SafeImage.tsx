import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SafeImage
 * ---------
 * Displays an <img>. If the source fails to load (e.g. a service
 * gallery image hasn't been dropped into /public/assets/services/ yet),
 * it swaps to a graceful placeholder tile so the layout stays intact.
 *
 * Also sets loading="lazy" and decoding="async" for performance across
 * the many service galleries on the site.
 */
interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  containerClassName?: string;
}

export const SafeImage = ({
  src,
  alt,
  className,
  fallbackLabel,
  containerClassName,
  ...rest
}: SafeImageProps) => {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-secondary via-accent to-secondary/70 text-muted-foreground",
          containerClassName ?? className
        )}
        aria-label={typeof alt === "string" ? alt : fallbackLabel}
      >
        <div className="text-center px-4">
          <div className="mx-auto mb-2 h-10 w-10 rounded-full border border-primary/30 flex items-center justify-center text-primary/60">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5h18v14H3z"/><path d="m5 17 4-4 3 3 5-6 4 6"/></svg>
          </div>
          <p className="font-serif text-sm text-foreground/80 leading-tight">
            {fallbackLabel || "Image coming soon"}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mt-1">
            Bartey Decor
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
};
