const Icon = ({ icon, className = "h-6 w-6" }) => {
  const sharedProps = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (icon === "accounting") {
    return (
      <svg {...sharedProps}>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19V7" />
        <path d="M22 19V3" />
        <path d="M2 19h22" />
      </svg>
    );
  }

  if (icon === "tax") {
    return (
      <svg {...sharedProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
        <path d="M10 9h1" />
      </svg>
    );
  }

  if (icon === "payroll") {
    return (
      <svg {...sharedProps}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M18 8h3" />
        <path d="M19.5 6.5v3" />
      </svg>
    );
  }

  if (icon === "advisory") {
    return (
      <svg {...sharedProps}>
        <polyline points="5 15 10 10 13 13 19 7" />
        <polyline points="14 7 19 7 19 12" />
      </svg>
    );
  }

  return null;
};

export default Icon;
