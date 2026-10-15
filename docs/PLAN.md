# Riju Kattel portfolio: Next.js rebuild plan

Creative direction: **Grounded in Research**. This is a cinematic, scroll-driven journey: from the agricultural landscape to the research question, from field observation to evidence, and from evidence to the next question. It replaces the Gatsby build at `https://rijukattel.com.np`.

**Sources of truth**

- Riju's CV (`CV_RK.pdf`, 5 pages, read 15 Oct 2026).
- The live site and DatoCMS, both audited 15 Oct 2026.
- The "Immersive Agricultural Research Portfolio" spec.

The old Gatsby source was not audited.

**Audiences**

- Graduate admissions committees.
- Prospective supervisors.
- Research institutions.

A professor must be able to read the background, inspect a study, and download the CV without sitting through any animation.

---

## 1. What exists today

### Live site

- Hosting: Netlify, with DNS on Netlify (NS1).
- `www` redirects (301) to the apex domain, and URLs use trailing slashes.

| URL                  | What's there                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `/`                  | Hero ("Cultivating Knowledge, Harvesting Change"), 3 empty feature blocks, 3 featured posts |
| `/blog/`, `/blog/2/` | 7 posts, 6 per page                                                                         |
| `/blog/{slug}/` ×7   | Articles                                                                                    |
| `/about/`            | Hero + 3 themes                                                                             |
| `/gallery/`          | 8 photos, no captions, no alt text                                                          |
| `/contact/`          | Netlify form (raw HTML stored in a CMS text field), posts to `/thank-you/`                  |

### SEO defects to fix

- `robots.txt` and the sitemap point to `raghavkattel.com.np`.
- No canonical tags and no structured data (JSON-LD).
- Every post has the SEO title "Blog" or "Research" and the description "I write what I learn". Post pages render as "Research - Blog - Riju Kattel".
- Other bad defaults:
  - Home title is "Riju Kattel - Riju Kattel".
  - Contact description is "Contact Raghav Kattel".
  - The fallback description is "A Software Engineer".
- Soft 404s: any unknown URL returns the homepage with status 200, caused by a `/* → /index.html 200` rewrite.
- The home page has 9 `<h1>`s, 3 of them empty.
- The logo's alt text is "r".
- The hero photo is served as the 2160 px original.
- A language switcher ("EN") shows even though there is only one locale.

### DatoCMS (`portfolio-riju`, locale `en`)

| Model                                                                                       | Records                                                                             | Use in new site               |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| `blog_post`                                                                                 | 7 published (categories: lifestyle 3, educational 3, literature 1); all have covers | **Yes**, as the Journal       |
| `author`                                                                                    | 1 (Riju, with photo)                                                                | **Yes**                       |
| `website_setting`                                                                           | singleton                                                                           | **Yes, config only**          |
| `other_page` → `gallery`                                                                    | 8 photos                                                                            | **Yes, images only**          |
| about / contact / thank-you, `homepage`, `menu`, `footer`, `archive_page`, `not_found_page` | template copy                                                                       | No; the copy moves to code    |
| `projects_done`, `project_archive`                                                          | 0 records / developer leftover                                                      | No                            |
| Uploads                                                                                     | 177 images, no PDFs                                                                 | Used as the image CDN (imgix) |

---

## 2. Content ownership

**Changed 16 Oct 2026 at the user's request:** all editorial content now lives in DatoCMS, in new purpose-built models. See [CONTENT-MODEL.md](CONTENT-MODEL.md) for the full model and editing rules.

- **DatoCMS:**
  - Homepage copy, page titles and intros, research, themes and experience.
  - CV entries, the profile and About bio, photos and captions.
  - The Journal and the site config.
- **Code:**
  - Interface labels (buttons, form labels, filter and section names) and chapter names.
  - Design tokens, motion and layout.
- **Old Gatsby models** stay untouched until cutover. The new site doesn't read them.

Every build reads DatoCMS with the read-only token. Missing required records fail the build rather than ship an empty page.

---

## 3. Stack

