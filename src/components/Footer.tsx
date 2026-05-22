import { resolveImageSrc } from "@/lib/media";
import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
  currentPath: string;
}

export function Footer({ settings, currentPath }: FooterProps) {
  const logoSrc = resolveImageSrc(settings.roundLogo) || "/assets/images/lim-round-mark.png";
  const location = settings.footerLocation || "Chicago, IL";

  return (
    <footer>
      <div className="container">
        <div className="foot-rhythm" aria-hidden="true">
          <span className="timeline-track timeline-track-blue"></span>
          <span className="timeline-track timeline-track-red"></span>
          <span className="timeline-track timeline-track-yellow"></span>
        </div>
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="foot-brand-top">
              <span className="brand-mark-full" aria-hidden="true">
                <img className="brand-mark-img" src={logoSrc} alt="" />
              </span>
              <div>
                <div className="lim">{settings.logoText}</div>
                <div className="mono-soft sub">{location}</div>
              </div>
            </div>
          </div>
          <div className="foot-col">
            <h4>Navigate</h4>
            {settings.footerExploreLinks.map((item) => {
              const isCurrent =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath === item.href || currentPath.startsWith(`${item.href}/`);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="foot-col">
            <h4>Connect</h4>
            <a href={`mailto:${settings.footerContactEmail}`}>{settings.footerContactEmail}</a>
            <div className="foot-note">{settings.footerContactHelperText}</div>
            {settings.socialLinks?.length ? (
              <div className="foot-social">
                {settings.socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noreferrer" : undefined}
                    aria-label={item.iconLabel || item.label}
                  >
                    {item.iconLabel || item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="foot-col">
            <h4>WORTH MAKING</h4>
            <div className="foot-list">
              {settings.footerWorthMakingList.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            {settings.footerTagline} {settings.footerCopyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
