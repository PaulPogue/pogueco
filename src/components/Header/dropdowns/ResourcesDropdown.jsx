import React from "react";
// import "./resources-menu.css";

const resources = [
  {
    title: "Withholding Calculator",
    description: "Estimate federal income tax withholding.",
    href: "https://www.irs.gov/individuals/tax-withholding-estimator",
    logo: "/logos/IRS-Logo.svg",
    logoAlt: "IRS",
    logoClass: "resources-menu-logo resources-menu-logo-irs",
  },
  {
    title: "Federal Tax Payment",
    description: "Make a payment directly to the IRS.",
    href: "https://www.irs.gov/payments",
    logo: "/logos/IRS-Logo.svg",
    logoAlt: "IRS",
    logoClass: "resources-menu-logo resources-menu-logo-irs",
  },
  {
    title: "Kentucky Tax Payment",
    description: "Pay Kentucky individual or business taxes.",
    href: "https://epayment.ky.gov/epay",
    logo: "/logos/revenue-logo.svg",
    logoAlt: "Kentucky Department of Revenue",
    logoClass: "resources-menu-logo resources-menu-logo-kentucky",
  },
  {
    title: "Federal Refund Status",
    description: "Check the status of an IRS refund.",
    href: "https://www.irs.gov/wheres-my-refund",
    logo: "/logos/IRS-Logo.svg",
    logoAlt: "IRS",
    logoClass: "resources-menu-logo resources-menu-logo-irs",
  },
  {
    title: "Kentucky Refund Status",
    description: "Check the status of a Kentucky refund.",
    href: "https://refund.ky.gov/",
    logo: "/logos/revenue-logo.svg",
    logoAlt: "Kentucky Department of Revenue",
    logoClass: "resources-menu-logo resources-menu-logo-kentucky",
  },
];

const ResourcesDropdown = () => {
  return (
    <nav className="resources-menu" aria-label="Resources">
      {resources.map((resource) => (
        <a
          key={resource.title}
          href={resource.href}
          className="resources-menu-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="resources-menu-icon">
            <img
              src={resource.logo}
              alt=""
              aria-hidden="true"
              className={resource.logoClass}
            />
          </span>

          <span className="resources-menu-content">
            <span className="resources-menu-title">{resource.title}</span>

            <span className="resources-menu-description">
              {resource.description}
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
};

export default ResourcesDropdown;
