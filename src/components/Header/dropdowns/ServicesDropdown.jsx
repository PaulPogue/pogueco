import React from "react";
import Icon from "../../Icons/Icon";
// import "./services-menu.css";

const services = [
  {
    title: "Accounting",
    description: "Bookkeeping, reporting, and QuickBooks support.",
    href: "/services/accounting",
    icon: "accounting",
  },
  {
    title: "Tax",
    description: "Planning, preparation, and year-round guidance.",
    href: "/services/tax",
    icon: "tax",
  },
  {
    title: "Payroll",
    description: "Payroll platform selection and integration.",
    href: "/services/payroll",
    icon: "payroll",
  },
  {
    title: "Advisory",
    description: "Business planning and financial decision support.",
    href: "/services/advisory",
    icon: "advisory",
  },
];

const ServicesDropdown = () => {
  return (
    <nav className="services-menu" aria-label="Services">
      {services.map((service) => (
        <a
          key={service.title}
          href={service.href}
          className="services-menu-item"
        >
          <span className="services-menu-icon">
            <Icon icon={service.icon} className="h-5 w-5" />
          </span>

          <span className="services-menu-content">
            <span className="services-menu-title">{service.title}</span>
            <span className="services-menu-description">
              {service.description}
            </span>
          </span>
        </a>
      ))}
    </nav>
  );
};

export default ServicesDropdown;
