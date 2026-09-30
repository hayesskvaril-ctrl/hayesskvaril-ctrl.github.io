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

    # ---------- Judgement, bias and decision-making ----------
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
