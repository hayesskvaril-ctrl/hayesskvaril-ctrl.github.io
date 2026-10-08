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
- [x] New scenarios: privacy data breach assessment; disclosure review of a marketing campaign; conflicted related-party transaction; CPS 230 tolerance breach; AML suspicious matter; advice file review
- [x] Quiz questions for every new page (Phases 9–13), plus a News/current-affairs quiz
- [x] New flashcard decks: new glossary terms, advanced concepts, key dates for new regimes
- [x] Refresh learning pathways and Start here routes to include all new pages

**Upkeep machinery**
- [x] Upkeep checklist in `_scripts/UPKEEP.md` (what to check monthly, quarterly and yearly, and how)
- [x] Automated checks bundled into one command (`python3 _scripts/run_checks.py`) (links, review due dates, passed regulatory dates, tracker items past their dates)

## Phase 15 — Levels review and the Advanced track

**Why:** a September 2026 analysis found 25 Beginner, 83 Intermediate and only 8 Advanced pages, with no Advanced content at all in the standards library, sectors or case studies. Intermediate had become a catch-all.

**Level rubric** (applies to every page; tag a page by its entry level)
- **Beginner:** "What is it and why does it matter?" No prior knowledge assumed. Purpose, big picture, vocabulary.
- **Intermediate:** "What does it require, and how do organisations do it?" Assumes the Foundations. Specific obligations, processes, timeframes and practical tools.
- **Advanced:** "How do you exercise judgement when it's hard?" Assumes working knowledge. Legal tests and case law, quantitative methods, design trade-offs, grey areas, research evidence, interactions between regimes, board and regulator perspectives.

**Levels**
- [x] Publish the rubric and a generated "Browse by level" page; correct mislabelled pages
- [x] Add "Advanced topics" sections to the standards, sectors and case studies landing pages (case studies list levels on each card)

**New Advanced pages** (each with worked examples, a diagram or interactive, and primary sources)
- [x] Root cause analysis: 5 whys, fishbone, bow-tie and fault trees. Expert review.
- [x] Misleading or deceptive conduct: the legal tests and key cases (disclosure review). Expert review.
- [x] Directors' and officers' duties: key Australian cases
- [x] Enforcement and penalties: how regulators respond and how penalties are set
- [x] APS 115 operational risk capital (standardised measurement approach), with a calculator
- [x] KRI design and statistical thresholds, with an interactive control chart
- [x] Human factors and cognitive bias in risk decisions
- [x] Mapping critical operations end to end (CPS 230). Expert review.
- [x] Service provider concentration, fourth parties and exit planning. Expert review.
- [x] Liquidity stress testing for super funds, with a simulator
- [x] Interpreting legislation for compliance professionals
- [x] Designing a compliance monitoring and testing program. Expert review.
- [x] Remediation calculations in practice, with a calculator. Expert review.
- [x] Reasonable steps and consequence management under FAR
- [x] Unit pricing and unit pricing errors (super). Expert review.
- [x] Fund mergers and successor fund transfers
- [x] Advanced case study: ASIC v RI Advice and ASIC v FIIG (cyber risk as a licensee obligation)

**Deepen existing pages and learning**
- [x] "Going deeper" Advanced sections on key Intermediate pages (CPS 230, risk appetite, third-party risk, incident and breach management, disclosure obligations, ERM)
- [x] Advanced quiz set and two multi-regime Advanced scenarios
- [x] Update pathways, Start here and flashcards for the new Advanced pages

## Phase 16 — Roadmap 1: Video and multimedia

**Why:** people learn well from short visual explanations, and the site had no video. Work through this roadmap first, then move straight on to Roadmap 2 (Phase 17) without waiting for approval.

**What is and isn't possible at $0**
- We can make our own **animated explainer videos**: captioned motion graphics (animated diagrams with on-screen text) rendered to real MP4 files. The editable source lives in `_scripts/video/`, and the videos are rebuilt from it, like the templates.
- We can **embed existing official videos** (regulators, standard setters, other public bodies) from YouTube, using click-to-play so no third-party content loads until the reader chooses to watch.
- We can't film real footage or record a voice-over. Explainers are silent with burned-in captions, plus a full transcript on the page. A human voice-over could be added later.

