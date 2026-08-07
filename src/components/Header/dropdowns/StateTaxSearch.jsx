import React, { useMemo, useRef, useState } from "react";
import { stateTaxLinks } from "../../../data/stateTaxLinks";
import "./state-tax-search.css";

console.table(
  stateTaxLinks.filter((item) => !item?.state || !item?.abbreviation),
);

const StateTaxSearch = ({ type, onBack }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const isPayment = type === "payment";

  const title = isPayment ? "State Tax Payment" : "State Refund Status";

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return stateTaxLinks.filter((item) => {
      const state = item?.state?.toLowerCase() ?? "";
      const abbreviation = item?.abbreviation?.toLowerCase() ?? "";

      return state.includes(search) || abbreviation.includes(search);
    });
  }, [query]);

  return (
    <div className="state-tax-search">
      <div className="state-tax-search-header">
        <p className="state-tax-eyebrow">
          {isPayment ? "Payments" : "Refunds"}
        </p>

        <h3 className="state-tax-title">{title}</h3>

        <p className="state-tax-copy">Search by state name or abbreviation.</p>
      </div>

      <div className="state-tax-search-wrap">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search states..."
          className="state-tax-search-input"
          autoFocus
        />
      </div>

      <div className="state-tax-results">
        {!query.trim() && (
          <p className="state-tax-prompt">
            Start typing a state name or abbreviation.
          </p>
        )}

        {results.map((item) => {
          const url = isPayment ? item.paymentUrl : item.refundUrl;

          return (
            <div key={item.abbreviation} className="state-tax-result">
              <div className="state-tax-result-state">
                <span className="state-tax-result-name">{item.state}</span>

                <span className="state-tax-result-abbreviation">
                  {item.abbreviation}
                </span>
              </div>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="state-tax-result-link"
                >
                  {isPayment ? "Make payment" : "Check refund"}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="state-tax-not-applicable">
                  No individual income tax
                </span>
              )}
            </div>
          );
        })}

        {query.trim() && results.length === 0 && (
          <p className="state-tax-empty">No state found.</p>
        )}
      </div>

      <button type="button" className="state-tax-back" onClick={onBack}>
        <span aria-hidden="true">←</span>
        Back to resources
      </button>
    </div>
  );
};

export default StateTaxSearch;
