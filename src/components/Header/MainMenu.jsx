import React, { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import ServicesDropdown from "./dropdowns/ServicesDropdown";
import ResourcesDropdown from "./dropdowns/ResourcesDropdown";
import "./dropdowns/services-menu.css";
import "./dropdowns/resources-dropdown.css";

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [displayedMenu, setDisplayedMenu] = useState("Services");
  const [pageBlurred, setPageBlurred] = useState(false);
  const [menuVisualOpen, setMenuVisualOpen] = useState(false);

  const closeTimer = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = (menu) => {
    cancelClose();

    setDisplayedMenu(menu);
    setActiveMenu(menu);
    setPageBlurred(true);
    setMenuVisualOpen(true);
  };

  const CLOSE_ANIMATION_MS = 400;

  const closeMenu = () => {
    cancelClose();

    setPageBlurred(false);
    setActiveMenu("");

    closeTimer.current = window.setTimeout(() => {
      setMenuVisualOpen(false);
      closeTimer.current = null;
    }, CLOSE_ANIMATION_MS);
  };

  const scheduleClose = () => {
    cancelClose();

    // Begin unblurring.
    setPageBlurred(false);

    closeTimer.current = window.setTimeout(() => {
      // Begin collapsing the menu.
      setActiveMenu("");

      closeTimer.current = window.setTimeout(() => {
        // Return the homepage header to transparent.
        setMenuVisualOpen(false);
        closeTimer.current = null;
      }, CLOSE_ANIMATION_MS);
    }, 0);
  };

  const toggleMenu = (menu) => {
    cancelClose();

    if (activeMenu === menu) {
      closeMenu();
      return;
    }

    openMenu(menu);
  };

  useEffect(() => {
    document.body.classList.toggle("page-is-blurred", pageBlurred);
    document.body.classList.toggle("menu-is-open", menuVisualOpen);

    return () => {
      document.body.classList.remove("page-is-blurred");
      document.body.classList.remove("menu-is-open");
    };
  }, [pageBlurred, menuVisualOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }

      document.body.classList.remove("page-is-blurred");
      document.body.classList.remove("menu-is-open");
    };
  }, []);

  return (
    <div
      className="main-menu-system"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <nav className="main-menu" aria-label="Primary navigation">
        <ul>
          <MenuItem
            label="Services"
            hasDropdown
            isActive={activeMenu === "Services"}
            onMouseEnter={() => openMenu("Services")}
            onFocus={() => openMenu("Services")}
            onClick={() => toggleMenu("Services")}
          />

          <MenuItem
            label="Resources"
            hasDropdown
            isActive={activeMenu === "Resources"}
            onMouseEnter={() => openMenu("Resources")}
            onFocus={() => openMenu("Resources")}
            onClick={() => toggleMenu("Resources")}
          />
        </ul>
      </nav>

      <div
        className={`mega-menu-shell ${activeMenu ? "is-open" : ""} ${
          displayedMenu === "Services" ? "is-services" : "is-resources"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-menu-inner">
          <div className="mega-menu-stage">
            <section
              className={`mega-menu-panel ${
                displayedMenu === "Services" ? "is-active" : ""
              }`}
              aria-hidden={displayedMenu !== "Services"}
            >
              <ServicesDropdown />
            </section>

            <section
              className={`mega-menu-panel ${
                displayedMenu === "Resources" ? "is-active" : ""
              }`}
              aria-hidden={displayedMenu !== "Resources"}
            >
              <ResourcesDropdown />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