**Build** (done 30 September 2026: 14 explainers, 16 minutes in total, on 33 pages and at `/learn/videos.html`)
- [x] Video engine: a scene-based animation renderer in the site's visual style, and a render script that captures frames and encodes MP4 (H.264), a poster image and a transcript for each explainer
- [x] On-page video component: standard video controls, lazy loading (nothing downloads until play), poster, transcript and a download link
- [x] Privacy-friendly embed component for external videos: click-to-play from youtube-nocookie.com, source and date shown, "watch on YouTube" link, and a short summary
- [x] Explainers (about 60–100 seconds each):
  - [x] What is risk management? The risk management loop (Foundations)
  - [x] The Three Lines model (Foundations)
  - [x] Who regulates what in Australia (Foundations)
  - [x] Risk appetite: from board statement to daily decisions (Risk)
  - [x] Controls: design, operation and testing (Risk)
  - [x] Breach reporting: from awareness to report (Compliance)
  - [x] CPS 230 in 90 seconds (Standards)
  - [x] Data breaches: contain, assess, notify (Compliance)
  - [x] Remediation: putting people back (Compliance)
  - [x] FAR: who is accountable for what (Governance)
  - [x] Misleading conduct: the dominant message test (Advanced)
  - [x] Root causes: Swiss cheese and fault trees (Advanced)
  - [x] Unit pricing errors: who wins and who loses (Advanced)
  - [x] The denominator effect in super (Advanced)
- [x] Curated official videos, each checked to exist before embedding, placed on the pages they support (AUSTRAC on the AML/CTF page and the ACNC Governance Standards series on the charities page; five official video and course libraries linked from the Watch page)
- [x] "Watch" page in Learn listing every video by section and level, generated from one list
- [x] Add videos to section landing pages and relevant topic pages, the resource library and search
- [x] Upkeep: automated check that every video has its files and transcript; quarterly manual check that external videos are still online (UPKEEP.md)

## Phase 17 — Roadmap 2: University-level Advanced content

**Why:** Advanced should mean the level of someone studying at university. Advanced pages must be grounded in peer-reviewed research, using several studies each, not only legislation and regulator guidance. Start straight after Roadmap 1.

**University-level standard for every Advanced page**
- Learning outcomes at the top.
- A "Theory and research" section that explains the relevant theories and what peer-reviewed studies found, with in-text citations (author, year) linked to the reference list.
- At least **three peer-reviewed articles** actually used in the text, plus primary legal and regulatory sources. Every reference is checked to exist (authors, year, title, journal, volume, pages, DOI) before use, and recorded in one reference register.
- "Critical perspectives": limitations of the evidence, contested views and open questions.
- Seminar questions for discussion or self-study, and further reading.
- References in a consistent academic style (APA 7th), with DOI links.

**Infrastructure**
- [x] Reference register (`_scripts/references.py`) of checked peer-reviewed sources, reused across pages
- [x] Automated check: every Advanced page cites at least three peer-reviewed sources from the register (added to `run_checks.py`)
- [x] Research library page: an annotated reading list by topic, generated from the register
- [x] Update the level rubric, CLAUDE.md content standards and the Browse by level page to reflect the university-level standard

**Upgrade the existing Advanced pages to the standard** (all 25)
- [x] Risk management (11 pages)
- [x] Compliance (6 pages)
- [x] Governance (4 pages)
- [x] Standards, sectors and case studies (4 pages)

**New university-level pages**
- [x] Theories of regulation: responsive, risk-based and principles-based regulation
- [x] Corporate governance theories: agency, stewardship and stakeholder perspectives
- [x] Theories of risk: perception, social amplification, normal accidents and high-reliability organisations
- [x] Does enterprise risk management work? The empirical evidence
- [x] The Three Lines model: research and critique
- [x] Behavioural economics of super and disclosure: defaults, inertia and choice
- [x] Misconduct in financial services: what the research shows
- [x] Remuneration, incentives and risk-taking: the evidence
- [x] Whistleblowing: research on who speaks up and why
- [x] Fraud theory beyond the triangle
- [x] Internal audit effectiveness: a research synthesis
- [x] The economics of cyber risk
- [x] Climate risk in finance: the research
- [x] AML/CTF effectiveness: the evidence debate

**Learning at university level**
- [x] Advanced study program: a 12-module, university-style course with learning outcomes, required readings and seminar questions
- [x] Advanced quiz questions and flashcards for the new pages; update pathways and Browse by level

## Phase 18 — GRC systems section (requested October 2026)

