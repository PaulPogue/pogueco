import React, { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import ServicesDropdown from "./dropdowns/ServicesDropdown";
import ResourcesDropdown from "./dropdowns/ResourcesDropdown";
import "./dropdowns/services-menu.css";
import "./dropdowns/resources-dropdown.css";

const LEAVE_DELAY_MS = 160;
const CLOSE_ANIMATION_MS = 400;

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [displayedMenu, setDisplayedMenu] = useState("Services");
  const [pageBlurred, setPageBlurred] = useState(false);
  const [menuVisualOpen, setMenuVisualOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const stageRef = useRef(null);

  const leaveTimer = useRef(null);
  const closeTimer = useRef(null);

  const cancelLeave = () => {
    if (leaveTimer.current !== null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const cancelClose = () => {
    cancelLeave();

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

  const closeMenu = () => {
    cancelClose();

    // Begin unblurring.
    setPageBlurred(false);

    // Preserve the 0ms timing you liked.
    closeTimer.current = window.setTimeout(() => {
      setActiveMenu("");

      // Keep visual-open state until collapse finishes.
      closeTimer.current = window.setTimeout(() => {
        setMenuVisualOpen(false);
        closeTimer.current = null;
      }, CLOSE_ANIMATION_MS);
    }, 0);
  };

  const scheduleClose = () => {
    cancelLeave();

    // Do NOT start unblurring or collapsing yet.
    // Give the pointer time to enter another part of the menu system.
    leaveTimer.current = window.setTimeout(() => {
      leaveTimer.current = null;
      closeMenu();
    }, LEAVE_DELAY_MS);
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

      if (leaveTimer.current !== null) {
        window.clearTimeout(leaveTimer.current);
      }

      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }

      document.body.classList.remove("page-is-blurred");
      document.body.classList.remove("menu-is-open");
    };
  }, []);

  useEffect(() => {
    if (!activeMenu || !stageRef.current) return;

    const activePanel = stageRef.current.querySelector(
      ".mega-menu-panel.is-active",
    );

    if (!activePanel) return;

    setMenuHeight(activePanel.scrollHeight);
  }, [activeMenu, displayedMenu]);

  return (
    <div
      className="main-menu-system"
      onMouseEnter={cancelLeave}
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
        style={{
          "--mega-menu-height": activeMenu ? `${menuHeight}px` : "0px",
        }}
        onMouseEnter={cancelLeave}
        onMouseLeave={scheduleClose}
      >
        <div className="mega-menu-stage" ref={stageRef}>
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
