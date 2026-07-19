import React, { useState } from "react";
import MenuItem from "./MenuItem";
import ServicesDropdown from "./dropdowns/ServicesDropdown";
import ToolsDropdown from "./dropdowns/ToolsDropdown";
import ResourcesDropdown from "./dropdowns/ResourcesDropdown";
import WhoIServeDropdown from "./dropdowns/WhoIServeDropdown";
import "./dropdowns/services-menu.css";
import "./dropdowns/resources-dropdown.css";

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");

  // Toggle menu state
  // const toggleMenu = (menu, isOpen) => {
  //   setActiveMenu(isOpen ? menu : "");
  // };

  const toggleMenu = (menu, isOpen) => {
    setActiveMenu(isOpen ? menu : "");
  };

  return (
    <nav className="main-menu relative">
      <ul className="flex items-center gap-10">
        {/* <MenuItem label="Home" href="/" hasDropdown={false} /> */}

        {/* <MenuItem
          label="Blog"
          hasDropdown={true}
          isActive={activeMenu === "Blog"}
          onClick={(isOpen) => toggleMenu("Blog", isOpen)}
        >
          <ServicesDropdown />
        </MenuItem> */}

        <MenuItem label="OBBBA" hasDropdown={false} href="/obbba"></MenuItem>

        <MenuItem
          label="Services"
          hasDropdown={true}
          dropdownClassName={"services-dropdown"}
          isActive={activeMenu === "Services"}
          onClick={(isOpen) => toggleMenu("Services", isOpen)}
        >
          <ServicesDropdown />
        </MenuItem>

        {/* <MenuItem
          label="Tools"
          hasDropdown={true}
          isActive={activeMenu === "Tools"}
          onClick={(isOpen) => toggleMenu("Tools", isOpen)}
        >
          <ToolsDropdown />
        </MenuItem> */}

        {/* <MenuItem
          label="Who I Serve"
          hasDropdown={true}
          isActive={activeMenu === "WhoIServe"}
          onClick={(isOpen) => toggleMenu("WhoIServe", isOpen)}
        >
          <WhoIServeDropdown />
        </MenuItem> */}

        <MenuItem
          label="Resources"
          hasDropdown={true}
          dropdownClassName={"resources-dropdown"}
          isActive={activeMenu === "Resources"}
          onClick={(isOpen) => toggleMenu("Resources", isOpen)}
        >
          <ResourcesDropdown />
        </MenuItem>

        <MenuItem
          label="Contact"
          hasDropdown={false}
          href="/contact"
        ></MenuItem>
      </ul>
    </nav>
  );
};

export default MainMenu;