**Why:** a key section on how complex organisations design and establish an integrated governance, risk and compliance (GRC) system, showing how every part links together, with a tool that builds an illustrative GRC model from an organisation profile.

- [x] Section landing page (`/grc/`) with a one-page GRC map, learning path and nav entry
- [x] What is a GRC system? (components, assess once use many times, maturity model)
- [x] Risk taxonomy and the risk hierarchy (enterprise, material, Level 1–3, process level; roll-up; example taxonomy)
- [x] Obligations architecture (source → atomic obligation → interpretation → control objective → controls; regulatory change)
- [x] Control framework architecture (control objectives, common library, classification, key controls, roll-up)
- [x] The GRC data model: interactive map of 22 objects and 46 relationships, worked thread, data design rules
- [x] Governance and operating model (committees, three lines roles, policy hierarchy, escalation, annual calendar)
- [x] Establishing a GRC system: seven-phase roadmap with deliverables, gates, roles, measures and pitfalls
- [x] GRC technology (modules, requirements, build or buy, integration, migration, after go-live)
- [x] GRC for complex groups (Advanced, university standard, with peer-reviewed research)
- [x] GRC model builder tool (12 organisation types, 21 regimes, 15 risk categories; CSV/JSON/print export)
- [x] Glossary terms, GRC quiz, GRC learning pathway, resource library entry, graphics
- [x] GRC model builder version 2: five-step wizard with six examples; 12 entity types counted per group, 10 operating features, 37 regimes with 117 obligation themes and 14 notification clocks, 16 Level 1 categories and 73 Level 2 sub-types with example risks, controls and KRIs, all linked by ID; committees, roles, RACI, entity matrix, data model, maturity radar, roadmap, reporting calendar and consistency checks; Excel (about 20 sheets), CSV, JSON, print and share-link exports

## 🔁 Recurring upkeep (never ticked off; do on schedule)

- **Monthly:** run `python3 _scripts/run_checks.py` and follow `_scripts/UPKEEP.md`; publish a news item or roundup when there are material developments; check the regulatory tracker for items whose dates have passed and move them to "In force".
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

## Phase 19 — Outsider review: trust, focus and reasons to return (requested October 2026)

**Why:** an outside review found the site broad and polished but anonymous-feeling, organised like a textbook rather than around real tasks, with a long home page and menu, thin news and few reasons to come back.

- [x] Trust: review status on every content page ("Checked against sources" or "Expert reviewed"), a "How we check content" page, a "Suggest a correction" link on every page (prefilled GitHub issue form), and a prioritised expert review queue (`_scripts/REVIEW_QUEUE.md`)
- [x] Simplify navigation and the home page: Topics hub (`_scripts/build_topics.py`), a 6-item menu with a 4-column footer site map, a "where would you like to start?" router, a what's-new strip (from `build_changelog.py`) and fewer home tiles
- [x] Public site roadmap (`/about/roadmap.html`, from `_scripts/site_roadmap.py` + `build_site_roadmap.py`) with a progress banner on the home page; update stage statuses as work finishes
- [x] Practitioner playbooks (`/playbooks/`): 7 step-by-step guides (incident response, breach assessment, remediation, onboarding a material service provider, disclosure review, control testing, first 90 days) with tickable checklists, deadlines and templates. Source: `_scripts/playbooks_data.py` + `build_playbooks.py`
- [x] Obligations library (`/obligations/`): 117 obligation themes from 37 regimes, searchable, filterable by organisation type and regulator, downloadable as Excel or CSV. Built by `node _scripts/build_obligations.js` from the builder data
- [ ] Obligations library stage 2: break each theme into individual obligations with legal citations (needs verified research, regime by regime)
- [x] Courses with progress: a "Mark as read" button and "step n of m, next" links on every page in a learning pathway (stamped by `sync_layout.py` from `_scripts/pathways_index.json`), playbooks added to the pathways, and a My learning page (`/learn/my-learning.html`) with progress, next steps and a printable record of learning
- [x] Printable board briefings (`/governance/board-briefings.html`): CPS 230, FAR, breach reporting, CPS 234 and AML/CTF, each printing on two pages. Source: `_scripts/briefings_data.py` + `build_briefings.py`
- [x] Monthly automated check of external links (`.github/workflows/link-check.yml`, free GitHub Actions): opens an issue listing broken outside links
- [x] Content overlap audit (no near-duplicates; highest overlap 0.63 between guide and playbook on the same topic) and news approach: guides now link to their playbook and board briefing ("Put it into practice", stamped by `sync_layout.py`); news moves to a monthly roundup (`_scripts/UPKEEP.md`)
- [ ] Expert review of specialist pages (owner, using `_scripts/REVIEW_QUEUE.md`)
- [ ] Monthly regulatory roundup: first one in early November 2026 covering October
- **Owner decisions (October 2026):** no name on the site; expert reviews stay in progress; the "RiskLens" name is fine. The owner will buy a custom web address later (then: set it up with GitHub Pages and update `SITE` in `sync_layout.py`).
- [ ] Email updates: the owner sets up a free newsletter (Substack recommended); then set `NEWSLETTER_URL` in `sync_layout.py` and run it to show the sign-up boxes

