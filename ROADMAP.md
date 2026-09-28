# RiskLens Australia — Build Roadmap

Work top to bottom. Tick items (`- [x]`) as they go live. The standards every page must meet are in `CLAUDE.md`.

The agreed build order proves the page format on one pillar first (Phase 1), then scales it across the other pillars, then layers on interactivity and news. Stage 2 (Phases 9–14) adds depth, advanced content and new topics identified in the September 2026 site review.

---

## ✅ Phase 0 — Setup (done)

- [x] GitHub account and repo created
- [x] GitHub Pages live at https://hayesskvaril-ctrl.github.io
- [x] Starter home page
- [x] Claude has push access to the repo

## Phase 1 — Site structure, Glossary, Risk Management pillar

**Site structure**
- [x] Create shared `styles.css` (move inline styles out of `index.html`)
- [x] Standard header/nav/footer (with disclaimer) on every page
- [x] Update home page: real links to the pillars that exist, and "coming soon" labels (not links) for the rest

**Glossary**
- [x] `/glossary/`: A–Z plain-English definitions of core risk, compliance and governance terms, with anchor links so articles can link to individual terms

**Foundations (entry-level primers)**
- [x] What is risk management?
- [x] What is compliance?
- [x] What is governance?
- [x] The Three Lines model (and internal audit's role)
- [x] Regulatory landscape map: who regulates what (APRA, ASIC, AUSTRAC, OAIC, ACCC), shown as a diagram
- [x] Core frameworks compared: ISO 31000, COSO ERM, Three Lines (visual comparison)

**Risk Management pillar** (`/risk-management/`)
- [x] Pillar landing page (overview, learning path, links to every topic)
- [x] Risk appetite and tolerance
- [x] Risk assessment methodologies (likelihood × consequence, qualitative vs quantitative, heat maps)
- [x] Control design and testing
- [x] Enterprise risk management (ERM)
- [x] Operational risk
- [x] Credit, market and liquidity risk (basics)
- [x] Incident and breach management
- [x] Business continuity
- [x] Third-party / vendor / outsourcing risk

## Phase 2 — Compliance pillar (`/compliance/`)

- [x] Pillar landing page
- [x] Designing a compliance program
- [x] Breach and incident reporting obligations
- [x] Licensing basics (AFSL, RSE licence)
- [x] Disclosure obligations
- [x] Consumer protection
- [x] Privacy law
- [x] AML/CTF fundamentals

## Phase 3 — Governance pillar (`/governance/`)

- [x] Pillar landing page
- [x] Board structure and accountability
- [x] Financial Accountability Regime (FAR)
- [x] Conflicts of interest
- [x] Remuneration governance
- [x] Whistleblower protections
- [x] Culture and conduct risk

## Phase 4 — Regulatory & standards library (`/standards/`)

One plain-English explainer per instrument, covering "what it actually requires you to do". Check the current version on the official source before writing.

- [x] Library landing page
- [x] CPS 230 Operational Risk Management
- [x] CPS 220 Risk Management
- [x] CPS 234 Information Security
- [x] Key ASIC Regulatory Guides (one page each, as relevant)
- [x] ISO 31000 (in our own words, no reproduced text)
- [x] ISO 27001 (in our own words)
- [x] COSO ERM / COSO Internal Control

## Phase 5 — Sector deep-dives (`/sectors/`)

- [x] Superannuation trustee governance (SIS Act, RSE licensee obligations). Flag for Nick's review, since it's his specialty.
- [x] Banking / ADIs
- [x] Insurance
- [x] Managed investment schemes

## Phase 6 — Interactive and advanced learning (`/learn/`)

- [x] Quizzes / knowledge checks for each topic
- [x] Scenario simulations (e.g. "You've just identified a potential breach — what do you do?")
- [x] Interactive risk heat map / risk-scoring tool
- [x] Flashcards for terminology and standards
- [x] Learning pathways: beginner → intermediate → advanced (topic structure inspired by the Governance Institute of Australia's course categories, but *not* their content)

## Phase 7 — Tools and templates (`/tools/`, files in `/assets/`)

- [x] Risk assessment template
- [x] Incident report template
- [x] Breach register template
- [x] Regulatory obligation checklists

## Phase 8 — News and updates (`/news/`)

- [x] News section structure (listing page + article template)
- [x] Regulatory changes tracker (APRA/ASIC updates summarised in plain English)
- [x] Commentary posts on major developments

---

# Stage 2 — Depth and breadth (from the whole-of-site review, September 2026)

Phases 9–14 come from the September 2026 site review. Same rules as before: verify every regulatory fact on the official source, write in our own words, tag each page's level, and ship each item as a small, complete, working chunk. Items marked **(Advanced)** must be tagged `Advanced`. Flag anything in Nick's specialist areas for his review.

## Phase 9 — Fixes, glossary, site plumbing and the yearly review system

**Fix dangling references**
- [x] ASIC RG 97 Disclosing fees and costs explainer (`/standards/asic-rg-97.html`; the super page already links to it)
- [x] ASIC RG 259 Risk management systems of responsible entities explainer (`/standards/asic-rg-259.html`; the MIS page already links to it)

**Glossary**
- [x] Add the ~30 terms used on the site but missing from the Glossary: ADI, significant financial institution (SFI), responsible entity, managed investment scheme, compliance plan, compliance committee, deemed significant (breach), CPS 511, SPS 515, ISMS, information asset, Liquidity Coverage Ratio, Common Equity Tier 1, Additional Tier 1, macroprudential policy, debt-to-income limit, Scams Prevention Framework, hawking, deferred sales model, utmost good faith, claims handling and settling services, distribution condition, review trigger, significant dealing, beneficial assumption, awareness (reporting clock), recovery and exit planning, product intervention power, greenwashing, financial hardship, vulnerable customer, sampling (control testing), SMSF, key function (FAR). Link first uses on pages to the new entries.

**Behind-the-scenes plumbing**
- [x] `sitemap.xml` and `robots.txt`, generated automatically by `sync_layout.py` so they never go stale
- [x] Link previews for sharing (Open Graph / Twitter tags on every page, plus a branded share image)
- [x] Browser-tab icon (favicon) and theme colour
- [x] Friendly "page not found" (404) page with search and popular links
- [x] Lift the faintest text colour for better readability (contrast ≥ 4.5:1 everywhere)

**Yearly review system**
- [x] Review schedule: every page gets a "review due" date 12 months after its last review; a script (`_scripts/review_report.py`) lists pages due or overdue, and flags regulatory dates on pages that have since passed
- [x] "Expert reviewed" badge that appears only on pages Nick has signed off (a simple list in `_scripts/`), with the About page wording updated to match
- [x] Public "What's new" page (a changelog of pages added and updated), fed from git history or a simple data file

## Phase 10 — Advanced-level deep dives

- [x] Quantitative operational risk **(Advanced)**: loss frequency and severity, loss distributions, VaR and expected shortfall in plain terms, with an interactive Monte Carlo simulation
- [x] Scenario analysis and stress testing **(Advanced)**: severe but plausible scenarios, reverse stress testing, links to CPS 230, CPS 190 and ICAAP, with a worked example
- [x] Setting CPS 230 tolerance levels **(Advanced)**: method, data, maximum disruption and data-loss tolerances, worked examples for a super fund and a bank. Flag for Nick.
- [x] Breach significance analysis in practice **(Advanced)**: case-based walkthroughs of the deemed-significance tests and factors, multi-regime reporting and documentation. Flag for Nick.
- [x] Risk aggregation and correlation **(Advanced)**: building the enterprise risk profile, concentration and interdependency
- [x] Board risk reporting design **(Advanced)**: reporting risk profile against appetite, KRI dashboards, aggregation, what good board papers look like
- [x] Control testing sampling and assurance confidence **(Advanced)**: sample sizes, attribute testing, confidence and evidence standards. Flag for Nick.
- [x] Add an "Advanced" stage to learning pathways and Start here, and update the home page wording once these are live

## Phase 11 — New compliance and governance topics

- [x] Climate-related financial disclosures and sustainability reporting (Corporations Act requirements, AASB S2, phasing by entity group, assurance, greenwashing risk)
- [x] Climate risk management (physical and transition risk, scenario analysis, APRA CPG 229, governance and metrics)
- [x] AI governance (board oversight, accountability, model and data risk, privacy and automated decisions, regulator expectations such as ASIC REP 798, ISO/IEC 42001, Australian Government guidance)
- [x] Financial advice regulation (best interests duty and related obligations, Statements of Advice, conflicted remuneration, ongoing fee arrangements, adviser registration and professional standards, current reforms)
- [x] Anti-bribery and corruption (foreign bribery offences including the "failure to prevent" offence, gifts and hospitality, third-party due diligence, NACC for the public sector)
- [x] Sanctions compliance (Australian autonomous and UN sanctions, DFAT, screening, interaction with AML/CTF)
- [x] Modern slavery reporting (Modern Slavery Act 2018 statements, supply-chain due diligence, current reforms)

## Phase 12 — Risk topics and standards library expansion

**Risk topics**
- [x] Cyber risk management (threat landscape, Essential Eight, incident response, third-party cyber risk; links to CPS 234)
- [x] Model risk management (including AI and actuarial models, validation, model inventory)
- [x] Fraud risk management (internal and external fraud, controls, detection analytics, scams interface)
- [x] Internal audit (role, Global Internal Audit Standards, audit committee, APRA expectations)
- [x] Assurance mapping and combined assurance (links Three Lines, control testing and internal audit)
- [x] Issue and action management (raising, rating, tracking and closing issues; validation of fixes)
- [x] Risk culture deep dive (assessment methods, APRA's approach, indicators and interventions)
- [x] Change, project and reputational risk (one page or two, depending on depth)

**Standards library**
- [x] APRA: CPS 511 Remuneration; SPS 515 Strategic Planning and Member Outcomes; SPS 530 Investment Governance; CPS 190 and CPS 900 recovery and resolution; current CPS/SPS 510 and 520 (governance, fit and proper); APS 110 and APS 210 capital and liquidity basics
- [x] ASIC: RG 181 Managing conflicts of interest; RG 270 Whistleblower policies; RG 104/105 licensee general obligations and competence
- [x] Other standards: ISO 22301 (business continuity), ISO 37301 (compliance management), ISO 37001 (anti-bribery), ISO/IEC 42001 (AI management), ASD Essential Eight, IIA Global Internal Audit Standards (all in our own words)
- [x] Add every new page to the standards library index and its sector filter

## Phase 13 — Real-world case studies and new sectors

**Case studies** (new `/case-studies/` section; each with timeline, what went wrong, regulatory response, lessons and sources; facts only from official reports and court outcomes)
- [x] Case studies landing page and case study template
- [x] Hayne Royal Commission (2019): themes and reforms that followed
- [x] APRA Prudential Inquiry into CBA (2018): governance, culture and accountability
- [x] AUSTRAC civil penalty cases (CBA 2018, Westpac 2020): AML/CTF control failures
- [x] Optus and Medibank data breaches (2022): cyber, privacy and regulatory response
- [x] HIH Insurance collapse (2001): governance and the origins of modern prudential regulation
- [x] Shield and First Guardian: platform, advice and trustee failures (link to existing commentary; update as court outcomes arrive)
- [x] Case-study quizzes and "what would you have done?" prompts

**Sectors**
- [x] Credit licensees and non-bank lenders (responsible lending, hardship, credit reporting, BNPL)
- [x] Financial advice licensees (sector view, linking to the advice regulation page)
- [x] Payments and fintech (payments licensing reforms, stored value, CDR, scams obligations)
- [x] Listed companies (ASX Principles, continuous disclosure, directors' duties)
- [x] Public sector (PGPA Act, Commonwealth Risk Management Policy, fraud and corruption control)
- [x] Not-for-profits and charities (ACNC governance standards, risk for smaller organisations)
- [x] Update the sectors comparison table and landing page

## Phase 14 — Tools, learning and ongoing upkeep

**Tools and templates** (spreadsheets with working formulas, Word templates; add each to the resource library)
- [x] Obligations register template
- [x] Control testing workpaper
- [x] Risk and control self-assessment (RCSA) template
- [x] KRI library (examples by risk type, with threshold design notes)
- [x] Example risk appetite statement (fictional super fund)
- [x] Board risk report template
- [x] Material service provider register (aligned with APRA's template fields)
- [x] Remediation program tracker. Flag for Nick.

**Learning**
- [ ] New scenarios: privacy data breach assessment; disclosure review of a marketing campaign; conflicted related-party transaction; CPS 230 tolerance breach; AML suspicious matter; advice file review
- [ ] Quiz questions for every new page (Phases 9–13), plus a News/current-affairs quiz
- [ ] New flashcard decks: new glossary terms, advanced concepts, key dates for new regimes
- [ ] Refresh learning pathways and Start here routes to include all new pages

**Upkeep machinery**
- [ ] Upkeep checklist in `_scripts/UPKEEP.md` (what to check monthly, quarterly and yearly, and how)
- [ ] Automated checks bundled into one command (links, review due dates, passed regulatory dates, tracker items past their dates)

## 🔁 Recurring upkeep (never ticked off; do on schedule)

- **Monthly:** publish a news item or roundup when there are material developments; check the regulatory tracker for items whose dates have passed and move them to "In force".
- **Quarterly:** full tracker refresh (`AS_AT` date updated), roundup article, run the review report and link check, and check watch items in the backlog below.
- **Yearly (per page):** review every page within 12 months of its last review; re-verify all regulatory facts against official sources, update "Last reviewed", and refresh related quizzes and flashcards.
- **When regulations change:** update every affected page the same week (use Search and the tracker to find them), then note it on the "What's new" page.

---

## ⏸ Deferred — do later, only when Nick says so

- [x] About and credibility page (who's behind it, methodology, full disclaimer). A short disclaimer goes in every footer from Phase 1.
- [x] Site search
- [x] Downloadable resource library page (one index of all templates and checklists)
- [x] "Start here" pathways (newcomer vs practitioner)
- [ ] Email updates / newsletter sign-up
- [ ] Custom domain, branding, Google Ads

## Ideas / backlog

Add new ideas here as they come up. Items that became part of Phases 9–14 have been moved there. "Nick to review" items stay here until he signs them off.

- **Next roundup:** after the final CPS 510 and the ASIC/APRA FAR changes (see Recurring upkeep for the cadence).

- **Watch and update:** APRA's final CPS 510 Governance (expected end 2026, commencing January 2028) and the ASX Corporate Governance Principles 5th edition (final expected December 2026). Update `/foundations/what-is-governance.html` when finalised.
- **Watch and update:** ISO 31000 revision (at committee draft stage in 2026). Update the frameworks pages when published.
- **Nick to review:** Phase 1 pages in his specialist areas: control design and testing, incident and breach management, third-party risk, operational risk / CPS 230, business continuity. Especially the super-trustee breach reporting line (SIS Act s 29JA timing) on the incident page.
- **Nick to review (Phase 2):** Disclosure obligations (disclosure review process and checklist) and Breach and incident reporting obligations (regime-by-regime timeframes, especially the super-trustee lines).
- **Watch and update (Phase 2 pages):** privacy "tranche 2" reforms and the automated decision-making duty (10 December 2026); Children's Online Privacy Code; Scams Prevention Framework sector rules and commencement; ASIC's reviews of RG 97 and RG 234; AUSTRAC transitional rules for the AML/CTF reforms.
- **Watch and update (Phase 3 pages):** final CPS 510 (expected end 2026; affects board structure, conflicts and FAR pages); any FAR enforcement actions or reviews; corporate whistleblower reform (Whistleblower Protection Authority proposals).
- **Nick to review (Phase 4):** CPS 230 explainer (requirement/evidence tables, SFI thresholds, 2026 amendments) and the ASIC RG 78, RG 271 and RG 277 pages.
- **Watch and update (Phase 4 pages):** further CPS 230 amendments or APRA guidance; ASIC's remaining reportable-situations relief (RG 78 page); any new COSO guidance or framework updates; ISO/IEC 27001 amendments.
- **Nick to review (Phase 5):** Superannuation trustee governance (covenants table, SPS list, performance test vs outcomes assessment, fee governance section), plus the super-related parts of the Managed investment schemes page (Shield / First Guardian).
- **Nick to review (Phase 10):** Setting CPS 230 tolerance levels (method, worked examples for super and bank, the builder's example ratings); Breach significance analysis (the four worked cases and their illustrative conclusions, the multi-regime table); Control testing sampling (sample size tables, deviation handling, evidence standards).
- **Nick to review (Phase 13):** Shield and First Guardian case study (platform trustee lessons, 'what would you have done?' answers). Update it as court outcomes arrive.
- **Nick to review (Phase 12):** Assurance mapping (example map) and Issue and action management (rating scale, timeframes, closure vs validation).
- **Nick to review (Phase 14):** Remediation program tracker (columns, residual options, example REM-01), control testing workpaper (test plan fields, worked example and conclusion), and the example risk appetite statement (super metrics and thresholds, escalation timeframes).
- **Nick to review (Phase 9):** RG 97 fees and costs explainer, especially the fee governance section and the illustrative worked example.
- **Watch and update (Phase 5 pages):** performance test changes after Treasury's 2026 consultation; redrafted General Insurance Code (ASIC lodgement late 2026) and Life Code review outcome; Scams Prevention Framework obligations (March 2027); AT1 phase-out (from January 2027); Shield / First Guardian proceedings; APRA's proposed proportionality ("three-tier") framework.
- **Nick to review (Phase 6):** the three scenario simulations in `/learn/scenarios.html` (fee error breach and remediation, administrator outage under CPS 230, whistleblower disclosure). The "best practice" answers and feedback are in `scripts/scenarios-data.js`.
- **Nick to review (Phase 7):** the four templates in `/tools/`. Especially the incident report's notification checklist, the breach register's columns and example, and the CPS 230 / breach reporting checklists (item wording lives in `_scripts/templates/checklists_data.py`).
- **Nick to review (Phase 8):** the two commentary pieces (draft CPS 510; ASIC REP 833 platform trustees) and the regulatory tracker entries in `_scripts/tracker_data.py`.
