import React from "react";
import Icon from "../../Icons/Icon";

const services = [
  {
    title: "Accounting",
    href: "/services/accounting",
    icon: "accounting",
    links: [
      "Bookkeeping and reporting",
      "Cleanup and catch-up",
      "QuickBooks support",
      "Year-end accounting",
    ],
  },
  {
    title: "Tax",
    href: "/services/tax",
    icon: "tax",
    links: [
      "Individual tax returns",
      "Business tax returns",
      "Year-round tax planning",
      "IRS notices and support",
    ],
  },
  {
    title: "Payroll",
    href: "/services/payroll",
    icon: "payroll",
    links: [
      "Payroll processing",
      "Direct deposit",
      "New payroll setup",
      "Platform transitions",
    ],
  },
  {
    title: "Advisory",
    href: "/services/advisory",
    icon: "advisory",
    links: [
      "Business planning",
      "Technology integration",
      "Cash-flow guidance",
      "Financial decision support",
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

        <a href="/services" className="services-menu-all-link">
          View all services
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <nav className="services-menu-grid" aria-label="Services">
        {services.map((service) => (
          <a
            key={service.title}
            href={service.href}
            className="services-menu-item"
          >
            <span className="services-menu-item-top">
              <span className="services-menu-icon">
                <Icon icon={service.icon} className="h-5 w-5" />
              </span>

              <span className="services-menu-arrow" aria-hidden="true">
                →
              </span>
            </span>

            <span className="services-menu-title">{service.title}</span>

            <span className="services-menu-link-list">
              {service.links.map((link) => (
                <span key={link} className="services-menu-link-item">
                  {link}
                </span>
              ))}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default ServicesDropdown;
