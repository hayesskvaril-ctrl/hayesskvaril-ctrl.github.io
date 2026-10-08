# Regulator watch, 8 October 2026

Automatic weekly check of official announcements and of the key facts register. To act on it, ask Claude to "process the regulator watch issue": each item is checked against the official source, pages are updated if needed, and the issue is closed with a note of what changed.

## New announcements (0)

None since the last check.

## Key facts not found on their official source (4, 4 new this week)

The value below did not appear on the fact's source page. The fact may have changed, the page may word it differently, or the source page may have moved. Check by hand, then run update_fact.py.

- [ ] **New:** `ndb-assessment`: Notifiable data breaches: take all reasonable steps to assess a suspected eligible data breach within: **30 days** ([source](https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme))
- [ ] **New:** `idr-response`: RG 271: maximum time to give an IDR response to a standard complaint: **30 calendar days** ([source](https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-271-internal-dispute-resolution))
- [ ] **New:** `idr-super-response`: RG 271: maximum time to give an IDR response to a superannuation trustee complaint (other than about death benefit distributions): **45 calendar days** ([source](https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-271-internal-dispute-resolution))
- [ ] **New:** `cet1-minimum`: APS 110: minimum Common Equity Tier 1 (CET1) capital ratio, before buffers: **4.5%** ([source](https://www.apra.gov.au/standards/aps-110))

## Fact sources that could not be read (1)

- `modslav-threshold`: could not read the source (TimeoutError: The read operation timed out) (https://www.ag.gov.au/crime/modern-slavery/modern-slavery-act)

## Confirmed on the official source: 34 of 60 facts

## Check by hand

- [AUSTRAC](https://www.austrac.gov.au/news-and-media): This site blocks automated reading from cloud servers: check its news page by hand (monthly upkeep).
- [OAIC](https://www.oaic.gov.au/news/media-centre): The OAIC's news list is built in the browser, and its RSS feed and sitemap are out of date: check its media centre by hand (monthly upkeep).
- [ACCC](https://www.accc.gov.au/media-releases): This site blocks automated reading from cloud servers: check its news page by hand (monthly upkeep).
- [Australian Signals Directorate](https://www.cyber.gov.au/about-us/view-all-content/news): This site blocks automated reading from cloud servers: check its news page by hand (monthly upkeep).

<details><summary>Sources read</summary>

- APRA: 13 items from https://www.apra.gov.au/news-and-publications (links: 13)
- ASIC media releases: 200 items from https://www.asic.gov.au/sitemap.xml (feed https://www.asic.gov.au/sitemap.xml: 200); https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/ (links: 0)
- AUSTRAC: 0 items from https://www.austrac.gov.au/news-and-media (TimeoutError: The read operation timed out); https://www.austrac.gov.au/sitemap.xml (TimeoutError: The read operation timed out)
- OAIC: 0 items from https://www.oaic.gov.au/news/media-centre (links: 0)
- ACCC: 0 items from https://www.accc.gov.au/sitemap.xml (403); https://www.accc.gov.au/media-releases (403)
- Treasury consultations: 9 items from https://treasury.gov.au/consultation (links: 9); https://consult.treasury.gov.au/ (links: 0)
- Treasury ministers: 42 items from https://ministers.treasury.gov.au/ministers/jim-chalmers-2022/media-releases (links: 21); https://ministers.treasury.gov.au/ministers/daniel-mulino-2025/media-releases (links: 21)
- Australian Signals Directorate: 0 items from https://www.cyber.gov.au/about-us/view-all-content/news (TimeoutError: The read operation timed out); https://www.cyber.gov.au/sitemap.xml (TimeoutError: The read operation timed out)
- Attorney-General's Department consultations: 6 items from https://consultations.ag.gov.au/ (links: 6)

</details>
