# Generates learn/advanced-study-program.html: a 12-module, university-style course built from the Advanced pages.
# Each module's readings come from the "Further reading" lists on its core pages, and its seminar questions
# from those pages' "Seminar questions". Edit MODULES below, then run:
#   python3 _scripts/build_study_program.py && python3 _scripts/build_references.py && python3 _scripts/sync_layout.py
import re, html
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
REVIEWED = "30 September 2026"

# (title, overview, learning outcomes, core pages, essay question)
MODULES = [
 ("Theories of risk",
  "Why people and organisations perceive risk differently, and why some systems fail while others stay reliable.",
  ["Compare psychometric, social amplification and systems theories of risk.",
   "Explain how cognitive biases distort risk judgements in organisations."],
  ["/risk-management/theories-of-risk.html", "/risk-management/human-factors-and-bias.html"],
  "Are normal accident theory and high-reliability theory compatible? Use a financial services example."),
 ("Does enterprise risk management work?",
  "The evidence on whether ERM adds value, and how to combine risks into one enterprise view.",
  ["Evaluate the empirical evidence on ERM and firm value.",
   "Explain the methods and pitfalls of risk aggregation."],
  ["/risk-management/does-erm-work.html", "/risk-management/risk-aggregation-and-correlation.html"],
  "“ERM is mainly a ritual of verification.” Critically assess this claim against the evidence."),
 ("Measuring risk",
  "Loss distributions, scenarios and indicators: what quantitative methods can and can't tell a board.",
  ["Apply loss distribution, VaR and expected shortfall concepts to operational risk.",
   "Design scenarios and indicators that support decisions rather than false precision."],
  ["/risk-management/quantitative-operational-risk.html", "/risk-management/scenario-analysis-and-stress-testing.html", "/risk-management/kri-design-and-thresholds.html"],
  "Why did regulators move away from internal models for operational risk capital, and what was lost?"),
 ("Incidents, root causes and learning",
  "How organisations investigate failures, assess breaches and learn, or fail to learn, from them.",
  ["Compare linear, systemic and just-culture approaches to incident analysis.",
   "Apply significance tests to breach scenarios and justify the conclusion."],
  ["/risk-management/root-cause-analysis.html", "/compliance/breach-significance-analysis.html"],
  "Is root cause analysis a useful fiction? Discuss with reference to systems theories of accidents."),
 ("Controls, assurance and internal audit",
  "Testing controls, the three lines and whether internal audit makes a difference.",
  ["Explain sampling and evidence in control testing.",
   "Evaluate the research on the three lines model and internal audit effectiveness."],
  ["/risk-management/control-testing-sampling.html", "/governance/internal-audit-effectiveness.html", "/governance/three-lines-research-and-critique.html"],
  "Does the three lines model improve accountability, or diffuse it? Use the research to argue a position."),
 ("Operational resilience and third parties",
  "Critical operations, tolerance levels and dependence on service providers under CPS 230.",
  ["Map a critical operation and set defensible tolerance levels.",
   "Analyse outsourcing and concentration risk using transaction cost and resilience theory."],
  ["/risk-management/mapping-critical-operations.html", "/risk-management/setting-cps-230-tolerance-levels.html", "/risk-management/service-provider-exit-and-concentration.html"],
  "Can an organisation ever fully exit a critical service provider? Discuss the limits of exit planning."),
 ("Regulation and enforcement",
  "Why regulators regulate the way they do, and what deters misconduct.",
  ["Compare responsive, risk-based and principles-based regulation.",
   "Evaluate economic and behavioural theories of deterrence against Australian enforcement practice."],
  ["/compliance/theories-of-regulation.html", "/compliance/enforcement-and-penalties.html", "/compliance/interpreting-legislation.html"],
  "Are larger penalties the best way to deter corporate misconduct? Use theory and evidence."),
 ("Boards, directors and governance",
  "Governance theories, directors' duties and what boards need to know about risk.",
  ["Compare agency, stewardship and stakeholder theories of governance.",
   "Analyse how case law shapes directors' oversight of risk."],
  ["/governance/corporate-governance-theories.html", "/governance/directors-duties-case-law.html", "/governance/board-risk-reporting.html"],
  "Which theory of governance best explains the design of Australia's accountability regimes?"),
 ("Culture, incentives and misconduct",
  "Why misconduct happens, how incentives shape risk-taking and whether culture can be measured.",
  ["Evaluate the evidence on misconduct, peer effects and incentives.",
   "Critically assess methods for measuring risk culture."],
  ["/compliance/misconduct-in-financial-services-research.html", "/governance/remuneration-incentives-and-risk-taking.html", "/governance/risk-culture-assessment.html", "/governance/reasonable-steps-and-consequence-management.html"],
  "Is misconduct in financial services best explained by bad apples, bad barrels or bad incentives?"),
 ("Speaking up and fraud",
  "Who blows the whistle and why, and what fraud theory adds to controls.",
  ["Explain the research on whistleblowing decisions and retaliation.",
   "Critically evaluate the fraud triangle and its extensions."],
  ["/governance/whistleblowing-research.html", "/compliance/fraud-theory.html"],
  "Design a speak-up and fraud control program informed by the research. What would you do differently from common practice?"),
 ("Consumers, disclosure and superannuation",
  "Behavioural economics of super, the limits of disclosure and what remediation owes consumers.",
  ["Apply behavioural research on defaults and inertia to super.",
   "Evaluate disclosure as a consumer protection tool and the principles of remediation."],
  ["/sectors/behavioural-economics-of-super.html", "/compliance/misleading-or-deceptive-conduct.html", "/compliance/remediation-calculations.html", "/sectors/unit-pricing.html"],
  "“Disclosure is necessary but not sufficient.” Discuss with reference to super and the research on consumer behaviour."),
 ("Emerging risks: cyber, climate and financial crime",
  "Economic perspectives on three risks that challenge traditional risk management.",
  ["Apply economic reasoning to cyber security investment and insurance.",
   "Evaluate the evidence on climate risk pricing and on AML/CTF effectiveness."],
  ["/risk-management/economics-of-cyber-risk.html", "/risk-management/climate-risk-research.html", "/compliance/aml-ctf-effectiveness.html"],
  "What do cyber, climate and financial crime risk have in common that makes them hard to measure and manage?"),
]