| Layer         | Choice                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router), React 19, TypeScript                                                                                           |
| Rendering     | `output: 'export'` (fully static), `trailingSlash: true`. URLs stay identical to today; real 404 status; Netlify Forms keeps working    |
| Hosting       | Existing Netlify site and DNS; the DatoCMS "Build trigger" calls a Netlify build hook on publish                                        |
| Data          | `@datocms/cda-client` (GraphQL) with a **read-only** token, used at build time only                                                     |
| CMS rendering | `react-datocms` (`StructuredText`, responsive imgix images)                                                                             |
| Styling       | CSS Modules + CSS custom-property tokens (zero runtime)                                                                                 |
| Fonts         | `next/font` self-hosted: **Newsreader** (display, variable optical size), **Manrope** (body/UI, variable)                               |
| Motion        | CSS transitions + CSS scroll-driven animations, with IntersectionObserver fallback; `motion` only in 2–3 client islands on the homepage |
| Charts        | Hand-written SVG components with real data only                                                                                         |
| Contours      | A build-time script generates seeded topographic SVG paths, committed as static SVG (no runtime library)                                |
| QA            | ESLint, `tsc`, Playwright smoke tests + axe, Lighthouse on the static export                                                            |

---

## 4. Routes and navigation

| Route                                          | Source                               | Notes                                                                                                                        |
| ---------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `/`                                            | code (+ featured posts from DatoCMS) | Five chapters (§8)                                                                                                           |
| `/research/`                                   | code                                 | Archive; filter by theme and type                                                                                            |
| `/research/[slug]/`                            | code                                 | Case-study template (§5.3)                                                                                                   |
| `/fieldwork/`                                  | code                                 | GeoKrishi, RS-Agro Farm, Lamahi Youth Network, PRA                                                                           |
| `/blog/`                                       | DatoCMS                              | Labelled **Journal**; category filter; all posts on one page                                                                 |
| `/blog/[slug]/`                                | DatoCMS                              | Editorial reading layout; prev/next; related research                                                                        |
| `/gallery/`                                    | DatoCMS images, code captions        | Photo essay                                                                                                                  |
| `/about/`                                      | code                                 | Bio, education, training, awards, languages, interests                                                                       |
| `/cv/`                                         | code                                 | Full web CV, with no phone or street address; print stylesheet so "Print / Save as PDF" works; no PDF download for now (§13) |
| `/contact/`                                    | code                                 | Email, LinkedIn, Netlify form with honeypot → `/thank-you/` (noindex)                                                        |
| 404                                            | code                                 | Real 404 status                                                                                                              |
| `/sitemap.xml`, `/robots.txt`, `/blog/rss.xml` | generated                            |                                                                                                                              |

Redirects (Netlify, 301):

- `/blog/2/` → `/blog/`
- `/projects/*` → `/research/`
- `/sitemap/sitemap-index.xml` → `/sitemap.xml`

Navigation: **Research · Fieldwork · Journal · About · CV · Contact**.

- **Two modes:** story navigation (homepage chapters and progress) and direct navigation (ordinary links).
- **Always reachable:** CV and Contact never sit behind the scroll journey.

---

## 5. Content inventory (from the CV)

CV dates are DD/MM/YYYY.

### 5.1 Profile

- **Name:** Riju Kattel, Ratnanagar, Chitwan, Nepal.
- **Degree:** B.Sc. Agriculture, Institute of Agriculture and Animal Science (IAAS), Tribhuvan University, Dang, 2020–2024. Eight semesters; aggregate 76.17 %.
- **Positioning (from "About me"):**
  - Agricultural Science graduate with practical farmer engagement and field research experience.
  - Wants to build research skills on pollinators, pesticide governance, and farmers' perceptions of agricultural change.
- **Research interests:**
  - Climate change; community resilience and equity; participatory research.
  - Pesticide governance and risk; pollinators; environmental justice.
  - Soil health and soil fertility.
- **Skills:** R Studio, Minitab, Microsoft Office.
- **Language:** IELTS 7.5 overall.
- **Courses:**
  - Building Climate Resilience through Ecosystem-based Adaptation Planning (UN CC:Learn).
  - Understanding the Problem of Modern Slavery (Alison).
- **Public links:**
  - LinkedIn `linkedin.com/in/rijukattel222`
  - Facebook (from DatoCMS)

### 5.2 Research (archive entries)

