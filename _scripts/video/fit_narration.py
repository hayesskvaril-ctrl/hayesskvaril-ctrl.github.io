"""Make room for narration: lengthen scenes whose spoken caption runs longer than the caption stays
on screen. Edits the scene files in _scripts/video/specs/ (scene `dur` values and later caption times
in the same scene), so voice, captions and picture stay in step. Then re-render and narrate:

  python3 _scripts/video/fit_narration.py            # all videos; lists what changed
  node _scripts/video/render.js <changed slugs>      # needs the local server on port 8765
  python3 _scripts/video/narrate.py

Run it again after changing captions. It only ever adds time.
"""
import json
import math
import re
import subprocess
import sys
import wave
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from narrate import SPECS, LEAD, voice, SynthesisConfig  # noqa: E402

GAP = 0.6  # silence to leave after each spoken caption, in seconds


def speech_len(v, cfg, text):
    with tempfile.NamedTemporaryFile(suffix=".wav") as f:
        with wave.open(f.name, "wb") as w:
            v.synthesize_wav(text, w, syn_config=cfg)
        with wave.open(f.name) as w:
            return w.getnframes() / w.getframerate()


def fit(slug, v, cfg):
    path = SPECS / f"{slug}.js"
    js = f"global.window={{}};require({json.dumps(str(path))});console.log(JSON.stringify(window.RL_SPEC))"
    spec = json.loads(subprocess.check_output(["node", "-e", js]))
    src = path.read_text(encoding="utf-8")
    # locate each scene's text: scenes are objects starting with "{ type:" inside the scenes array
    starts = [m.start() for m in re.finditer(r"\{\s*type:\s*'", src)]
    assert len(starts) == len(spec["scenes"]), f"{slug}: could not match scenes in the source"
    bounds = list(zip(starts, starts[1:] + [len(src)]))
    out, pos, changed = [], 0, []
    for i, (sc, (a, b)) in enumerate(zip(spec["scenes"], bounds)):
        seg = src[a:b]
        caps = sc.get("captions") or ([[0, sc["caption"]]] if sc.get("caption") else [])
        times = [c[0] for c in caps]
        shift, new_times = 0.0, []
        for k, (at, text) in enumerate(caps):
            t = at + shift
            new_times.append(t)
            nxt = (caps[k + 1][0] + shift) if k + 1 < len(caps) else sc["dur"] + shift
            need = LEAD + speech_len(v, cfg, text) + GAP
            if nxt - t < need:
                shift += math.ceil((need - (nxt - t)) * 10) / 10
        if shift:
            new_dur = round(sc["dur"] + shift, 1)
            # stretch the scene's other timings (item reveals, highlights) in step with the captions
            pts = [(0.0, 0.0)] + [(o, n) for o, n in zip(times, new_times) if o > 0] + [(sc["dur"], new_dur)]

            def warp(x, pts=pts):
                x = float(x)
                for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
                    if x <= x1:
                        return y0 + (x - x0) * ((y1 - y0) / (x1 - x0) if x1 > x0 else 1)
                return x + (pts[-1][1] - pts[-1][0])

            fmt = lambda x: f"{round(warp(x), 1):g}"
            seg = re.sub(r"\bat:\s*\[([^\]]*)\]", lambda m: "at: [" + ", ".join(fmt(x) for x in re.findall(r"[0-9.]+", m.group(1))) + "]", seg)
            seg = re.sub(r"(active:\s*\[.*?\]\])", lambda m: re.sub(r"\[\s*([0-9.]+)\s*,", lambda n: "[" + fmt(n.group(1)) + ",", m.group(1)), seg, flags=re.S)
            seg = re.sub(r"\bat:\s*([0-9.]+)", lambda m: "at: " + fmt(m.group(1)), seg)
            seg = re.sub(r"\bdur:\s*[0-9.]+", f"dur: {new_dur:g}", seg, count=1)
            if sc.get("captions"):
                it = iter(new_times)
                ci = seg.index("captions:")
                seg = seg[:ci] + re.sub(r"\[\s*[0-9.]+\s*,\s*(['\"])", lambda m: f"[{round(next(it), 1):g}, {m.group(1)}", seg[ci:], count=len(caps))
            changed.append(f"scene {i + 1}: {sc['dur']:g}s -> {new_dur:g}s")
        out.append(src[pos:a] + seg)
        pos = b
    out.append(src[pos:])
    if changed:
        path.write_text("".join(out), encoding="utf-8")
    return changed


def main():
    slugs = sys.argv[1:] or sorted(p.stem for p in SPECS.glob("*.js"))
    v = voice()
    cfg = SynthesisConfig(length_scale=1.0, noise_scale=0.6, noise_w_scale=0.0)
    todo = []
    for slug in slugs:
        ch = fit(slug, v, cfg)
        if ch:
            todo.append(slug)
            print(slug + ": " + "; ".join(ch))
    print("re-render:", " ".join(todo) if todo else "nothing")


if __name__ == "__main__":
    main()