def page_info(url):
    s = (ROOT / url.lstrip("/")).read_text(encoding="utf-8")
    title = re.sub(r"<[^>]+>", "", re.search(r"<h1[^>]*>(.*?)</h1>", s, re.S).group(1)).strip()
    refs = (re.search(r'class="further-reading" data-refs="([^"]*)"', s) or [None, ""])[1].split()
    sq = re.search(r'<ol class="seminar-questions">(.*?)</ol>', s, re.S)
    qs = [re.sub(r"\s+", " ", q).strip() for q in re.findall(r"<li>(.*?)</li>", sq.group(1), re.S)] if sq else []
    return title, refs, qs


def module_html(i, m):
    title, overview, outcomes, core, essay = m
    infos = [page_info(u) for u in core]
    keys = []
    for _, refs, _ in infos:
        for k in refs:
            if k not in keys:
                keys.append(k)
    # Required: the first two readings from each core page (up to 4); the rest are further reading.
    required = []
    for _, refs, _ in infos:
        for k in refs[:2]:
            if k not in required and len(required) < 4:
                required.append(k)
    further = [k for k in keys if k not in required][:6]
    qs = [q for _, _, qlist in infos[:2] for q in qlist[:1]]
    mid = f"module-{i}"
    out = [f'  <section class="study-module" id="{mid}" aria-labelledby="{mid}-h">',
           f'    <h2 id="{mid}-h"><span class="module-num">Module {i}</span> {html.escape(title)}</h2>',
           f'    <p>{html.escape(overview)}</p>',
           '    <h3>Learning outcomes</h3>', '    <p class="small">By the end of this module you should be able to:</p>', '    <ol>']
    out += [f'      <li>{html.escape(o)}</li>' for o in outcomes]
    out += ['    </ol>', '    <h3>Core pages</h3>', '    <ol>']
    out += [f'      <li><a href="{u}">{html.escape(t)}</a></li>' for u, (t, _, _) in zip(core, infos)]
    out += ['    </ol>', '    <h3>Required reading</h3>',
            f'    <ul class="further-reading" data-refs="{" ".join(required)}"></ul>']
    if further:
        out += ['    <details>', '      <summary>Further reading</summary>',
                f'      <ul class="further-reading" data-refs="{" ".join(further)}"></ul>', '    </details>']
    out += ['    <h3>Seminar questions</h3>', '    <ol class="seminar-questions">']
    out += [f'      <li>{q}</li>' for q in qs]
    out += ['    </ol>', f'    <p><strong>Essay question:</strong> {html.escape(essay)}</p>', '  </section>']
    return "\n".join(out)


toc = "\n".join(f'      <li><a href="#module-{i}">Module {i}: {html.escape(m[0])}</a></li>' for i, m in enumerate(MODULES, 1))
body = "\n\n".join(module_html(i, m) for i, m in enumerate(MODULES, 1))

page = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Advanced study program | RiskLens Australia</title>
<meta name="description" content="A free 12-module, university-style course in risk, compliance and governance, with learning outcomes, required peer-reviewed readings, seminar questions and essay questions for each module.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/learn/">Learn</a></li><li>Advanced study program</li></ol></nav>

  <h1>Advanced study program</h1>
  <p class="summary">A free, self-paced course at university level: 12 modules built from the site's Advanced pages, each with learning outcomes, required readings from peer-reviewed research, seminar questions and an essay question.</p>
  <div class="page-meta">
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">How the program works</h2>
    <ul>
      <li>Work through one module a week, or at your own pace. Allow roughly three to five hours per module, including the readings.</li>
      <li>Start with the <strong>core pages</strong>, which explain the ideas in plain English and summarise the research.</li>
      <li>The <strong>required readings</strong> are the original peer-reviewed articles. Some are free to read online; others may need access through a university or public library.</li>
      <li>Use the <strong>seminar questions</strong> for discussion or reflection, and the <strong>essay question</strong> to test whether you can build an argument from the evidence.</li>
      <li>This is general education. It is not an accredited course and does not lead to a qualification.</li>
    </ul>
  </aside>

  <p>If you are new to the field, start with the <a href="/learn/pathways.html">learning pathways</a> and the <a href="/learn/by-level.html">Beginner and Intermediate pages</a> first. Every reading below is also listed, with a plain-English summary, in the <a href="/learn/research-library.html">research library</a>.</p>

  <nav class="pathway-toc" aria-label="Modules">
    <h2>Modules</h2>
    <ul>
{toc}
    </ul>
  </nav>

{body}

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/learn/research-library.html" data-label="Research library"></li>
      <li data-href="/learn/pathways.html" data-label="Learning pathways"></li>
      <li data-href="/learn/by-level.html" data-label="Browse by level"></li>
      <li data-href="/learn/quizzes.html" data-label="Topic quizzes"></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
(ROOT / "learn" / "advanced-study-program.html").write_text(page, encoding="utf-8")
print("ok", len(MODULES), "modules")
