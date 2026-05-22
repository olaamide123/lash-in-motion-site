import type { ReactNode } from "react";

import { PortableText } from "@portabletext/react";

import type { RichTextBlock } from "@/lib/types";

interface RichTextContentProps {
  value?: RichTextBlock[];
  className?: string;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>
  },
  marks: {
    link: ({
      children,
      value
    }: {
      children?: ReactNode;
      value?: { href?: string; blank?: boolean };
    }) => (
      <a
        href={value?.href || "#"}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noreferrer" : undefined}
      >
        {children}
      </a>
    )
  }
};

export function RichTextContent({ value = [], className }: RichTextContentProps) {
  if (!value.length) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
