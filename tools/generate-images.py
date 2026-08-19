#!/usr/bin/env python3
"""
Generates SportFo's original brand imagery into public/images, as SVG.

These are ORIGINAL, generated graphics — deliberately abstract/editorial
rather than photographic, because the project has no licensed photo library.
They're built from the same palette as tailwind.config.ts so the art and the
UI read as one system.

Why SVG rather than JPEG: the artwork is entirely gradients, arcs, lines and
dot patterns — native vector content. As SVG each image is a few KB instead of
a few hundred, stays crisp on any display, and needs no image optimizer.

To swap in real photography later, drop a JPG into public/images and point the
matching entry in src/lib/images.ts at it — the components take a plain `src`
string plus an aspect ratio, so nothing else changes.

Run:  python3 tools/generate-images.py
"""

import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

# Palette lifted from tailwind.config.ts
INK_950 = "#070B14"
INK_900 = "#0B111F"
BRAND_600 = "#2340D6"
BRAND_500 = "#3355EA"
BRAND_400 = "#5A79F5"
ACCENT_500 = "#EFA524"
SUCCESS_500 = "#1E9E5A"
TEAL = "#1AA8B2"
CRIMSON = "#D62D4F"
VIOLET = "#7C48D6"


def mix(a, b, t):
    """Blend two #rrggbb colours, t=0 -> a, t=1 -> b."""
    av = [int(a[i : i + 2], 16) for i in (1, 3, 5)]
    bv = [int(b[i : i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(av[i] + (bv[i] - av[i]) * t):02X}" for i in range(3))


# ---------------------------------------------------------------- sport glyphs
# Each returns SVG path/shape markup drawn inside a 100x100 box, stroked only.


def glyph_athletics():
    """Stopwatch."""
    return (
        '<circle cx="50" cy="56" r="34"/>'
        '<path d="M50 56V33M50 56l16 10"/>'
        '<path d="M41 13h18M50 13v9"/>'
    )


def glyph_football():
    cx = cy = 50.0
    r = 36.0
    inner = r * 0.34
    pts = []
    for i in range(5):
        a = math.radians(-90 + i * 72)
        pts.append((cx + math.cos(a) * inner, cy + math.sin(a) * inner))
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    spokes = "".join(
        f'M{pts[i][0]:.1f} {pts[i][1]:.1f}L'
        f'{cx + math.cos(math.radians(-90 + i * 72)) * r:.1f} '
        f'{cy + math.sin(math.radians(-90 + i * 72)) * r:.1f}'
        for i in range(5)
    )
    return f'<circle cx="50" cy="50" r="36"/><polygon points="{poly}"/><path d="{spokes}"/>'


def glyph_cricket():
    """Three stumps with bails, and a seamed ball approaching."""
    return (
        '<path d="M40 26v52M50 26v52M60 26v52"/>'
        '<path d="M37 23h15M48 23h15"/>'
        '<circle cx="20" cy="60" r="11.5"/>'
        '<path d="M15.2 50.6a11.5 11.5 0 000 18.8M24.8 50.6a11.5 11.5 0 010 18.8"/>'
    )


def glyph_basketball():
    r = 36.0
    rx = r * 0.58
    return (
        '<circle cx="50" cy="50" r="36"/>'
        '<path d="M14 50h72M50 14v72"/>'
        f'<path d="M50 14a{rx:.1f} {r:.1f} 0 000 72"/>'
        f'<path d="M50 14a{rx:.1f} {r:.1f} 0 010 72"/>'
    )


def glyph_badminton():
    """Shuttlecock."""
    return (
        '<path d="M37 70a13 13 0 0026 0"/>'
        '<path d="M37 70h26"/>'
        '<path d="M37 70L20 21M63 70l17-49"/>'
        '<path d="M20 21a34 12 0 0160 0"/>'
        '<path d="M43 68L34 22M50 68V22M57 68l9-46"/>'
    )


def glyph_swimming():
    waves = "".join(
        f'<path d="M4 {y}q12 -9 24 0t24 0t24 0t24 0"/>' for y in (40, 57, 74)
    )
    return f'<circle cx="30" cy="22" r="7.5"/>{waves}'


SLIDES = [
    ("athletics", BRAND_500, glyph_athletics),
    ("football", TEAL, glyph_football),
    ("cricket", ACCENT_500, glyph_cricket),
    ("basketball", CRIMSON, glyph_basketball),
    ("badminton", SUCCESS_500, glyph_badminton),
    ("swimming", VIOLET, glyph_swimming),
]


def glyph_group(markup, x, y, size, color, opacity, width=7.0, blur=None):
    """Place a 100x100 glyph at (x, y) scaled to `size`, stroked in `color`."""
    scale = size / 100.0
    # Keep the visual stroke weight constant regardless of glyph scale.
    stroke = width / scale
    filt = f' filter="url(#{blur})"' if blur else ""
    return (
        f'<g transform="translate({x:.0f} {y:.0f}) scale({scale:.4f})" '
        f'fill="none" stroke="{color}" stroke-width="{stroke:.2f}" '
        f'stroke-linecap="round" stroke-linejoin="round" '
        f'opacity="{opacity}"{filt}>{markup}</g>'
    )


def streaks(w, h, color, seed=0, count=11, opacity=0.5):
    """Diagonal motion streaks — the core 'sport' texture of these images."""
    rng = _Rng(seed)
    lines = []
    for _ in range(count):
        y = rng.rand() * h * 1.3 - h * 0.15
        length = (0.18 + rng.rand() * 0.5) * w
        x = rng.rand() * w - w * 0.1
        sw = rng.choice([2, 3, 5, 9])
        op = 0.10 + rng.rand() * 0.5
        lines.append(
            f'<line x1="{x:.0f}" y1="{y:.0f}" x2="{x + length:.0f}" y2="{y:.0f}" '
            f'stroke="{color}" stroke-width="{sw}" opacity="{op:.2f}"/>'
        )
    return (
        f'<g filter="url(#soft)" transform="rotate(-20 {w / 2:.0f} {h / 2:.0f})" '
        f'opacity="{opacity}">{"".join(lines)}</g>'
    )


class _Rng:
    """Tiny deterministic PRNG, so regenerating gives byte-identical output."""

    def __init__(self, seed):
        self.s = seed * 9301 + 49297

    def rand(self):
        self.s = (self.s * 9301 + 49297) % 233280
        return self.s / 233280.0

    def choice(self, items):
        return items[int(self.rand() * len(items)) % len(items)]


def track_arcs(w, h, cx_frac=0.5, count=7):
    """Concentric arcs echoing running-track lanes."""
    cx, cy = w * cx_frac, h * 1.35
    base = h * 0.42
    out = []
    for i in range(count):
        r = base + i * h * 0.115
        op = 0.26 - i * 0.028
        if op <= 0.02:
            continue
        out.append(
            f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{r:.0f}" fill="none" '
            f'stroke="#fff" stroke-width="2" opacity="{op:.2f}"/>'
        )
    return "".join(out)


def defs(w, h, accent, halftone_color, glow=(0.74, 0.26)):
    return f"""<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="{INK_950}"/><stop offset="1" stop-color="{mix(INK_900, accent, 0.16)}"/>
</linearGradient>
<radialGradient id="glowA" cx="{glow[0]}" cy="{glow[1]}" r="0.78">
<stop offset="0" stop-color="{accent}" stop-opacity="0.55"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="glowB" cx="0.08" cy="0.95" r="0.6">
<stop offset="0" stop-color="{BRAND_600}" stop-opacity="0.4"/><stop offset="1" stop-color="{BRAND_600}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="vig" cx="0.5" cy="0.5" r="0.72">
<stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/>
</radialGradient>
<linearGradient id="dotFade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="0.7" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<mask id="dotMask"><rect width="{w}" height="{h}" fill="url(#dotFade)"/></mask>
<pattern id="dots" width="17" height="17" patternUnits="userSpaceOnUse">
<circle cx="4" cy="4" r="2.3" fill="{halftone_color}"/>
</pattern>
<filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
<feGaussianBlur stdDeviation="7"/></filter>
<filter id="ghost" x="-15%" y="-15%" width="130%" height="130%">
<feGaussianBlur stdDeviation="1.2"/></filter>
</defs>"""


def base_layers(w, h, accent, halftone_color, arc_cx=0.5, glow=(0.74, 0.26)):
    return (
        defs(w, h, accent, halftone_color, glow)
        + f'<rect width="{w}" height="{h}" fill="url(#bg)"/>'
        + f'<rect width="{w}" height="{h}" fill="url(#dots)" mask="url(#dotMask)"/>'
        + f'<rect width="{w}" height="{h}" fill="url(#glowA)"/>'
        + f'<rect width="{w}" height="{h}" fill="url(#glowB)"/>'
        + track_arcs(w, h, arc_cx)
    )


def svg(w, h, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice" role="img">'
        f"{body}</svg>"
    )


def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return name, os.path.getsize(path)


def make_slide(key, accent, glyph_fn, index):
    w, h = 1600, 1000
    g = glyph_fn()
    body = (
        base_layers(w, h, accent, mix(accent, "#FFFFFF", 0.3), arc_cx=0.62)
        + streaks(w, h, mix(accent, "#FFFFFF", 0.45), seed=index + 3)
        # Oversized ghost glyph bleeding off the right edge.
        + glyph_group(g, w * 0.58, h * 0.02, h * 1.05, "#FFFFFF", 0.14, blur="ghost")
        # Crisp focal glyph, above where the overlaid HTML headline lands.
        # No text is baked in: titles live in SportsShowcase.tsx so they stay
        # selectable, translatable and responsive.
        + glyph_group(g, w * 0.062, h * 0.13, h * 0.26, mix(accent, "#FFFFFF", 0.6), 0.95)
        + f'<rect width="{w}" height="{h}" fill="url(#vig)"/>'
    )
    return write(f"sport-{key}.svg", svg(w, h, body))


def make_hero():
    w, h = 1600, 1200
    body = (
        base_layers(w, h, BRAND_500, mix(BRAND_500, "#FFFFFF", 0.3), arc_cx=0.45, glow=(0.62, 0.18))
        + streaks(w, h, "#FFFFFF", seed=9, count=9, opacity=0.4)
        + glyph_group(glyph_athletics(), w * 0.30, h * 0.06, h * 0.92, "#FFFFFF", 0.16, blur="ghost")
        + glyph_group(glyph_football(), w * 0.06, h * 0.52, h * 0.40, mix(BRAND_400, "#FFFFFF", 0.5), 0.5)
        + glyph_group(glyph_badminton(), w * 0.68, h * 0.60, h * 0.30, mix(ACCENT_500, "#FFFFFF", 0.4), 0.55)
        + f'<rect width="{w}" height="{h}" fill="url(#vig)"/>'
    )
    return write("hero-athletes.svg", svg(w, h, body))


def make_portrait():
    """Abstract 'athlete card' art used inside the example profile card."""
    w, h = 900, 1100
    body = (
        base_layers(w, h, BRAND_500, mix(BRAND_500, "#FFFFFF", 0.3), arc_cx=0.5, glow=(0.5, 0.22))
        + glyph_group(glyph_athletics(), w * -0.02, h * 0.16, w * 1.05, "#FFFFFF", 0.2, blur="ghost")
        + f'<text x="{w / 2:.0f}" y="{h * 0.60:.0f}" text-anchor="middle" '
        f'font-family="Archivo, Inter, system-ui, sans-serif" font-weight="800" '
        f'font-size="{w * 0.42:.0f}" fill="#FFFFFF" opacity="0.95">07</text>'
        + f'<rect width="{w}" height="{h}" fill="url(#vig)"/>'
    )
    return write("athlete-portrait.svg", svg(w, h, body))


def make_og():
    w, h = 1200, 630
    body = (
        base_layers(w, h, BRAND_500, mix(BRAND_500, "#FFFFFF", 0.3), arc_cx=0.6, glow=(0.78, 0.2))
        + glyph_group(glyph_athletics(), w * 0.62, h * 0.06, h * 1.0, "#FFFFFF", 0.16, blur="ghost")
        + f'<text x="{w * 0.07:.0f}" y="{h * 0.46:.0f}" '
        f'font-family="Archivo, Inter, system-ui, sans-serif" font-weight="800" '
        f'font-size="{h * 0.135:.0f}" fill="#FFFFFF">SportFo</text>'
        + f'<text x="{w * 0.07:.0f}" y="{h * 0.60:.0f}" '
        f'font-family="Inter, system-ui, sans-serif" font-weight="700" letter-spacing="2" '
        f'font-size="{h * 0.048:.0f}" fill="{mix(BRAND_400, "#FFFFFF", 0.6)}">'
        f"YOUR PROFESSIONAL SPORTS IDENTITY</text>"
        + f'<rect width="{w}" height="{h}" fill="url(#vig)"/>'
    )
    return write("og-sportfo.svg", svg(w, h, body))


if __name__ == "__main__":
    written = [make_hero(), make_portrait(), make_og()]
    for i, (key, accent, glyph) in enumerate(SLIDES):
        written.append(make_slide(key, accent, glyph, i))
    total = 0
    for name, size in written:
        total += size
        print(f"{name:28s} {size / 1024:6.1f} KB")
    print(f"{'TOTAL':28s} {total / 1024:6.1f} KB")
