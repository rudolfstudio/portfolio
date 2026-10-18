"""Extract a light interface tint from each project's own cover."""
import colorsys
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
projects = json.loads((ROOT / 'src/data/projects.json').read_text(encoding='utf-8'))
palettes = {}
for project in projects:
    image = Image.open(ROOT / 'public' / project['cover']['src'].lstrip('/')).convert('RGB')
    image.thumbnail((100, 100))
    colors = image.quantize(colors=12).convert('RGB').getcolors(10000)
    candidates = []
    for count, rgb in colors:
        hue, saturation, value = colorsys.rgb_to_hsv(*(v / 255 for v in rgb))
        if saturation > .15 and .15 < value < .98:
            candidates.append((count * saturation * value, rgb))
    rgb = max(candidates)[1] if candidates else (220, 220, 220)
    tint = tuple(round(v * .07 + 255 * .93) for v in rgb)
    palettes[project['slug']] = '#' + ''.join(f'{v:02x}' for v in tint)

palettes.update({
    'instagram-DccUtudFT7n': '#faf5ee',
    'behance-184551257': '#f0f6fc',
    'behance-251835227': '#eff8f5',
    'behance-86600217': '#fcf4ee',
    'behance-206087051': '#fff6e9',
})
(ROOT / 'src/data/project-palettes.json').write_text(json.dumps(palettes, indent=2) + '\n', encoding='utf-8')
print(f'{len(palettes)} project palettes prepared')
