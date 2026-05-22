import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteScripts } from "@/components/SiteScripts";

export const metadata: Metadata = {
  title: "Lash In Motion",
  description: "Lash In Motion — Chicago. Motion, editing, and campaign films shaped with clarity, rhythm, and care.",
  icons: {
    icon: "/assets/images/lim-round-mark.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f4efe4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
