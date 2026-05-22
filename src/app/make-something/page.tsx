import { RichTextContent } from "@/components/RichTextContent";
import { SiteFrame } from "@/components/SiteFrame";
import { getMakeSomethingPage } from "@/lib/sanity/fetch";

const web3FormsKey = "5facc282-85fb-4c8f-bad3-24d875230b73";

export default async function MakeSomethingPage() {
  const page = await getMakeSomethingPage();

  return (
    <SiteFrame currentPath="/make-something">
      <main id="top">
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-inner">
              <div>
                <div className="page-kicker">
                  <span className="red-square"></span>
                  <span className="mono">{page.pageLabel}</span>
                </div>
                <h1 className="page-title">{page.pageTitle}</h1>
              </div>
              <div className="page-meta-stack">
                <p className="page-intro">{page.introCopy}</p>
                <a className="contact-email" href={`mailto:${page.contactEmail}`}>
                  <span className="red-square"></span>
                  {page.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section page-section--tight-top">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-panel">
                <div className="section-eyebrow">
                  <span className="red-square"></span>
                  <span className="mono">{page.inquiryLabel}</span>
                </div>
                <h2 className="context-title">{page.inquiryTitle}</h2>
                <p className="contact-copy">{page.formIntro}</p>
                <div className="timeline-list">
                  <div className="timeline-row">
                    <div className="timeline-row-label">
                      <span className="marker"></span>Best For
                    </div>
                    <RichTextContent value={page.bestForBody} className="prose-stack" />
                  </div>
                  <div className="timeline-row" data-tone="blue">
                    <div className="timeline-row-label">
                      <span className="marker"></span>Contact
                    </div>
                    <RichTextContent value={page.contactBody} className="prose-stack" />
                  </div>
                </div>
              </div>

              <div className="form-panel">
                <form className="form-shell" action="https://api.web3forms.com/submit" method="POST">
                  <input type="hidden" name="access_key" value={web3FormsKey} />
                  <input type="hidden" name="subject" value="New Lash In Motion project inquiry" />

                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" required />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" required />
                    </div>
                    <div className="field">
                      <label htmlFor="company">Company / Organization</label>
                      <input id="company" name="company" type="text" />
                    </div>
                    <div className="field">
                      <label htmlFor="project-type">Project Type</label>
                      <select id="project-type" name="project_type" required>
                        <option value="">Select one</option>
                        {page.projectTypes.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="budget">Budget Range</label>
                      <select id="budget" name="budget_range" required>
                        <option value="">Select one</option>
                        {page.budgetRanges.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="timeline">Timeline</label>
                      <select id="timeline" name="timeline" required>
                        <option value="">Select one</option>
                        {page.timelineOptions.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field full">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" required></textarea>
                    </div>
                  </div>

                  <div className="section-actions">
                    <button className="btn-primary" type="submit">
                      {page.formButtonText} <span className="arrow">→</span>
                    </button>
                    <span className="form-note">Ready for Web3Forms or Formspree endpoint swap</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
