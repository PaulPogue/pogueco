import React, { useMemo, useState } from "react";
import "./amortization-calculator.css";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const percent = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 6,
});

const dateLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const FREQUENCIES = {
  monthly: { label: "Monthly", periodsPerYear: 12, monthsPerPeriod: 1 },
  quarterly: { label: "Quarterly", periodsPerYear: 4, monthsPerPeriod: 3 },
  semiannual: { label: "Semiannual", periodsPerYear: 2, monthsPerPeriod: 6 },
  annual: { label: "Annual", periodsPerYear: 1, monthsPerPeriod: 12 },
};

const CORE_FIELDS = [
  "principal",
  "annualRate",
  "numberOfPayments",
  "paymentAmount",
];

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const parseLocalDate = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const addMonths = (date, months) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

const daysBetween = (start, end) => {
  const milliseconds = end.getTime() - start.getTime();
  return Math.round(milliseconds / 86400000);
};

const getTiming = ({ loanDate, firstPaymentDate, frequency }) => {
  const freq = FREQUENCIES[frequency];
  const loan = parseLocalDate(loanDate);
  const first = parseLocalDate(firstPaymentDate);

  if ((loan && !first) || (!loan && first)) {
    return {
      error:
        "Enter both the loan date and first payment date, or leave both blank.",
    };
  }

  if (!loan && !first) {
    return {
      loanDate: null,
      firstPaymentDate: null,
      regularPeriodStart: null,
      daysToFirstPayment: null,
      oddDays: 0,
      hasOddPeriod: false,
    };
  }

  const daysToFirstPayment = daysBetween(loan, first);

  if (daysToFirstPayment < 0) {
    return {
      error: "First payment date cannot be before the loan date.",
    };
  }

  const regularPeriodStart = addMonths(first, -freq.monthsPerPeriod);
  const oddDays = daysBetween(loan, regularPeriodStart);

  return {
    loanDate: loan,
    firstPaymentDate: first,
    regularPeriodStart,
    daysToFirstPayment,
    oddDays,
    hasOddPeriod: oddDays !== 0,
  };
};

const regularPeriodicRate = (annualRatePercent, frequency) => {
  const freq = FREQUENCIES[frequency];
  return annualRatePercent / 100 / freq.periodsPerYear;
};

const capitalizationFactor = (annualRatePercent, timing) => {
  if (!timing.loanDate || !timing.hasOddPeriod) {
    return 1;
  }

  // Simple Actual/365 accrual for the period before the regular
  // amortization period begins. A negative odd period produces a
  // corresponding reduction in the amortizing balance.
  return 1 + (annualRatePercent / 100) * (timing.oddDays / 365);
};

const paymentFor = ({ principal, annualRate, periods, frequency, timing }) => {
  if (periods <= 0 || principal <= 0) return null;

  const periodicRate = regularPeriodicRate(annualRate, frequency);
  const amortizingBalance =
    principal * capitalizationFactor(annualRate, timing);

  if (amortizingBalance <= 0) return null;

  if (periodicRate === 0) {
    return amortizingBalance / periods;
  }

  return (
    (amortizingBalance * periodicRate) /
    (1 - Math.pow(1 + periodicRate, -periods))
  );
};

const principalFor = ({ payment, annualRate, periods, frequency, timing }) => {
  if (periods <= 0 || payment <= 0) return null;

  const periodicRate = regularPeriodicRate(annualRate, frequency);

  let amortizingBalance;

  if (periodicRate === 0) {
    amortizingBalance = payment * periods;
  } else {
    amortizingBalance =
      (payment * (1 - Math.pow(1 + periodicRate, -periods))) / periodicRate;
  }

  const factor = capitalizationFactor(annualRate, timing);

  if (factor <= 0) return null;

  return amortizingBalance / factor;
};

const periodsFor = ({ principal, payment, annualRate, frequency, timing }) => {
  if (principal <= 0 || payment <= 0) return null;

  for (let periods = 1; periods <= 5000; periods += 1) {
    const requiredPayment = paymentFor({
      principal,
      annualRate,
      periods,
      frequency,
      timing,
    });

    if (
      Number.isFinite(requiredPayment) &&
      requiredPayment <= payment + 0.000001
    ) {
      return periods;
    }
  }

  return null;
};

