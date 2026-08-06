import React from "react";
import { FiChevronDown } from "react-icons/fi";

const MenuItem = ({
  label,
  href,
  hasDropdown = false,
  isActive = false,
  onMouseEnter,
  onFocus,
  onClick,
}) => {
  if (!hasDropdown) {
    return (
      <li className="menu-item">
        <a href={href} className="menu-item-trigger">
          <span>{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li className="menu-item" onMouseEnter={onMouseEnter}>
      <button
        type="button"
        className={`menu-item-trigger ${isActive ? "is-open" : ""}`}
        aria-expanded={isActive}
        onFocus={onFocus}
        onClick={onClick}
      >
        <span>{label}</span>

        <FiChevronDown
          className={`menu-item-chevron ${isActive ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </button>
    </li>
  );
};

export default MenuItem;
