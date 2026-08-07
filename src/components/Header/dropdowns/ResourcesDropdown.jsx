const resourceGroups = [
  {
    eyebrow: "Guides",
    title: "Guides",
    links: [
      {
        label: "OBBBA Information",
        href: "/obbba",
      },
    ],
  },
  {
    eyebrow: "Calculators",
    title: "Calculators",
    links: [
      {
        label: "IRS Withholding Calculator",
        href: "https://www.irs.gov/individuals/tax-withholding-estimator",
        external: true,
      },
    ],
  },
  {
    eyebrow: "Payments",
    title: "Make a Payment",
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
    eyebrow: "Refunds",
    title: "Refund Status",
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

      <nav className="resources-menu-directory" aria-label="Resources">
        {resourceGroups.map((group) => (
          <section key={group.title} className="resources-menu-group">
            <p className="resources-menu-group-eyebrow">{group.eyebrow}</p>

            <h3 className="resources-menu-group-title">
              {group.title}
              <span aria-hidden="true">→</span>
            </h3>

            <div className="resources-menu-link-list">
              {group.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="resources-menu-link"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </div>
  );
}
