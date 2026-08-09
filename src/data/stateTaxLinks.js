// stateTaxLinks.js
//
// Official state Department of Revenue links for individual income tax:
//   paymentUrl — where a taxpayer goes to make an income tax payment
//   refundUrl  — where a taxpayer goes to check refund status
//
// Notes:
//  - Nine jurisdictions have no individual income tax, so both fields are null
//    (AK, FL, NV, SD, TX, WA, WY, plus TN and NH, which have fully phased out
//    their limited investment-income taxes). These are intentionally null.
//  - Most states run BOTH actions through a single unified portal, so many
//    paymentUrl/refundUrl pairs point to the same portal by design.
//  - TIME-SENSITIVE: Kentucky and Maryland are actively migrating portals in
//    2026 (see inline comments). Re-verify those two before launch.
//  - These are client-facing links — recommend a click-test of each before
//    going live.

export const stateTaxLinks = [
  {
    state: "Alabama",
    abbreviation: "AL",
    paymentUrl: "https://myalabamataxes.alabama.gov/",
    refundUrl: "https://myalabamataxes.alabama.gov/",
  },
  {
    state: "Alaska",
    abbreviation: "AK",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "Arizona",
    abbreviation: "AZ",
    paymentUrl: "https://aztaxes.gov/Home/PaymentIndividual",
    refundUrl: "https://aztaxes.gov/Home/CheckRefund",
  },
  {
    state: "Arkansas",
    abbreviation: "AR",
    paymentUrl: "https://atap.arkansas.gov/",
    refundUrl: "https://atap.arkansas.gov/",
  },
  {
    state: "California",
    abbreviation: "CA",
    paymentUrl: "https://www.ftb.ca.gov/pay/index.html",
    refundUrl: "https://www.ftb.ca.gov/refund/index.asp",
  },
  {
    state: "Colorado",
    abbreviation: "CO",
    paymentUrl: "https://tax.colorado.gov/pay-by-credit-debit-echeck",
    refundUrl: "https://tax.colorado.gov/refund",
  },
  {
    state: "Connecticut",
    abbreviation: "CT",
    paymentUrl: "https://drs.ct.gov/eservices/",
    refundUrl: "https://drs.ct.gov/eservices/",
  },
  {
    state: "Delaware",
    abbreviation: "DE",
    paymentUrl: "https://tax.delaware.gov/",
    refundUrl: "https://tax.delaware.gov/",
  },
  {
    state: "District of Columbia",
    abbreviation: "DC",
    paymentUrl: "https://mytax.dc.gov/",
    refundUrl: "https://mytax.dc.gov/",
  },
  {
    state: "Florida",
    abbreviation: "FL",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "Georgia",
    abbreviation: "GA",
    paymentUrl: "https://gtc.dor.ga.gov/",
    refundUrl: "https://dor.georgia.gov/taxes/check-my-refund-status",
  },
  {
    state: "Hawaii",
    abbreviation: "HI",
    paymentUrl: "https://hitax.hawaii.gov/",
    refundUrl: "https://hitax.hawaii.gov/",
  },
  {
    state: "Idaho",
    abbreviation: "ID",
    paymentUrl: "https://tax.idaho.gov/online-services/e-pay/",
    refundUrl:
      "https://tax.idaho.gov/taxes/income-tax/individual-income/refund/",
  },
  {
    state: "Illinois",
    abbreviation: "IL",
    paymentUrl: "https://mytax.illinois.gov/",
    refundUrl: "https://mytax.illinois.gov/",
  },
  {
    state: "Indiana",
    abbreviation: "IN",
    paymentUrl: "https://intime.dor.in.gov/",
    refundUrl: "https://intime.dor.in.gov/",
  },
  {
    state: "Iowa",
    abbreviation: "IA",
    paymentUrl: "https://govconnect.iowa.gov/",
    refundUrl: "https://tax.iowa.gov/wheres-my-refund",
  },
  {
    state: "Kansas",
    abbreviation: "KS",
    paymentUrl: "https://www.kdor.ks.gov/apps/kcsc/",
    refundUrl: "https://www.kdor.ks.gov/apps/refundstatus/",
  },
  {
    state: "Kentucky",
    abbreviation: "KY",
    // MIGRATION: KY DOR is moving to the MyTaxes.ky.gov portal; individual
    // income tax is NOT on MyTaxes yet, so payments route through the DOR
    // Make-a-Payment page below. Re-verify once individual IIT goes live on MyTaxes.
    paymentUrl:
      "https://revenue.ky.gov/Individual/Individual-Income-Tax/Pages/default.aspx",
    refundUrl: "https://refund.ky.gov/",
  },
  {
    state: "Louisiana",
    abbreviation: "LA",
    paymentUrl: "https://latap.revenue.louisiana.gov/",
    refundUrl: "https://esweb.revenue.louisiana.gov/refundstatus/",
  },
  {
    state: "Maine",
    abbreviation: "ME",
    paymentUrl: "https://mainetaxportal.maine.gov/",
    refundUrl: "https://revenue.maine.gov/_/#2",
  },
  {
    state: "Maryland",
    abbreviation: "MD",
    // MIGRATION: Maryland Tax Connect for Individuals launches Sept 1, 2026,
    // replacing iFile/legacy bill-pay. Both links point to the Comptroller's
    // individual hub; re-verify the specific portal URLs after the Sept 1 cutover.
    paymentUrl: "https://www.marylandcomptroller.gov/individuals/",
    refundUrl: "https://www.marylandcomptroller.gov/individuals/",
  },
  {
    state: "Massachusetts",
    abbreviation: "MA",
    paymentUrl: "https://mtc.dor.state.ma.us/mtc/_/",
    refundUrl: "https://mtc.dor.state.ma.us/mtc/_/",
  },
  {
    state: "Michigan",
    abbreviation: "MI",
    paymentUrl: "https://www.michigan.gov/taxes/iit/iitpayments",
    refundUrl: "https://www.michigan.gov/taxes/iit/refund",
  },
  {
    state: "Minnesota",
    abbreviation: "MN",
    paymentUrl: "https://www.mndor.state.mn.us/tp/eservices/_/",
    refundUrl: "https://www.mndor.state.mn.us/tp/refund/_/",
  },
  {
    state: "Mississippi",
    abbreviation: "MS",
    paymentUrl: "https://tap.dor.ms.gov/",
    refundUrl: "https://tap.dor.ms.gov/",
  },
  {
    state: "Missouri",
    abbreviation: "MO",
    paymentUrl: "https://mytax.mo.gov/rptp/portal/home/",
    refundUrl: "https://mytax.mo.gov/rptp/portal/home/return-tracker/",
  },
  {
    state: "Montana",
    abbreviation: "MT",
    paymentUrl: "https://tap.dor.mt.gov/",
    refundUrl: "https://tap.dor.mt.gov/",
  },
  {
    state: "Nebraska",
    abbreviation: "NE",
    paymentUrl: "https://revenue.nebraska.gov/",
    refundUrl: "https://ndr-refundstatus.ne.gov/refundstatus/",
  },
  {
    state: "Nevada",
    abbreviation: "NV",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "New Hampshire",
    abbreviation: "NH",
    paymentUrl: null, // Interest & dividends tax fully phased out (repealed for 2025+)
    refundUrl: null,
  },
  {
    state: "New Jersey",
    abbreviation: "NJ",
    paymentUrl: "https://www.nj.gov/treasury/taxation/payments-notices.shtml",
    refundUrl: "https://www.nj.gov/treasury/taxation/checkrefundstatus.shtml",
  },
  {
    state: "New Mexico",
    abbreviation: "NM",
    paymentUrl: "https://tap.state.nm.us/",
    refundUrl: "https://tap.state.nm.us/",
  },
  {
    state: "New York",
    abbreviation: "NY",
    paymentUrl: "https://www.tax.ny.gov/pay/",
    refundUrl: "https://www.tax.ny.gov/pit/file/refund.htm",
  },
  {
    state: "North Carolina",
    abbreviation: "NC",
    paymentUrl: "https://www.ncdor.gov/file-pay",
    refundUrl: "https://eservices.dor.nc.gov/wheresmyrefund/",
  },
  {
    state: "North Dakota",
    abbreviation: "ND",
    paymentUrl: "https://www.tax.nd.gov/",
    refundUrl: "https://www.tax.nd.gov/",
  },
  {
    state: "Ohio",
    abbreviation: "OH",
    paymentUrl: "https://myportal.tax.ohio.gov/",
    refundUrl: "https://myportal.tax.ohio.gov/",
  },
  {
    state: "Oklahoma",
    abbreviation: "OK",
    paymentUrl: "https://oktap.tax.ok.gov/",
    refundUrl: "https://oktap.tax.ok.gov/",
  },
  {
    state: "Oregon",
    abbreviation: "OR",
    paymentUrl: "https://revenueonline.dor.oregon.gov/",
    refundUrl: "https://revenueonline.dor.oregon.gov/",
  },
  {
    state: "Pennsylvania",
    abbreviation: "PA",
    paymentUrl: "https://mypath.pa.gov/",
    refundUrl: "https://mypath.pa.gov/",
  },
  {
    state: "Rhode Island",
    abbreviation: "RI",
    paymentUrl: "https://taxportal.ri.gov/",
    refundUrl: "https://taxportal.ri.gov/",
  },
  {
    state: "South Carolina",
    abbreviation: "SC",
    paymentUrl: "https://mydorway.dor.sc.gov/",
    refundUrl: "https://mydorway.dor.sc.gov/",
  },
  {
    state: "South Dakota",
    abbreviation: "SD",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "Tennessee",
    abbreviation: "TN",
    paymentUrl: null, // Hall investment-income tax repealed (2021+)
    refundUrl: null,
  },
  {
    state: "Texas",
    abbreviation: "TX",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "Utah",
    abbreviation: "UT",
    paymentUrl: "https://tap.tax.utah.gov/",
    refundUrl: "https://tap.tax.utah.gov/",
  },
  {
    state: "Vermont",
    abbreviation: "VT",
    paymentUrl: "https://myvtax.vermont.gov/",
    refundUrl: "https://myvtax.vermont.gov/",
  },
  {
    state: "Virginia",
    abbreviation: "VA",
    paymentUrl:
      "https://www.tax.virginia.gov/individual-income-tax-payment-options",
    refundUrl: "https://www.tax.virginia.gov/wheres-my-refund",
  },
  {
    state: "Washington",
    abbreviation: "WA",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
  {
    state: "West Virginia",
    abbreviation: "WV",
    paymentUrl: "https://mytaxes.wvtax.gov/",
    refundUrl: "https://mytaxes.wvtax.gov/",
  },
  {
    state: "Wisconsin",
    abbreviation: "WI",
    paymentUrl: "https://tap.revenue.wi.gov/",
    refundUrl: "https://tap.revenue.wi.gov/RefundStatus/",
  },
  {
    state: "Wyoming",
    abbreviation: "WY",
    paymentUrl: null, // No state individual income tax
    refundUrl: null,
  },
];
