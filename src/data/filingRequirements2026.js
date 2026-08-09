export const filingRequirements2026 = {
  year: 2026,
  updated: "August 8, 2026",
  sources: {
    pub505: "https://www.irs.gov/publications/p505",
    filingCheck:
      "https://www.irs.gov/individuals/check-if-you-need-to-file-a-tax-return",
    socialSecurity: "https://www.irs.gov/taxtopics/tc423",
    socialSecurityFAQ: "https://www.irs.gov/faqs/social-security-income",
    selfEmployment:
      "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
    pub501: "https://www.irs.gov/publications/p501",
  },
  regular: [
    { status: "Single", under65: 16100, age65: 18150 },
    { status: "Head of household", under65: 24150, age65: 26200 },
    {
      status: "Married filing jointly",
      under65: 32200,
      age65: 33850,
      both65: 35500,
    },
    { status: "Qualifying surviving spouse", under65: 32200, age65: 33850 },
  ],
  socialSecurity: {
    baseAmounts: [
      {
        status: "Single / Head of household / Qualifying surviving spouse",
        amount: 25000,
      },
      { status: "Married filing jointly", amount: 32000 },
      {
        status: "Married filing separately — lived apart all year",
        amount: 25000,
      },
      {
        status: "Married filing separately — lived with spouse during year",
        amount: 0,
      },
    ],
  },
  selfEmployment: { netEarningsThreshold: 400 },
  dependentLatestPublished: { taxYear: 2025 },
};
