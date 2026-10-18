"""Build optimized local portfolio media from the collected public artwork."""
import json
import pathlib
import shutil
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / "artes"
MEDIA = ROOT / "public" / "media"
BRAND = ROOT / "public" / "brand"
DATA = ROOT / "src" / "data"

INSTAGRAM_TITLES = {
    "Ci_VPs_grJE": "Identidade visual e criativos",
    "DTtWLxyFaZr": "Leviah — design de posts",
    "Ddm2QLWlYAm": "Viafor Clinic",
    "DSDaoeDgY2G": "Design para odontologia",
    "DcwR9vzFWKI": "Pousada da Praia",
    "DRvHJqyAY70": "Estética — coleção visual",
    "DccUtudFT7n": "NOMA Arquitetura",
    "DUgyffOFbo9": "NanoGlow para Leviah",
    "DR22PthAdDj": "Apple Store — estudo visual",
    "DRiTzWLgR76": "Nutrição — coleção visual",
    "DTTfn93lYXL": "Beleza — coleção visual",
    "DR-ct-6AaSw": "Liderança — coleção visual",
    "DSOJdFEAXxF": "Estética e vendas",
    "DTgbqslFcZv": "Ortopedia — coleção visual",
    "DRwqO25DNor": "Terapia — coleção visual",
    "DDp1cIhPJqD": "Nutrição — coleção de posts",
    "DDS67A_gknU": "Sergio Caus — identidade visual",
    "CrPLd6Sgxrs": "Nutrição — direção visual",
    "CkBWtZIASVR": "Vampire Lord — arte digital",
    "CjGl0jsOski": "Peças em colaboração",
    "CTQeCN3ldet": "Proteção veicular",
    "CUGQ16htI2w": "Composição experimental",
    "CTDeJ-2AnRz": "Identidade visual — estudo",
    "CS-SRB-AFLR": "Ricciardi's Rock Pizza",
}


def category(title):
    t = title.casefold()
    if any(x in t for x in ("poster", "pôster", "god of war", "vampire", "composição experimental")):
        return "Arte digital"
    if any(x in t for x in ("identidade", "logotipo", "blue wave", "mangia", "camile", "estamp", "noma", "sergio", "immigrex", "a invest")):
        return "Identidade visual"
    if any(x in t for x in ("landing page", "articula life")):
        return "Web design"
    return "Design para redes"


def convert(source, target, max_width):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.width > max_width:
            image = image.resize((max_width, round(image.height * max_width / image.width)), Image.Resampling.LANCZOS)
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.save(target, "WEBP", quality=80, method=5)
        return {"src": "/" + target.relative_to(ROOT / "public").as_posix(), "width": image.width, "height": image.height}


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    for number, name in ((4, "logo-light.svg"), (3, "logo-color.svg"), (2, "logo-symbol-light.svg"), (1, "logo-symbol-color.svg")):
        shutil.copyfile(ROOT.parent / "svgpablo" / f"Logotipo {number}.svg", BRAND / name)
    behance = json.loads((SOURCE / "manifesto_behance.json").read_text(encoding="utf-8"))
    instagram = json.loads((SOURCE / "manifesto_instagram.json").read_text(encoding="utf-8"))
    projects = []
    for entry in behance["projects"]:
        pid = entry["id"]
        title = entry["title"]
        images = []
        for i, asset in enumerate(entry["images"], 1):
            if not asset["file"]:
                continue
            source = ROOT.parent / asset["file"]
            images.append(convert(source, MEDIA / f"behance-{pid}-{i:02d}.webp", 1600))
        cover = convert(ROOT.parent / entry["images"][0]["file"], MEDIA / f"behance-{pid}-cover.webp", 900)
        projects.append({"slug": f"behance-{pid}", "title": title, "category": category(title), "source": "Behance", "sourceUrl": entry["url"], "cover": cover, "images": images})
    for entry in instagram["posts"]:
        pid = entry["id"]
        title = INSTAGRAM_TITLES[pid]
        images = [convert(ROOT.parent / file, MEDIA / f"instagram-{pid}-{i:02d}.webp", 1400) for i, file in enumerate(entry["images"], 1)]
        cover = convert(ROOT.parent / entry["images"][0], MEDIA / f"instagram-{pid}-cover.webp", 900)
        projects.append({"slug": f"instagram-{pid}", "title": title, "category": category(title), "source": "Instagram", "sourceUrl": entry["url"], "cover": cover, "images": images})
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "projects.json").write_text(json.dumps(projects, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Prepared {len(projects)} cases and {sum(len(p['images']) for p in projects)} artwork images")


if __name__ == "__main__":
    main()
