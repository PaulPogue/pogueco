import React from "react";
import "./services-menu.css";

const ServicesDropdown = () => {
  return (
    <div className="p-4">
      <div>
        <h3 className=" text-gray-800">Accounting</h3>
      </div>
      <div>
        <h3 className=" text-gray-800 mt-4">Tax</h3>
      </div>
      <div>
        <h3 className=" text-gray-800 mt-4">Payroll</h3>
      </div>
      <div>
        <h3 className=" text-gray-800 mt-4">Advisory Services</h3>
      </div>
    </div>
  );
};

export default ServicesDropdown;
