# Regulator watch, 8 October 2026

Automatic weekly check of official announcements and of the key facts register. To act on it, ask Claude to "process the regulator watch issue": each item is checked against the official source, pages are updated if needed, and the issue is closed with a note of what changed.

## New announcements (0)

None since the last check.

## Key facts not found on their official source (11, 11 new this week)

The value below did not appear on the fact's source page. The fact may have changed, the page may word it differently, or the source page may have moved. Check by hand, then run update_fact.py.

- [ ] **New:** `rep833-published`: ASIC REP 833 on platform trustees published: **29 June 2026** ([source](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-135mr-asic-calls-platform-trustees-to-account-over-persistent-failures-to-safeguard-super-savings))
- [ ] **New:** `cps230-start`: CPS 230 Operational Risk Management applies: **1 July 2025** ([source](https://www.apra.gov.au/standards/cps-230))
- [ ] **New:** `cps510-tenure-limit`: Proposed maximum tenure for non-executive directors in the draft CPS 510: **12 years** ([source](https://www.apra.gov.au/consultations/proposed-changes-governance))
- [ ] **New:** `dti-limit-start`: APRA's debt-to-income limit applies: **1 February 2026** ([source](https://www.apra.gov.au/news-and-publications/apra-limit-high-debt-income-home-loans-constrain-riskier-lending))
- [ ] **New:** `fcs-limit`: Financial Claims Scheme protection per account holder per ADI: **$250,000** ([source](https://www.fcs.gov.au/))
- [ ] **New:** `far-streamlining-close`: Consultation on FAR streamlining closed: **2 October 2026** ([source](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-204mr-asic-and-apra-commence-consultation-on-far-streamlining))
- [ ] **New:** `advice-reforms-announced`: Government confirmed remaining advice reforms: **19 August 2026** ([source](https://www.asic.gov.au/regulatory-resources/financial-services/regulatory-reforms/delivering-better-financial-outcomes-dbfo-package))
- [ ] **New:** `privacy-adm-start`: Privacy policies must explain substantially automated decisions: **10 December 2026** ([source](https://www.oaic.gov.au/privacy/australian-privacy-principles))
- [ ] **New:** `climate-group2-start`: Climate reporting starts for Group 2 (financial years starting on or after): **1 July 2026** ([source](https://www.asic.gov.au/regulatory-resources/sustainability-reporting/))
- [ ] **New:** `climate-group3-start`: Climate reporting starts for Group 3 (financial years starting on or after): **1 July 2027** ([source](https://www.asic.gov.au/regulatory-resources/sustainability-reporting/))
- [ ] **New:** `rep839-published`: ASIC REP 839 review of first sustainability reports published: **21 September 2026** ([source](https://www.asic.gov.au/regulatory-resources/sustainability-reporting/))

## Fact sources that could not be read (5)

- `aml-reformed-obligations-start`: could not read the source (TimeoutError: The read operation timed out) (https://www.austrac.gov.au/amlctf-reform/about-reforms)
- `aml-tranche2-start`: could not read the source (TimeoutError: The read operation timed out) (https://www.austrac.gov.au/amlctf-reform/about-reforms)
- `scams-main-obligations`: could not read the source (403) (https://www.accc.gov.au/about-us/scams-prevention-framework)
- `scams-afca-membership`: could not read the source (403) (https://www.accc.gov.au/about-us/scams-prevention-framework)
- `essential-eight-consult-close`: could not read the source (TimeoutError: The read operation timed out) (https://www.cyber.gov.au/about-us/view-all-content/news/consultation-on-evolution-of-essential-eight)

## Confirmed on the official source: 24 of 41 facts

## First run for these sources

- APRA: 13 current items recorded as the starting point
- Treasury consultations: 9 current items recorded as the starting point
- Treasury ministers: 42 current items recorded as the starting point
- Attorney-General's Department consultations: 6 current items recorded as the starting point

## Sources where nothing was found

The page or its link pattern in `_scripts/watch/sources.json` may need updating.

- ASIC media releases: nothing found (https://www.asic.gov.au/newsroom/media-releases/ (links: 0); https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/ (links: 0))
- ASIC news: nothing found (https://www.asic.gov.au/newsroom/news-items/ (404); https://www.asic.gov.au/about-asic/news-centre/news-items/ (links: 0))
- AUSTRAC: nothing found (https://www.austrac.gov.au/news-and-media (TimeoutError: The read operation timed out))
- OAIC: nothing found (https://www.oaic.gov.au/news/media-centre (links: 0))
- ACCC: nothing found (https://www.accc.gov.au/media-releases (403); https://www.accc.gov.au/news-centre (403))
- Australian Signals Directorate: nothing found (https://www.cyber.gov.au/about-us/view-all-content/news (TimeoutError: The read operation timed out))

<details><summary>Sources read</summary>

- APRA: 13 items from https://www.apra.gov.au/news-and-publications (links: 13)
- ASIC media releases: 0 items from https://www.asic.gov.au/newsroom/media-releases/ (links: 0); https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/ (links: 0)
- ASIC news: 0 items from https://www.asic.gov.au/newsroom/news-items/ (404); https://www.asic.gov.au/about-asic/news-centre/news-items/ (links: 0)
- AUSTRAC: 0 items from https://www.austrac.gov.au/news-and-media (TimeoutError: The read operation timed out)
- OAIC: 0 items from https://www.oaic.gov.au/news/media-centre (links: 0)
- ACCC: 0 items from https://www.accc.gov.au/media-releases (403); https://www.accc.gov.au/news-centre (403)
- Treasury consultations: 9 items from https://treasury.gov.au/consultation (links: 9); https://consult.treasury.gov.au/ (links: 0)
- Treasury ministers: 42 items from https://ministers.treasury.gov.au/ministers/jim-chalmers-2022/media-releases (links: 21); https://ministers.treasury.gov.au/ministers/daniel-mulino-2025/media-releases (links: 21)
- Australian Signals Directorate: 0 items from https://www.cyber.gov.au/about-us/view-all-content/news (TimeoutError: The read operation timed out)
- Attorney-General's Department consultations: 6 items from https://consultations.ag.gov.au/ (links: 6)

</details>
