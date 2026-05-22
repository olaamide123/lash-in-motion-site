import { SiteFrame } from "@/components/SiteFrame";

export default async function NotFound() {
  return (
    <SiteFrame currentPath="">
      <main id="top">
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-inner">
              <div>
                <div className="page-kicker">
                  <span className="red-square"></span>
                  <span className="mono">Not Found</span>
                </div>
                <h1 className="page-title">That page is not here.</h1>
              </div>
              <div className="page-meta-stack">
                <p className="page-intro">The link may have moved, or the piece may not be published yet.</p>
                <a className="contact-email" href="/work">
                  <span className="red-square"></span>
                  Back to Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
