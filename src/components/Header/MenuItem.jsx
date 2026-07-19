import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const MenuItem = ({
  label,
  href,
  hasDropdown,
  dropdownClassName,
  isActive,
  onClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync local state with parent's active state.
  useEffect(() => {
    setIsOpen(isActive);
  }, [isActive]);

  // Close dropdown when clicking/touching outside the container.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        onClick(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClick]);

  // Use pointer events to handle hover for mouse users only.
  const handlePointerEnter = (e) => {
    // Only open on hover if using a mouse
    if (hasDropdown && e.pointerType === "mouse") {
      setIsOpen(true);
      onClick(true);
    }
  };

  const handlePointerLeave = (e) => {
    if (hasDropdown && e.pointerType === "mouse") {
      setIsOpen(false);
      onClick(false);
    }
  };

  // Toggle dropdown for click events.
  const handleToggle = (e) => {
    if (hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => {
        const newState = !prev;
        onClick(newState);
        return newState;
      });
    }
  };

  return (
    <li
      ref={containerRef}
      className="menu-item"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="menu-item-trigger-wrap">
        <a
          href={hasDropdown ? "#" : href}
          onClick={handleToggle}
          className="menu-item-trigger"
          aria-expanded={hasDropdown ? isOpen : undefined}
          aria-controls={hasDropdown ? "dropdown-menu" : undefined}
        >
          <span>{label}</span>

          {hasDropdown && (
            <FiChevronDown
              className={`menu-item-chevron ${isOpen ? "is-open" : ""}`}
            />
          )}
        </a>
      </div>

      {/* Bridging element to extend the hover area */}
      {hasDropdown && isOpen && <div className="menu-hover-bridge" />}

      {hasDropdown && (
        <div
          id="dropdown-menu"
          ref={dropdownRef}
          className={`dropdown-menu ${dropdownClassName ?? ""}`}
          style={{
            maxHeight: isOpen
              ? `${dropdownRef.current?.scrollHeight}px`
              : "0px",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="menu-dropdown-panel">{children}</div>
        </div>
      )}
    </li>
  );
};

export default MenuItem;
