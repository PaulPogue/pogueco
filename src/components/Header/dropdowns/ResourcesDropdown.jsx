export default function ResourcesDropdown() {
  return (
    <div className="resources-menu resources-menu--columns">
      <section className="resources-menu-column">
        <div className="resources-menu-heading">
          <div className="resources-menu-column-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 5.5C3 4.67 3.67 4 4.5 4H10c1.1 0 2 .9 2 2v14c0-1.1-.9-2-2-2H4.5A1.5 1.5 0 0 0 3 19.5V5.5Z" />
              <path d="M21 5.5C21 4.67 20.33 4 19.5 4H14c-1.1 0-2 .9-2 2v14c0-1.1.9-2 2-2h5.5A1.5 1.5 0 0 1 21 19.5V5.5Z" />
            </svg>
          </div>

          <h3 className="resources-menu-column-title">Guides</h3>
        </div>

        <div className="resources-menu-link-list">
          <a href="/obbba" className="resources-menu-link">
            OBBBA Information
          </a>
        </div>
      </section>

      <section className="resources-menu-column">
        <div className="resources-menu-heading">
          <div className="resources-menu-column-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M8 7h8" />
              <path d="M8 11h2" />
              <path d="M14 11h2" />
              <path d="M8 15h2" />
              <path d="M14 15h2" />
            </svg>
          </div>

          <h3 className="resources-menu-column-title">Calculators</h3>
        </div>

        <div className="resources-menu-link-list">
          <a
            href="https://www.irs.gov/individuals/tax-withholding-estimator"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-menu-link"
          >
            IRS Withholding Calculator
          </a>
        </div>
      </section>

      <section className="resources-menu-column">
        <div className="resources-menu-heading">
          <div className="resources-menu-column-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M3 10h18" />
              <path d="M7 15h3" />
            </svg>
          </div>

          <h3 className="resources-menu-column-title">Make a Payment</h3>
        </div>

        <div className="resources-menu-link-list">
          <a
            href="https://www.irs.gov/payments"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-menu-link"
          >
            Federal Tax Payment
          </a>

          <a
            href="https://epayment.ky.gov/epay"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-menu-link"
          >
            Kentucky Tax Payment
          </a>
        </div>
      </section>

      <section className="resources-menu-column">
        <div className="resources-menu-heading">
          <div className="resources-menu-column-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" />
              <path d="m8.5 11 1.7 1.7 3.3-3.4" />
            </svg>
          </div>

          <h3 className="resources-menu-column-title">Where’s My Refund?</h3>
        </div>

        <div className="resources-menu-link-list">
          <a
            href="https://www.irs.gov/refunds"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-menu-link"
          >
            Federal Refund Status
          </a>

          <a
            href="https://refund.ky.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-menu-link"
          >
            Kentucky Refund Status
          </a>
        </div>
      </section>
    </div>
  );
}