const annualRateFor = ({ principal, payment, periods, frequency, timing }) => {
  if (principal <= 0 || payment <= 0 || periods <= 0) return null;

  const zeroRatePayment = principal / periods;

  if (Math.abs(payment - zeroRatePayment) < 0.0000001) {
    return 0;
  }

  if (payment < zeroRatePayment) {
    return null;
  }

  let low = 0;
  let high = 1000;

  for (let iteration = 0; iteration < 240; iteration += 1) {
    const mid = (low + high) / 2;

    const calculatedPayment = paymentFor({
      principal,
      annualRate: mid,
      periods,
      frequency,
      timing,
    });

    if (!Number.isFinite(calculatedPayment)) return null;

    if (calculatedPayment > payment) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return (low + high) / 2;
};

const solveLoan = (form) => {
  const timing = getTiming(form);

  if (timing.error) return { error: timing.error };

  const principal = toNumber(form.principal);
  const annualRate = toNumber(form.annualRate);
  const numberOfPayments = toNumber(form.numberOfPayments);
  const paymentAmount = toNumber(form.paymentAmount);

  const values = [principal, annualRate, numberOfPayments, paymentAmount];

  const missingIndexes = values
    .map((value, index) => (value === null ? index : null))
    .filter((value) => value !== null);

  if (missingIndexes.length !== 1) {
    return {
      error:
        "Leave exactly one of the four core fields blank so the calculator can solve for it.",
    };
  }

  if (principal !== null && principal <= 0) {
    return { error: "Loan amount must be greater than zero." };
  }

  if (annualRate !== null && annualRate < 0) {
    return { error: "Interest rate cannot be negative." };
  }

  if (numberOfPayments !== null && numberOfPayments <= 0) {
    return { error: "Number of payments must be greater than zero." };
  }

  if (paymentAmount !== null && paymentAmount <= 0) {
    return { error: "Payment amount must be greater than zero." };
  }

  const missing = missingIndexes[0];

  let solvedPrincipal = principal;
  let solvedAnnualRate = annualRate;
  let solvedPeriods = numberOfPayments;
  let solvedPayment = paymentAmount;

  if (missing === 0) {
    solvedPrincipal = principalFor({
      payment: paymentAmount,
      annualRate,
      periods: numberOfPayments,
      frequency: form.frequency,
      timing,
    });
  }

  if (missing === 1) {
    solvedAnnualRate = annualRateFor({
      principal,
      payment: paymentAmount,
      periods: numberOfPayments,
      frequency: form.frequency,
      timing,
    });

    if (solvedAnnualRate === null) {
      return {
        error:
          "Those values do not produce a valid nonnegative interest rate. Check the payment amount and number of payments.",
      };
    }
  }

  if (missing === 2) {
    solvedPeriods = periodsFor({
      principal,
      payment: paymentAmount,
      annualRate,
      frequency: form.frequency,
      timing,
    });

    if (solvedPeriods === null) {
      return {
        error:
          "The payment is not large enough to amortize the loan with the values entered.",
      };
    }
  }

  if (missing === 3) {
    solvedPayment = paymentFor({
      principal,
      annualRate,
      periods: numberOfPayments,
      frequency: form.frequency,
      timing,
    });
  }

  if (
    !Number.isFinite(solvedPrincipal) ||
    !Number.isFinite(solvedAnnualRate) ||
    !Number.isFinite(solvedPeriods) ||
    !Number.isFinite(solvedPayment)
  ) {
    return {
      error: "Unable to solve the loan with the values entered.",
    };
  }

  return {
    principal: solvedPrincipal,
    annualRate: solvedAnnualRate,
    numberOfPayments: Math.ceil(solvedPeriods),
    paymentAmount: solvedPayment,
    solvedField: CORE_FIELDS[missing],
    timing,
  };
};

const buildSchedule = ({
  principal,
  annualRate,
  numberOfPayments,
  paymentAmount,
  timing,
  extraPayment,
  frequency,
}) => {
  const freq = FREQUENCIES[frequency];
  const periodicRate = regularPeriodicRate(annualRate, frequency);
  const extra = Math.max(toNumber(extraPayment) || 0, 0);

  const factor = capitalizationFactor(annualRate, timing);
  const amortizingBalance = principal * factor;
  const capitalizedInterest = amortizingBalance - principal;

  let balance = amortizingBalance;
  let scheduledInterest = 0;
  let totalPaid = 0;

  const paymentRows = [];
  const yearly = new Map();

  const firstDate = timing.firstPaymentDate
    ? timing.firstPaymentDate
    : addMonths(new Date(), freq.monthsPerPeriod);

  for (
    let period = 1;
    period <= Math.min(numberOfPayments, 5000) && balance > 0.005;
    period += 1
  ) {
    const interest = balance * periodicRate;
    const scheduledPrincipal = paymentAmount - interest;

    if (scheduledPrincipal <= 0 && extra <= 0) {
      return {
        error:
          "The payment is not large enough to amortize the loan at this interest rate.",
      };
    }

    let principalPaid = Math.max(scheduledPrincipal, 0) + extra;

    if (principalPaid > balance) {
      principalPaid = balance;
    }

    const extraApplied = Math.min(
      extra,
      Math.max(principalPaid - Math.max(scheduledPrincipal, 0), 0),
    );

    const actualPayment = interest + principalPaid;

    balance = Math.max(balance - principalPaid, 0);
    scheduledInterest += interest;
    totalPaid += actualPayment;

    const paymentDate = addMonths(
      firstDate,
      (period - 1) * freq.monthsPerPeriod,
    );

    const year = paymentDate.getFullYear();

    if (!yearly.has(year)) {
      yearly.set(year, {
        year,
        payment: 0,
        principal: 0,
        interest: 0,
        extra: 0,
        endingBalance: balance,
      });
    }

    const yearSummary = yearly.get(year);

    yearSummary.payment += actualPayment;
    yearSummary.principal += principalPaid;
    yearSummary.interest += interest;
    yearSummary.extra += extraApplied;
    yearSummary.endingBalance = balance;

    paymentRows.push({
      type: "payment",
      number: period,
      date: paymentDate,
      payment: actualPayment,
      principal: principalPaid,
      interest,
      extra: extraApplied,
      balance,
      year,
    });

    if (balance <= 0.005) break;
  }

  const rows = [];
  let runningPayment = 0;
  let runningPrincipal = 0;
  let runningInterest = 0;
  let runningExtra = 0;

  for (const [year, summary] of yearly) {
    paymentRows
      .filter((row) => row.year === year)
      .forEach((row) => rows.push(row));

    runningPayment += summary.payment;
    runningPrincipal += summary.principal;
    runningInterest += summary.interest;
    runningExtra += summary.extra;

    rows.push({
      type: "year-total",
      year,
      label: `${year} totals`,
      payment: summary.payment,
      principal: summary.principal,
      interest: summary.interest,
      extra: summary.extra,
      balance: summary.endingBalance,
    });

    rows.push({
      type: "running-total",
      year,
      label: "Running totals",
      payment: runningPayment,
      principal: runningPrincipal,
      interest: runningInterest,
      extra: runningExtra,
      balance: summary.endingBalance,
    });
  }

  return {
    rows,
    paymentRows,
    capitalizedInterest,
    amortizingBalance,
    scheduledInterest,
    totalInterest: scheduledInterest + capitalizedInterest,
    totalPaid,
    payoffPeriods: paymentRows.length,
    payoffDate: paymentRows[paymentRows.length - 1]?.date ?? firstDate,
  };
};

const formatAmountEntry = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(String(value).replace(/,/g, ""));
  if (!Number.isFinite(number)) return value;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export default function AmortizationCalculator() {
  const [form, setForm] = useState({
    principal: "",
    annualRate: "",
    numberOfPayments: "",
    paymentAmount: "",
    frequency: "monthly",
    loanDate: "",
    firstPaymentDate: "",
    pointsPercent: "",
    loanFees: "",
    extraPayment: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [principalFocused, setPrincipalFocused] = useState(false);

  const solved = useMemo(() => {
    if (!submitted) return null;
    return solveLoan(form);
  }, [form, submitted]);

  const schedule = useMemo(() => {
    if (!solved || solved.error) return null;

    return buildSchedule({
      ...solved,
      extraPayment: form.extraPayment,
      frequency: form.frequency,
    });
  }, [solved, form.extraPayment, form.frequency]);

  const financing = useMemo(() => {
    if (!solved || solved.error) return null;

    const pointsPercent = Math.max(toNumber(form.pointsPercent) || 0, 0);
    const fees = Math.max(toNumber(form.loanFees) || 0, 0);

    const pointsAmount = solved.principal * (pointsPercent / 100);
    const totalFinancingCosts = pointsAmount + fees;
    const netProceeds = solved.principal - totalFinancingCosts;

    return {
      pointsPercent,
      pointsAmount,
      fees,
      totalFinancingCosts,
      netProceeds,
    };
  }, [solved, form.pointsPercent, form.loanFees]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleReset = () => {
    setForm({
      principal: "",
      annualRate: "",
      numberOfPayments: "",
      paymentAmount: "",
      frequency: "monthly",
      loanDate: "",
      firstPaymentDate: "",
      pointsPercent: "",
      loanFees: "",
      extraPayment: "",
    });

    setSubmitted(false);
  };

  const solvedValue = (() => {
    if (!solved || solved.error) return null;

    switch (solved.solvedField) {
      case "principal":
        return money.format(solved.principal);
      case "annualRate":
        return `${percent.format(solved.annualRate)}%`;
      case "numberOfPayments":
        return `${solved.numberOfPayments} payments`;
      case "paymentAmount":
        return money.format(solved.paymentAmount);
      default:
        return null;
    }
  })();

  const solvedLabel = {
    principal: "Solved loan amount",
    annualRate: "Solved annual interest rate",
    numberOfPayments: "Solved number of payments",
    paymentAmount: "Solved payment amount",
  }[solved?.solvedField];

  return (
    <section className="amortization-tool">
      <div className="amortization-tool-header">
        <p className="amortization-tool-eyebrow">Calculator</p>

        <h1>Amortization Schedule Builder</h1>

        <p>
          Enter three of the four core loan values and leave one blank. The
          calculator solves for the missing value, capitalizes any
          deferred-period interest into the amortizing balance, and builds a
          complete amortization schedule.
        </p>
      </div>

      <form
        className="amortization-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="amortization-core-grid">
          <label className="amortization-field">
            <span>Loan amount</span>

            <div className="amortization-input-prefix">
              <span aria-hidden="true">$</span>

              <input
                name="principal"
                type={principalFocused ? "number" : "text"}
                inputMode="decimal"
                min={principalFocused ? "0" : undefined}
                step={principalFocused ? "0.01" : undefined}
                value={
                  principalFocused
                    ? form.principal
                    : formatAmountEntry(form.principal)
                }
                onFocus={() => setPrincipalFocused(true)}
                onBlur={() => setPrincipalFocused(false)}
                onChange={handleChange}
                placeholder="Leave blank to solve"
              />
            </div>
          </label>

          <label className="amortization-field">
            <span>Number of payments</span>

            <input
              name="numberOfPayments"
              type="number"
              min="1"
              step="1"
              value={form.numberOfPayments}
              onChange={handleChange}
              placeholder="Leave blank to solve"
            />
          </label>

          <label className="amortization-field">
            <span>Annual interest rate</span>

            <div className="amortization-input-suffix">
              <input
                name="annualRate"
                type="number"
                min="0"
                step="0.001"
                value={form.annualRate}
                onChange={handleChange}
                placeholder="Leave blank to solve"
              />

              <span aria-hidden="true">%</span>
            </div>
          </label>

          <label className="amortization-field">
            <span>Payment amount</span>

            <div className="amortization-input-prefix">
              <span aria-hidden="true">$</span>

              <input
                name="paymentAmount"
                type="number"
                min="0"
                step="0.01"
                value={form.paymentAmount}
                onChange={handleChange}
                placeholder="Leave blank to solve"
              />
            </div>
          </label>
        </div>

        <p className="amortization-form-note">
          Leave exactly one core field blank. Enter zero only when zero is the
          actual value.
        </p>

        <div className="amortization-section-label">
          <span>Timing</span>
        </div>

        <div className="amortization-options-grid">
          <label className="amortization-field">
            <span>Loan date</span>

            <input
              name="loanDate"
              type="date"
              value={form.loanDate}
              onChange={handleChange}
            />
          </label>

          <label className="amortization-field">
            <span>First payment date</span>

            <input
              name="firstPaymentDate"
              type="date"
              value={form.firstPaymentDate}
              onChange={handleChange}
            />
          </label>

          <label className="amortization-field">
            <span>Payment frequency</span>

            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
            >
              {Object.entries(FREQUENCIES).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="amortization-field">
            <span>Extra payment each period</span>

            <div className="amortization-input-prefix">
              <span aria-hidden="true">$</span>

              <input
                name="extraPayment"
                type="number"
                min="0"
                step="0.01"
                value={form.extraPayment}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </label>
        </div>

        <div className="amortization-section-label">
          <span>Loan costs</span>
        </div>

        <div className="amortization-options-grid">
          <label className="amortization-field">
            <span>Points</span>

            <div className="amortization-input-suffix">
              <input
                name="pointsPercent"
                type="number"
                min="0"
                step="0.001"
                value={form.pointsPercent}
                onChange={handleChange}
                placeholder="0.000"
              />

              <span aria-hidden="true">%</span>
            </div>
          </label>

          <label className="amortization-field">
            <span>Other loan fees</span>

            <div className="amortization-input-prefix">
              <span aria-hidden="true">$</span>

              <input
                name="loanFees"
                type="number"
                min="0"
                step="0.01"
                value={form.loanFees}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </label>
        </div>

        <div className="amortization-actions">
          <div className="amortization-input-actions">
            <button type="submit" className="amortization-primary-button">
              Calculate
            </button>

            <button
              type="button"
              className="amortization-secondary-button"
              onClick={handleReset}
            >
              Clear
            </button>
          </div>

          {solved && !solved.error && schedule && !schedule.error && (
            <div className="amortization-output-actions">
              <button
                type="button"
                className="amortization-secondary-button"
                onClick={() => window.print()}
              >
                Print schedule
              </button>
            </div>
          )}
        </div>
      </form>

      {submitted && solved?.error && (
        <p className="amortization-error">{solved.error}</p>
      )}

      {submitted && schedule?.error && (
        <p className="amortization-error">{schedule.error}</p>
      )}

      {solved && !solved.error && schedule && !schedule.error && financing && (
        <div className="amortization-results">
          <div className="amortization-print-header">
            <div>
              <div className="amortization-print-firm">
                Pogue & Company CPAs PLLC
              </div>
              <div className="amortization-print-title">
                Amortization Schedule
              </div>
            </div>

            <div className="amortization-print-meta">
              Prepared {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="amortization-solved-banner">
            <span>{solvedLabel}</span>
            <strong>{solvedValue}</strong>
          </div>

          <div className="amortization-summary">
            <div>
              <span>Loan amount</span>
              <strong>{money.format(solved.principal)}</strong>
            </div>

            <div>
              <span>Interest rate</span>
              <strong>{percent.format(solved.annualRate)}%</strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>{money.format(solved.paymentAmount)}</strong>
            </div>

            <div>
              <span>Payments</span>
              <strong>{solved.numberOfPayments}</strong>
            </div>

            <div>
              <span>Total interest</span>
              <strong>{money.format(schedule.totalInterest)}</strong>
              {Math.abs(schedule.capitalizedInterest) > 0.005 && (
                <small>
                  Includes {money.format(schedule.capitalizedInterest)}{" "}
                  capitalized
                </small>
              )}
            </div>

            <div>
              <span>Estimated payoff</span>
              <strong>{dateLabel.format(schedule.payoffDate)}</strong>
              <small>{schedule.payoffPeriods} actual payments</small>
            </div>
          </div>

          {(solved.timing.loanDate || financing.totalFinancingCosts > 0) && (
            <div className="amortization-detail-grid">
              {solved.timing.loanDate && (
                <div className="amortization-detail-panel">
                  <p className="amortization-tool-eyebrow">
                    First payment period
                  </p>

                  <div className="amortization-detail-list">
                    <div>
                      <span>Loan date</span>
                      <strong>
                        {dateLabel.format(solved.timing.loanDate)}
                      </strong>
                    </div>

                    <div>
                      <span>First payment date</span>
                      <strong>
                        {dateLabel.format(solved.timing.firstPaymentDate)}
                      </strong>
                    </div>

                    <div>
                      <span>Regular period begins</span>
                      <strong>
                        {dateLabel.format(solved.timing.regularPeriodStart)}
                      </strong>
                    </div>

                    <div>
                      <span>Days to first payment</span>
                      <strong>{solved.timing.daysToFirstPayment} days</strong>
                    </div>

                    <div>
                      <span>Deferred / odd period</span>
                      <strong>{Math.abs(solved.timing.oddDays)} days</strong>
                    </div>

                    <div>
                      <span>
                        {solved.timing.oddDays >= 0
                          ? "Capitalized interest"
                          : "Short-period interest adjustment"}
                      </span>
                      <strong>
                        {money.format(schedule.capitalizedInterest)}
                      </strong>
                    </div>

                    <div className="amortization-detail-emphasis">
                      <span>Adjusted amortizing balance</span>
                      <strong>
                        {money.format(schedule.amortizingBalance)}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {financing.totalFinancingCosts > 0 && (
                <div className="amortization-detail-panel">
                  <p className="amortization-tool-eyebrow">Loan proceeds</p>

                  <div className="amortization-detail-list">
                    <div>
                      <span>Gross loan amount</span>
                      <strong>{money.format(solved.principal)}</strong>
                    </div>

                    <div>
                      <span>
                        Points ({percent.format(financing.pointsPercent)}%)
                      </span>
                      <strong>{money.format(financing.pointsAmount)}</strong>
                    </div>

                    <div>
                      <span>Other loan fees</span>
                      <strong>{money.format(financing.fees)}</strong>
                    </div>

                    <div>
                      <span>Total financing costs</span>
                      <strong>
                        {money.format(financing.totalFinancingCosts)}
                      </strong>
                    </div>

                    <div className="amortization-detail-emphasis">
                      <span>Net loan proceeds</span>
                      <strong>{money.format(financing.netProceeds)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {solved.timing.hasOddPeriod && (
            <p className="amortization-assumption-note">
              Interest attributable to the period before the regular
              amortization period begins is calculated using simple Actual / 365
              and capitalized into the amortizing balance. No separate
              odd-period interest payment is assumed.
            </p>
          )}

          <div className="amortization-schedule-heading">
            <div>
              <p className="amortization-tool-eyebrow">Schedule</p>

              <h2>Payment detail</h2>
            </div>
          </div>

          <div className="amortization-table-wrap">
            <table className="amortization-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Extra</th>
                  <th>Balance</th>
                </tr>
              </thead>

              <tbody>
                {schedule.rows.map((row, index) => {
                  if (row.type === "payment") {
                    return (
                      <tr key={`payment-${row.number}`}>
                        <td>{row.number}</td>
                        <td>{dateLabel.format(row.date)}</td>
                        <td>{money.format(row.payment)}</td>
                        <td>{money.format(row.interest)}</td>
                        <td>{money.format(row.principal)}</td>
                        <td>{money.format(row.extra)}</td>
                        <td>{money.format(row.balance)}</td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={`${row.type}-${row.year}-${index}`}
                      className={`amortization-${row.type}`}
                    >
                      <td colSpan="2">{row.label}</td>
                      <td>{money.format(row.payment)}</td>
                      <td>{money.format(row.interest)}</td>
                      <td>{money.format(row.principal)}</td>
                      <td>{money.format(row.extra)}</td>
                      <td>{money.format(row.balance)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="amortization-disclaimer">
            <strong>Disclaimer:</strong> This calculator is provided for general
            informational and planning purposes only. Results are estimates and
            may differ from actual loan terms or lender calculations due to
            differences in interest accrual, day-count conventions, compounding,
            payment timing, fees, rounding, and treatment of deferred or
            odd-period interest. Consult your loan documents or lender for
            actual payment and payoff information.
          </p>
        </div>
      )}
    </section>
  );
}
