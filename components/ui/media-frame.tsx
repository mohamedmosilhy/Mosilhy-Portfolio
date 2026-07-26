import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { MediaAsset } from "@/types/content";

const variants = {
  plain: "bg-transparent",
  surface: "border border-border bg-surface p-space-2",
  browser: "border border-border bg-surface shadow-sm",
} as const;

const radii = {
  none: "rounded-none",
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

export interface MediaFrameProps {
  readonly asset: MediaAsset;
  readonly priority?: boolean;
  readonly sizes: string;
  readonly caption?: ReactNode;
  readonly variant?: keyof typeof variants;
  readonly radius?: keyof typeof radii;
}

export function MediaFrame({
  asset,
  priority = false,
  sizes,
  caption,
  variant = "plain",
  radius = "xl",
}: MediaFrameProps) {
  const poster = asset.kind === "video" ? asset.poster : asset;
  const resolvedCaption = caption ?? asset.caption;

  return (
    <figure data-slot="media-frame" data-variant={variant}>
      <div className={cn("overflow-hidden", variants[variant], radii[radius])}>
        {variant === "browser" ? (
          <div
            aria-hidden="true"
            className="flex h-9 items-center gap-space-2 border-b border-border px-space-3"
          >
            <span className="size-2 rounded-full bg-text-muted" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border" />
          </div>
        ) : null}
        <div
          className="relative overflow-hidden bg-canvas"
          style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
        >
          {asset.kind === "image" ? (
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              src={asset.src}
              poster={asset.poster.src}
              controls
              preload="metadata"
              aria-label={asset.title}
              className="h-full w-full object-cover"
            >
              Your browser does not support embedded video.
            </video>
          )}
        </div>
      </div>
      {resolvedCaption ? (
        <figcaption className="mt-space-3 text-body-sm text-text-muted">
          {resolvedCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}
