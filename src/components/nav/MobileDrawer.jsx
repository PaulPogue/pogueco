import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  // Prevent the page behind the drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-md
                   text-[var(--firmBlue)] transition
                   hover:bg-blue-50"
      >
        <FaBars size={24} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 cursor-default bg-black/40"
          onClick={closeDrawer}
        />
      )}

      <aside
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(21rem,88vw)]
                    flex-col overflow-y-auto bg-[#010e71] shadow-2xl
                    transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
            Menu
          </span>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-md
                       text-white transition hover:bg-white/10"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="px-6 pt-5">
          <a
            href="https://pogue.clientportal.com/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md
               bg-[#ebf1ff] px-5 py-3.5 text-sm font-semibold
               uppercase tracking-[-0.01em] text-[var(--firmBlue)]"
          >
            <FaUser size={14} />
            Client Portal
          </a>
        </div>

        <nav className="flex flex-col px-6 py-7 text-white">
          <MobileSection title="SERVICES">
            <MobileLink href="/services/accounting" onClick={closeDrawer}>
              Accounting
            </MobileLink>

            <MobileLink href="/services/tax" onClick={closeDrawer}>
              Tax
            </MobileLink>

            <MobileLink href="/services/payroll" onClick={closeDrawer}>
              Payroll
            </MobileLink>

            <MobileLink href="/services/advisory" onClick={closeDrawer}>
              Advisory
            </MobileLink>
          </MobileSection>

          <MobileSection title="RESOURCES">
            <MobileGroup title="Tax Resources">
              <MobileLink
                href="/resources/current-tax-facts"
                onClick={closeDrawer}
              >
                Current Tax Facts
              </MobileLink>

              <MobileLink
                href="/resources/itemized-deductions"
                onClick={closeDrawer}
              >
                Should I Itemize?
              </MobileLink>

              <MobileLink
                href="/resources/do-i-have-to-file"
                onClick={closeDrawer}
              >
                Am I Required to File a Tax Return?
              </MobileLink>
            </MobileGroup>

            <MobileGroup title="Calculators">
              <MobileLink
                href="https://www.irs.gov/individuals/tax-withholding-estimator"
                external
                onClick={closeDrawer}
              >
                IRS Withholding Calculator
              </MobileLink>

              <MobileLink href="/resources/amortization" onClick={closeDrawer}>
                Amortization Schedule Builder
              </MobileLink>
            </MobileGroup>

            <MobileGroup title="Make a Payment">
              <MobileLink
                href="https://www.irs.gov/payments"
                external
                onClick={closeDrawer}
              >
                Federal Tax Payment
              </MobileLink>

              <MobileLink
                href="https://epayment.ky.gov/epay"
                external
                onClick={closeDrawer}
              >
                Kentucky Tax Payment
              </MobileLink>
            </MobileGroup>

            <MobileGroup title="Refunds">
              <MobileLink
                href="https://www.irs.gov/refunds"
                external
                onClick={closeDrawer}
              >
                Federal Refund Status
              </MobileLink>

              <MobileLink
                href="https://refund.ky.gov/"
                external
                onClick={closeDrawer}
              >
                Kentucky Refund Status
              </MobileLink>
            </MobileGroup>
          </MobileSection>

          <a
            href="/contact"
            onClick={closeDrawer}
            className="mt-2 rounded-md px-3 py-2.5 text-lg transition hover:bg-white/10"
          >
            CONTACT
          </a>
        </nav>
      </aside>
    </>
  );
};

const MobileSection = ({ title, children }) => (
  <section className="mt-4  pt-5">
    <h2 className="px-3 text-lg font-medium text-white">{title}</h2>

    <div className="mt-2 flex flex-col gap-1">{children}</div>
  </section>
);

const MobileGroup = ({ title, children }) => (
  <div className="mt-4">
    <h3 className="px-3 text-xs font-semibold uppercase tracking-[0.15em] text-blue-200">
      {title}
    </h3>

    <div className="mt-1 flex flex-col gap-1">{children}</div>
  </div>
);

const MobileLink = ({ href, external = false, onClick, children }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    onClick={onClick}
    className="flex w-fit items-start gap-2 rounded-md px-3 py-2
               text-[0.95rem] leading-5 text-white/85"
  >
    <span
      aria-hidden="true"
      className="mt-[0.15rem] shrink-0 text-[0.8rem] text-[#9fc3ff]"
    >
      →
    </span>

    <span>{children}</span>
  </a>
);

export default MobileDrawer;
