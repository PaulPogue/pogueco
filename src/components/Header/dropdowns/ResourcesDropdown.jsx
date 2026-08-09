import React, { useEffect, useState } from "react";
import StateTaxSearch from "./StateTaxSearch";

const resourceGroups = [
  {
    eyebrow: "Tax Resources",
    title: "Tax Resources",
    links: [
      {
        label: "Current Tax Facts",
        href: "/resources/current-tax-facts",
      },
      {
        label: "Should I Itemize?",
        href: "/resources/itemized-deductions",
      },
      {
        label: "Am I Required to File a Tax Return?",
        href: "/resources/do-i-have-to-file",
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

      {
        label: "Amortization Schedule Builder",
        href: "/resources/amortization",
        external: false,
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
        label: "State Tax Payment",
        action: "payment",
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
        label: "State Refund Status",
        action: "refund",
      },
    ],
  },
];

export default function ResourcesDropdown({ isActive }) {
  const [stateSearchType, setStateSearchType] = useState(null);
  useEffect(() => {
    if (isActive) {
      setStateSearchType(null);
    }
  }, [isActive]);
  return (
    <>
      <div className="resources-menu">
        <div className="resources-menu-intro">
          <p className="resources-menu-eyebrow">Client resources</p>

          <h2 className="resources-menu-title">
            Useful tools, all in one place.
          </h2>

          <p className="resources-menu-copy">
            Find tax information, calculators, payment portals, and
            refund-status tools without searching through multiple government
            websites.
          </p>

          {/* <a href="/resources" className="resources-menu-all-link">
            View all resources
            <span aria-hidden="true">→</span>
          </a> */}
        </div>

        {stateSearchType ? (
          <StateTaxSearch
            type={stateSearchType}
            onBack={() => setStateSearchType(null)}
          />
        ) : (
          <nav className="resources-menu-directory" aria-label="Resources">
            {resourceGroups.map((group) => (
              <section key={group.title} className="resources-menu-group">
                <p className="resources-menu-group-eyebrow">{group.eyebrow}</p>

                <h3 className="resources-menu-group-title">{group.title}</h3>

                <div className="resources-menu-link-list">
                  {group.links.map((link) =>
                    link.action ? (
                      <button
                        key={link.label}
                        type="button"
                        className="resources-menu-link resources-menu-link-button"
                        onClick={() => setStateSearchType(link.action)}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="resources-menu-link"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ),
                  )}
                </div>
              </section>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
