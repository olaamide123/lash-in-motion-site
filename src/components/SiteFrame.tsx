import type { CSSProperties, ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getThemeColorValues } from "@/lib/cms-helpers";
import { getSiteSettings } from "@/lib/sanity/fetch";

interface SiteFrameProps {
  currentPath: string;
  children: ReactNode;
}

export async function SiteFrame({ currentPath, children }: SiteFrameProps) {
  const settings = await getSiteSettings();
  const themeStyle = getThemeColorValues(settings.themeColors) as CSSProperties;

  return (
    <div style={themeStyle}>
      <Header settings={settings} currentPath={currentPath} />
      {children}
      <Footer settings={settings} currentPath={currentPath} />
    </div>
  );
}
