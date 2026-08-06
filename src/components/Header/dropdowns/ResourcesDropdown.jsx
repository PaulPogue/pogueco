const resourceGroups = [
  {
    title: "Guides",
    description: "Firm guidance and timely tax information.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 5.5C3 4.67 3.67 4 4.5 4H10c1.1 0 2 .9 2 2v14c0-1.1-.9-2-2-2H4.5A1.5 1.5 0 0 0 3 19.5V5.5Z" />
        <path d="M21 5.5C21 4.67 20.33 4 19.5 4H14c-1.1 0-2 .9-2 2v14c0-1.1.9-2 2-2h5.5A1.5 1.5 0 0 1 21 19.5V5.5Z" />
      </svg>
    ),
    links: [
      {
        label: "OBBBA Information",
        href: "/obbba",
      },
    ],
  },
  {
    title: "Calculators",
    description: "Helpful tools from trusted government sources.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h2" />
        <path d="M14 11h2" />
        <path d="M8 15h2" />
        <path d="M14 15h2" />
      </svg>
    ),
    links: [
      {
        label: "IRS Withholding Calculator",
        href: "https://www.irs.gov/individuals/tax-withholding-estimator",
        external: true,
      },
    ],
  },
  {
    title: "Make a Payment",
    description: "Direct links for federal and Kentucky tax payments.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </svg>
    ),
    links: [
      {
        label: "Federal Tax Payment",
        href: "https://www.irs.gov/payments",
        external: true,
      },
      {
        label: "Kentucky Tax Payment",
        href: "https://epayment.ky.gov/epay",
        external: true,
      },
    ],
  },
  {
    title: "Where’s My Refund?",
    description: "Check the status of a filed federal or state return.",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
        <path d="m8.5 11 1.7 1.7 3.3-3.4" />
      </svg>
    ),
    links: [
      {
        label: "Federal Refund Status",
        href: "https://www.irs.gov/refunds",
        external: true,
      },
      {
        label: "Kentucky Refund Status",
        href: "https://refund.ky.gov/",
        external: true,
      },
    ],
  },
];

export default function ResourcesDropdown() {
  return (
    <div className="resources-menu">
      <div className="resources-menu-intro">
        <p className="resources-menu-eyebrow">Client resources</p>

        <h2 className="resources-menu-title">
          Useful tools, all in one place.
        </h2>

        <p className="resources-menu-copy">
          Find tax information, calculators, payment portals, and refund-status
          tools without searching through multiple government websites.
        </p>

        <a href="/resources" className="resources-menu-all-link">
          View all resources
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <nav className="resources-menu-panel" aria-label="Resources">
        {resourceGroups.map((group) => (
          <section key={group.title} className="resources-menu-group">
            <div className="resources-menu-group-heading">
              <span className="resources-menu-group-icon" aria-hidden="true">
                {group.icon}
              </span>

              <span className="resources-menu-group-heading-copy">
                <span className="resources-menu-group-title">
                  {group.title}
                </span>

                <span className="resources-menu-group-description">
                  {group.description}
                </span>
              </span>
            </div>

            <div className="resources-menu-link-list">
              {group.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="resources-menu-link"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <span>{link.label}</span>

                  <span
                    className="resources-menu-link-arrow"
                    aria-hidden="true"
                  >
                    {link.external ? "↗" : "→"}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </div>
  );
}
