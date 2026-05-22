"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    LIMSite?: {
      init?: () => void;
    };
  }
}

export function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    window.LIMSite?.init?.();
  }, [pathname]);

  return <Script src="/assets/js/script.js" strategy="afterInteractive" onReady={() => window.LIMSite?.init?.()} />;
}
