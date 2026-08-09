import React from "react";

const serviceGroups = [
  {
    eyebrow: "Accounting",
    href: "/services/accounting",
    primary: "Accounting Services",
    links: [
      {
        label: "Bookkeeping and reporting",
        href: "/services/accounting#bookkeeping",
      },
      { label: "Cleanup and catch-up", href: "/services/accounting#cleanup" },
      { label: "QuickBooks support", href: "/services/accounting#quickbooks" },
      { label: "Year-end accounting", href: "/services/accounting#year-end" },
    ],
  },
  {
    eyebrow: "Tax",
    href: "/services/tax",
    primary: "Tax Services",
    links: [
      { label: "Individual tax returns", href: "/services/tax#individual" },
      { label: "Business tax returns", href: "/services/tax#business" },
      { label: "Year-round tax planning", href: "/services/tax#planning" },
      { label: "IRS notices and support", href: "/services/tax#irs-support" },
    ],
  },
  {
    eyebrow: "Payroll",
    href: "/services/payroll",
    primary: "Payroll Services",
    links: [
      { label: "Payroll processing", href: "/services/payroll#processing" },
      { label: "Direct deposit", href: "/services/payroll#direct-deposit" },
      { label: "New payroll setup", href: "/services/payroll#setup" },
      { label: "Platform transitions", href: "/services/payroll#transitions" },
    ],
  },
  {
    eyebrow: "Advisory",
    href: "/services/advisory",
    primary: "Advisory Services",
    links: [
      {
        label: "Business planning",
        href: "/services/advisory#business-planning",
      },
      {
        label: "Technology integration",
        href: "/services/advisory#technology",
      },
      { label: "Cash-flow guidance", href: "/services/advisory#cash-flow" },
      {
        label: "Financial decision support",
        href: "/services/advisory#decision-support",
      },
    ],
  },
];

const ServicesDropdown = () => {
  return (
    <div className="services-menu">
      <div className="services-menu-intro">
        <p className="services-menu-eyebrow">How we help</p>

        <h2 className="services-menu-heading">
          Find the support that fits the work.
        </h2>

        <p className="services-menu-intro-copy">
          Start with the area where you need help, then explore the specific
          services available.
        </p>

        {/* <a href="/services" className="services-menu-all-link">
          View all services
          <span aria-hidden="true">→</span>
        </a> */}
      </div>

      <nav className="services-menu-directory" aria-label="Services">
        {serviceGroups.map((group) => (
          <a
            className="services-menu-group"
            href={group.href}
            key={group.eyebrow}
          >
            <p className="services-menu-group-eyebrow">{group.eyebrow}</p>

            <div className="services-menu-primary-link">
              <span>{group.primary}</span>

              <span className="services-menu-primary-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p className="services-menu-includes">Services include</p>

            <div className="services-menu-links">
              {group.links.map((link) => (
                <span className="services-menu-description" key={link.label}>
                  {link.label}
                </span>
              ))}
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default ServicesDropdown;
