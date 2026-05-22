import { CtaControl } from "@/components/CtaControl";
import { resolveImageSrc } from "@/lib/media";
import type { SiteSettings } from "@/lib/types";

function renderLogoText(text: string) {
  const parts = text.split(/(in)/i);
  return parts.map((part, index) =>
    part.toLowerCase() === "in" ? (
      <span key={`${part}-${index}`} className="em">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

interface HeaderProps {
  settings: SiteSettings;
  currentPath: string;
}

export function Header({ settings, currentPath }: HeaderProps) {
  const logoSrc = resolveImageSrc(settings.roundLogo) || "/assets/images/lim-round-mark.png";

  return (
    <header className="nav" role="banner">
      <div className="nav-inner">
        <a className="logo" href="/" aria-label={`${settings.logoText} — home`}>
          <span className="logo-mark-svg" aria-hidden="true">
            <img className="logo-mark-img" src={logoSrc} alt="" />
          </span>
          <span className="logo-name">{renderLogoText(settings.logoText)}</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {settings.mainNavigation.map((item) => {
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
        </nav>
        <div className="nav-right">
          <span className="palette" aria-hidden="true">
            <i className="a"></i>
            <i className="b"></i>
            <i className="c"></i>
          </span>
          <CtaControl cta={settings.primaryCTA} className="nav-cta" />
        </div>
      </div>
    </header>
  );
}
