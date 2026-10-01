"""Add a spoken voiceover to the explainer videos (run after render.js).

The voice reads each caption at the moment it appears on screen, so narration, captions and the
on-page transcript always say the same thing. It uses Piper, a free text-to-speech engine that runs
offline, with the "southern_english_female" British English voice (trained on the OpenSLR 83
dataset, CC BY-SA 4.0; credited on the Watch page).

Setup (once):  pip install piper-tts imageio-ffmpeg
Usage:         python3 _scripts/video/narrate.py [slug ...]      (all videos if none given)
Then run:      python3 _scripts/build_videos.py && python3 _scripts/sync_layout.py

Safe to re-run: it always takes the picture from the video and replaces any existing soundtrack.
It warns if a caption's speech runs past the next caption (shorten the caption or lengthen the scene).
"""
import json
import subprocess
import sys
import tarfile
import tempfile
import urllib.request
import wave
from pathlib import Path

import imageio_ffmpeg
from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parents[2]
SPECS = ROOT / "_scripts/video/specs"
VIDEO = ROOT / "assets/video"
MANIFEST = ROOT / "_scripts/video/manifest.json"
CACHE = Path.home() / ".cache/risklens-voice"
VOICE = "en-gb-southern_english_female-low"
VOICE_URL = f"https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-{VOICE}.tar.gz"
FF = imageio_ffmpeg.get_ffmpeg_exe()
LEAD = 0.3  # seconds after a caption appears before the voice starts


def voice():
    onnx = CACHE / f"{VOICE}.onnx"
    if not onnx.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        tgz = CACHE / "voice.tar.gz"
        print("downloading voice", VOICE_URL)
        urllib.request.urlretrieve(VOICE_URL, tgz)
        with tarfile.open(tgz) as t:
            t.extractall(CACHE)
    return PiperVoice.load(str(onnx))


def cues(slug):
    js = f"global.window={{}};require({json.dumps(str(SPECS / (slug + '.js')))});console.log(JSON.stringify(window.RL_SPEC))"
    spec = json.loads(subprocess.check_output(["node", "-e", js]))
    t, out = 0.0, []
    for sc in spec["scenes"]:
        caps = sc.get("captions") or ([[0, sc["caption"]]] if sc.get("caption") else [])
        for i, (at, text) in enumerate(caps):
            nxt = caps[i + 1][0] if i + 1 < len(caps) else sc["dur"]
            out.append((t + at + LEAD, t + nxt, text))
        t += sc["dur"]
    return out


def narrate(slug, v, cfg):
    mp4 = VIDEO / f"{slug}.mp4"
    with tempfile.TemporaryDirectory() as tmp:
        inputs, filters, warn = [], [], []
        cs = cues(slug)
        for n, (start, end, text) in enumerate(cs):
            f = Path(tmp) / f"{n}.wav"
            with wave.open(str(f), "wb") as w:
                v.synthesize_wav(text, w, syn_config=cfg)
            with wave.open(str(f)) as w:
                d = w.getnframes() / w.getframerate()
            if start + d > end + 0.2:
                warn.append(f"caption {n + 1} speech {d:.1f}s, room {end - start:.1f}s: {text[:60]}")
            inputs += ["-i", str(f)]
            ms = int(start * 1000)
            filters.append(f"[{n + 1}:a]adelay={ms}|{ms},volume=1.6[a{n}]")
        total = float(json.loads(MANIFEST.read_text()).get(slug, {}).get("duration", 0)) or cs[-1][1]
        mix = ";".join(filters) + ";" + "".join(f"[a{n}]" for n in range(len(cs))) + f"amix=inputs={len(cs)}:normalize=0,apad=whole_dur={total:.2f}[out]"
        tmp_out = Path(tmp) / "out.mp4"
        subprocess.run([FF, "-y", "-loglevel", "error", "-i", str(mp4)] + inputs +
                       ["-filter_complex", mix, "-map", "0:v", "-map", "[out]", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "96k", "-t", f"{total:.2f}", "-movflags", "+faststart", str(tmp_out)], check=True)
        tmp_out.replace(mp4)
    return len(cs), warn


def main():
    slugs = sys.argv[1:] or sorted(p.stem for p in SPECS.glob("*.js"))
    v = voice()
    cfg = SynthesisConfig(length_scale=1.0, noise_scale=0.6, noise_w_scale=0.0)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    for slug in slugs:
        n, warn = narrate(slug, v, cfg)
        size = (VIDEO / f"{slug}.mp4").stat().st_size
        if slug in manifest:
            manifest[slug]["bytes"] = size
            manifest[slug]["narrated"] = True
        print(f"narrated {slug}: {n} captions, {size / 1e6:.2f} MB" + ("".join("\n  WARNING " + w for w in warn)))
    MANIFEST.write_text(json.dumps(manifest, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    main()
