# Content model (DatoCMS)

Since 16 Oct 2026 all editorial content comes from DatoCMS.

**What stays in code:**

- Interface labels: buttons, form labels, filter names, section headings such as "The question".
- Design and motion.
- The chapter names "01 / The Landscape" … "05 / The Next Question".

**How content reaches the site:**

- The site is a static export.
- Every build reads DatoCMS once with the read-only token, through `src/lib/datocms/content.ts`.
- A publish in DatoCMS triggers a rebuild; see `docs/DEPLOY.md`.

**Editing conventions:**

- **List fields:** fields marked "One per line" are lists. Each line becomes one item (a method, a finding, a CV point, a paragraph).
- **Photos:** alt text describes what is visible. The photo title is shown as the caption.
- **Private details:** never add the phone number or a street address anywhere.

## Models used by the new site

| Model                                           | Kind                                                                                                                    | Drives                                                                                                                                                                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home page**                                   | singleton                                                                                                               | Meta title and description; hero title, intro and image; Chapter 02–05 titles and intros; field photos; Journal strip title; research directions (blocks)                                                       |
| **Site page**                                   | one record per page (`research`, `journal`, `fieldwork`, `about`, `cv`, `contact`, `gallery`, `thank-you`, `not-found`) | Label, title, intro and meta description of each page. Page-specific fields are listed in the next table.                                                                                                       |
| **Profile**                                     | singleton                                                                                                               | Name, location (town only), statement, public email, LinkedIn, education, thesis (link to a Research entry), thesis techniques, research interests, About bio. Also used by the header, footer, CV and JSON-LD. |
| **Research entry**                              | sortable collection                                                                                                     | Archive and case-study pages, homepage Evidence (`featured`), CV research list (`cv_position`), semester projects (`listed_in_cv`)                                                                              |
| **Research theme**                              | sortable collection                                                                                                     | Chapter 02 map (title, summary, map X/Y), archive theme filter, linked work (Theme link blocks)                                                                                                                 |
| **Experience entry**                            | sortable collection                                                                                                     | Field timeline (home and Fieldwork), CV Work (`work`) and Leadership (`leadership`) sections                                                                                                                    |
| **CV entry**                                    | sortable collection                                                                                                     | CV and About sections by `section`: training, outreach, academic presentation, course, skill, language, award                                                                                                   |
| **Blog post**, **Author**, **Website settings** | existing                                                                                                                | The Journal and the site config (name, URL, default share image, Facebook)                                                                                                                                      |

### Page-specific Site page fields

| Page      | Intro          | Note                          | Options     | Photos             |
| --------- | -------------- | ----------------------------- | ----------- | ------------------ |
| research  | —              | Notice shown on brief records | —           | —                  |
| fieldwork | Outreach intro | Text above the gallery link   | —           | Field photos       |
| cv        | —              | "Based on the CV of…" line    | —           | —                  |
| contact   | —              | Line under the form           | Form topics | —                  |
| gallery   | —              | —                             | —           | All gallery photos |

### Research entry rules

- **Depth:** set `depth = full` only when a source document backs every section. Otherwise use `brief`; the page then shows the brief-record notice.
- **Source-only fields:** `question`, `context`, `role` and `findings` must come from a source (the CV, a Journal post or a paper). Leave them empty rather than guess.
- **Status:** never say "published" without a publication record.
- **Charts:** chart rows use the values exactly as reported, with units and sample in the caption. Tick "Key finding" on one row at most.

## Legacy models (Gatsby site)

The models `homepage`, `other_page`, `menu`, `footer`, `archive_page`, `project_archive`, `projects_done`, `not_found_page` and their blocks still feed the live Gatsby site. The new site doesn't read them. Delete them only after the new site is live.
