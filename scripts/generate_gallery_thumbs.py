#!/usr/bin/env python3
import os
import re
import ssl
import subprocess
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content" / "galleryMedia.ts"
OUT_DIR = ROOT / "public" / "legacy-thumbs"
BASE_URL = "https://bca.jcarranca.com/images/"
MAX_WIDTH = 960
QUALITY = 72
TIMEOUT = 30


def extract_non_phocagallery_paths() -> list[str]:
    text = CONTENT.read_text(encoding="utf-8")
    matches = re.findall(r'"src": "/legacy-mirror/images/([^"]+)"', text)
    decoded = [urllib.parse.unquote(m) for m in matches]
    unique: list[str] = []
    seen = set()
    for rel in decoded:
        if rel.startswith("phocagallery/"):
            continue
        if rel in seen:
            continue
        seen.add(rel)
        unique.append(rel)
    return unique


def ensure_thumb(rel_path: str) -> tuple[str, str]:
    src_url = urllib.parse.urljoin(BASE_URL, urllib.parse.quote(rel_path))
    dest = OUT_DIR / f"{rel_path}.webp"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return ("skip", rel_path)

    with tempfile.NamedTemporaryFile(suffix=Path(rel_path).suffix or ".img", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        with urllib.request.urlopen(src_url, context=ssl._create_unverified_context(), timeout=TIMEOUT) as response:
            tmp_path.write_bytes(response.read())
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-loglevel",
                "error",
                "-i",
                str(tmp_path),
                "-vf",
                f"scale='min({MAX_WIDTH},iw)':-2",
                "-c:v",
                "libwebp",
                "-q:v",
                str(QUALITY),
                "-compression_level",
                "6",
                str(dest),
            ],
            check=True,
        )
        return ("ok", rel_path)
    finally:
        try:
            tmp_path.unlink(missing_ok=True)
        except Exception:
            pass


def main() -> int:
    rel_paths = extract_non_phocagallery_paths()
    print(f"Generating thumbnails for {len(rel_paths)} non-phocagallery images...")
    ok = skip = fail = 0
    for rel in rel_paths:
        try:
            status, _ = ensure_thumb(rel)
            if status == "ok":
                ok += 1
            else:
                skip += 1
        except Exception as exc:
            fail += 1
            print(f"FAIL {rel}: {exc}")
    print(f"done ok={ok} skip={skip} fail={fail}")
    return 1 if fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
