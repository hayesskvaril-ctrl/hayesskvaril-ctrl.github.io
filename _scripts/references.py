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
