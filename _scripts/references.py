"""Reference register: every research source cited on RiskLens Australia, each checked to exist.

Cite a source in a page with its key, and leave the link text empty (the build fills it in):
    (<a class="cite" href="#ref-reason-2000"></a>)            -> (Reason, 2000)
    <a class="cite narrative" href="#ref-kellogg-2017"></a>    -> Kellogg et al. (2017)
Several in one bracket: (<a class="cite" href="#ref-a"></a>; <a class="cite" href="#ref-b"></a>)
A "Further reading" list is written as <ul class="further-reading" data-refs="key1 key2"></ul>.
Then run  python3 _scripts/build_references.py  to fill in citations, write each page's reference list
and rebuild the Research library page. Only cite a key that is in REFS.

Rules for adding a source
  * Check it exists before adding it: authors (in order), year, title, journal, volume, issue, pages
    and DOI, against the publisher's page or an index such as PubMed, and set "checked" to that date.
  * Never add a source from memory alone, and never guess a DOI. If the DOI can't be confirmed, leave
    it out and give the publisher's URL instead.
  * "note" says in our own words what the source argues or finds. It is shown in the Research library.
  * "pr": True only for articles in peer-reviewed journals (and refereed conference papers).
    Books, book chapters, reports and law reviews edited by students are False.

Fields: kind ("article", "book", "chapter", "report"), authors (list of "Surname, I. I."), year, title
(sentence case), journal, volume, issue, pages, doi, url, publisher, edition, editors, book, topics
(keys of TOPICS), pr, note, checked (ISO date).
"""

TOPICS = {
    "erm": "Enterprise risk management and risk frameworks",
    "theory": "Theories of risk, accidents and reliability",
    "judgement": "Judgement, bias and decision-making",
    "incidents": "Incidents, root causes and learning",
    "measurement": "Risk measurement, capital and stress testing",
    "indicators": "Indicators, metrics and control charts",
    "controls": "Internal control, testing and audit",
    "resilience": "Operational resilience, continuity and outsourcing",
    "liquidity": "Liquidity, valuation and unit pricing",
    "super": "Superannuation and pensions",
    "regulation": "Regulation, compliance and enforcement",
    "disclosure": "Disclosure, consumers and misleading conduct",
    "governance": "Boards, directors and corporate governance",
    "culture": "Culture, conduct, incentives and accountability",
    "speakup": "Whistleblowing, voice and fraud",
    "cyber": "Cyber and information security risk",
    "climate": "Climate risk and sustainable finance",
    "fincrime": "Financial crime and AML/CTF",
    "trust": "Trust, redress and remediation",
}

