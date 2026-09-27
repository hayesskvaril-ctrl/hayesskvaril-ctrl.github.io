# RiskLens Australia — Build Roadmap

Work top to bottom. Tick items (`- [x]`) as they go live. The standards every page must meet are in `CLAUDE.md`.

The agreed build order proves the page format on one pillar first (Phase 1), then scales it across the other pillars, then layers on interactivity and news.

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
- [ ] Flashcards for terminology and standards
- [ ] Learning pathways: beginner → intermediate → advanced (topic structure inspired by the Governance Institute of Australia's course categories, but *not* their content)

## Phase 7 — Tools and templates (`/tools/`, files in `/assets/`)

- [ ] Risk assessment template
- [ ] Incident report template
- [ ] Breach register template
- [ ] Regulatory obligation checklists

## Phase 8 — News and updates (`/news/`)

- [ ] News section structure (listing page + article template)
- [ ] Regulatory changes tracker (APRA/ASIC updates summarised in plain English)
- [ ] Commentary posts on major developments

---

## ⏸ Deferred — do later, only when Nick says so

- [ ] About and credibility page (who's behind it, methodology, full disclaimer). A short disclaimer goes in every footer from Phase 1.
- [ ] Site search
- [ ] Downloadable resource library page (one index of all templates and checklists)
- [ ] "Start here" pathways (newcomer vs practitioner)
- [ ] Email updates / newsletter sign-up
- [ ] Custom domain, branding, Google Ads

## Ideas / backlog

Add new ideas here as they come up.

- **Watch and update:** APRA's final CPS 510 Governance (expected end 2026, commencing January 2028) and the ASX Corporate Governance Principles 5th edition (final expected December 2026). Update `/foundations/what-is-governance.html` when finalised.
- **Watch and update:** ISO 31000 revision (at committee draft stage in 2026). Update the frameworks pages when published.
- **Nick to review:** Phase 1 pages in his specialist areas: control design and testing, incident and breach management, third-party risk, operational risk / CPS 230, business continuity. Especially the super-trustee breach reporting line (SIS Act s 29JA timing) on the incident page.
- **Nick to review (Phase 2):** Disclosure obligations (disclosure review process and checklist) and Breach and incident reporting obligations (regime-by-regime timeframes, especially the super-trustee lines).
- **Watch and update (Phase 2 pages):** privacy "tranche 2" reforms and the automated decision-making duty (10 December 2026); Children's Online Privacy Code; Scams Prevention Framework sector rules and commencement; ASIC's reviews of RG 97 and RG 234; AUSTRAC transitional rules for the AML/CTF reforms.
- **Watch and update (Phase 3 pages):** final CPS 510 (expected end 2026; affects board structure, conflicts and FAR pages); any FAR enforcement actions or reviews; corporate whistleblower reform (Whistleblower Protection Authority proposals).
- **Nick to review (Phase 4):** CPS 230 explainer (requirement/evidence tables, SFI thresholds, 2026 amendments) and the ASIC RG 78, RG 271 and RG 277 pages.
- **Watch and update (Phase 4 pages):** further CPS 230 amendments or APRA guidance; ASIC's remaining reportable-situations relief (RG 78 page); any new COSO guidance or framework updates; ISO/IEC 27001 amendments.
- **Nick to review (Phase 5):** Superannuation trustee governance (covenants table, SPS list, performance test vs outcomes assessment, fee governance section), plus the super-related parts of the Managed investment schemes page (Shield / First Guardian).
- **Watch and update (Phase 5 pages):** performance test changes after Treasury's 2026 consultation; redrafted General Insurance Code (ASIC lodgement late 2026) and Life Code review outcome; Scams Prevention Framework obligations (March 2027); AT1 phase-out (from January 2027); Shield / First Guardian proceedings; APRA's proposed proportionality ("three-tier") framework.
- An ASIC RG 259 (risk management systems of responsible entities) explainer page; the MIS page already cross-links to `/standards/asic-rg-259.html` and will light up automatically.
- A "What's changed recently" box on the home page linking to regulatory updates (once `/news/` exists).
- A risk culture deep-dive page (could sit under Governance: culture and conduct risk).
- An assurance mapping / combined assurance page (links Three Lines, control testing and internal audit).
- Reuse the interactive widgets (`scripts/quiz.js`, `heatmap.js`, `checklist.js`) for the Phase 6 learning section.
