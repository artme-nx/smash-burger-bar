# Design System — "SMASH / SIGNATURE"

Premium burger bar u Splitu, dvije lokacije, jedan brend na dvije razine.
Editorial, high-motion, desktop-first spektakl. Svijetla papir-podloga, **crvena
kao dominantan akcent**, **zlatna rezervirana isključivo za Signature razinu**.

## 1. Koncept

Stranica se ponaša kao **poster u pokretu**: off-white papir je platno, ogromna
condensed display slova (Anton) su glavni glumac, crvena je "smash" — udarac boje
koji drži cijeli site. Oštri, editorial rubovi (bez rounded-xl, bez soft shadowa).
Zlatna se pojavljuje samo kad uđemo u **Signature** svijet — tamna sekcija/kartica,
zlatni logo i akcent, isti layout i motion, samo druga temperatura.

Dvije teme = **jedan dizajn, dva akcenta.** Crvena i zlatna se **nikad ne miješaju
u istoj sekciji.**

## 2. Boje (tokeni)

Tri sloja: `primitive` → `semantic` → `component` u `design/tokens.json`,
generirano u `src/app/tokens.css`. U kodu se koristi **samo semantic/component sloj**
(npr. `var(--primary)`), nikad sirovi hex.

| Token              | Hex       | Uloga                                             |
|--------------------|-----------|---------------------------------------------------|
| `--background`     | `#FBF8F3` | Podloga — topli off-white papir (nikad čisto bijelo) |
| `--surface`        | `#FFFFFF` | Kartice / iskočene plohe                          |
| `--surface-muted`  | `#F3EDE3` | Mirne panel-podloge                              |
| `--foreground`     | `#0B0A0A` | Primarni tekst / naslovi (near-black, ne #000)   |
| `--muted-foreground`| `#8A8177`| Meta, potpisi                                    |
| `--primary`        | `#EB0102` | **Crvena iz loga — dominantan akcent**           |
| `--primary-strong` | `#C60D10` | Crveni **tekst** na svijetlom (AA kontrast)      |
| `--signature`      | `#D4AF5A` | **Zlatna — SAMO Signature** (tab, kartica, gumb) |
| `--signature-bright`| `#E5C77C`| Zlatni tekst na tamnome                          |
| `--surface-dark`   | `#0B0A0A` | Signature sekcije & footer (zlato na crnom)      |

**Pravila boje**
- Crvena je dominantna, ali kao **udarci** — velike plohe, naslovi, CTA; ne cijeli ekran.
- `#EB0102` na bijelom ≈ 4.6:1 → OK za velike naslove/CTA. Za **mali crveni tekst** koristi `--primary-strong` (`#C60D10`).
- Zlatna živi na **tamnoj podlozi** (Signature) gdje daje ~10:1 kontrast — kao zlatni cjenik na crnom.
- Nema šarenih linear-gradijenata; jedini gradijenti su suptilni radijalni glow (`--hero-glow`, `--signature-section-glow`).

## 3. Tipografija

| Uloga        | Font                    | Karakter                                      |
|--------------|-------------------------|-----------------------------------------------|
| Display      | **Anton** (`--type-display`) | Ultra-heavy condensed uppercase, poster impact — "SMASH" |
| Body         | **Archivo** (`--type-body`)  | Čist grotesk, čitljiv, ista kostura kao Anton |
| Label motiv  | Archivo, `tracking 0.28em` uppercase | Razmaknuti caps — "BURGER BAR" motiv |

- Hero naslovi su **OGROMNI**: `--type-hero-size` = `clamp(3.25rem, 12vw, 13rem)`, leading `0.88`.
- Display tracking blago negativan (`-0.02em`); labeli široko razmaknuti (`0.28em`).
- Ton copyja: malo riječi, veliki naslovi, lowercase/uppercase mix ("juicy cheesy fully loaded" energija).
- Fontovi se učitavaju kroz `next/font` u Fazi 2 (`--font-anton`, `--font-archivo`), no-FOUT.

## 4. Type scale

`hero → display1 → display2 → section → body-lg → body → label`
(vidi `--type-*` u `tokens.css`). Sve fluidno preko `clamp()`, desktop-first ali čisto na 360px.

## 5. Spacing & container

- Spacing: `--primitive-space-3xs … 6xl` (0.25rem → 13rem), 4/8-based ritam.
- Sekcijski ritam: `3xl`/`4xl` (6–8rem) vertikalno.
- Container: `narrow 42 · content 68 · wide 82 · full 96 rem`; bočni gutter `clamp(1.25rem, 5vw, 5rem)`.
- Radius: **0** (oštri editorial rubovi) za kartice; `--radius-pill` samo za gumbe/tagove/"Order" pill.

## 6. Motion potpis

Iz `--ease-*` / `--duration-*` tokena (GSAP + Lenis, Faza 3):

- Reveal easing: `--ease-reveal` = `cubic-bezier(0.16, 1, 0.3, 1)` (expo.out) — snappy.
- Split-text char/line reveal na naslovima; hover roll na nav/gumbima (dupli tekst, translateY swap).
- Scroll: Lenis smooth; pin+scrub za "slaganje sastojaka".
- Press feedback scale `0.97→1`; page transitions tipografske (u stilu preloadera).
- Sve degradira uz `prefers-reduced-motion` → fade/none.

## 7. Anti-slop (zabranjeno)

Generic SaaS gradijenti, glassmorphism, purple→blue, emoji, stock-photo energija,
testimonial carousel/FAQ/pricing tabele, Inter, rounded-xl + soft shadow sa svih
strana, cookie/newsletter popup. Referenca je oštar, editorial layout — držimo se toga.
