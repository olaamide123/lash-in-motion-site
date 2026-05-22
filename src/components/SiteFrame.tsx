import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteSettings } from "@/lib/sanity/fetch";

interface SiteFrameProps {
  currentPath: string;
  children: ReactNode;
}

export async function SiteFrame({ currentPath, children }: SiteFrameProps) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} currentPath={currentPath} />
      {children}
      <Footer settings={settings} currentPath={currentPath} />
    </>
  );
}
