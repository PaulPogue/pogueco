import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="text-white p-2"
      >
        <FaBars size={28} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#010e71] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex flex-col px-8 gap-6 text-white text-xl font-light">
          <a href="/obbba" onClick={() => setOpen(false)}>
            OBBBA
          </a>

          <div className="flex flex-col gap-2">
            <p className="text-white text-xl">Resources</p>
            <div className="flex flex-col gap-1 pl-4  mt-1">
              <p className="text-xs uppercase tracking-widest text-blue-200 mt-2 mb-1">
                Calculators
              </p>
              <a
                href="https://www.irs.gov/individuals/tax-withholding-estimator"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base text-white/90 font-light pl-3 bg-white/10 rounded-md px-3 py-1"
              >
                IRS Withholding Calculator
              </a>

              <p className="text-xs uppercase tracking-widest text-blue-200 mt-3 mb-1">
                Make a Tax Payment
              </p>
              <a
                href="https://www.irs.gov/payments"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base text-white/90 font-light pl-3 bg-white/10 rounded-md px-3 py-1"
              >
                Federal
              </a>
              <a
                href="https://epayment.ky.gov/epay"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base text-white/90 font-light pl-3 bg-white/10 rounded-md px-3 py-1"
              >
                Kentucky
              </a>

              <p className="text-xs uppercase tracking-widest text-blue-200 mt-3 mb-1">
                Where's My Refund?
              </p>
              <a
                href="https://www.irs.gov/refunds"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base text-white/90 font-light pl-3 bg-white/10 rounded-md px-3 py-1"
              >
                Federal
              </a>
              <a
                href="https://refund.ky.gov/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base text-white/90 font-light pl-3 bg-white/10 rounded-md px-3 py-1"
              >
                Kentucky
              </a>
            </div>
          </div>

          <a href="/contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>

        <div className="mt-auto px-8 pb-12">
          <a
            href="https://sullivancurry.clientportal.com/#/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#ebf1ff", color: "#0d47a1" }}
            className="flex items-center gap-2 rounded-lg px-5 py-3 font-normal text-lg w-full justify-center"
          >
            <FaUser />
            CLIENT PORTAL
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
