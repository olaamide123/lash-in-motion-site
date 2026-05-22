import type { ReactNode } from "react";

import { isReelCta } from "@/lib/cms-helpers";
import type { CTAItem } from "@/lib/types";

interface CtaControlProps {
  cta: CTAItem;
  className: string;
  children?: ReactNode;
}

export function CtaControl({ cta, className, children }: CtaControlProps) {
  const label = children ?? cta.label;
  const openReel = isReelCta(cta);
  const classes = openReel ? `${className} js-open-reel` : className;

  if (openReel) {
    return (
      <button type="button" className={classes}>
        <span className="dot" aria-hidden="true"></span>
        {label}
      </button>
    );
  }

  return (
    <a className={classes} href={cta.href || "/make-something"}>
      <span className="dot" aria-hidden="true"></span>
      {label}
    </a>
  );
}
