import type { StructureResolver } from "sanity/structure";

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Homepage")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.listItem()
                .title("Work Page")
                .child(S.document().schemaType("workPage").documentId("workPage")),
              S.listItem()
                .title("Context Page")
                .child(S.document().schemaType("contextPage").documentId("contextPage")),
              S.listItem()
                .title("Make Something Page")
                .child(S.document().schemaType("makeSomethingPage").documentId("makeSomethingPage"))
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Work")
        .child(
          S.list()
            .title("Work Content")
            .items([
              S.documentTypeListItem("caseStudy").title("Case Studies"),
              S.documentTypeListItem("motionPiece").title("Motion Pieces"),
              S.documentTypeListItem("serviceTrack").title("Service Tracks")
            ])
        )
    ]);
