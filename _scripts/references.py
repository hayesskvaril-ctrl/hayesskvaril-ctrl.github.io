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
    "stigler-1971": dict(
        kind="article", authors=["Stigler, G. J."], year=1971, title="The theory of economic regulation",
        journal="The Bell Journal of Economics and Management Science", volume="2", issue="1", pages="3–21", doi="10.2307/3003160",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Argues that regulation is often acquired by the industry it regulates and designed and operated primarily for its benefit: the foundation of 'regulatory capture' theory."),
    "baldwin-2008": dict(
        kind="article", authors=["Baldwin, R.", "Black, J."], year=2008, title="Really responsive regulation",
        journal="The Modern Law Review", volume="71", issue="1", pages="59–94", doi="10.1111/j.1468-2230.2008.00681.x",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Extends responsive regulation: regulators should respond not only to a firm's attitude but to its operating and cognitive frameworks, the institutional environment, the logic of different tools and how all of these change."),
    "black-2010": dict(
        kind="article", authors=["Black, J.", "Baldwin, R."], year=2010, title="Really responsive risk-based regulation",
        journal="Law & Policy", volume="32", issue="2", pages="181–213", doi="10.1111/j.1467-9930.2010.00318.x",
        topics=["regulation"], pr=True, checked="2026-09-30",
        note="Examines risk-based regulation, where regulators target resources at the greatest risks, and how it can be made responsive to complex problems, including lower-risk firms that still need attention."),
    "mascini-2013": dict(
        kind="article", authors=["Mascini, P."], year=2013, title="Why was the enforcement pyramid so influential? And what price was paid?",
        journal="Regulation & Governance", volume="7", issue="1", pages="48–60", doi="10.1111/rego.12003", topics=["regulation"], pr=True, checked="2026-09-30",
        note="Argues the enforcement pyramid became influential because it endorsed regulators' professional autonomy and offered practical tools, but that reducing responsive regulation to the pyramid neglected its wider normative questions."),
    "ayres-1992": dict(
        kind="book", authors=["Ayres, I.", "Braithwaite, J."], year=1992, title="Responsive regulation: Transcending the deregulation debate",
        publisher="Oxford University Press", topics=["regulation"], pr=False, checked="2026-09-30",
        note="The classic statement of responsive regulation and the enforcement pyramid: start with persuasion and escalate to tougher sanctions only when firms don't cooperate."),
    "fama-1983": dict(
        kind="article", authors=["Fama, E. F.", "Jensen, M. C."], year=1983, title="Separation of ownership and control",
        journal="The Journal of Law and Economics", volume="26", issue="2", pages="301–325", doi="10.1086/467037", topics=["governance"], pr=True, checked="2026-09-30",
        note="Explains how organisations separate decision management from decision control, with boards ratifying and monitoring decisions, and applies this to corporations, partnerships, mutuals and not-for-profits."),
    "davis-1997": dict(
        kind="article", authors=["Davis, J. H.", "Schoorman, F. D.", "Donaldson, L."], year=1997, title="Toward a stewardship theory of management",
        journal="Academy of Management Review", volume="22", issue="1", pages="20–47", doi="10.5465/amr.1997.9707180258", topics=["governance"], pr=True, checked="2026-09-30",
        note="Sets out stewardship theory as an alternative to agency theory: managers can be motivated to act in the organisation's interest, so governance should empower as well as control."),
    "donaldson-1991": dict(
        kind="article", authors=["Donaldson, L.", "Davis, J. H."], year=1991, title="Stewardship theory or agency theory: CEO governance and shareholder returns",
        journal="Australian Journal of Management", volume="16", issue="1", pages="49–64", doi="10.1177/031289629101600103", topics=["governance"], pr=True, checked="2026-09-30",
        note="An early test comparing agency and stewardship theory on whether the CEO should also chair the board: the results did not support agency theory and gave some support to stewardship theory."),
    "donaldson-1995": dict(
        kind="article", authors=["Donaldson, T.", "Preston, L. E."], year=1995, title="The stakeholder theory of the corporation: Concepts, evidence, and implications",
        journal="Academy of Management Review", volume="20", issue="1", pages="65–91", doi="10.5465/amr.1995.9503271992", topics=["governance"], pr=True, checked="2026-09-30",
        note="Distinguishes descriptive, instrumental and normative versions of stakeholder theory and argues the normative base, why stakeholders' interests matter in their own right, is fundamental."),
    "hillman-2003": dict(
        kind="article", authors=["Hillman, A. J.", "Dalziel, T."], year=2003, title="Boards of directors and firm performance: Integrating agency and resource dependence perspectives",
        journal="Academy of Management Review", volume="28", issue="3", pages="383–396", doi="10.5465/amr.2003.10196729", topics=["governance"], pr=True, checked="2026-09-30",
        note="Integrates two board roles, monitoring management and providing resources such as expertise and networks, and argues that directors' human and social capital affects both."),
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

    # ---------- Boards, directors and corporate governance ----------
    "davies-2018": dict(
        kind="article", authors=["Davies, H.", "Zhivitskaya, M."], year=2018, title="Three lines of defence: A robust organising framework, or just lines in the sand?",
        journal="Global Policy", volume="9", issue="S1", pages="34–42", doi="10.1111/1758-5899.12568", topics=["governance", "erm"], pr=True, checked="2026-09-30",
        note="Traces how regulators adopted the three lines of defence model after the financial crisis, notes its opaque origins and untested effectiveness, and discusses the argument that spreading responsibility reduces accountability."),
    "bantleon-2021": dict(
        kind="article", authors=["Bantleon, U.", "d'Arcy, A.", "Eulerich, M.", "Hucke, A.", "Pedell, B.", "Ratzinger-Sakel, N. V. S."], year=2021,
        title="Coordination challenges in implementing the three lines of defense model", journal="International Journal of Auditing",
        volume="25", issue="1", pages="59–74", doi="10.1111/ijau.12201", topics=["governance", "controls"], pr=True, checked="2026-09-30",
        note="Examines the challenges organisations face in coordinating the work of the three lines when implementing the model in practice."),
    "christopher-2009": dict(
        kind="article", authors=["Christopher, J.", "Sarens, G.", "Leung, P."], year=2009,
        title="A critical analysis of the independence of the internal audit function: Evidence from Australia", journal="Accounting, Auditing & Accountability Journal",
        volume="22", issue="2", pages="200–220", doi="10.1108/09513570910933942", topics=["controls", "governance"], pr=True, checked="2026-09-30",
        note="A survey of Australian chief audit executives identifying threats to internal audit independence, such as management approving the audit budget and plan, and internal audit being seen as a management 'partner' or a stepping stone."),
    "aebi-2012": dict(
        kind="article", authors=["Aebi, V.", "Sabato, G.", "Schmid, M."], year=2012, title="Risk management, corporate governance, and bank performance in the financial crisis",
        journal="Journal of Banking & Finance", volume="36", issue="12", pages="3213–3226", doi="10.1016/j.jbankfin.2011.10.020",
        topics=["governance", "erm"], pr=True, checked="2026-09-30",
        note="Banks whose chief risk officer reported directly to the board performed significantly better in the 2007–08 crisis than those where the CRO reported to the CEO."),
    "eppler-2004": dict(
        kind="article", authors=["Eppler, M. J.", "Mengis, J."], year=2004,
        title="The concept of information overload: A review of literature from organization science, accounting, marketing, MIS, and related disciplines",
        journal="The Information Society", volume="20", issue="5", pages="325–344", doi="10.1080/01972240490507974", topics=["governance"], pr=True, checked="2026-09-30",
        note="Reviews 30 years of research on information overload: beyond a point, more information reduces decision quality, and the causes, effects and countermeasures are well documented."),
    "brown-2009": dict(
        kind="article", authors=["Brown, I.", "Steen, A.", "Foreman, J."], year=2009, title="Risk management in corporate governance: A review and proposal",
        journal="Corporate Governance: An International Review", volume="17", issue="5", pages="546–558", doi="10.1111/j.1467-8683.2009.00763.x",
        topics=["governance", "erm"], pr=True, checked="2026-09-30",
        note="Examines the link between corporate governance and risk management using Australian listed biotechnology companies, and proposes how boards should oversee risk in high-uncertainty firms."),
    "herzberg-2012": dict(
        kind="article", authors=["Herzberg, A.", "Anderson, H."], year=2012, title="Stepping stones: From corporate fault to directors' personal civil liability",
        journal="Federal Law Review", volume="40", issue="2", pages="181–205", url="https://www.austlii.edu.au/cgi-bin/viewdoc/au/journals/FedLRev/2012/8.html",
        topics=["governance"], pr=True, checked="2026-09-30",
        note="Analyses the 'stepping stones' approach in which a company's contravention becomes the basis for finding that directors breached their duty of care, and asks whether this derivative liability is justified."),
    "zhou-2019": dict(
        kind="article", authors=["Zhou, A."], year=2019, title="A step too far? Rethinking the stepping stone approach to officers' liability",
        journal="Federal Law Review", volume="47", issue="1", pages="151–174", doi="10.1177/0067205X18816241", topics=["governance"], pr=True, checked="2026-09-30",
        note="Critically re-examines stepping stone liability and argues it risks stretching directors' duty of care beyond its proper purpose."),
    "hanrahan-2021": dict(
        kind="article", authors=["Hanrahan, P.", "Bednall, T."], year=2021,
        title="From stepping-stones to throwing stones: Officers' liability for corporate compliance failures after Cassimatis",
        journal="Federal Law Review", volume="49", issue="3", pages="380–409", doi="10.1177/0067205X211016573", topics=["governance"], pr=True, checked="2026-09-30",
        note="Reviews officers' liability for corporate compliance failures after the Cassimatis appeal, including judicial criticism of stepping stone cases, and proposes legislative reform to rebalance individual liability."),
    "adams-2010": dict(
        kind="article", authors=["Adams, R. B.", "Hermalin, B. E.", "Weisbach, M. S."], year=2010,
        title="The role of boards of directors in corporate governance: A conceptual framework and survey", journal="Journal of Economic Literature",
        volume="48", issue="1", pages="58–107", doi="10.1257/jel.48.1.58", topics=["governance"], pr=True, checked="2026-09-30",
        note="Surveys research on what determines board composition and what boards do, stressing that the two are jointly determined, which makes causal claims about 'good' boards hard to establish."),
    "jensen-1976": dict(
        kind="article", authors=["Jensen, M. C.", "Meckling, W. H."], year=1976, title="Theory of the firm: Managerial behavior, agency costs and ownership structure",
        journal="Journal of Financial Economics", volume="3", issue="4", pages="305–360", url="https://www.sciencedirect.com/science/article/pii/0304405X7690026X",
        topics=["governance"], pr=True, checked="2026-09-30",
        note="The foundation of agency theory in corporate governance: when managers act for owners, their interests diverge, creating agency costs of monitoring, bonding and residual loss."),

    # ---------- Culture, conduct, incentives and accountability ----------
    "egan-2019": dict(
        kind="article", authors=["Egan, M.", "Matvos, G.", "Seru, A."], year=2019, title="The market for financial adviser misconduct",
        journal="Journal of Political Economy", volume="127", issue="1", pages="233–295", doi="10.1086/700735", topics=["culture"], pr=True, checked="2026-09-30",
        note="About 7% of US financial advisers have misconduct records (over 15% at some large firms), a third of those are repeat offenders, and many are rehired by other firms, some of which appear to specialise in misconduct."),
    "dimmock-2018": dict(
        kind="article", authors=["Dimmock, S. G.", "Gerken, W. C.", "Graham, N. P."], year=2018, title="Is fraud contagious? Coworker influence on misconduct by financial advisors",
        journal="The Journal of Finance", volume="73", issue="3", pages="1417–1450", doi="10.1111/jofi.12613", topics=["culture"], pr=True, checked="2026-09-30",
        note="Using firm mergers as a natural experiment, finds advisers are more likely to commit misconduct when their new coworkers have misconduct histories: misconduct spreads through peers."),
    "cohn-2014": dict(
        kind="article", authors=["Cohn, A.", "Fehr, E.", "Maréchal, M. A."], year=2014, title="Business culture and dishonesty in the banking industry",
        journal="Nature", volume="516", issue="7529", pages="86–89", doi="10.1038/nature13977", topics=["culture"], pr=True, checked="2026-09-30",
        note="Employees of a large bank behaved honestly in a coin-tossing game on average, but became more dishonest when reminded of their professional identity; employees of other industries did not."),
    "rahwan-2019": dict(
        kind="article", authors=["Rahwan, Z.", "Yoeli, E.", "Fasolo, B."], year=2019, title="Heterogeneity in banker culture and its influence on dishonesty",
        journal="Nature", volume="575", issue="7782", pages="345–349", doi="10.1038/s41586-019-1741-y", topics=["culture"], pr=True, checked="2026-09-30",
        note="A larger replication across five populations did not find that reminding bankers of their profession made them significantly more dishonest, or that any effect was unique to bankers."),
    "zingales-2015": dict(
        kind="article", authors=["Zingales, L."], year=2015, title="Presidential address: Does finance benefit society?",
        journal="The Journal of Finance", volume="70", issue="4", pages="1327–1363", doi="10.1111/jofi.12295", topics=["culture", "regulation"], pr=True, checked="2026-09-30",
        note="Argues academics overestimate the social benefits of finance, and that without proper rules finance can easily become rent-seeking, eroding public trust."),
    "inderst-2012": dict(
        kind="article", authors=["Inderst, R.", "Ottaviani, M."], year=2012, title="Competition through commissions and kickbacks",
        journal="American Economic Review", volume="102", issue="2", pages="780–809", doi="10.1257/aer.102.2.780", topics=["culture", "disclosure"], pr=True, checked="2026-09-30",
        note="Models how product providers compete by paying commissions to advisers, biasing advice, and shows that policies such as disclosure and commission caps can have unintended effects."),
    "holmstrom-1979": dict(
        kind="article", authors=["Holmström, B."], year=1979, title="Moral hazard and observability", journal="The Bell Journal of Economics",
        volume="10", issue="1", pages="74–91", doi="10.2307/3003320", topics=["culture"], pr=True, checked="2026-09-30",
        note="Shows that when an agent's effort can't be observed, contracts should use any information that says something about effort, the foundation of performance measurement in incentive design."),
    "holmstrom-1991": dict(
        kind="article", authors=["Holmström, B.", "Milgrom, P."], year=1991, title="Multitask principal-agent analyses: Incentive contracts, asset ownership, and job design",
        journal="Journal of Law, Economics, & Organization", volume="7", issue="special issue", pages="24–52", doi="10.1093/jleo/7.special_issue.24", topics=["culture"], pr=True, checked="2026-09-30",
        note="When people do several tasks but only some are measurable, strong incentives on the measured tasks divert effort from the others, so weak incentives can be optimal."),
    "cheng-2015": dict(
        kind="article", authors=["Cheng, I.-H.", "Hong, H.", "Scheinkman, J. A."], year=2015, title="Yesterday's heroes: Compensation and risk at financial firms",
        journal="The Journal of Finance", volume="70", issue="2", pages="839–879", doi="10.1111/jofi.12225", topics=["culture"], pr=True, checked="2026-09-30",
        note="Finds that financial firms with higher total executive pay took more risk before the crisis, and interprets this through contracting with risk-averse agents rather than simple entrenchment."),
    "deyoung-2013": dict(
        kind="article", authors=["DeYoung, R.", "Peng, E. Y.", "Yan, M."], year=2013, title="Executive compensation and business policy choices at U.S. commercial banks",
        journal="Journal of Financial and Quantitative Analysis", volume="48", issue="1", pages="165–196", doi="10.1017/S0022109012000646", topics=["culture"], pr=True, checked="2026-09-30",
        note="Risk-taking incentives in bank CEO pay increased around 2000 as deregulation expanded opportunities, and CEOs responded by taking more risk, especially at larger banks."),
    "gneezy-2011": dict(
        kind="article", authors=["Gneezy, U.", "Meier, S.", "Rey-Biel, P."], year=2011, title="When and why incentives (don't) work to modify behavior",
        journal="Journal of Economic Perspectives", volume="25", issue="4", pages="191–210", doi="10.1257/jep.25.4.191", topics=["culture"], pr=True, checked="2026-09-30",
        note="Reviews evidence that financial incentives can crowd out intrinsic motivation and change how people see a task, so incentives sometimes backfire."),
    "trevino-1992": dict(
        kind="article", authors=["Treviño, L. K."], year=1992, title="The social effects of punishment in organizations: A justice perspective",
        journal="Academy of Management Review", volume="17", issue="4", pages="647–676", doi="10.5465/amr.1992.4279054", topics=["culture"], pr=True, checked="2026-09-30",
        note="Shifts attention from the person punished to the observers: whether colleagues see a sanction as fair shapes their attitudes and future behaviour."),
    "chan-2012": dict(
        kind="article", authors=["Chan, L. H.", "Chen, K. C. W.", "Chen, T.-Y.", "Yu, Y."], year=2012,
        title="The effects of firm-initiated clawback provisions on earnings quality and auditor behavior", journal="Journal of Accounting and Economics",
        volume="54", issue="2–3", pages="180–196", doi="10.1016/j.jacceco.2012.05.001", topics=["culture"], pr=True, checked="2026-09-30",
        note="After firms adopted clawback provisions, accounting restatements declined and auditors perceived lower risk, evidence that clawbacks can change behaviour."),
    "fahlenbrach-2011": dict(
        kind="article", authors=["Fahlenbrach, R.", "Stulz, R. M."], year=2011, title="Bank CEO incentives and the credit crisis",
        journal="Journal of Financial Economics", volume="99", issue="1", pages="11–26", doi="10.1016/j.jfineco.2010.08.010", topics=["culture"], pr=True, checked="2026-09-30",
        note="Banks whose CEOs' incentives were better aligned with shareholders did not perform better in the crisis, and some evidence suggests they did worse; CEOs held their shares and suffered large losses."),
    "palermo-2017": dict(
        kind="article", authors=["Palermo, T.", "Power, M.", "Ashby, S."], year=2017, title="Navigating institutional complexity: The production of risk culture in the financial sector",
        journal="Journal of Management Studies", volume="54", issue="2", pages="154–181", doi="10.1111/joms.12241", topics=["culture"], pr=True, checked="2026-09-30",
        note="Based on four years of fieldwork in UK finance, shows how 'risk culture' became an object of regulation and management, and how conflicting goals of risk-taking and precaution made it hard to define and change."),
    "sheedy-2018": dict(
        kind="article", authors=["Sheedy, E.", "Griffin, B."], year=2018, title="Risk governance, structures, culture, and behavior: A view from the inside",
        journal="Corporate Governance: An International Review", volume="26", issue="1", pages="4–22", doi="10.1111/corg.12200", topics=["culture"], pr=True, checked="2026-09-30",
        note="Australian research surveying bank staff: favourable risk culture together with effective risk structures was associated with more desirable and less undesirable risk behaviour."),
    "fahlenbrach-2012": dict(
        kind="article", authors=["Fahlenbrach, R.", "Prilmeier, R.", "Stulz, R. M."], year=2012,
        title="This time is the same: Using bank performance in 1998 to explain bank performance during the recent financial crisis", journal="The Journal of Finance",
        volume="67", issue="6", pages="2139–2185", doi="10.1111/j.1540-6261.2012.01783.x", topics=["culture"], pr=True, checked="2026-09-30",
        note="Banks that did badly in the 1998 crisis were more likely to do badly and fail in 2007–08, consistent with a persistent risk culture or business model."),
    "schein-1990": dict(
        kind="article", authors=["Schein, E. H."], year=1990, title="Organizational culture", journal="American Psychologist",
        volume="45", pages="109–119", topics=["culture"], pr=True, checked="2026-09-30",
        note="Defines organisational culture in three levels, visible artefacts, espoused values and underlying assumptions, and argues that the deepest level is what drives behaviour and is hardest to change."),

    # ---------- Superannuation and pensions ----------
    "madrian-2001": dict(
        kind="article", authors=["Madrian, B. C.", "Shea, D. F."], year=2001, title="The power of suggestion: Inertia in 401(k) participation and savings behavior",
        journal="The Quarterly Journal of Economics", volume="116", issue="4", pages="1149–1187", doi="10.1162/003355301753265543", topics=["super", "judgement"], pr=True, checked="2026-09-30",
        note="When a US employer switched to automatic enrolment, retirement plan participation rose sharply, and many employees stayed at the default contribution rate and investment choice."),
    "thaler-2004": dict(
        kind="article", authors=["Thaler, R. H.", "Benartzi, S."], year=2004, title="Save More Tomorrow: Using behavioral economics to increase employee saving",
        journal="Journal of Political Economy", volume="112", issue="S1", pages="S164–S187", doi="10.1086/380085", topics=["super", "judgement"], pr=True, checked="2026-09-30",
        note="A program where employees committed in advance to save part of future pay rises: 78% of those offered it joined, and average saving rates rose from 3.5% to 11.6% over 28 months."),
    "benartzi-2001": dict(
        kind="article", authors=["Benartzi, S.", "Thaler, R. H."], year=2001, title="Naive diversification strategies in defined contribution saving plans",
        journal="American Economic Review", volume="91", issue="1", pages="79–98", doi="10.1257/aer.91.1.79", topics=["super", "judgement"], pr=True, checked="2026-09-30",
        note="Many people spread savings evenly across whatever options are offered (a '1/n' rule), so the menu of options itself shapes how much they hold in shares."),
    "iyengar-2000": dict(
        kind="article", authors=["Iyengar, S. S.", "Lepper, M. R."], year=2000, title="When choice is demotivating: Can one desire too much of a good thing?",
        journal="Journal of Personality and Social Psychology", volume="79", issue="6", pages="995–1006", doi="10.1037//0022-3514.79.6.995", topics=["super", "judgement"], pr=True, checked="2026-09-30",
        note="In three experiments, people were more likely to choose or act when offered 6 options than 24 or 30: the classic 'choice overload' study."),
    "scheibehenne-2010": dict(
        kind="article", authors=["Scheibehenne, B.", "Greifeneder, R.", "Todd, P. M."], year=2010, title="Can there ever be too many options? A meta-analytic review of choice overload",
        journal="Journal of Consumer Research", volume="37", issue="3", pages="409–425", doi="10.1086/651235", topics=["judgement"], pr=True, checked="2026-09-30",
        note="A meta-analysis of 50 experiments found an average choice overload effect of about zero, with large variation between studies: overload happens in some conditions but is not universal."),
    "bateman-2016": dict(
        kind="article", authors=["Bateman, H.", "Eckert, C.", "Geweke, J.", "Louviere, J.", "Satchell, S.", "Thorp, S."], year=2016, title="Risk presentation and portfolio choice",
        journal="Review of Finance", volume="20", issue="1", pages="201–229", doi="10.1093/rof/rfv001", topics=["super", "disclosure"], pr=True, checked="2026-09-30",
        note="Australian choice experiment: people made choices inconsistent with basic principles of rational choice in about a quarter of cases, and the rate varied with how investment risk was described."),
    "bikker-2009": dict(
        kind="article", authors=["Bikker, J. A.", "de Dreu, J."], year=2009, title="Operating costs of pension funds: The impact of scale, governance, and plan design",
        journal="Journal of Pension Economics and Finance", volume="8", issue="1", pages="63–89", doi="10.1017/S1474747207002995", topics=["super"], pr=True, checked="2026-09-30",
        note="Using Dutch data, finds substantial economies of scale in pension fund operating costs: larger funds have much lower costs per member."),
    "bateman-2004": dict(
        kind="article", authors=["Bateman, H.", "Mitchell, O. S."], year=2004, title="New evidence on pension plan design and administrative expenses: The Australian experience",
        journal="Journal of Pension Economics and Finance", volume="3", issue="1", pages="63–76", topics=["super"], pr=True, checked="2026-09-30",
        note="Examines how the design of Australian super funds, including size and structure, relates to administrative expenses, informing debates on fees and consolidation."),
    "coleman-2006": dict(
        kind="article", authors=["Coleman, A. D. F.", "Esho, N.", "Wong, M."], year=2006, title="The impact of agency costs on the investment performance of Australian pension funds",
        journal="Journal of Pension Economics and Finance", volume="5", issue="3", pages="299–324", doi="10.1017/S1474747205002350", topics=["super", "governance"], pr=True, checked="2026-09-30",
        note="Across 225 funds over seven years to 2002, not-for-profit funds significantly outperformed for-profit funds, a difference the authors link to higher agency costs in for-profit funds."),

    # ---------- Cyber and information security risk ----------
    "gordon-2002": dict(
        kind="article", authors=["Gordon, L. A.", "Loeb, M. P."], year=2002, title="The economics of information security investment",
        journal="ACM Transactions on Information and System Security", volume="5", issue="4", pages="438–457", doi="10.1145/581271.581274", topics=["cyber"], pr=True, checked="2026-09-30",
        note="The Gordon-Loeb model: under its assumptions, the optimal investment to protect information never exceeds about 37% of the expected loss from a breach."),
    "anderson-2006": dict(
        kind="article", authors=["Anderson, R.", "Moore, T."], year=2006, title="The economics of information security",
        journal="Science", volume="314", issue="5799", pages="610–613", doi="10.1126/science.1130992", topics=["cyber"], pr=True, checked="2026-09-30",
        note="Argues that security failures are often failures of incentives rather than technology, for example when the party who could prevent harm is not the one who bears it."),
    "romanosky-2016": dict(
        kind="article", authors=["Romanosky, S."], year=2016, title="Examining the costs and causes of cyber incidents",
        journal="Journal of Cybersecurity", volume="2", issue="2", pages="121–135", doi="10.1093/cybsec/tyw001", topics=["cyber"], pr=True, checked="2026-09-30",
        note="Analyses a large dataset of cyber incidents and their costs, finding the typical cost smaller than often claimed, which raises questions about firms' incentives to invest in security."),
    "kamiya-2021": dict(
        kind="article", authors=["Kamiya, S.", "Kang, J.-K.", "Kim, J.", "Milidonis, A.", "Stulz, R. M."], year=2021,
        title="Risk management, firm reputation, and the impact of successful cyberattacks on target firms", journal="Journal of Financial Economics",
        volume="139", issue="3", pages="719–749", doi="10.1016/j.jfineco.2019.05.019", topics=["cyber"], pr=True, checked="2026-09-30",
        note="Successful cyberattacks that expose personal financial information cause shareholder losses far larger than the direct costs, and affected firms tend to strengthen risk management afterwards."),

    # ---------- Theories of risk, accidents and reliability ----------
    "slovic-1987": dict(
        kind="article", authors=["Slovic, P."], year=1987, title="Perception of risk", journal="Science", volume="236", issue="4799", pages="280–285",
        doi="10.1126/science.3563507", topics=["theory"], pr=True, checked="2026-09-30",
        note="Shows that lay people judge risk on qualitative dimensions, especially 'dread' and 'unknown', not just expected deaths, which explains gaps between expert and public views of risk."),
    "kasperson-1988": dict(
        kind="article", authors=["Kasperson, R. E.", "Renn, O.", "Slovic, P.", "Brown, H. S.", "Emel, J.", "Goble, R.", "Kasperson, J. X.", "Ratick, S."], year=1988,
        title="The social amplification of risk: A conceptual framework", journal="Risk Analysis", volume="8", issue="2", pages="177–187",
        doi="10.1111/j.1539-6924.1988.tb01168.x", topics=["theory"], pr=True, checked="2026-09-30",
        note="Proposes that risk events interact with psychological, social, institutional and cultural processes that amplify or attenuate public responses, producing 'ripple effects' far beyond the direct harm."),
    "laporte-1991": dict(
        kind="article", authors=["La Porte, T. R.", "Consolini, P. M."], year=1991,
        title="Working in practice but not in theory: Theoretical challenges of \"high-reliability organizations\"",
        journal="Journal of Public Administration Research and Theory", volume="1", issue="1", pages="19–48", doi="10.1093/oxfordjournals.jpart.a037070",
        topics=["theory"], pr=True, checked="2026-09-30",
        note="Launched high reliability organisation research by studying organisations such as air traffic control that operate hazardous systems with remarkably few failures, and asking how they do it."),
    "leveson-2009": dict(
        kind="article", authors=["Leveson, N.", "Dulac, N.", "Marais, K.", "Carroll, J."], year=2009,
        title="Moving beyond normal accidents and high reliability organizations: A systems approach to safety in complex systems",
        journal="Organization Studies", volume="30", issue="2–3", pages="227–249", doi="10.1177/0170840608101478", topics=["theory"], pr=True, checked="2026-09-30",
        note="Critiques both normal accident theory and high reliability research, arguing that a systems approach from safety engineering better explains and prevents accidents in complex organisations."),
    "shrivastava-2009": dict(
        kind="article", authors=["Shrivastava, S.", "Sonpar, K.", "Pazzaglia, F."], year=2009,
        title="Normal accident theory versus high reliability theory: A resolution and call for an open systems view of accidents",
        journal="Human Relations", volume="62", issue="9", pages="1357–1390", doi="10.1177/0018726709339117", topics=["theory"], pr=True, checked="2026-09-30",
        note="Argues the two theories look at accidents at different points in time and can be reconciled, while noting that both are hard to falsify."),
    "perrow-1984": dict(
        kind="book", authors=["Perrow, C."], year=1984, title="Normal accidents: Living with high-risk technologies", publisher="Basic Books",
        topics=["theory"], pr=False, checked="2026-09-30",
        note="Argues that in systems that are both complex and tightly coupled, multiple unexpected failures will interact, so some accidents are 'normal' and cannot be designed away."),

    # ---------- Enterprise risk management and risk frameworks ----------
    "hoyt-2011": dict(
        kind="article", authors=["Hoyt, R. E.", "Liebenberg, A. P."], year=2011, title="The value of enterprise risk management",
        journal="Journal of Risk and Insurance", volume="78", issue="4", pages="795–822", doi="10.1111/j.1539-6975.2011.01413.x",
        topics=["erm"], pr=True, checked="2026-09-30",
        note="Studying 275 US publicly traded insurers from 1998 to 2005, finds that firms engaged in ERM have a significantly higher market valuation."),
    "gordon-2009": dict(
        kind="article", authors=["Gordon, L. A.", "Loeb, M. P.", "Tseng, C.-Y."], year=2009, title="Enterprise risk management and firm performance: A contingency perspective",
        journal="Journal of Accounting and Public Policy", volume="28", issue="4", pages="301–327",
        url="https://www.sciencedirect.com/science/article/abs/pii/S0278425409000416", topics=["erm"], pr=True, checked="2026-09-30",
        note="Finds the link between ERM and firm performance depends on matching ERM to five factors: environmental uncertainty, competition, firm size, complexity and board monitoring."),
    "mcshane-2011": dict(
        kind="article", authors=["McShane, M. K.", "Nair, A.", "Rustambekov, E."], year=2011, title="Does enterprise risk management increase firm value?",
        journal="Journal of Accounting, Auditing & Finance", volume="26", issue="4", pages="641–658", doi="10.1177/0148558X11409160",
        topics=["erm"], pr=True, checked="2026-09-30",
        note="Using S&P's ERM ratings of insurers, finds firm value rises with traditional risk management capability but not further for firms rated as having more advanced ERM."),
    "bromiley-2015": dict(
        kind="article", authors=["Bromiley, P.", "McShane, M.", "Nair, A.", "Rustambekov, E."], year=2015, title="Enterprise risk management: Review, critique, and research directions",
        journal="Long Range Planning", volume="48", issue="4", pages="265–276", doi="10.1016/j.lrp.2014.07.005", topics=["erm"], pr=True, checked="2026-09-30",
        note="Reviews ERM research and criticises it for weak measures of ERM, limited theory and little evidence on how ERM is actually practised, and sets out research directions."),
    "power-2009": dict(
        kind="article", authors=["Power, M."], year=2009, title="The risk management of nothing",
        journal="Accounting, Organizations and Society", volume="34", issue="6–7", pages="849–855", doi="10.1016/j.aos.2009.06.001",
        topics=["erm"], pr=True, checked="2026-09-30",
        note="A critique of ERM after the financial crisis: an impoverished idea of risk appetite and a 'logic of the audit trail' made ERM boundary-preserving rather than challenging, so its security was limited or illusory."),
    "ellul-2013": dict(
        kind="article", authors=["Ellul, A.", "Yerramilli, V."], year=2013, title="Stronger risk controls, lower risk: Evidence from U.S. bank holding companies",
        journal="The Journal of Finance", volume="68", issue="5", pages="1757–1803", doi="10.1111/jofi.12057", topics=["erm", "governance"], pr=True, checked="2026-09-30",
        note="Banks with a stronger, more independent risk management function before the crisis (a higher 'risk management index') had lower tail risk and better performance during the crisis."),

    # ---------- Whistleblowing, voice and fraud ----------
    "near-1985": dict(
        kind="article", authors=["Near, J. P.", "Miceli, M. P."], year=1985, title="Organizational dissidence: The case of whistle-blowing",
        journal="Journal of Business Ethics", volume="4", issue="1", pages="1–16", doi="10.1007/BF00382668", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Defines whistleblowing and proposes a model of the decisions made by people who believe they have seen wrongdoing, and of how organisations respond, drawing on motivation and power."),
    "mesmer-magnus-2005": dict(
        kind="article", authors=["Mesmer-Magnus, J. R.", "Viswesvaran, C."], year=2005,
        title="Whistleblowing in organizations: An examination of correlates of whistleblowing intentions, actions, and retaliation",
        journal="Journal of Business Ethics", volume="62", issue="3", pages="277–297", doi="10.1007/s10551-005-0849-1", topics=["speakup"], pr=True, checked="2026-09-30",
        note="A meta-analysis of 26 samples (18,781 people): personal, situational and wrongdoing factors predict intentions to blow the whistle more strongly than actual whistleblowing, and retaliation is best predicted by context."),
    "dyck-2010": dict(
        kind="article", authors=["Dyck, A.", "Morse, A.", "Zingales, L."], year=2010, title="Who blows the whistle on corporate fraud?",
        journal="The Journal of Finance", volume="65", issue="6", pages="2213–2253", doi="10.1111/j.1540-6261.2010.01614.x", topics=["speakup"], pr=True, checked="2026-09-30",
        note="In large US corporate frauds from 1996 to 2004, employees (19%), industry regulators (16%) and the media (14%) revealed more frauds than auditors (14%) or the SEC (6%); monetary incentives help explain employee whistleblowing."),
    "detert-2011": dict(
        kind="article", authors=["Detert, J. R.", "Edmondson, A. C."], year=2011, title="Implicit voice theories: Taken-for-granted rules of self-censorship at work",
        journal="Academy of Management Journal", volume="54", issue="3", pages="461–488", doi="10.5465/amj.2011.61967925", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Across four studies, identifies widely held, taken-for-granted beliefs about when speaking up at work is risky, which lead people to stay silent even when their own managers are open."),
    "call-2018": dict(
        kind="article", authors=["Call, A. C.", "Martin, G. S.", "Sharp, N. Y.", "Wilde, J. H."], year=2018,
        title="Whistleblowers and outcomes of financial misrepresentation enforcement actions", journal="Journal of Accounting Research",
        volume="56", issue="1", pages="123–171", doi="10.1111/1475-679X.12177", topics=["speakup", "regulation"], pr=True, checked="2026-09-30",
        note="Whistleblower involvement in US enforcement cases was associated with higher penalties, longer prison sentences for executives and faster enforcement action."),
    "dorminey-2012": dict(
        kind="article", authors=["Dorminey, J.", "Fleming, A. S.", "Kranacher, M.-J.", "Riley, R. A., Jr."], year=2012, title="The evolution of fraud theory",
        journal="Issues in Accounting Education", volume="27", issue="2", pages="555–579", doi="10.2308/iace-50131", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Revisits the fraud triangle in the light of later research and anti-fraud practice, and proposes a broader meta-model of fraud for teaching and research."),
    "free-2015": dict(
        kind="article", authors=["Free, C."], year=2015, title="Looking through the fraud triangle: A review and call for new directions",
        journal="Meditari Accountancy Research", volume="23", issue="2", pages="175–196", doi="10.1108/MEDAR-02-2015-0009", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Reviews research built on the fraud triangle and argues for new directions, including group and organisational influences that the individual-focused triangle leaves out."),
    "free-2015b": dict(
        kind="article", authors=["Free, C.", "Murphy, P. R."], year=2015, title="The ties that bind: The decision to co-offend in fraud",
        journal="Contemporary Accounting Research", volume="32", issue="1", pages="18–54", doi="10.1111/1911-3846.12063", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Interviews with 37 convicted fraudsters who offended in groups show that the reasons for co-offending depend on the type of bond between offenders, something the individual fraud triangle misses."),
    "murphy-2011": dict(
        kind="article", authors=["Murphy, P. R.", "Dacin, M. T."], year=2011, title="Psychological pathways to fraud: Understanding and preventing fraud in organizations",
        journal="Journal of Business Ethics", volume="101", issue="4", pages="601–618", doi="10.1007/s10551-011-0741-0", topics=["speakup"], pr=True, checked="2026-09-30",
        note="Identifies three psychological pathways to fraud: lack of awareness (moral intuition and disengagement), rationalisation, and negative emotion, with implications for prevention."),
    "morales-2014": dict(
        kind="article", authors=["Morales, J.", "Gendron, Y.", "Guénin-Paracini, H."], year=2014,
        title="The construction of the risky individual and vigilant organization: A genealogy of the fraud triangle",
        journal="Accounting, Organizations and Society", volume="39", issue="3", pages="170–194", doi="10.1016/j.aos.2014.01.006", topics=["speakup"], pr=True, checked="2026-09-30",
        note="A history of how the fraud triangle became dominant, arguing that it constructs fraud as a matter of risky individuals and vigilant organisations, which shapes how fraud is understood and controlled."),

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
    # Internal audit effectiveness
    "lenz-2015": dict(
        kind="article", authors=["Lenz, R.", "Hahn, U."], year=2015, title="A synthesis of empirical internal audit effectiveness literature pointing to new research opportunities",
        journal="Managerial Auditing Journal", volume="30", issue="1", pages="5–33", doi="10.1108/MAJ-08-2014-1072", topics=["controls", "governance"], pr=True, checked="2026-09-30",
        note="Reviews the empirical research on what makes internal audit effective, groups the drivers into macro, meso and micro factors, and notes that effectiveness itself is defined and measured in many different ways."),
    "prawitt-2009": dict(
        kind="article", authors=["Prawitt, D. F.", "Smith, J. L.", "Wood, D. A."], year=2009, title="Internal audit quality and earnings management",
        journal="The Accounting Review", volume="84", issue="4", pages="1255–1280", doi="10.2308/accr.2009.84.4.1255", topics=["controls", "governance"], pr=True, checked="2026-09-30",
        note="Finds that higher internal audit function quality is associated with lower levels of earnings management, measured by abnormal accruals and by meeting analyst forecasts."),
    "roussy-2013": dict(
        kind="article", authors=["Roussy, M."], year=2013, title="Internal auditors' roles: From watchdogs to helpers and protectors of the top manager",
        journal="Critical Perspectives on Accounting", volume="24", issue="7–8", pages="550–571", doi="10.1016/j.cpa.2013.08.004", topics=["controls", "governance"], pr=True, checked="2026-09-30",
        note="Based on 42 interviews in the public sector, finds internal auditors often act as protectors of and helpers to top management rather than independent watchdogs, a position the author calls 'grey' independence."),
    "abbott-2010": dict(
        kind="article", authors=["Abbott, L. J.", "Parker, S.", "Peters, G. F."], year=2010, title="Serving two masters: The association between audit committee internal audit oversight and internal audit activities",
        journal="Accounting Horizons", volume="24", issue="1", pages="1–24", doi="10.2308/acch.2010.24.1.1", topics=["controls", "governance"], pr=True, checked="2026-09-30",
        note="Finds that stronger audit committee oversight of internal audit is associated with internal audit spending more of its effort on internal control work, highlighting the tension between serving management and serving the audit committee."),
    # Cyber risk economics
    "eling-2019": dict(
        kind="article", authors=["Eling, M.", "Wirfs, J."], year=2019, title="What are the actual costs of cyber risk events?",
        journal="European Journal of Operational Research", volume="272", issue="3", pages="1109–1119", doi="10.1016/j.ejor.2018.07.021", topics=["cyber", "measurement"], pr=True, checked="2026-09-30",
        note="Uses operational loss data and extreme value methods to show cyber losses are heavy-tailed: most are small, but a few extreme events dominate, so averages understate the risk."),
    "biener-2015": dict(
        kind="article", authors=["Biener, C.", "Eling, M.", "Wirfs, J. H."], year=2015, title="Insurability of cyber risk: An empirical analysis",
        journal="The Geneva Papers on Risk and Insurance – Issues and Practice", volume="40", issue="1", pages="131–158", url="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2577286",
        topics=["cyber", "measurement"], pr=True, checked="2026-09-30",
        note="Analyses 994 cyber loss events and discusses what limits the insurability of cyber risk, including correlated losses, lack of data and information asymmetry."),
    # Climate risk
    "bolton-2021": dict(
        kind="article", authors=["Bolton, P.", "Kacperczyk, M."], year=2021, title="Do investors care about carbon risk?",
        journal="Journal of Financial Economics", volume="142", issue="2", pages="517–549", doi="10.1016/j.jfineco.2021.05.008", topics=["climate"], pr=True, checked="2026-09-30",
        note="Finds that US firms with higher carbon emissions earn higher stock returns, consistent with investors demanding compensation for exposure to carbon risk."),
    "krueger-2020": dict(
        kind="article", authors=["Krueger, P.", "Sautner, Z.", "Starks, L. T."], year=2020, title="The importance of climate risks for institutional investors",
        journal="The Review of Financial Studies", volume="33", issue="3", pages="1067–1111", doi="10.1093/rfs/hhz137", topics=["climate", "super"], pr=True, checked="2026-09-30",
        note="A survey of institutional investors finding they believe climate risks matter financially and have begun to materialise, and that many prefer engagement to divestment."),
    "battiston-2017": dict(
        kind="article", authors=["Battiston, S.", "Mandel, A.", "Monasterolo, I.", "Schütze, F.", "Visentin, G."], year=2017, title="A climate stress-test of the financial system",
        journal="Nature Climate Change", volume="7", pages="283–288", doi="10.1038/nclimate3255", topics=["climate", "measurement"], pr=True, checked="2026-09-30",
        note="Maps financial institutions' exposures to climate-policy-relevant sectors and shows how losses could be amplified through interconnections between institutions."),
    "giglio-2021": dict(
        kind="article", authors=["Giglio, S.", "Kelly, B.", "Stroebel, J."], year=2021, title="Climate finance",
        journal="Annual Review of Financial Economics", volume="13", pages="15–36", doi="10.1146/annurev-financial-102620-103311", topics=["climate"], pr=True, checked="2026-09-30",
        note="Reviews research on how climate risks affect asset prices and how to discount long-run climate costs, and sets out open questions for the field."),
    "bernstein-2019": dict(
        kind="article", authors=["Bernstein, A.", "Gustafson, M. T.", "Lewis, R."], year=2019, title="Disaster on the horizon: The price effect of sea level rise",
        journal="Journal of Financial Economics", volume="134", issue="2", pages="253–272", doi="10.1016/j.jfineco.2019.03.013", topics=["climate"], pr=True, checked="2026-09-30",
        note="Finds that US coastal homes exposed to projected sea level rise sell at about a 7% discount to comparable unexposed homes, driven mainly by sophisticated buyers."),
    # AML/CTF effectiveness
    "pol-2020": dict(
        kind="article", authors=["Pol, R. F."], year=2020, title="Anti-money laundering: The world's least effective policy experiment? Together, we can fix it",
        journal="Policy Design and Practice", volume="3", issue="1", pages="73–94", doi="10.1080/25741292.2020.1725366", topics=["fincrime", "regulation"], pr=True, checked="2026-09-30",
        note="Argues that on available evidence AML policy affects well under 1% of criminal finances while compliance costs far exceed the criminal funds recovered, and calls for outcome-focused evaluation. Its estimates are contested and rely on limited data."),
    "levi-2018": dict(
        kind="article", authors=["Levi, M.", "Reuter, P.", "Halliday, T."], year=2018, title="Can the AML system be evaluated without better data?",
        journal="Crime, Law and Social Change", volume="69", pages="307–328", doi="10.1007/s10611-017-9757-4", topics=["fincrime", "regulation"], pr=True, checked="2026-09-30",
        note="Finds there are no credible estimates of how much money is laundered and little serious use of data in FATF evaluations and national risk assessments, so claims about AML effectiveness are hard to test."),
    "takats-2011": dict(
        kind="article", authors=["Takáts, E."], year=2011, title="A theory of 'crying wolf': The economics of money laundering enforcement",
        journal="Journal of Law, Economics, & Organization", volume="27", issue="1", pages="32–78", url="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=979035",
        topics=["fincrime", "regulation"], pr=True, checked="2026-09-30",
        note="A formal model showing that heavy fines for failing to report can push banks to over-report, diluting the information value of suspicious matter reports ('crying wolf')."),
    "ferwerda-2009": dict(
        kind="article", authors=["Ferwerda, J."], year=2009, title="The economics of crime and money laundering: Does anti-money laundering policy reduce crime?",
        journal="Review of Law and Economics", volume="5", issue="2", pages="903–929", doi="10.2202/1555-5879.1421", topics=["fincrime"], pr=True, checked="2026-09-30",
        note="Builds an economic model in the Becker tradition and tests it across countries, finding that some AML policy elements, such as the chance of being caught and convicted, are associated with lower crime."),
    # Integrated GRC
    "racz-2010": dict(
        kind="chapter", authors=["Racz, N.", "Weippl, E.", "Seufert, A."], year=2010, title="A frame of reference for research of integrated governance, risk and compliance (GRC)",
        editors=["B. De Decker", "I. Schaumüller-Bichl"], book="Communications and multimedia security (Lecture Notes in Computer Science, Vol. 6109)", pages="106–117", publisher="Springer",
        doi="10.1007/978-3-642-13241-4_11", topics=["erm", "governance"], pr=True, checked="2026-10-01",
        note="Develops a definition of integrated GRC from a literature review and earlier surveys, and a frame of reference for research covering its components (governance, risk management, compliance), integration and supporting technology."),
    "vicente-2011": dict(
        kind="chapter", authors=["Vicente, P.", "Mira da Silva, M."], year=2011, title="A conceptual model for integrated governance, risk and compliance",
        book="Advanced information systems engineering (Lecture Notes in Computer Science, Vol. 6741)", pages="199–213", publisher="Springer",
        doi="10.1007/978-3-642-21640-4_16", topics=["erm", "governance"], pr=True, checked="2026-10-01",
        note="Proposes a reference conceptual model of the key functions of governance, risk and compliance and how they relate, and evaluates it against OCEG's GRC capability model."),
    "papazafeiropoulou-2016": dict(
        kind="article", authors=["Papazafeiropoulou, A.", "Spanaki, K."], year=2016, title="Understanding governance, risk and compliance information systems (GRC IS): The experts view",
        journal="Information Systems Frontiers", volume="18", issue="6", pages="1251–1263", doi="10.1007/s10796-015-9572-3", topics=["erm", "governance"], pr=True, checked="2026-10-01",
        note="Reviews GRC research and interviews professional experts, producing a framework of what to consider when putting GRC systems in place: goals, purpose, stakeholders, requirements before implementation, critical success factors and barriers."),
    "arena-2010": dict(
        kind="article", authors=["Arena, M.", "Arnaboldi, M.", "Azzone, G."], year=2010, title="The organizational dynamics of enterprise risk management",
        journal="Accounting, Organizations and Society", volume="35", issue="7", pages="659–675", doi="10.1016/j.aos.2010.07.003", topics=["erm"], pr=True, checked="2026-10-01",
        note="A seven-year study of three companies showing ERM takes different forms as it meets existing organisational logics, experts and technologies, rather than being implemented in one standard way."),
    "mikes-2015": dict(
        kind="article", authors=["Mikes, A.", "Kaplan, R. S."], year=2015, title="When one size doesn't fit all: Evolving directions in the research and practice of enterprise risk management",
        journal="Journal of Applied Corporate Finance", volume="27", issue="1", pages="37–40", doi="10.1111/jacf.12102", topics=["erm"], pr=False, checked="2026-10-01",
        note="Drawing on a ten-year field project and over 250 interviews with senior risk officers, proposes a contingency theory of ERM: the right 'ERM mix' depends on the organisation's circumstances."),
}
