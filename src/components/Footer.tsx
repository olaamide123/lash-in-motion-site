import { resolveImageSrc } from "@/lib/media";
import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
  currentPath: string;
}

export function Footer({ settings, currentPath }: FooterProps) {
  const footerLogoSrc = resolveImageSrc(settings.footerLogo) || "/assets/images/lim-wordmark.png";
  const ariaLabel = settings.logoText || "Lash In Motion";

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
            <a className="foot-wordmark" href="/" aria-label={ariaLabel}>
              <img
                className="foot-wordmark-img"
                src={footerLogoSrc}
                alt={settings.footerLogo?.alt || ariaLabel}
              />
            </a>
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
