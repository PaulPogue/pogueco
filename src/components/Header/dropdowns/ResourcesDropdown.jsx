import React from "react";
import "./resources-menu.css";

const LogoSlot = ({ children }) => (
  <div className="h-10 flex items-end pb-1 justify-center">{children}</div>
);

const IRSIcon = () => (
  <LogoSlot>
    <div>
      <img
        src="/logos/IRS-Logo.svg"
        alt="IRS"
        className="h-5.5 w-auto object-contain"
      />
    </div>
  </LogoSlot>
);

const KYDORIcon = () => (
  <LogoSlot>
    <img
      src="/logos/revenue-logo.svg"
      alt="KY DOR"
      className="h-8 w-auto object-contain"
    />
  </LogoSlot>
);

const ResourcesDropdown = () => (
  <div className="p-4 min-w-[360px] ">
    <h3 className="text-lg text-gray-800 font-semibold">Calculators</h3>

    <div className="grid grid-cols-2 gap-3 mb-6">
      <a
        href="https://www.irs.gov/individuals/tax-withholding-estimator"
        className="flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-lg px-1 py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IRSIcon />
        <span className="text-gray-600 text-base font-medium text-center leading-snug">
          Withholding <br />
          Calculator
        </span>
      </a>

      {/* Placeholder cell for layout balance */}
      <div aria-hidden="true" />
    </div>

    <h3 className="text-lg text-gray-800 font-semibold">Make a Tax Payment</h3>
    <div className="flex gap-3 mb-8">
      <a
        href="https://www.irs.gov/payments"
        className="flex-1 flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-lg px-1 py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IRSIcon />
        <span className="text-lg text-gray-600 font-medium">Federal</span>
      </a>
      <a
        href="https://epayment.ky.gov/epay"
        className="flex-1 flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-lg px-1 py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <KYDORIcon />
        <span className="text-base text-gray-600 font-medium">Kentucky</span>
      </a>
    </div>

    <h3 className="text-lg text-gray-800 font-semibold">Where's My Refund?</h3>
    <div className="flex gap-3">
      <a
        href="https://www.irs.gov/wheres-my-refund"
        className="flex-1 flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-lg px-1 py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IRSIcon />
        <span className="text-base text-gray-600 font-medium">Federal</span>
      </a>
      <a
        href="https://refund.ky.gov/"
        className="flex-1 flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded-lg px-1 py-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <KYDORIcon />
        <span className="text-base text-gray-600 font-medium">Kentucky</span>
      </a>
    </div>
  </div>
);

export default ResourcesDropdown;
