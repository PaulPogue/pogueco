// src/data/taxFacts2026.js
//
// 2026 federal tax reference data used by the Current Tax Facts page.
// Keep values and source URLs here so the presentation can remain unchanged
// when annual limits are updated.
//
// Primary sources only: IRS and Social Security Administration.

export const taxFacts2026 = {
  year: 2026,
  updated: "August 8, 2026",

  sources: {
    inflationAdjustments: {
      label: "IRS — 2026 tax inflation adjustments",
      url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    },
    retirement: {
      label: "IRS — retirement plan contribution limits",
      url: "https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions",
    },
    socialSecurity: {
      label: "SSA — contribution and benefit base",
      url: "https://www.ssa.gov/oact/cola/cbb.html",
    },
    mileage: {
      label: "IRS — standard mileage rates",
      url: "https://www.irs.gov/tax-professionals/standard-mileage-rates",
    },
    hsa: {
      label: "IRS — 2026 HSA inflation-adjusted amounts",
      url: "https://www.irs.gov/irb/2025-21_IRB",
    },
    estateGift: {
      label: "IRS — estate and gift tax",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax",
    },
    itemizedDeductions: {
      label: "IRS — Should I itemize?",
      url: "https://www.irs.gov/taxtopics/tc501",
    },
    medicalDeductions: {
      label: "IRS — Medical and dental expenses",
      url: "https://www.irs.gov/publications/p502",
    },
    saltDeductions: {
      label: "IRS — 2026 SALT correction and limits",
      url: "https://www.irs.gov/forms-pubs/correction-to-state-and-local-income-tax-deduction-amount-in-the-2026-form-1040-es",
    },
    mortgageInterest: {
      label: "IRS — Home mortgage interest",
      url: "https://www.irs.gov/taxtopics/tc505",
    },
    charitableDeductions: {
      label: "IRS — 2026 charitable deduction rules",
      url: "https://www.irs.gov/publications/p505",
    },
    gamblingDeductions: {
      label: "IRS — 2026 gambling loss limitation",
      url: "https://www.irs.gov/publications/p505",
    },
    casualtyDeductions: {
      label: "IRS — Casualty loss deduction",
      url: "https://www.irs.gov/forms-pubs/casualty-loss-deduction-expanded-and-made-permanent",
    },
    miscellaneousDeductions: {
      label: "IRS — Miscellaneous itemized deductions",
      url: "https://www.irs.gov/irb/2026-04_IRB",
    },
    capitalGains: {
      label: "IRS — 2026 capital gain thresholds",
      url: "https://www.irs.gov/irb/2025-45_IRB",
    },
    niit: {
      label: "IRS — Net Investment Income Tax",
      url: "https://www.irs.gov/taxtopics/tc559",
    },
  },

  standardDeduction: [
    { label: "Single", amount: 16100 },
    { label: "Married filing separately", amount: 16100 },
    { label: "Married filing jointly / surviving spouse", amount: 32200 },
    { label: "Head of household", amount: 24150 },
  ],

  itemizedDeductions: {
    overview:
      "You generally claim either the standard deduction or itemized deductions. Itemizing is usually beneficial only when allowable itemized deductions exceed the standard deduction available for your filing status.",

    medical: {
      label: "Medical & dental expenses",
      floorPercentAGI: 7.5,
      description:
        "Qualifying unreimbursed medical and dental expenses are deductible only to the extent the total exceeds 7.5% of AGI. The deduction is based on expenses actually paid during the year and is reduced by insurance or other reimbursements.",
      examples:
        "Potentially qualifying costs include medical and dental care, prescription drugs, certain insurance premiums paid with after-tax dollars, and eligible travel or transportation for medical care. Cosmetic procedures and most general-health expenses do not qualify.",
    },

    salt: {
      label: "State & local taxes (SALT)",
      limit: 40400,
      mfsLimit: 20200,
      minimumLimit: 10000,
      mfsMinimumLimit: 5000,
      phaseoutStarts: {
        single: 505000,
        headOfHousehold: 505000,
        marriedJoint: 505000,
        qualifyingSurvivingSpouse: 505000,
        marriedSeparate: 252500,
      },
      phaseoutEnds: {
        single: 606333,
        headOfHousehold: 606333,
        marriedJoint: 606333,
        qualifyingSurvivingSpouse: 606333,
        marriedSeparate: 303167,
      },
      phaseoutRatePercent: 30,
      description:
        "The 2026 SALT cap is reduced by 30% of MAGI above the applicable threshold. The deduction cannot be reduced below $10,000 ($5,000 MFS). State and local income taxes or general sales taxes may be included, together with qualifying real and personal property taxes, subject to the combined cap.",
    },

    mortgageInterest: {
      label: "Home mortgage interest",
      acquisitionDebtLimit: 750000,
      mfsAcquisitionDebtLimit: 375000,
      grandfatheredDebtLimit: 1000000,
      grandfatheredMfsLimit: 500000,
      description:
        "Interest on qualified home acquisition debt is generally subject to the $750,000 limit ($375,000 MFS) for debt incurred after Dec. 15, 2017. Older qualifying acquisition debt may use the $1,000,000 limit ($500,000 MFS).",
      useOfProceeds:
        "The debt generally must be secured by the qualified home and used to buy, build, or substantially improve that home. Interest on home-equity borrowing used for personal expenses is generally not deductible as home mortgage interest.",
    },

    charitable: {
      label: "Charitable contributions",
      floorPercentAGI: 0.5,
      publicCharityCashLimitPercentAGI: 60,
      nonItemizerLimit: 1000,
      nonItemizerJointLimit: 2000,
      description:
        "Beginning in 2026, itemizers may deduct only charitable contributions above 0.5% of AGI. Separate percentage-of-AGI limits also apply by contribution type and recipient.",
      substantiation:
        "Documentation requirements still apply. Cash gifts generally require a bank record or written communication from the charity, and contributions of property can require additional records, appraisals, or forms depending on value.",
      nonItemizerNote:
        "A separate 2026 deduction is available for certain cash charitable contributions by non-itemizers, up to $1,000 ($2,000 MFJ). That deduction is not part of Schedule A itemized deductions.",
    },

    gambling: {
      label: "Gambling losses",
      deductiblePercent: 90,
      limitText: "Lesser of 90% of losses or gambling winnings",
      description:
        "Beginning in 2026, deductible gambling losses are limited to the lesser of 90% of gambling losses or gambling winnings. Excess losses cannot create a net gambling loss deduction.",
      reporting:
        "Gambling winnings are generally reported as income even when losses are deductible. The loss deduction does not simply net all gambling activity to zero.",
    },

    casualty: {
      label: "Casualty & disaster losses",
      eventReduction: 100,
      agiFloorPercent: 10,
      description:
        "Personal casualty losses generally require a qualifying disaster connection. Beginning in 2026, the federal rules were expanded to include certain state-declared disasters as well as federally declared disasters, subject to the applicable requirements.",
      standardRule:
        "For personal-use property under the general casualty-loss rules, the loss is generally reduced by $100 per casualty event and then by 10% of AGI after insurance and other reimbursements. Special rules can apply to qualified disaster losses.",
    },

    miscellaneous: {
      label: "Miscellaneous itemized deductions",
      floorPercentAGI: 2,
      description:
        "The disallowance of miscellaneous itemized deductions that would otherwise be subject to the 2%-of-AGI floor was made permanent.",
      examples:
        "For most individual taxpayers, this means items such as unreimbursed employee expenses, investment-management fees, tax-preparation fees, and similar expenses generally do not produce a Schedule A deduction. Limited statutory exceptions can apply.",
    },

    highIncomeLimit: {
      label: "High-income itemized deduction limitation",
      reductionPercent: 5.4,
      thresholds: {
        single: 640600,
        headOfHousehold: 640600,
        marriedJoint: 768700,
        qualifyingSurvivingSpouse: 768700,
        marriedSeparate: 384350,
      },
      description:
        "For 2026, itemized deductions are reduced by 5.4% of the lesser of total itemized deductions or taxable income above the applicable 37% bracket threshold. This overall limitation is applied after other itemized-deduction limitations.",
    },
  },

  capitalGains: [
    {
      filingStatus: "Single",
      zeroRateMax: 49450,
      fifteenRateMax: 545500,
    },
    {
      filingStatus: "Married filing jointly / surviving spouse",
      zeroRateMax: 98900,
      fifteenRateMax: 613700,
    },
    {
      filingStatus: "Head of household",
      zeroRateMax: 66200,
      fifteenRateMax: 579600,
    },
    {
      filingStatus: "Married filing separately",
      zeroRateMax: 49450,
      fifteenRateMax: 306850,
    },
  ],

  niit: {
    rate: 3.8,
    thresholds: [
      { label: "Single / Head of household", amount: 200000 },
      { label: "Married filing jointly / surviving spouse", amount: 250000 },
      { label: "Married filing separately", amount: 125000 },
    ],
    description:
      "NIIT is generally 3.8% of the lesser of net investment income or MAGI above the applicable statutory threshold. The thresholds are not indexed for inflation.",
    incomeExamples:
      "Net investment income can include interest, dividends, capital gains, rental and royalty income, and nonqualified annuity income. Wages and most self-employment income are generally excluded.",
  },

  ordinaryRates: {
    single: [
      { rate: 10, over: 0, through: 12400 },
      { rate: 12, over: 12400, through: 50400 },
      { rate: 22, over: 50400, through: 105700 },
      { rate: 24, over: 105700, through: 201775 },
      { rate: 32, over: 201775, through: 256225 },
      { rate: 35, over: 256225, through: 640600 },
      { rate: 37, over: 640600, through: null },
    ],
    marriedJoint: [
      { rate: 10, over: 0, through: 24800 },
      { rate: 12, over: 24800, through: 100800 },
      { rate: 22, over: 100800, through: 211400 },
      { rate: 24, over: 211400, through: 403550 },
      { rate: 32, over: 403550, through: 512450 },
      { rate: 35, over: 512450, through: 768700 },
      { rate: 37, over: 768700, through: null },
    ],
  },

  retirement: [
    { label: "401(k), 403(b), 457 elective deferral", amount: 24500 },
    { label: "401(k), 403(b), 457 catch-up — age 50+", amount: 8000 },
    { label: "Higher catch-up — ages 60–63", amount: 11250 },
    { label: "Defined contribution plan limit", amount: 72000 },
    { label: "IRA contribution limit", amount: 7500 },
    { label: "IRA catch-up — age 50+", amount: 1100 },
    { label: "SIMPLE employee contribution", amount: 17000 },
    { label: "SIMPLE catch-up — age 50+", amount: 4000 },
    { label: "SEP maximum contribution", amount: 72000 },
    { label: "Annual compensation limit", amount: 360000 },
  ],

  payroll: [
    { label: "Social Security taxable wage base", amount: 184500 },

    { label: "Employee Social Security rate", percent: 6.2 },
    { label: "Employer Social Security rate", percent: 6.2 },
    { label: "Self-employment Social Security rate", percent: 12.4 },

    { label: "Employee Medicare rate", percent: 1.45 },
    { label: "Employer Medicare rate", percent: 1.45 },
    { label: "Self-employment Medicare rate", percent: 2.9 },

    { label: "Medicare taxable wage base", text: "No limit" },

    { label: "Additional Medicare Tax", percent: 0.9 },
    {
      label: "Additional Medicare threshold — Single / HOH / QSS",
      amount: 200000,
    },
    {
      label: "Additional Medicare threshold — Married filing jointly",
      amount: 250000,
    },
    {
      label: "Additional Medicare threshold — Married filing separately",
      amount: 125000,
    },
  ],

  hsa: [
    { label: "HSA contribution — self-only", amount: 4400 },
    { label: "HSA contribution — family", amount: 8750 },
    { label: "HDHP minimum deductible — self-only", amount: 1700 },
    { label: "HDHP minimum deductible — family", amount: 3400 },
    { label: "HDHP out-of-pocket maximum — self-only", amount: 8500 },
    { label: "HDHP out-of-pocket maximum — family", amount: 17000 },
  ],

  mileage: [
    {
      label: "Business",
      periods: [
        { period: "Jan. 1 – Jun. 30", cents: 72.5 },
        { period: "Jul. 1 – Dec. 31", cents: 76.0 },
      ],
    },
    {
      label: "Medical / qualifying moving",
      periods: [
        { period: "Jan. 1 – Jun. 30", cents: 20.5 },
        { period: "Jul. 1 – Dec. 31", cents: 23.5 },
      ],
    },
    {
      label: "Charitable",
      periods: [{ period: "All year", cents: 14.0 }],
    },
  ],

  estateGift: [
    { label: "Estate / lifetime basic exclusion", amount: 15000000 },
    { label: "Annual gift tax exclusion — per donee", amount: 19000 },
  ],

  other: [
    { label: "Alternative minimum tax exemption — unmarried", amount: 90100 },
    { label: "AMT exemption — married filing jointly", amount: 140200 },
    { label: "Foreign earned income exclusion", amount: 132900 },
    { label: "Health FSA salary reduction limit", amount: 3400 },
    { label: "Health FSA maximum carryover", amount: 680 },
    { label: "Qualified transportation / parking monthly limit", amount: 340 },
  ],
};
