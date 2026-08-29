# mahiru — analysen

Dev-Portfolio-Look, dunkel-monochrom + Amber-Akzent. Astro (Static Site Generator).
Jede Analyse ist eine `.md`-Datei mit eigener, teilbarer URL.

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:4321
```

## Neue Analyse schreiben

Neue Datei in `src/content/posts/` anlegen, z. B. `karamazov-zosima.md`:

```markdown
---
title: "Zosimas universelle Verantwortung"
date: 2026-09-01
description: "Ein Satz, den man nicht mehr los wird."
work: "Die Brüder Karamasow"     # optional
author: "Dostojewski"            # optional
draft: false                     # true = versteckt, nur lokal sichtbar
---

Dein Text hier...
```

Dateiname = URL-Slug → `/posts/karamazov-zosima`. Taucht **automatisch**
in Übersicht und Startseite auf, du musst nichts weiter registrieren.

### Cover-Bild (optional)

Bild nach `public/covers/` legen (z. B. `public/covers/tbk.jpg`) und im
Frontmatter referenzieren:

```markdown
cover: "/covers/tbk.jpg"
coverAlt: "kurze Bildbeschreibung"
```

Wird oben in der Analyse als Banner angezeigt und in der Übersicht/Startseite
als Thumbnail. Ohne `cover` bleibt die Zeile einfach textuell — kein Muss.
JPG/PNG/WebP/SVG gehen alle. Große Fotos vorher etwas runterskalieren
(die werden hier nicht automatisch optimiert).

Formatierungen (alle live in der Vorlage-Analyse zu sehen): `**fett**`,
`*kursiv*`, `## Überschrift`, `> Blockzitat`, `<mark>Marker-Highlight</mark>`,
Fußnoten `[^1]`, Listen, `` `code` ``. Die Vorlage-Datei
`vorlage-formatierung.md` kannst du löschen, wenn du sie nicht mehr brauchst.

## Bauen

```bash
npm run build    # erzeugt statische Site in ./dist
npm run preview  # dist lokal testen
```

`./dist` ist reines HTML/CSS/JS — überall hostbar, kein Node zur Laufzeit nötig.

## Deploy

### A) Auf deinem Homelab (nginx + cloudflared)

1. `dist/` auf den Server bringen, z. B.:
   ```bash
   rsync -av --delete dist/ user@homelab:/var/www/posts/
   ```
2. nginx-Server-Block:
   ```nginx
   server {
     server_name analysen.mahiru.dev;
     root /var/www/analysen;
     index index.html;
     location / { try_files $uri $uri/ $uri.html =404; }
   }
   ```
3. Route in deiner `cloudflared`-Config auf diesen nginx (wie deine anderen
   Services), DNS-Record `analysen.mahiru.dev` auf den Tunnel — fertig.

> Tipp: `site:` in `astro.config.mjs` auf die echte Domain setzen (aktuell
> `https://analysen.mahiru.dev`), sonst stimmen Canonical-/OG-URLs nicht.

### B) Cloudflare Pages (am wartungsärmsten, DNS liegt eh bei dir)

Repo zu Cloudflare Pages verbinden, Build-Command `npm run build`,
Output-Dir `dist`. Push = Auto-Deploy, null Last auf deinem Server.

## Design-Notizen

- **Akzentfarbe zentral:** In `src/styles/global.css` ganz oben im `:root`
  steht `--accent`. Diese eine Zeile ändern — Links, Nav, Marker,
  Progress-Balken **und** die Partikel ziehen automatisch nach (die Partikel
  lesen die Farbe zur Laufzeit aus der CSS-Variable).
- **Partikel** = dichtes Netz aus driftenden Mehrwort-Fragmenten, global hinter
  allen Seiten, mit feinen Verbindungslinien. Tuning-Konstanten stehen oben in
  `src/components/ParticleField.astro` (`DENSITY`, `MAX_NODES`, `LINK_DIST`,
  `SPEED`). `DENSITY` kleiner = mehr Partikel. Respektiert
  `prefers-reduced-motion`.
- **Reading-Progress:** dünner Balken oben auf jeder Analysen-Seite.
- Akzent bewusst **Amber** (Amber-CRT-Terminal) statt des üblichen
  Acid-Grün/Vermilion — Dev-Herkunft ohne den Default-Look.
- Fonts (Fraunces für Titel + Literata fürs Lesen, inkl. echter Kursiven)
  sind **selbst gebündelt**, kein externes CDN.
```