## Phase 20 — Deep review: every article, line by line (requested October 2026)

**Why:** the owner, reading SPS 515, found the articles too thin: "way more information requested". Every educational article gets a fine-tooth-comb review and much more depth, one article per phase (134 phases in 15 tracks, specialist super and incident areas first). Expected to take about a month.

- [x] Public deep review roadmap: `_scripts/depth_roadmap.py` (tracks, order, DONE list with dates and what changed) built by `build_site_roadmap.py` into `/about/roadmap.html` (percentage bar, collapsible tracks) and a home-page panel (percentage, phase n of N, now, just finished, up next). The builder fails if an article is missing from the tracks.
- **Each phase:** re-check every fact against the current official source; set out requirements section by section; how it fits with related rules; what regulators have found (letters, reviews, enforcement); worked example and diagrams; common mistakes, checklist or board questions, FAQs; key dates; fuller sources. Then add the page to `DONE`, update "Last reviewed", add a changelog entry, flag specialist pages in `REVIEW_QUEUE.md`, rebuild and publish.
- [x] Phase 1: SPS 515 Strategic Planning and Member Outcomes (2 October 2026; expert reviewed)
- [x] Phase 2: SPS 530 Investment Governance (2 October 2026)
- [x] Phases 3 to 8: rest of the Superannuation track (super governance, RG 97, fund mergers, unit pricing, liquidity stress testing, behavioural economics of super), 2 October 2026
- [x] Phases 9 to 12: incident and breach management, breach reporting, RG 78, breach significance analysis (2 October 2026)
- [x] Phases 13 to 16: RG 277, remediation calculations, root cause analysis, issue and action management (7 October 2026); track 2 complete
- [x] Phases 17 to 23: CPS 230, tolerance levels, mapping critical operations, third-party risk, service provider exit, business continuity, operational risk (7 October 2026); track 3 complete
- [x] Phases 24 to 31: controls and risk assessment track (7 October 2026); track 4 complete
- [x] Phases 32 to 40: disclosure and conduct track (7 October 2026); track 5 complete
- [x] Phases 41 to 47: APRA prudential standards track (8 October 2026); track 6 complete
- [x] Phases 48 to 59: governance and accountability track (8 October 2026); track 7 complete
- [x] Phases 60 to 70: financial crime and compliance programs track (8 October 2026); track 8 complete
- [ ] Phases 71 to 137: work through `_scripts/depth_roadmap.py` in order (next: Cyber risk)
- **Note:** apra.gov.au, legislation.gov.au and most source sites are blocked by this environment's network policy (October 2026); facts were checked via web search excerpts of the official documents. The owner can allow those domains in the environment's network settings.

## Phase 21 — Earning money without a paywall (requested October 2026)

- [x] Cookie-free visit counting, ready to switch on (`scripts/count.js`, `GOATCOUNTER_CODE` in `sync_layout.py`; About page privacy text switches automatically)
- [ ] Owner: create a free GoatCounter account (no payment details), then tell Claude the code to switch it on
- [x] First premium pack drafted: CPS 230 toolkit v1 (Excel workbook with 9 linked tabs and dashboard; Word templates for policies, BCP, exit plan, board paper and notification checklist), built outside the repo and sent to the owner, 2 October 2026
- [ ] Owner: review the toolkit, then list it on Gumroad or Lemon Squeezy (listing text supplied); then add a store link to the site
- [ ] Owner checks: employer outside-work and conflicts policy; ABN; disclaimers on paid products
- [ ] Later: paid newsletter tier, sponsorship policy and page, more packs