| Slug                             | Title (CV)                                                                                              | Type                  | When         | Where          | Role / key facts                                                                                                                                                            | Depth now     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------- | ------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `aromatic-rice-diversity`        | Assessment of Diversity in Aromatic Rice Genotypes for Yield and Yield Attributes                       | **B.Sc. thesis**      | 2024*        | —              | Agro-morphological traits; PCA (communalities); cluster analysis (genetic distance between clusters)                                                                        | Brief         |
| `climate-perceptions-gauradaha`  | Farmers' Perceptions on Climate Change and Local Adaptation Strategies in Gauradaha Municipality        | Independent survey*   | Mar–May 2025 | Gauradaha      | 100 households; 36 % unaware of climate change; 89 % report rising pests/diseases; 54 % adaptation uptake                                                                   | Brief + chart |
| `unseasonal-rainfall-ratnanagar` | Responses to Unseasonal Rainfall among Smallholder Rice Farmers in Ratnanagar Municipality              | Independent study*    | 03/09/2025   | Ratnanagar     | Labour scarcity the primary cause of 40 % crop losses; disconnect between national early-warning policy and local implementation                                            | Brief         |
| `jujube-consumer-preferences`    | Consumer Preferences and Awareness of Indian Jujube in Chitwan Market                                   | Survey                | 5 Jan 2025   | Chitwan        | n = 35 aged 21–25 (Journal post); 100 % familiar, 43 % eat less, 80 % see declining demand, 60 % prefer exotic fruits, 30 % aware of nutrition, 40 % interested in products | Full + chart  |
| `hybrid-rice-ga3`                | Evaluation of Staggered Transplanting and Level of GA3 on Hybrid Rice Seed Production in Deukhuri, Dang | **Collaboration**     | —            | Deukhuri, Dang | Collected and maintained data; assisted editing and preparation for publication                                                                                             | Brief         |
| `mustard-oil-hive-barrier`       | Mustard-oil barrier against ants in beehives                                                            | Field trial (Journal) | 2025         | Ratnanagar     | 20 _Apis mellifera_ hives, 5 infested (3 moderate, 2 heavy), 7-day observation; no reinfestation in moderate hives                                                          | Full          |

\* Needs confirmation; see §13.

**Semester projects:**

- Economics of wheat cultivation under different weed-management practices, Dang (Nov 2022 – Mar 2023).
- African marigold (Jul–Sep 2023).
- High-yield greenhouse lettuce (Apr 2023).
- Oyster mushroom, IAAS Prithu Technical College farm (Feb–May 2024).
- Participatory Rural Appraisal, Gabar Rural Municipality, Banke (29 Jan 2024).

**Academic presentations:**

- Pesticide wastage and its impact on water quality in Lamahi, Dang (8 Jun 2023).
- Weed management in wheat (group, 3 Jul 2023).
- Participatory Monitoring & Evaluation (15 Feb 2023).

**Publication status:** none of the work is listed as published. The hybrid-rice collaboration is "being prepared for publication". The site never says "published" unless the record shows it.

### 5.3 Two depths of research page

- **Brief:** only what the CV states.
  - Shown: question, setting, dates, sample (if stated), role, headline findings, and a "Research record" box.
  - Not shown: invented methods or limitations. Sections without a source are omitted.
- **Full case study:** the six sections from the spec (Question → Context → Method → Findings → Implications → Research record), used when a source document exists. Currently that means the Journal posts and, later, the thesis or reports.

A study moves from Brief to Full when its source document is added. The template is the same, with sections rendered conditionally.

### 5.4 Experience (Fieldwork)

| Role                     | Organisation                                      | Dates                     | Where               | Facts                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------- | ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Field facilitator intern | GeoKrishi Initiative                              | 3 Jan – 14 Apr 2024       | Ratnanagar & Lamahi | Platform adoption among 100 farmers; led trainings across two municipalities; collected and analysed data on farmer technology use                                       |
| Farm manager             | RS-Agro Farm (family)                             | Jan 2023 – present        | Ratnanagar          | Secured ~US$7,460 subsidy for irrigation of 3.35 ha (family + neighbouring land); daily operations, labour, soil, sustainable production; supply chain to market vendors |
| Coordinator              | Lamahi Youth Network, Amnesty International Nepal | 16 Jan 2024 – 13 Feb 2025 | Lamahi, Dang        | Led 40 youth volunteers; climate-change and human-rights sessions in 12 schools; planning, budget, reports; worked with municipal officials                              |

**Training:**

- GIS & Remote Sensing in Agriculture (May 2020).
- College IPM programme for cauliflower (Sep–Nov 2022).
- Soil laboratory analysis (Dec 2022).
- Personality development & anchoring (Jun 2018).

**Outreach:** Human Rights Education and Climate Change Awareness sessions for schools in Lamahi (2024).

**Awards:**