REFS = {
    # ---------- Incidents, root causes and learning ----------
    "reason-2000": dict(
        kind="article", authors=["Reason, J."], year=2000, title="Human error: Models and management",
        journal="BMJ", volume="320", issue="7237", pages="768–770", doi="10.1136/bmj.320.7237.768",
        topics=["incidents", "theory"], pr=True, checked="2026-09-30",
        note="Contrasts the 'person approach' to error (blame, retraining) with the 'system approach', and introduces the Swiss cheese model of layered defences with active failures and latent conditions."),
    "peerally-2017": dict(
        kind="article", authors=["Peerally, M. F.", "Carr, S.", "Waring, J.", "Dixon-Woods, M."], year=2017,
        title="The problem with root cause analysis", journal="BMJ Quality & Safety", volume="26", issue="5",
        pages="417–422", doi="10.1136/bmjqs-2016-005511", topics=["incidents"], pr=True, checked="2026-09-30",
        note="Sets out problems with root cause analysis as applied in healthcare, including a misleading search for a single cause and weak, poorly followed-up fixes. Argues it was borrowed from other industries without enough attention to what makes it work there."),
    "card-2017": dict(
        kind="article", authors=["Card, A. J."], year=2017, title="The problem with '5 whys'",
        journal="BMJ Quality & Safety", volume="26", issue="8", pages="671–677", doi="10.1136/bmjqs-2016-005849",
        topics=["incidents"], pr=True, checked="2026-09-30",
        note="Critiques the popular '5 whys' technique: it assumes a single, linear chain of causes, oversimplifies complex events and has little evidence that it works for serious incidents."),
    "kellogg-2017": dict(
        kind="article", authors=["Kellogg, K. M.", "Hettinger, Z.", "Shah, M.", "Wears, R. L.", "Sellers, C. R.", "Squires, M.", "Fairbanks, R. J."],
        year=2017, title="Our current approach to root cause analysis: Is it contributing to our failure to improve patient safety?",
        journal="BMJ Quality & Safety", volume="26", issue="5", pages="381–387", doi="10.1136/bmjqs-2016-005991",
        topics=["incidents"], pr=True, checked="2026-09-30",
        note="A review of 302 root cause analyses at a US hospital system found that many proposed solutions were weak, mostly training, process changes and enforcing existing policy."),
    "hibbert-2018": dict(
        kind="article", authors=["Hibbert, P. D.", "Thomas, M. J. W.", "Deakin, A.", "Runciman, W. B.", "Braithwaite, J.", "Lomax, S.",
                                 "Prescott, J.", "Gorrie, G.", "Szczygielski, A.", "Surwald, T.", "Fraser, C."],
        year=2018, title="Are root cause analyses recommendations effective and sustainable? An observational study",
        journal="International Journal for Quality in Health Care", volume="30", issue="2", pages="124–131",
        doi="10.1093/intqhc/mzx181", topics=["incidents"], pr=True, checked="2026-09-30",
        note="Australian study of 227 root cause analyses of sentinel events in Victoria (2010 to 2015): of 1,137 recommendations, 8% were strong, 44% medium and 48% weak, and about 15% of analyses made only weak recommendations."),
    "leveson-2004": dict(
        kind="article", authors=["Leveson, N."], year=2004, title="A new accident model for engineering safer systems",
        journal="Safety Science", volume="42", issue="4", pages="237–270", doi="10.1016/S0925-7535(03)00047-X",
        topics=["incidents", "theory"], pr=True, checked="2026-09-30",
        note="Proposes STAMP, an accident model based on systems theory: accidents arise from inadequate control of interactions in a system, not just chains of failed components, so analysis must include management and organisational control."),

    "dekker-breakey-2016": dict(
        kind="article", authors=["Dekker, S. W. A.", "Breakey, H."], year=2016,
        title="'Just culture:' Improving safety by achieving substantive, procedural and restorative justice",
        journal="Safety Science", volume="85", pages="187–193", url="https://www.sciencedirect.com/science/article/abs/pii/S0925753516000321",
        topics=["incidents", "culture"], pr=True, checked="2026-09-30",
        note="Argues that a just culture needs more than rules about when to punish: organisations should also attend to fair process and to restoring relationships after an incident, so people keep reporting."),
    "dekker-2016": dict(
        kind="book", authors=["Dekker, S."], year=2016, title="Just culture: Restoring trust and accountability in your organization",
        edition="3rd", publisher="CRC Press", topics=["incidents", "culture"], pr=False, checked="2026-09-30",
        note="A practitioner-focused book on responding to incidents in ways that balance accountability with learning, including restorative approaches."),

    # ---------- Indicators, metrics and control charts ----------
    "scandizzo-2005": dict(
        kind="article", authors=["Scandizzo, S."], year=2005, title="Risk mapping and key risk indicators in operational risk management",
        journal="Economic Notes", volume="34", issue="2", pages="231–256", doi="10.1111/j.0391-5026.2005.00150.x",
        topics=["indicators", "measurement"], pr=True, checked="2026-09-30",
        note="Sets out a method for mapping operational risks to the steps of a business process, then choosing key risk indicators that estimate likelihood and severity at each step and designing controls around them."),
    "ittner-1998": dict(
        kind="article", authors=["Ittner, C. D.", "Larcker, D. F."], year=1998,
        title="Are nonfinancial measures leading indicators of financial performance? An analysis of customer satisfaction",
        journal="Journal of Accounting Research", volume="36", pages="1–35", doi="10.2307/2491304",
        topics=["indicators"], pr=True, checked="2026-09-30",
        note="Tests whether customer satisfaction predicts later financial results, finding it is a leading indicator in some settings and that the relationship is not simply linear: an early empirical test of the 'leading indicator' idea."),
    "kerr-1975": dict(
        kind="article", authors=["Kerr, S."], year=1975, title="On the folly of rewarding A, while hoping for B",
        journal="Academy of Management Journal", volume="18", issue="4", pages="769–783", doi="10.2307/255378",
        topics=["indicators", "culture"], pr=True, checked="2026-09-30",
        note="A classic essay with examples showing that organisations often reward behaviour they don't want while hoping for behaviour they aren't rewarding, and that people respond to what is measured and rewarded."),
    "campbell-1979": dict(
        kind="article", authors=["Campbell, D. T."], year=1979, title="Assessing the impact of planned social change",
        journal="Evaluation and Program Planning", volume="2", issue="1", pages="67–90", doi="10.1016/0149-7189(79)90048-X",
        topics=["indicators", "regulation"], pr=True, checked="2026-09-30",
        note="Source of 'Campbell's law': the more a quantitative indicator is used for decisions, the more it is subject to corruption pressures and the more it distorts the process it is meant to monitor."),
    "nelson-1984": dict(
        kind="article", authors=["Nelson, L. S."], year=1984, title="The Shewhart control chart: Tests for special causes",
        journal="Journal of Quality Technology", volume="16", issue="4", pages="237–239", doi="10.1080/00224065.1984.11978921",
        topics=["indicators"], pr=False, checked="2026-09-30",
        note="A short technical note setting out eight tests (the 'Nelson rules') for spotting non-random patterns on a control chart, such as runs of points on one side of the mean."),
    "woodall-2000": dict(
        kind="article", authors=["Woodall, W. H."], year=2000, title="Controversies and contradictions in statistical process control",
        journal="Journal of Quality Technology", volume="32", issue="4", pages="341–350", doi="10.1080/00224065.2000.11980013",
        topics=["indicators"], pr=True, checked="2026-09-30",
        note="Reviews debates in statistical process control, including whether control charts are hypothesis tests, how to model their performance and how to compare competing methods."),

    # ---------- Internal control, testing and audit ----------
    "power-1997": dict(
        kind="book", authors=["Power, M."], year=1997, title="The audit society: Rituals of verification",
        publisher="Oxford University Press", topics=["controls", "regulation"], pr=False, checked="2026-09-30",
        note="Argues that the 'audit explosion' produces comfort and legitimacy as much as real assurance, because checking often focuses on whether systems exist rather than on outcomes."),
    "elder-2013": dict(
        kind="article", authors=["Elder, R. J.", "Akresh, A. D.", "Glover, S. M.", "Higgs, J. L.", "Liljegren, J."], year=2013,
        title="Audit sampling research: A synthesis and implications for future research",
        journal="Auditing: A Journal of Practice & Theory", volume="32", issue="Supplement 1", pages="99–129", doi="10.2308/ajpt-50394",
        topics=["controls"], pr=True, checked="2026-09-30",
        note="Synthesises decades of research on how auditors plan, select and evaluate samples, and sets out open questions for research and practice."),
    "durney-2014": dict(
        kind="article", authors=["Durney, M.", "Elder, R. J.", "Glover, S. M."], year=2014, title="Field data on accounting error rates and audit sampling",
        journal="Auditing: A Journal of Practice & Theory", volume="33", issue="2", pages="79–110", doi="10.2308/ajpt-50669",
        topics=["controls"], pr=True, checked="2026-09-30",
        note="Uses data from 160 real audit sampling applications at a large audit firm to study how often errors occur in accounting populations and how auditors sample after the Sarbanes-Oxley reforms."),
    "doyle-2007": dict(
        kind="article", authors=["Doyle, J.", "Ge, W.", "McVay, S."], year=2007, title="Determinants of weaknesses in internal control over financial reporting",
        journal="Journal of Accounting and Economics", volume="44", issue="1–2", pages="193–223", doi="10.1016/j.jacceco.2006.10.003",
        topics=["controls"], pr=True, checked="2026-09-30",
        note="Across 779 US firms disclosing material weaknesses, control failures were more likely in firms that were smaller, younger, financially weaker, more complex, growing fast or restructuring; entity-wide weaknesses clustered in weaker firms."),

    # ---------- Risk measurement, capital and stress testing ----------
    "artzner-1999": dict(
        kind="article", authors=["Artzner, P.", "Delbaen, F.", "Eber, J.-M.", "Heath, D."], year=1999, title="Coherent measures of risk",
        journal="Mathematical Finance", volume="9", issue="3", pages="203–228", doi="10.1111/1467-9965.00068",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Proposes four properties a sensible risk measure should have (the 'coherence' axioms) and shows that value at risk can fail one of them, subadditivity, so it can penalise diversification."),
    "acerbi-2002": dict(
        kind="article", authors=["Acerbi, C.", "Tasche, D."], year=2002, title="On the coherence of expected shortfall",
        journal="Journal of Banking & Finance", volume="26", issue="7", pages="1487–1503", doi="10.1016/S0378-4266(02)00283-2",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Compares definitions of expected shortfall and identifies the one that is a coherent risk measure for any loss distribution, supporting its use in place of value at risk."),
    "defontnouvelle-2006": dict(
        kind="article", authors=["de Fontnouvelle, P.", "DeJesus-Rueff, V.", "Jordan, J. S.", "Rosengren, E. S."], year=2006,
        title="Capital and risk: New evidence on implications of large operational losses", journal="Journal of Money, Credit and Banking",
        volume="38", issue="7", pages="1819–1846", url="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=648164",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Uses external data on large operational losses at banks to estimate how heavy the tail of losses is, and what this implies for the operational risk capital large banks need."),
    "chernobai-2011": dict(
        kind="article", authors=["Chernobai, A.", "Jorion, P.", "Yu, F."], year=2011, title="The determinants of operational risk in U.S. financial institutions",
        journal="Journal of Financial and Quantitative Analysis", volume="46", issue="6", pages="1683–1725", doi="10.1017/S0022109011000500",
        topics=["measurement", "controls"], pr=True, checked="2026-09-30",
        note="Using publicly reported losses from 1980 to 2005, finds most operational losses trace to breakdowns of internal control, and that losses are more likely at younger, more complex firms with higher credit risk and stronger CEO option-based pay."),
    "cope-2009": dict(
        kind="article", authors=["Cope, E. W.", "Mignola, G.", "Antonini, G.", "Ugoccioni, R."], year=2009,
        title="Challenges and pitfalls in measuring operational risk from loss data", journal="Journal of Operational Risk",
        volume="4", issue="4", pages="3–27", doi="10.21314/JOP.2009.069", topics=["measurement"], pr=True, checked="2026-09-30",
        note="Shows how hard it is to estimate operational risk at very high quantiles such as 99.9% from the loss data banks actually have, and how unstable model results and validation can be."),
    "peters-2016": dict(
        kind="article", authors=["Peters, G. W.", "Shevchenko, P. V.", "Hassani, B.", "Chapelle, A."], year=2016,
        title="Should the advanced measurement approach be replaced with the standardized measurement approach for operational risk?",
        journal="Journal of Operational Risk", volume="11", issue="3", pages="1–49", url="https://arxiv.org/abs/1607.02319",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Stress tests the Basel Committee's proposed standardised approach and argues it can be unstable, insensitive to risk and super-additive, and proposes alternatives."),
    "rosenberg-2006": dict(
        kind="article", authors=["Rosenberg, J. V.", "Schuermann, T."], year=2006, title="A general approach to integrated risk management with skewed, fat-tailed risks",
        journal="Journal of Financial Economics", volume="79", issue="3", pages="569–614",
        url="https://www.sciencedirect.com/science/article/abs/pii/S0304405X05001509", topics=["measurement"], pr=True, checked="2026-09-30",
        note="Builds the joint distribution of market, credit and operational risk for a large bank using copulas, and shows how the choice of dependence assumptions changes total risk."),
    "kretzschmar-2010": dict(
        kind="article", authors=["Kretzschmar, G.", "McNeil, A. J.", "Kirchner, A."], year=2010, title="Integrated models of capital adequacy: Why banks are undercapitalised",
        journal="Journal of Banking & Finance", volume="34", issue="12", pages="2838–2850", doi="10.1016/j.jbankfin.2010.02.028",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Compares modular, correlation-based aggregation with a fully integrated model driven by economic scenarios, and finds the modular approach common in practice could leave banks undercapitalised."),
    "longin-2001": dict(
        kind="article", authors=["Longin, F.", "Solnik, B."], year=2001, title="Extreme correlation of international equity markets",
        journal="The Journal of Finance", volume="56", issue="2", pages="649–676", doi="10.1111/0022-1082.00340",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Using extreme value theory, finds that correlation between international share markets rises in bear markets but not in bull markets: diversification weakens when it is needed most."),
    "embrechts-2002": dict(
        kind="chapter", authors=["Embrechts, P.", "McNeil, A.", "Straumann, D."], year=2002, title="Correlation and dependence in risk management: Properties and pitfalls",
        editors=["M. A. H. Dempster"], book="Risk management: Value at risk and beyond", pages="176–223", publisher="Cambridge University Press",
        topics=["measurement"], pr=False, checked="2026-09-30",
        note="A widely used explanation of why linear correlation is a poor summary of dependence outside normal distributions, and why copulas and tail dependence matter for aggregating risks."),

    "borio-2014": dict(
        kind="article", authors=["Borio, C.", "Drehmann, M.", "Tsatsaronis, K."], year=2014,
        title="Stress-testing macro stress testing: Does it live up to expectations?", journal="Journal of Financial Stability",
        volume="12", pages="3–15", url="https://www.sciencedirect.com/science/article/abs/pii/S1572308913000454",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Argues that macro stress tests before the 2008 crisis failed to flag the vulnerabilities that mattered, because models could not capture the non-linear, self-reinforcing dynamics of real crises; stress tests are better at crisis management than at early warning."),
    "breuer-2009": dict(
        kind="article", authors=["Breuer, T.", "Jandačka, M.", "Rheinberger, K.", "Summer, M."], year=2009,
        title="How to find plausible, severe, and useful stress scenarios", journal="International Journal of Central Banking",
        volume="5", issue="3", pages="205–224", url="https://www.ijcb.org/journal/ijcb09q3a7.pdf",
        topics=["measurement"], pr=True, checked="2026-09-30",
        note="Proposes a systematic search for the worst scenarios within a defined region of plausibility, instead of relying on hand-picked scenarios that may miss the combinations that hurt most."),
    "bradfield-2005": dict(
        kind="article", authors=["Bradfield, R.", "Wright, G.", "Burt, G.", "Cairns, G.", "van der Heijden, K."], year=2005,
        title="The origins and evolution of scenario techniques in long range business planning", journal="Futures",
        volume="37", issue="8", pages="795–812", doi="10.1016/j.futures.2005.01.003", topics=["measurement"], pr=True, checked="2026-09-30",
        note="Traces the history of scenario methods and classifies them into three main schools, showing that 'scenario analysis' covers quite different techniques with different purposes."),

    # ---------- Liquidity, valuation and unit pricing ----------
    "chen-2010": dict(
        kind="article", authors=["Chen, Q.", "Goldstein, I.", "Jiang, W."], year=2010,
        title="Payoff complementarities and financial fragility: Evidence from mutual fund outflows", journal="Journal of Financial Economics",
        volume="97", issue="2", pages="239–262", doi="10.1016/j.jfineco.2010.03.016", topics=["liquidity"], pr=True, checked="2026-09-30",
        note="Funds holding illiquid assets see outflows respond more strongly to poor performance, because investors who leave early impose trading costs on those who stay: evidence of first-mover advantage and run risk."),
    "goldstein-2017": dict(
        kind="article", authors=["Goldstein, I.", "Jiang, H.", "Ng, D. T."], year=2017, title="Investor flows and fragility in corporate bond funds",
        journal="Journal of Financial Economics", volume="126", issue="3", pages="592–613",
        url="https://www.sciencedirect.com/science/article/abs/pii/S0304405X17302325", topics=["liquidity"], pr=True, checked="2026-09-30",
        note="Corporate bond funds show a concave flow-performance relationship: outflows react more to bad performance than inflows react to good performance, which can amplify fire sales in stressed markets."),
    "getmansky-2004": dict(
        kind="article", authors=["Getmansky, M.", "Lo, A. W.", "Makarov, I."], year=2004,
        title="An econometric model of serial correlation and illiquidity in hedge fund returns", journal="Journal of Financial Economics",
        volume="74", issue="3", pages="529–609", doi="10.1016/j.jfineco.2004.04.001", topics=["liquidity"], pr=True, checked="2026-09-30",
        note="Shows that smooth, serially correlated returns in funds holding illiquid assets mostly reflect stale or smoothed valuations, which understate true volatility and overstate risk-adjusted performance."),
    "brunnermeier-2009": dict(
        kind="article", authors=["Brunnermeier, M. K.", "Pedersen, L. H."], year=2009, title="Market liquidity and funding liquidity",
        journal="The Review of Financial Studies", volume="22", issue="6", pages="2201–2238", doi="10.1093/rfs/hhn098",
        topics=["liquidity"], pr=True, checked="2026-09-30",
        note="A model of 'liquidity spirals': when funding tightens, forced selling reduces market liquidity, which tightens funding further, so liquidity can dry up suddenly."),
    "chalmers-2001": dict(
        kind="article", authors=["Chalmers, J. M. R.", "Edelen, R. M.", "Kadlec, G. B."], year=2001,
        title="On the perils of financial intermediaries setting security prices: The mutual fund wild card option", journal="The Journal of Finance",
        volume="56", issue="6", pages="2209–2236", doi="10.1111/0022-1082.00403", topics=["liquidity"], pr=True, checked="2026-09-30",
        note="Shows that fund prices set with stale underlying prices are predictable, giving traders a 'wild card option' to buy or sell at yesterday's value at the expense of other investors."),
    "zitzewitz-2003": dict(
        kind="article", authors=["Zitzewitz, E."], year=2003, title="Who cares about shareholders? Arbitrage-proofing mutual funds",
        journal="The Journal of Law, Economics, and Organization", volume="19", issue="2", pages="245–280", doi="10.1093/jleo/ewg011",
        topics=["liquidity"], pr=True, checked="2026-09-30",
        note="Estimates that trading on stale fund prices could earn 35–70% a year in international funds, at the expense of long-term investors, and discusses fair value pricing and other fixes."),

    # ---------- Operational resilience, continuity and outsourcing ----------
    "herbane-2010": dict(
        kind="article", authors=["Herbane, B."], year=2010, title="The evolution of business continuity management: A historical review of practices and drivers",
        journal="Business History", volume="52", issue="6", pages="978–1002", doi="10.1080/00076791.2010.511185",
        topics=["resilience"], pr=True, checked="2026-09-30",
        note="Traces business continuity management from 1970s IT disaster recovery to an organisation-wide discipline, showing how major events and regulation drove each phase and how 'resilience' became the organising idea."),
    "linnenluecke-2017": dict(
        kind="article", authors=["Linnenluecke, M. K."], year=2017, title="Resilience in business and management research: A review of influential publications and a research agenda",
        journal="International Journal of Management Reviews", volume="19", issue="1", pages="4–30", doi="10.1111/ijmr.12076",
        topics=["resilience"], pr=True, checked="2026-09-30",
        note="Reviews influential resilience research from 1977 to 2014 and identifies five streams, from responses to external threats and organisational reliability to supply chain vulnerability, noting little agreement on definitions or measures."),
    "williams-2017": dict(
        kind="article", authors=["Williams, T. A.", "Gruber, D. A.", "Sutcliffe, K. M.", "Shepherd, D. A.", "Zhao, E. Y."], year=2017,
        title="Organizational response to adversity: Fusing crisis management and resilience research streams", journal="Academy of Management Annals",
        volume="11", issue="2", pages="733–769", doi="10.5465/annals.2015.0134", topics=["resilience"], pr=True, checked="2026-09-30",
        note="Brings together crisis management and resilience research to explain how organisations anticipate, respond to and recover from adversity, and why capabilities built before a crisis shape the response."),
    "annarelli-2016": dict(
        kind="article", authors=["Annarelli, A.", "Nonino, F."], year=2016,
        title="Strategic and operational management of organizational resilience: Current state of research and future directions",
        journal="Omega", volume="62", pages="1–18", doi="10.1016/j.omega.2015.08.004", topics=["resilience"], pr=True, checked="2026-09-30",
        note="A systematic review and co-citation analysis of organisational resilience research, distinguishing strategic resilience (preparing and adapting) from operational resilience (keeping critical processes running)."),
    "williamson-1979": dict(
        kind="article", authors=["Williamson, O. E."], year=1979, title="Transaction-cost economics: The governance of contractual relations",
        journal="The Journal of Law and Economics", volume="22", issue="2", pages="233–261", url="https://chicagounbound.uchicago.edu/jle/vol22/iss2/3/",
        topics=["resilience", "governance"], pr=True, checked="2026-09-30",
        note="Explains how uncertainty, frequency and transaction-specific investments shape whether activities are best governed by markets, contracts or in-house, and why specific investments create lock-in."),
    "aron-2005": dict(
        kind="article", authors=["Aron, R.", "Clemons, E. K.", "Reddi, S."], year=2005, title="Just right outsourcing: Understanding and managing risk",
        journal="Journal of Management Information Systems", volume="22", issue="2", pages="37–55",
        url="https://www.semanticscholar.org/paper/Just-Right-Outsourcing:-Understanding-and-Managing-Aron-Clemons/0fb3901b8ed6e32bb32dcf7ef44677411cd12898",
        topics=["resilience"], pr=True, checked="2026-09-30",
        note="Sets out a taxonomy of business process outsourcing risks, including opportunistic behaviour by providers, and argues that splitting work between providers and redesigning processes can reduce them."),
    "lacity-2009": dict(
        kind="article", authors=["Lacity, M. C.", "Khan, S. A.", "Willcocks, L. P."], year=2009, title="A review of the IT outsourcing literature: Insights for practice",
        journal="The Journal of Strategic Information Systems", volume="18", issue="3", pages="130–146", doi="10.1016/j.jsis.2009.06.002",
        topics=["resilience"], pr=True, checked="2026-09-30",
        note="Reviews 191 studies of IT outsourcing and draws practical lessons on motives, contracts, relationship management and why outcomes vary."),
    "whitten-2006": dict(
        kind="article", authors=["Whitten, D.", "Leidner, D."], year=2006, title="Bringing IT back: An analysis of the decision to backsource or switch vendors",
        journal="Decision Sciences", volume="37", issue="4", pages="605–621", doi="10.1111/j.1540-5414.2006.00140.x",
        topics=["resilience"], pr=True, checked="2026-09-30",
        note="A survey of 160 IT managers comparing organisations that switched provider, brought services back in-house or stayed, and the factors behind each decision, including switching costs."),

    # ---------- Regulation, compliance and enforcement ----------
    "nagin-2013": dict(
        kind="article", authors=["Nagin, D. S."], year=2013, title="Deterrence in the twenty-first century",
        journal="Crime and Justice", volume="42", pages="199–263", doi="10.1086/670398", topics=["regulation"], pr=True, checked="2026-09-30",
        note="Reviews the evidence on deterrence and concludes that the certainty of being caught deters far more consistently than the severity of the punishment."),
    "kaplow-1994": dict(
        kind="article", authors=["Kaplow, L.", "Shavell, S."], year=1994, title="Optimal law enforcement with self-reporting of behavior",
        journal="Journal of Political Economy", volume="102", issue="3", pages="583–606", doi="10.1086/261947",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="The economic case for self-reporting regimes: rewarding people who report their own violations saves enforcement resources and replaces uncertain sanctions with certain, smaller ones."),
    "innes-1999": dict(
        kind="article", authors=["Innes, R."], year=1999, title="Remediation and self-reporting in optimal law enforcement",
        journal="Journal of Public Economics", volume="72", issue="3", pages="379–393",
        url="https://www.sciencedirect.com/science/article/abs/pii/S0047272798001017", topics=["regulation", "trust"], pr=True, checked="2026-09-30",
        note="Adds remediation to the theory of self-reporting: firms that self-report can be required to fix the harm every time, whereas non-reporters fix it only if they are caught, strengthening the case for self-reporting."),
    "toffel-2011": dict(
        kind="article", authors=["Toffel, M. W.", "Short, J. L."], year=2011, title="Coming clean and cleaning up: Does voluntary self-reporting indicate effective self-policing?",
        journal="The Journal of Law and Economics", volume="54", issue="3", pages="609–649", doi="10.1086/658494",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="In US environmental regulation, regulators eased enforcement on firms that voluntarily disclosed violations, and those firms went on to improve their compliance, suggesting self-reporting can signal genuine self-policing."),
    "messier-2005": dict(
        kind="article", authors=["Messier, W. F., Jr.", "Martinov-Bennie, N.", "Eilifsen, A."], year=2005,
        title="A review and integration of empirical research on materiality: Two decades later", journal="Auditing: A Journal of Practice & Theory",
        volume="24", issue="2", pages="153–187", doi="10.2308/aud.2005.24.2.153", topics=["regulation", "controls"], pr=True, checked="2026-09-30",
        note="Reviews two decades of research on how auditors and others judge materiality, including how quantitative rules of thumb interact with qualitative factors and how judgements vary between people."),
    "parker-2009": dict(
        kind="article", authors=["Parker, C.", "Nielsen, V. L."], year=2009, title="Corporate compliance systems: Could they make any difference?",
        journal="Administration & Society", volume="41", issue="1", pages="3–37", doi="10.1177/0095399708328869",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Survey of 999 large Australian businesses on competition and consumer law compliance: some elements of formal compliance systems translate into better compliance management, but management commitment, oversight and resources matter just as much."),
    "mckendall-2002": dict(
        kind="article", authors=["McKendall, M.", "DeMarr, B.", "Jones-Rikkers, C."], year=2002,
        title="Ethical compliance programs and corporate illegality: Testing the assumptions of the corporate sentencing guidelines",
        journal="Journal of Business Ethics", volume="37", pages="367–383", doi="10.1023/A:1015287823807", topics=["regulation"], pr=True, checked="2026-09-30",
        note="Across 108 large US corporations, ethics codes, communication, training and HR practices were not associated with fewer workplace safety violations, questioning whether formal programs change behaviour."),
    "weaver-1999": dict(
        kind="article", authors=["Weaver, G. R.", "Treviño, L. K.", "Cochran, P. L."], year=1999,
        title="Integrated and decoupled corporate social performance: Management commitments, external pressures, and corporate ethics practices",
        journal="Academy of Management Journal", volume="42", issue="5", pages="539–552", doi="10.5465/256975", topics=["regulation", "culture"], pr=True, checked="2026-09-30",
        note="External pressure tends to produce ethics and compliance programs that are 'decoupled' from everyday operations, while genuine top management commitment is needed for programs integrated into how the business runs."),
    "becker-1968": dict(
        kind="article", authors=["Becker, G. S."], year=1968, title="Crime and punishment: An economic approach",
        journal="Journal of Political Economy", volume="76", issue="2", pages="169–217", doi="10.1086/259394", topics=["regulation"], pr=True, checked="2026-09-30",
        note="The foundation of the economics of enforcement: people weigh the expected cost of a violation, the probability of being caught times the penalty, against its benefit."),
    "polinsky-2000": dict(
        kind="article", authors=["Polinsky, A. M.", "Shavell, S."], year=2000, title="The economic theory of public enforcement of law",
        journal="Journal of Economic Literature", volume="38", issue="1", pages="45–76", doi="10.1257/jel.38.1.45", topics=["regulation"], pr=True, checked="2026-09-30",
        note="A survey of enforcement theory: how the probability and size of sanctions, fines versus imprisonment, self-reporting, repeat offending and errors affect deterrence."),
    "karpoff-2008": dict(
        kind="article", authors=["Karpoff, J. M.", "Lee, D. S.", "Martin, G. S."], year=2008, title="The cost to firms of cooking the books",
        journal="Journal of Financial and Quantitative Analysis", volume="43", issue="3", pages="581–611", doi="10.1017/S0022109000004221",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="For 585 US firms subject to enforcement for financial misrepresentation, the reputational loss was more than 7.5 times the legal and regulatory penalties combined."),
    "armour-2017": dict(
        kind="article", authors=["Armour, J.", "Mayer, C.", "Polo, A."], year=2017, title="Regulatory sanctions and reputational damage in financial markets",
        journal="Journal of Financial and Quantitative Analysis", volume="52", issue="4", pages="1429–1448", doi="10.1017/S0022109017000461",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Studying UK enforcement announcements, finds reputational losses nearly nine times the size of fines, but only where misconduct harmed the firm's own customers or investors, not third parties."),
    "parker-2013": dict(
        kind="article", authors=["Parker, C."], year=2013, title="Twenty years of responsive regulation: An appreciation and appraisal",
        journal="Regulation & Governance", volume="7", issue="1", pages="2–13", doi="10.1111/rego.12006", topics=["regulation"], pr=True, checked="2026-09-30",
        note="Introduces a special issue marking 20 years of Ayres and Braithwaite's responsive regulation, appraising its influence on regulators and the questions it left open."),
    "black-2008": dict(
        kind="article", authors=["Black, J."], year=2008, title="Forms and paradoxes of principles-based regulation",
        journal="Capital Markets Law Journal", volume="3", issue="4", pages="425–457", doi="10.1093/cmlj/kmn026", topics=["regulation"], pr=True, checked="2026-09-30",
        note="Distinguishes forms of principles-based regulation and sets out seven paradoxes it faces, including interpretation, compliance, enforcement and trust: principles need shared understanding to work."),
    "black-2007": dict(
        kind="article", authors=["Black, J.", "Hopper, M.", "Band, C."], year=2007, title="Making a success of principles-based regulation",
        journal="Law and Financial Markets Review", volume="1", issue="3", pages="191–206", doi="10.1080/17521440.2007.11427879",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Discusses the UK Financial Services Authority's move to principles-based regulation and what regulators and firms need for it to work, including guidance, dialogue and credible enforcement."),
    "braithwaite-2002": dict(
        kind="article", authors=["Braithwaite, J."], year=2002, title="Rules and principles: A theory of legal certainty",
        journal="Australian Journal of Legal Philosophy", volume="27", pages="47–82", url="https://www.austlii.edu.au/cgi-bin/viewdoc/au/journals/AUJlLegPhil/2002/2.html",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Argues that in complex areas precise rules can deliver less certainty than principles, because rules multiply and invite gaming, and proposes combining binding principles with non-binding rules."),

    # ---------- Disclosure, consumers and misleading conduct ----------
    "bakos-2014": dict(
        kind="article", authors=["Bakos, Y.", "Marotta-Wurgler, F.", "Trossen, D. R."], year=2014,
        title="Does anyone read the fine print? Consumer attention to standard-form contracts", journal="The Journal of Legal Studies",
        volume="43", issue="1", pages="1–35", doi="10.1086/674424", topics=["disclosure"], pr=True, checked="2026-09-30",
        note="Tracking 48,154 shoppers at 90 software companies' websites, only one or two in 1,000 opened the licence agreement, and most who did read very little of it."),
    "loewenstein-2014": dict(
        kind="article", authors=["Loewenstein, G.", "Sunstein, C. R.", "Golman, R."], year=2014, title="Disclosure: Psychology changes everything",
        journal="Annual Review of Economics", volume="6", pages="391–419", doi="10.1146/annurev-economics-080213-041341", topics=["disclosure"], pr=True, checked="2026-09-30",
        note="Reviews how limited and motivated attention and biased probability judgements can weaken or reverse the effects of mandatory disclosure, and when simplified, standardised or comparative disclosure works better."),
    "delmas-2011": dict(
        kind="article", authors=["Delmas, M. A.", "Burbano, V. C."], year=2011, title="The drivers of greenwashing",
        journal="California Management Review", volume="54", issue="1", pages="64–87", doi="10.1525/cmr.2011.54.1.64", topics=["disclosure", "climate"], pr=True, checked="2026-09-30",
        note="Explains greenwashing through external (regulatory and market), organisational and individual drivers, and argues weak and uncertain regulation is a major enabler."),

    # ---------- Trust, redress and remediation ----------
    "gillespie-2009": dict(
        kind="article", authors=["Gillespie, N.", "Dietz, G."], year=2009, title="Trust repair after an organization-level failure",
        journal="Academy of Management Review", volume="34", issue="1", pages="127–145", doi="10.5465/amr.2009.35713319", topics=["trust"], pr=True, checked="2026-09-30",
        note="A framework for repairing trust after organisational failures, arguing that repair must address the whole system: leadership, culture, strategy, structures and policies, external governance and reputation."),
    "kim-2004": dict(
        kind="article", authors=["Kim, P. H.", "Ferrin, D. L.", "Cooper, C. D.", "Dirks, K. T."], year=2004,
        title="Removing the shadow of suspicion: The effects of apology versus denial for repairing competence- versus integrity-based trust violations",
        journal="Journal of Applied Psychology", volume="89", issue="1", pages="104–118", doi="10.1037/0021-9010.89.1.104", topics=["trust"], pr=True, checked="2026-09-30",
        note="Experiments showing apologies repair trust better after competence failures, while integrity failures are harder to repair by apology, which can confirm the violation."),

    # ---------- Judgement, bias and decision-making ----------
    "gigerenzer-2011": dict(
        kind="article", authors=["Gigerenzer, G.", "Gaissmaier, W."], year=2011, title="Heuristic decision making",
        journal="Annual Review of Psychology", volume="62", pages="451–482", doi="10.1146/annurev-psych-120709-145346",
        topics=["judgement"], pr=True, checked="2026-09-30",
        note="Reviews research showing that simple heuristics, which ignore part of the information, can make accurate decisions in uncertain environments, challenging the view that heuristics are simply errors."),
    "esser-1998": dict(
        kind="article", authors=["Esser, J. K."], year=1998, title="Alive and well after 25 years: A review of groupthink research",
        journal="Organizational Behavior and Human Decision Processes", volume="73", issue="2–3", pages="116–141",
        doi="10.1006/obhd.1998.2758", topics=["judgement", "governance"], pr=True, checked="2026-09-30",
        note="Reviews 25 years of historical case studies and laboratory tests of groupthink, identifies theoretical and methodological problems in the research, and concludes that the idea remains a useful guide."),
    "staw-1976": dict(
        kind="article", authors=["Staw, B. M."], year=1976, title="Knee-deep in the big muddy: A study of escalating commitment to a chosen course of action",
        journal="Organizational Behavior and Human Performance", volume="16", issue="1", pages="27–44",
        doi="10.1016/0030-5073(76)90005-2", topics=["judgement"], pr=True, checked="2026-09-30",
        note="In a simulated investment decision, 240 business students committed the most extra money to a losing course of action when they were personally responsible for the original choice."),
    "flyvbjerg-2006": dict(
        kind="article", authors=["Flyvbjerg, B."], year=2006, title="From Nobel Prize to project management: Getting risks right",
        journal="Project Management Journal", volume="37", issue="3", pages="5–15", doi="10.1177/875697280603700302",
        topics=["judgement"], pr=True, checked="2026-09-30",
        note="Explains why project forecasts are systematically optimistic and sets out reference class forecasting: basing estimates on how comparable past projects actually turned out."),
    "klein-2007": dict(
        kind="article", authors=["Klein, G."], year=2007, title="Performing a project premortem", journal="Harvard Business Review",
        volume="85", issue="9", pages="18–19", url="https://hbr.org/2007/09/performing-a-project-premortem",
        topics=["judgement"], pr=False, checked="2026-09-30",
        note="A short practitioner piece introducing the premortem: before a decision, imagine it has failed and list the reasons why."),
    "morewedge-2015": dict(
        kind="article", authors=["Morewedge, C. K.", "Yoon, H.", "Scopelliti, I.", "Symborski, C. W.", "Korris, J. H.", "Kassam, K. S."],
        year=2015, title="Debiasing decisions: Improved decision making with a single training intervention",
        journal="Policy Insights from the Behavioral and Brain Sciences", volume="2", issue="1", pages="129–140",
        doi="10.1177/2372732215600886", topics=["judgement"], pr=True, checked="2026-09-30",
        note="Two longitudinal experiments found that a single training session, a game or an instructional video, produced medium to large reductions in several biases, and the improvements persisted at later follow-up."),
    "edmondson-1999": dict(
        kind="article", authors=["Edmondson, A."], year=1999, title="Psychological safety and learning behavior in work teams",
        journal="Administrative Science Quarterly", volume="44", issue="2", pages="350–383", doi="10.2307/2666999",
        topics=["culture", "speakup"], pr=True, checked="2026-09-30",
        note="A study of 51 work teams introduced team psychological safety, a shared belief that it is safe to take interpersonal risks, and linked it to learning behaviour and performance."),
    "lichtenstein-1982": dict(
        kind="chapter", authors=["Lichtenstein, S.", "Fischhoff, B.", "Phillips, L. D."], year=1982,
        title="Calibration of probabilities: The state of the art to 1980", editors=["D. Kahneman", "P. Slovic", "A. Tversky"],
        book="Judgment under uncertainty: Heuristics and biases", pages="306–334", publisher="Cambridge University Press",
        topics=["judgement"], pr=False, checked="2026-09-30",
        note="A review of calibration research: people's confidence usually exceeds their accuracy, especially on hard questions."),
    "vaughan-1996": dict(
        kind="book", authors=["Vaughan, D."], year=1996, title="The Challenger launch decision: Risky technology, culture, and deviance at NASA",
        publisher="University of Chicago Press", topics=["theory", "culture"], pr=False, checked="2026-09-30",
        note="A sociological study of the Challenger disaster that introduced the 'normalization of deviance': repeated anomalies that caused no harm gradually came to be accepted as normal."),
    "janis-1982": dict(
        kind="book", authors=["Janis, I. L."], year=1982, title="Groupthink: Psychological studies of policy decisions and fiascoes",
        edition="2nd", publisher="Houghton Mifflin", topics=["judgement", "governance"], pr=False, checked="2026-09-30",
        note="The original account of groupthink: cohesive groups under pressure suppress dissent and reach poor decisions."),
    "tversky-1974": dict(
        kind="article", authors=["Tversky, A.", "Kahneman, D."], year=1974, title="Judgment under uncertainty: Heuristics and biases",
        journal="Science", volume="185", issue="4157", pages="1124–1131", doi="10.1126/science.185.4157.1124",
        topics=["judgement"], pr=True, checked="2026-09-30",
        note="The classic account of three heuristics people use to judge probability (representativeness, availability, and anchoring and adjustment) and the systematic errors each produces."),
    "kahneman-1993": dict(
        kind="article", authors=["Kahneman, D.", "Lovallo, D."], year=1993, title="Timid choices and bold forecasts: A cognitive perspective on risk taking",
        journal="Management Science", volume="39", issue="1", pages="17–31", doi="10.1287/mnsc.39.1.17",
        topics=["judgement"], pr=True, checked="2026-09-30",
        note="Explains why decision-makers are both too timid (judging each risk in isolation) and too bold (forecasting from an 'inside view' of their own plans), and recommends taking an 'outside view' based on reference classes."),
    "moore-2008": dict(
        kind="article", authors=["Moore, D. A.", "Healy, P. J."], year=2008, title="The trouble with overconfidence",
        journal="Psychological Review", volume="115", issue="2", pages="502–517", doi="10.1037/0033-295X.115.2.502",
        topics=["judgement"], pr=True, checked="2026-09-30",
        note="Separates three kinds of overconfidence (overestimation, overplacement and overprecision) and shows overprecision, being too sure of one's own estimates, is the most persistent."),
    "fischhoff-1975": dict(
        kind="article", authors=["Fischhoff, B."], year=1975, title="Hindsight is not equal to foresight: The effect of outcome knowledge on judgment under uncertainty",
        journal="Journal of Experimental Psychology: Human Perception and Performance", volume="1", issue="3", pages="288–299",
        doi="10.1037/0096-1523.1.3.288", topics=["judgement", "incidents"], pr=True, checked="2026-09-30",
        note="The first experimental demonstration of hindsight bias: people told an outcome judge it to have been more likely, and more foreseeable, than people who were not told."),
    "baron-1988": dict(
        kind="article", authors=["Baron, J.", "Hershey, J. C."], year=1988, title="Outcome bias in decision evaluation",
        journal="Journal of Personality and Social Psychology", volume="54", issue="4", pages="569–579",
        doi="10.1037/0022-3514.54.4.569", topics=["judgement", "incidents"], pr=True, checked="2026-09-30",
        note="Across five studies, people rated the same decision as better reasoned, and the decision-maker as more competent, when it happened to turn out well."),
    "samuelson-1988": dict(
        kind="article", authors=["Samuelson, W.", "Zeckhauser, R."], year=1988, title="Status quo bias in decision making",
        journal="Journal of Risk and Uncertainty", volume="1", issue="1", pages="7–59", doi="10.1007/BF00055564",
        topics=["judgement", "super"], pr=True, checked="2026-09-30",
        note="Experiments and field data (including retirement plan choices) show people disproportionately stick with the current option or default, even when alternatives are better."),
}