## Phase 22 — New menu and obligations by sector (approved October 2026)

- [x] Proposal reviewed and approved by the owner (changes: three separate insurance sectors; GRC model builder under Toolkit and GRC explainers under Governance; listed companies, charities and public sector each separate)
- [x] Main menu with drop-down panels (Risk, Compliance, Governance, Your sector, Standards, Learn, Toolkit, News); phone menu; keyboard and screen reader support; footer re-ordered
- [x] Obligations by sector: picker, comparison table and 12 sector pages (`_scripts/build_obligation_sectors.js`)
- [x] New sector guides: general insurance, life insurance, private health insurance (insurance page kept as an overview; claims handling dates corrected)
- [x] "For your sector" link on every sector guide
- [ ] Later: add private health insurance and life-specific regimes (Private Health Insurance Act, Life Insurance Act, commissions) to the obligations library data

## Ideas / backlog

Add new ideas here as they come up. Items that became part of Phases 9–14 have been moved there. "Nick to review" items stay here until he signs them off.
- **Expert review (Phases 16–17):** the upgraded Advanced pages in specialist areas (Setting CPS 230 tolerance levels, Mapping critical operations, Service provider exit and concentration, Breach significance analysis, Remediation calculations, Control testing sampling, Compliance monitoring and testing) and the new Internal audit effectiveness and AML/CTF effectiveness pages. Also the video scripts for the CPS 230, breach reporting clocks, remediation and unit pricing explainers.
- **Idea:** short explainer videos for the new university-level pages (e.g. the Gordon-Loeb model, the enforcement pyramid, normal accidents versus high reliability).
- **Idea:** more 3D graphics for individual topic pages (e.g. CPS 230, breach reporting, incident management), using the scene library in `_scripts/graphics/`.
- **Expert review (Phase 18):** the GRC section, especially the risk hierarchy, establishment roadmap and the GRC model builder's regime defaults, obligation themes, notification clocks, control examples and document lists in `scripts/grc-builder-data.js`.
- **Idea:** GRC model builder: let readers add their own Level 2 sub-types and controls in the tool; break each obligation theme into a starter list of individual obligations with citations.
- **Idea:** automatic monthly check of external links (to APRA, ASIC, legislation and other sources) using a free GitHub Actions link checker. External links can't be tested from the build environment, so broken source links would currently only be found at each page's yearly review.

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
- **Nick to review (site review, 28 September 2026):** the SIS Act s 29JA timeframe now reads "as soon as practicable, and within 30 days" everywhere (the earlier "some matters immediately" wording couldn't be verified for RSE licensees). Pages: breach reporting, breach significance analysis, incident and breach management, the reporting regime finder and the incident report template.
- **Nick to review (Phase 14 scenarios):** the six new scenarios in `scripts/scenarios-data.js`: privacy breach, marketing campaign review, related-party conflict, CPS 230 tolerance breach, AML suspicion and advice file review (the 'best' answers and feedback).
- **Nick to review (Phase 14):** Remediation program tracker (columns, residual options, example REM-01), control testing workpaper (test plan fields, worked example and conclusion), and the example risk appetite statement (super metrics and thresholds, escalation timeframes).
- **Nick to review (Phase 9):** RG 97 fees and costs explainer, especially the fee governance section and the illustrative worked example.
- **Watch and update (Phase 5 pages):** performance test changes after Treasury's 2026 consultation; redrafted General Insurance Code (ASIC lodgement late 2026) and Life Code review outcome; Scams Prevention Framework obligations (March 2027); AT1 phase-out (from January 2027); Shield / First Guardian proceedings; APRA's proposed proportionality ("three-tier") framework.
- **Nick to review (Phase 6):** the three scenario simulations in `/learn/scenarios.html` (fee error breach and remediation, administrator outage under CPS 230, whistleblower disclosure). The "best practice" answers and feedback are in `scripts/scenarios-data.js`.
- **Nick to review (Phase 7):** the four templates in `/tools/`. Especially the incident report's notification checklist, the breach register's columns and example, and the CPS 230 / breach reporting checklists (item wording lives in `_scripts/templates/checklists_data.py`).
- **Nick to review (Phase 8):** the two commentary pieces (draft CPS 510; ASIC REP 833 platform trustees) and the regulatory tracker entries in `_scripts/tracker_data.py`.
