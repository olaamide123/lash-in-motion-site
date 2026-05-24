import type { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
  currentPath: string;
}

export function Footer({ settings, currentPath }: FooterProps) {
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
            <a className="foot-wordmark" href="/" aria-label={settings.logoText || "Lash In Motion"}>
              <svg
                className="foot-wordmark-svg"
                viewBox="0 0 320 80"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <text
                  x="0"
                  y="38"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="700"
                  fontSize="34"
                  letterSpacing="6"
                  fill="#121111"
                >
                  LASH
                </text>
                <line x1="0" y1="50" x2="108" y2="50" stroke="#121111" strokeWidth="2" />
                <line x1="124" y1="6" x2="124" y2="74" stroke="#FF2D20" strokeWidth="2" />
                <rect x="118" y="44" width="12" height="12" fill="#FF2D20" />
                <text
                  x="138"
                  y="32"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="600"
                  fontSize="18"
                  letterSpacing="3"
                  fill="#FF2D20"
                >
                  IN
                </text>
                <text
                  x="148"
                  y="66"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  fontSize="28"
                  letterSpacing="5"
                  fill="#121111"
                  textDecoration="line-through"
                >
                  MOTION
                </text>
                <line x1="148" y1="58" x2="306" y2="58" stroke="#121111" strokeWidth="1.5" />
                <rect x="282" y="72" width="6" height="6" fill="#FF2D20" />
                <rect x="292" y="72" width="6" height="6" fill="#0057D9" />
                <rect x="302" y="72" width="6" height="6" fill="#FFD400" />
              </svg>
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
