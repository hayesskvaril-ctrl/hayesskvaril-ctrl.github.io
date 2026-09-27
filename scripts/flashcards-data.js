// Hand-written flashcard decks for /learn/flashcards.html. The glossary deck is
// generated separately into glossary-cards.js by _scripts/build_glossary.py.
// Keep numbers consistent with the linked pages; update both together.
window.FLASH_DECKS = [
  {
    id: "numbers",
    title: "Key numbers and deadlines",
    cards: [
      { front: "CPS 230: disruption to a critical operation outside tolerance. When must APRA be told?", back: "As soon as possible, and no later than 24 hours.", link: "/standards/cps-230.html" },
      { front: "CPS 230: material operational risk incident. Notification deadline?", back: "As soon as possible, and no later than 72 hours after becoming aware.", link: "/standards/cps-230.html" },
      { front: "CPS 230: new or materially changed material service provider arrangement. Notify APRA within?", back: "20 business days.", link: "/risk-management/third-party-risk.html" },
      { front: "CPS 234: material information security incident. Notification deadline?", back: "As soon as possible, and no later than 72 hours after becoming aware.", link: "/standards/cps-234.html" },
      { front: "CPS 234: material control weakness that can't be fixed in time. Notify APRA within?", back: "10 business days after becoming aware.", link: "/standards/cps-234.html" },
      { front: "ASIC reportable situations: deadline to report a significant breach?", back: "30 calendar days after first knowing of, or being reckless about, reasonable grounds.", link: "/standards/asic-rg-78.html" },
      { front: "Reportable situations: how long can an investigation run before it is itself reportable (with ASIC relief)?", back: "More than 60 days (the Act says 30; ASIC relief extended it from 27 June 2025).", link: "/standards/asic-rg-78.html" },
      { front: "RG 271: maximum IDR response time for most complaints?", back: "30 calendar days. Most super complaints: 45 calendar days.", link: "/standards/asic-rg-271.html" },
      { front: "DDO: significant dealing inconsistent with the TMD. Notify ASIC within?", back: "10 business days of becoming aware.", link: "/standards/asic-rg-274.html" },
      { front: "RG 277: former customers owed up to what amount can receive a residual remediation payment without reasonable endeavours to locate them?", back: "$5 or less (including interest).", link: "/standards/asic-rg-277.html" },
      { front: "FAR: minimum deferral of accountable persons' variable remuneration?", back: "At least 40% for at least four years (subject to exceptions).", link: "/governance/financial-accountability-regime.html" },
      { front: "FAR start dates?", back: "ADIs: 15 March 2024. Insurers and super trustees: 15 March 2025.", link: "/governance/financial-accountability-regime.html" },
      { front: "CPS 511: minimum deferral for the CEO of a significant financial institution?", back: "60% of variable remuneration, deferred over six years.", link: "/governance/remuneration-governance.html" },
      { front: "CPS 230 significant financial institution threshold for an RSE licensee?", back: "$30 billion in assets. (ADIs $20b; general and life insurers $10b; private health insurers $3b.)", link: "/standards/cps-230.html" },
      { front: "When did CPS 230 commence?", back: "1 July 2025.", link: "/standards/cps-230.html" },
      { front: "How many Australian Privacy Principles are there?", back: "13.", link: "/compliance/privacy-law.html" },
      { front: "Privacy Act: turnover threshold above which most businesses are covered?", back: "Annual turnover over $3 million (some smaller businesses are also covered).", link: "/compliance/privacy-law.html" },
      { front: "ISO/IEC 27001:2022 Annex A: how many controls, in how many themes?", back: "93 controls in 4 themes: organisational (37), people (8), physical (14), technological (34).", link: "/standards/iso-27001.html" },
      { front: "COSO ERM (2017) and COSO Internal Control (2013): components and principles?", back: "ERM: 5 components, 20 principles. Internal Control: 5 components, 17 principles.", link: "/standards/coso.html" },
      { front: "Financial Claims Scheme limit?", back: "Up to $250,000 per account holder per ADI.", link: "/sectors/banking.html" },
      { front: "APRA mortgage serviceability buffer?", back: "At least 3 percentage points above the loan rate.", link: "/sectors/banking.html" },
      { front: "Liquidity Coverage Ratio minimum?", back: "100%: high-quality liquid assets must cover net cash outflows over a 30-day stress.", link: "/sectors/banking.html" },
      { front: "Managed investment schemes: when is a compliance committee required?", back: "When fewer than half of the responsible entity's directors are external.", link: "/sectors/managed-investment-schemes.html" },
      { front: "Heat map score bands used on this site?", back: "1–4 Low, 5–9 Medium, 10–14 High, 15–25 Extreme (likelihood × consequence).", link: "/learn/risk-heat-map.html" }
    ]
  },
  {
    id: "standards",
    title: "Standards and guides: what's it about?",
    cards: [
      { front: "CPS 220", back: "APRA's Risk Management standard: a risk management framework, risk appetite statement, risk management strategy, and risk management and compliance functions.", link: "/standards/cps-220.html" },
      { front: "CPS 230", back: "APRA's Operational Risk Management standard: operational risk, business continuity and material service providers.", link: "/standards/cps-230.html" },
      { front: "CPS 234", back: "APRA's Information Security standard: information security capability, controls, testing and incident notification.", link: "/standards/cps-234.html" },
      { front: "CPS 511", back: "APRA's Remuneration standard: remuneration frameworks that support risk management and good outcomes, with deferral and adjustment of variable pay.", link: "/governance/remuneration-governance.html" },
      { front: "CPS 190", back: "APRA's Recovery and Exit Planning standard: plans for responding to severe financial stress.", link: "/sectors/banking.html" },
      { front: "SPS 515", back: "APRA's Strategic Planning and Member Outcomes standard for super trustees.", link: "/sectors/superannuation.html" },
      { front: "SPS 530", back: "APRA's Investment Governance standard for super trustees, including liquidity, stress testing and valuation.", link: "/sectors/superannuation.html" },
      { front: "SPS 521", back: "APRA's Conflicts of Interest standard for super trustees.", link: "/governance/conflicts-of-interest.html" },
      { front: "APS 210", back: "APRA's Liquidity standard for ADIs (including the LCR and NSFR).", link: "/sectors/banking.html" },
      { front: "RG 78", back: "ASIC's guide to breach reporting (the reportable situations regime) for AFS and credit licensees.", link: "/standards/asic-rg-78.html" },
      { front: "RG 271", back: "ASIC's guide to internal dispute resolution (complaints handling), with enforceable paragraphs.", link: "/standards/asic-rg-271.html" },
      { front: "RG 274", back: "ASIC's guide to the design and distribution obligations (target market determinations).", link: "/standards/asic-rg-274.html" },
      { front: "RG 277", back: "ASIC's guide to consumer remediation.", link: "/standards/asic-rg-277.html" },
      { front: "RG 97", back: "ASIC's guide to disclosing fees and costs in PDSs and periodic statements.", link: "/compliance/disclosure-obligations.html" },
      { front: "RG 132", back: "ASIC's guide to funds management compliance and oversight (compliance plans and committees).", link: "/sectors/managed-investment-schemes.html" },
      { front: "RG 270", back: "ASIC's guide to whistleblower policies.", link: "/governance/whistleblower-protections.html" },
      { front: "ISO 31000", back: "International risk management guidance: principles, framework and process. Not certifiable.", link: "/standards/iso-31000.html" },
      { front: "ISO/IEC 27001", back: "International standard for information security management systems. Certifiable.", link: "/standards/iso-27001.html" },
      { front: "SIS Act s 52", back: "The covenants in every super fund's governing rules, including the best financial interests duty.", link: "/sectors/superannuation.html" },
      { front: "Corporations Act s 912A", back: "AFS licensees' general obligations, including efficiently, honestly and fairly and adequate compliance arrangements.", link: "/compliance/licensing-basics.html" }
    ]
  }
];