- Essay Writing Competition winner, "Climate Smart Agriculture: Policies, Status and Prospect for Resilience of Nepal", The Eco-Minions (2022).
- Article Writing Competition winner, literacy category ("Trails of Life"), SOMES Nepal (2023).
- Essay competition, 3rd place, Valmiki Shiksha Sadan (2017).
- Honourable mention, STEM Blog Writing, My Geeky Planet (2021).

### 5.5 Research themes (homepage Chapter 02 and `/research/` filter)

| Theme                                           | Linked evidence                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Climate change & community resilience           | Gauradaha perceptions; Ratnanagar rainfall; UN CC:Learn EbA course; climate essay award; school climate sessions |
| Pesticides, pollinators & environmental justice | Mustard-oil hive barrier; IPM cauliflower programme; pesticide-wastage presentation                              |
| Soil health & fertility                         | Soil lab training; farm soil management; GIS training                                                            |
| Crop diversity & production systems             | Aromatic rice thesis; hybrid rice GA3; wheat weed economics; semester crop projects                              |
| Farmers, markets & participation                | Jujube survey; GeoKrishi; PRA Gabar; Participatory M&E; RS-Agro Farm supply chain                                |

---

## 6. Design system

### 6.1 Principles

- **Landscape as the canvas:** authentic field photographs (Riju's own, from DatoCMS), crop patterns, soil textures, and topographic contour lines.
- **Research as the editorial layer:** serif headlines, numbered chapters (`01 /`), thin rules, figure numbers ("Fig. 03"), precise captions, citations. It should read like a contemporary research publication.
- **Evidence as the focal point:** charts, maps and figures explain real findings and never decorate.
- **Avoid:**
  - SaaS card grids, glassmorphism, neon gradients.
  - Leaf icons, rounded-everything.
  - Dashboard aesthetics, decorative motion.
- **Rhythm:** one primary action per scene.

### 6.2 Colour tokens

| Token         | Hex                              | Role                                                              | On Ivory | On Paper  |
| ------------- | -------------------------------- | ----------------------------------------------------------------- | -------- | --------- |
| `--forest`    | `#233C2D`                        | Text, nav, strong surfaces, focus ring                            | 11.1 : 1 | 9.4 : 1   |
| `--sage`      | `#657A50`                        | Rules, icons, large labels (**large text/UI only**)               | 4.4 : 1  | 3.7 : 1   |
| `--sage-ink`  | `#4E5F3E` (derived)              | Small captions and meta text                                      | 6.4 : 1  | 5.4 : 1   |
| `--paper`     | `#E9E3D5`                        | Research panels, figure backgrounds                               | —        | —         |
| `--ivory`     | `#F8F6F0`                        | Primary canvas (`body` background)                                | —        | —         |
| `--earth`     | `#BD794B`                        | Sparse emphasis, chart highlight, contour accent (**never text**) | 3.2 : 1  | 2.7 : 1 ✗ |
| `--earth-ink` | `#8F5530` (derived)              | Emphasis text when needed                                         | 5.5 : 1  | 4.7 : 1   |
| `--ink-soft`  | `#526558` (forest 78 % on ivory) | Secondary body text                                               | 5.8 : 1  | 4.9 : 1   |

Ratios were computed with the WCAG 2.x formula.

- **Dark surfaces** (hero overlay, footer) use forest with ivory text.
- **Chart colours:** forest for the primary series, earth for the highlighted finding, sage for the reference.
- **Paper panels:** earth falls below the 3:1 graphics minimum on paper, so figures sit on ivory, or earth bars get a 1 px forest outline.
- **Direct labels:** every chart value carries one, so colour never stands alone.

### 6.3 Typography

- **Display:** Newsreader, weights 400/500, with optical size. Used for H1–H3, pull-quotes and chapter titles.
- **Body/UI:** Manrope, weights 400/500/600. Used for body text, nav, captions, data labels and buttons.
- **Fluid scale** (`clamp()`):

  | Style                  | Size                            |
  | ---------------------- | ------------------------------- |
  | Display XL (hero only) | 44 → 88 px                      |
  | H1                     | 36 → 64                         |
  | H2                     | 28 → 44                         |
  | H3                     | 21 → 28                         |
  | Body                   | 17 → 19                         |
  | Small                  | 15                              |
  | Caption/label          | 13, uppercase, +0.08em tracking |

- **Measure:** 62–72 ch for reading text; line-height 1.6 (body), 1.1 (display).
- **Loading:** fonts are self-hosted and subset to Latin, with `display: swap`. Only the display face is preloaded.

### 6.4 Layout

- **Breakpoints:**
  - ≥ 1024 px: 12-column grid, max width 1320 px, 24 px gutters, generous outer margins.
  - 640–1023 px: 6 columns.
  - < 640 px: 4 columns with a **16 px side gutter**; no horizontal scroll.
- **Asymmetry is deliberate:** text in columns 2–7, figures bleeding to columns 8–12, captions hanging in the margin column on desktop.
- **Spacing:** an 8 px base scale, with sections separated by 96–160 px on desktop and 64–96 px on mobile.
- **Images:** square or 2 px radius, no shadows. Full-bleed hero, then framed figures with a caption below and a figure number on the left.

### 6.5 Signature elements

- **Contour field:** seeded topographic SVG paths at 1 px, sage at 35–60 % opacity. They are reused (re-cropped, recoloured) across the hero, chapter transitions and the final scene.
- **Chapter marker:** `01 / The Landscape`, in caption type with a thin rule.
- **Field-note annotation:** a hairline leader line from a photo detail to a short handwritten-feel caption, still set in Manrope italic (no script fonts).
- **Research record box:** a paper-coloured panel with a definition list (type, dates, location, role, status, sources).

### 6.6 Components (`src/components/`)

- **`navigation/`:** `Header`, `MobileMenu` (focus-trapped dialog), `ChapterProgress`.
- **`motion/`:** `Reveal`, `SceneTransition`, `ParallaxLayer`, `MotionPreference`.
- **`research/`:** `ResearchCard`, `ResearchFilters`, `ResearchRecord`, `Figure`, `BarChart`, `CitationList`, `ThemeMap`.
- **`fieldwork/`:** `ExperienceTimeline`, `FieldNote`.
- **`journal/`:** `PostCard`, `PostBody` (StructuredText), `PostMeta`.
- **`layout/`:** `PageShell`, `Footer`, `Section`, `ChapterHeading`.
- **`media/`:** `DatoImage`, `Contours`.

---

## 7. Motion system

### 7.1 Tokens

| Token           | Value                                                   | Use                                                                      |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| `--dur-micro`   | 180 ms                                                  | Links, buttons, focus, hover                                             |
| `--dur-reveal`  | 520 ms                                                  | Captions, headings, short text groups                                    |
| `--dur-scene`   | 850 ms                                                  | Image layers and chapter transitions (driven by scroll, never by timers) |
| `--stagger`     | 70 ms                                                   | Sequential items (max 5 per group)                                       |
| `--ease-out`    | `cubic-bezier(0.22, 1, 0.36, 1)`                        | Reveals                                                                  |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`                        | Scene transitions                                                        |
| Reveal distance | 12–16 px translate + opacity                            | Never larger; no scale or blur on text                                   |
| Parallax cap    | ≤ 40 px over a full viewport (desktop); **0 on mobile** | Hero and Chapter 03 photos only                                          |

These values are tuned against real content and checked on a mid-range Android phone.

### 7.2 Choreography

|     | Scene                                                       | Behaviour                                                                                                                                                                                       | Implementation                                                                                                                      |
| --- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| A   | **Landscape → map** (Ch. 01 → 02)                           | The hero photo appears first, then the title rises, then contour lines draw over the image. On scroll the photo fades and desaturates while the contours remain and resolve into the theme map. | Contour `stroke-dashoffset` and photo opacity bound to `animation-timeline: view()`, with an rAF-throttled scroll-progress fallback |
| B   | **Field notes emerge** (Ch. 03)                             | Each experience reveals photo → leader line → note → meta in sequence.                                                                                                                          | IntersectionObserver adds `.is-visible`; CSS handles the rest                                                                       |
| C   | **Evidence comes into focus** (Ch. 04, research pages)      | Bars grow from the baseline as the figure enters view, and the key finding bar shifts to earth. Labels, values, n and source are present from the first frame.                                  | SVG `transform: scaleX()` on bars only                                                                                              |
| D   | **Research becomes a chapter** (card → `/research/[slug]/`) | The card image and title morph into the case-study header.                                                                                                                                      | View Transitions API where supported. The link is an ordinary `<a>`, so history, back, refresh and deep links behave normally.      |
| E   | **The next question** (Ch. 05)                              | The contours from Ch. 01 converge into a final composition, and the motion slows as the contact details appear.                                                                                 | Same contour SVG, scroll-bound                                                                                                      |

### 7.3 Rules

- Native scrolling only: no wheel or touch hijacking, no scroll snapping, no locked scenes.
- `position: sticky` only in two places: the Chapter 02 theme map and the case-study progress rail.
- Animate only `transform`, `opacity` and SVG stroke properties, so there's no repeated layout.
- No work in raw scroll handlers: use CSS timelines, else rAF-throttled reads, with cleanup on unmount.
- **Progressive enhancement:** content is visible by default. The hidden pre-reveal state applies only when JS has set `html.motion-ok`, which requires JS and no `prefers-reduced-motion`. No-JS and reduced-motion users get the finished, static composition.
- **Reduced motion:** no parallax, scene transitions or chart growth. Contours are shown fully drawn. Only colour and opacity changes ≤ 150 ms remain.
- Nothing essential depends on an animation finishing: headings, citations, links, results and the CV button.
- **Header:** fixed height (no layout shift). After 24 px of scroll it turns quieter: an ivory background, a hairline rule, and a 90 % wordmark.
- **`ChapterProgress`:** a slim progress line on every viewport, using a CSS scroll timeline with an rAF fallback. The numbered chapter rail appears only from 1600 px, the first width where the page margin keeps it clear of the text.

---

## 8. Homepage: five chapters (copy in code)

1. **The Landscape (≈100svh)**
   - Field photograph with a focal-point crop for mobile.
   - Display line, from the spec: "Understanding agriculture. Investigating change. Supporting resilient communities."
   - Intro, built from CV "About me": agricultural science graduate (IAAS, Tribhuvan University, 2024), with farmer engagement and field research on climate adaptation, pesticides and pollinators, and farmers' perceptions of agricultural change.
   - Actions: **Explore research** (primary), **View academic CV**.
2. **The Questions**
   - The five themes from §5.5 as a keyboard-navigable map, each item a real `<button>`/`<a>`.
   - Selecting a theme highlights the connected studies and experiences and links to `/research/?theme=…`.
   - Mobile: a vertical list with expandable groups.
3. **The Field**
   - GeoKrishi (100 farmers, 2 municipalities), RS-Agro Farm (3.35 ha irrigation), Lamahi Youth Network (40 volunteers, 12 schools), PRA Gabar.
   - Shown as photo + field note + meta.
   - Responsibilities are stated as written, with no impact claims beyond the CV.
4. **The Evidence**
   - Four featured studies: Gauradaha (chart: 36 / 89 / 54 %, n = 100), Ratnanagar rainfall, aromatic rice thesis, Jujube (chart).
   - Each shows question, place, method (if known), headline finding, and the research type label.
5. **The Next Question**
   - Research directions from the CV interests: pollinators, pesticide governance, farmers' perceptions and agricultural change, community resilience.
   - No claim of a target institution.
   - Actions: **Discuss research opportunities** (primary, to contact), **View academic CV**.

The Journal appears as a quiet strip (3 featured posts from DatoCMS) between Chapters 04 and 05.

---

## 9. SEO

- Metadata API on every route:
  - title template `%s · Riju Kattel`
  - unique description
  - canonical `https://rijukattel.com.np/…/`
  - Open Graph and Twitter tags; OG image from DatoCMS imgix at 1200×630
- Post title and description:
  - The title is always the post title.
  - The description uses the DatoCMS SEO description, unless it is the placeholder "I write what I learn"; then the first ~155 characters of the body.
- JSON-LD:
  - `Person`, with `alumniOf` IAAS / Tribhuvan University and `sameAs` LinkedIn/Facebook, on home and about.
  - `WebSite`.
  - `BlogPosting` + `BreadcrumbList` on posts.
  - `ScholarlyArticle` **only** for records with verified publication metadata (none yet).
- `sitemap.xml` (`lastmod` from DatoCMS `_updatedAt` and the content files), correct `robots.txt`, RSS for the Journal.
- Exactly one `<h1>` per page, semantic landmarks, and alt text for every meaningful image.

## 10. Accessibility, mobile, performance

- **WCAG 2.2 AA.**
  - Visible focus: a 2 px forest ring with a 2 px ivory offset.
  - Skip link.
  - Focus-managed mobile menu.
  - Accessible names on icon controls.
  - Charts include a `<figcaption>`, a text summary, and a visually-hidden data table.
- **Mobile is first-class:**
  - Cropped hero with readable title and the CV action above the fold.
  - Tap-accessible controls; no hover-only states; no drag.
  - Charts reflow and keep readable labels.
- **Release targets** (validated, not assumed): Lighthouse performance ≥ 90 and accessibility ≥ 95; LCP ≤ 2.5 s; INP ≤ 200 ms; CLS ≤ 0.1.
- **Budgets:**
  - Homepage JS ≤ 120 KB gzipped; other routes ≤ 80 KB.
  - Hero image ≤ 180 KB at 1600 w (AVIF/WebP via imgix).
  - Reserved dimensions on every image; below-the-fold images lazy-loaded.
  - No WebGL.

---

## 11. Phases (each ends with a passing build and a review)

**Status:** Phases 0–4 committed (`248bbc0`, `a43544b`, `f5f01bf`, `cf5a907`, `2b9af60`); Phase 5 done on `redesign/next`.

- **Next:** Phase 6, QA and release.
  - Lighthouse, axe and Playwright, plus a mid-range phone test.
  - Watch the title morph in a visible window.
  - Netlify deploy preview, then switch production.
  - Resubmit the sitemap in Search Console.
- **Phase 5 notes:**
  - **Fieldwork:** the shared `ExperienceTimeline` and `FieldPhotos`, which the homepage Field chapter also uses now. Training and outreach come from the CV.
  - **About:** a first-person bio from the CV's "About me", plus one Journal detail (the starfruit saplings from Assam). No portrait: the only DatoCMS picture is a small casual photo, so Riju should supply one if wanted.
  - **CV:** follows the PDF's sections and order, minus the phone number and address. The beehive trial isn't on the PDF CV, so it isn't listed. "Print or save as PDF" uses print styles that hide the site chrome.
  - **Contact:** a plain HTML Netlify form with a honeypot that posts to `/thank-you/` (noindex). **Netlify form detection must be enabled** in the site settings for submissions to arrive.
  - **Gallery:** the 8 DatoCMS photos, with code-owned captions and alt text that describe only what is visible.
  - **404:** a real `404.html`, noindex.
- **Phase 4 notes:**
  - The archive has 11 records: 6 studies and 5 CV semester projects.
    - Full case studies exist only for jujube and the beehive trial, the two with source documents (their Journal posts).
    - The rest are brief records with a notice explaining why.
  - Research pages carry `BreadcrumbList` JSON-LD only. `ScholarlyArticle` waits for a verified publication record.
  - The title morph (`ViewTransition`, `share="morph"`) is wired on archive cards, homepage Evidence titles and case-study headings.
    - React starts the transition on client navigation, but browsers skip it on hidden pages, so the morph itself still needs checking in a visible window (Phase 6 QA).
    - Back navigation works and doesn't animate.
- **Done in Phase 3:** Chapter 05 now sits on paper with slow-drawing contours, so it no longer merges with the dark footer.

0. **Setup**
   - Branch `redesign/next` and the Next 16 scaffold.
   - Read-only DatoCMS token in `.env.local` and Netlify.
   - DatoCMS client, `netlify.toml` (Node 22), and scripts.
1. **Foundation**
   - Tokens, fonts, grid, `PageShell`, header + `ChapterProgress`, footer, focus styles.
   - `MotionPreference`, the contour generator, and content types.
   - Validated at desktop and mobile with no animation.
2. **Journal from DatoCMS**
   - `/blog/` and `/blog/[slug]/`, StructuredText, `DatoImage`.
   - Metadata, JSON-LD, sitemap, robots, RSS, and redirects.
3. **Homepage**: the five chapters, then motion A, B, C and E, then the reduced-motion pass.
4. **Research**
   - The archive and filters, the Brief/Full template, and the six studies.
   - SVG charts (Gauradaha, Jujube); transition D.
5. **Remaining pages**: Fieldwork, About, CV, Contact and Thank-you, Gallery, 404.
6. **QA and release**
   - Lighthouse, axe, Playwright, and a link check, plus a mid-range phone test.
   - Netlify deploy preview, then switch production.
   - Resubmit the sitemap in Search Console.

Production keeps building `main` until the deploy preview is approved. DNS is not touched.

## 12. Security and privacy

- The full-access DatoCMS key is used only to create the read-only token. It never goes into the site, the repo, or Netlify. **Rotate it** in DatoCMS after setup.
- The repo is public on GitHub, so the CV source PDF is **never** committed. The site is web-CV only (§13).
- The site never shows the phone number or street-level address.
- Site copy refers to "Riju Kattel" or "Riju" and avoids pronouns unless Riju states a preference.

## 13. Confirmations

### Answered (15 Oct 2026)

| #   | Question            | Decision                                                                                                                                                                                                        |
| --- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Public email        | **`rijukattel08@gmail.com`**, used on Contact, in the footer and in JSON-LD                                                                                                                                     |
| 2   | CV download         | **Web CV only.** `/cv/` shows the full CV as HTML, with no PDF and no phone or street address. A redacted PDF can be added later                                                                                |
| 3   | Jujube method       | **Online survey, n = 35, aged 21–25.** The site title becomes "Consumer Preferences and Awareness of Indian Jujube (Baer)", without "in Chitwan Market"                                                         |
| 4a  | Rainfall study date | **Show "2025" only**                                                                                                                                                                                            |
| 4b  | "40 % crop losses"  | **Unconfirmed.** Neutral wording: "labour scarcity was identified as the primary cause of crop losses (reported as 40 %) during unseasonal rainfall", with a note that the measure is being confirmed. No chart |
| 5   | Gauradaha role      | **Independent study**                                                                                                                                                                                           |
| 8   | Subsidy             | **~US$7,460**, as in the CV                                                                                                                                                                                     |
| 9   | Awards              | **Two awards:** Eco-Minions essay (2022), SOMES article in the literacy category (2023)                                                                                                                         |

### Still open (doesn't block the build; defaults in brackets)

- **Jujube raw counts** [the chart shows the percentages as reported, with "n = 35; percentages as reported" in the caption].
- **Rainfall study:** sample size and method [Brief page: question, place, year, findings only].
- **Gauradaha:** instrument and analysis; does a report exist? [Brief page + chart of 36 / 89 / 54 %, n = 100 households].
- **Thesis:** year, site and season, number of genotypes, supervisor, results, figures [Brief page: title, B.Sc. thesis at IAAS/TU, the techniques used (agro-morphological traits, PCA, cluster analysis); no thesis year shown].
- **Hybrid rice GA3:** lead researcher/authors, dates, status [role only; status "collaboration, being prepared for publication" per the CV].
- **Academic profiles** [LinkedIn + Facebook only].

### Homepage copy for Riju to review (written from the CV; interpretive wording)

The facts all come from the CV or the Journal posts. The framing below is my wording; Riju should confirm or rewrite it in `src/content/home.ts`:

- **Hero lede:** "…hands-on experience working with farmers and in field research in Nepal. Research interests: climate adaptation, pollinators and pesticide governance, and how farmers respond to change."
- **Theme summaries in Chapter 02:** one sentence per theme, for example "Safer pest control, the health of pollinators, and who carries the risks of pesticide use."
- **Chapter 05:**
  - The intro says "through graduate study or research collaboration". Confirm the intent.
  - The three direction sentences.
- **Photo captions:** these describe only what is visible ("A farmers' day gathering", "A session in a school hall", "Pineapple harvest"). Riju can add where and when if wanted.

### Content clean-up in DatoCMS (optional; the site already works around each)

- **Post SEO fields:** every post's title is "Blog" or "Research" and its description "I write what I learn". The site ignores these: the title is the post title, and the description comes from the post body. A real SEO description entered in DatoCMS is used automatically.
- **Image alt text:** most uploads have one-word alt text ("ant", "data", "jujube"). Better descriptions in the DatoCMS media library show up on the next build.
- **Section titles:** six posts use bold paragraphs instead of headings. The site turns these into real `<h2>`s, but DatoCMS headings would be cleaner.
- **Jujube post:** "·" bullets and "1." numbering are typed into paragraphs. DatoCMS list formatting would render as real lists.
- **Default share image:** the DatoCMS default OG image is the old "Cultivating Knowledge" card. Replace it in DatoCMS, or make a new one in Phase 6.

## 14. Defaults (change any before Phase 0)

1. Static export on Netlify, with a DatoCMS build trigger.
2. I create the read-only token through the DatoCMS API, named "Next site (read-only)".
3. CSS Modules; Newsreader + Manrope.
4. The blog is labelled "Journal"; its URLs stay at `/blog/…`.
5. No DatoCMS schema changes in v1.
6. Studies with open items in §13 ship as **Brief** pages with only the CV-stated facts.
