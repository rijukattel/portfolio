# Content model (DatoCMS)

Since 16 Oct 2026 all editorial content, the site settings, the navigation and every visible interface label come from DatoCMS.

**What stays in code:**

- Design, layout and motion.
- Page routes. A navigation link can only point to a page the site already has.
- Names that only screen readers hear: the landmark names "Primary", "Site", "Site menu", "Chapters", "Posts", "Research archive" and "More from the Journal".
- The "Home" breadcrumb in the structured data, and the punctuation that joins labels to values (the ": " after "Thesis" and "Journal", the " · " separators).

**How content reaches the site:**

- The site is a static export.
- Every build reads DatoCMS once with the read-only token, through `src/lib/datocms/` (`content.ts` for content, `site.ts` for Site settings, `labels.ts` for Interface text).
- A publish in DatoCMS triggers a rebuild; see `docs/DEPLOY.md`.
- Every build starts by clearing Next's fetch cache (`prebuild` in `package.json`). Otherwise Next reuses DatoCMS responses saved by an earlier build, and a publish wouldn't show up.

**Editing conventions:**

- **List fields:** fields marked "One per line" are lists. Each line becomes one item (a method, a finding, a CV point, a paragraph).
- **Photos:** alt text describes what is visible. The photo title is shown as the caption.
- **Private details:** never add the phone number or a street address anywhere.

## Models used by the new site

| Model                     | Kind                                                                                                                    | Drives                                                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home page**             | singleton                                                                                                               | Meta title and description; hero title, intro and image; Chapter 02–05 titles and intros; field photos; Journal strip title; research directions (blocks)                                                       |
| **Site page**             | one record per page (`research`, `journal`, `fieldwork`, `about`, `cv`, `contact`, `gallery`, `thank-you`, `not-found`) | Label, title, intro and meta description of each page. Page-specific fields are listed in the next table.                                                                                                       |
| **Profile**               | singleton                                                                                                               | Name, location (town only), statement, public email, LinkedIn, education, thesis (link to a Research entry), thesis techniques, research interests, About bio. Also used by the header, footer, CV and JSON-LD. |
| **Research entry**        | sortable collection                                                                                                     | Archive and case-study pages, homepage Evidence (`featured`), CV research list (`cv_position`), semester projects (`listed_in_cv`)                                                                              |
| **Research theme**        | sortable collection                                                                                                     | Chapter 02 map (title, summary, map X/Y), archive theme filter, linked work (Theme link blocks)                                                                                                                 |
| **Experience entry**      | sortable collection                                                                                                     | Field timeline (home and Fieldwork), CV Work (`work`) and Leadership (`leadership`) sections                                                                                                                    |
| **CV entry**              | sortable collection                                                                                                     | CV and About sections by `section`: training, outreach, academic presentation, course, skill, language, award                                                                                                   |
| **Site settings**         | singleton                                                                                                               | Site name and short name, site URL (canonical origin for every URL, the sitemap and RSS), default share image, Facebook URL, and the **Menu** (Navigation link blocks)                                          |
| **Interface text**        | singleton                                                                                                               | Every visible interface label, in 11 groups: header and footer, homepage (including the five chapter names), research, research types, charts, Journal, Fieldwork, About, CV, contact form, thank-you and 404   |
| **Blog post**, **Author** | existing                                                                                                                | The Journal                                                                                                                                                                                                     |

### Navigation (Site settings → Menu)

- **Used by:** each Navigation link drives the header, the mobile menu, the footer "Explore" list, the About "Next" links and the 404 page. The About page leaves itself out.
- **Path:** a site path with a trailing slash, for example `/research/`. It must be a page that exists.
- **Show as button:** draws the link as the header's emphasised action (Contact today).
- **Keep visible on small screens:** keeps the link beside the Menu button below 1024 px (CV today).

### Interface text conventions

- **Wording only:** labels are shown as written, so write the case you want ("The question", not "THE QUESTION"). The design adds the small capitals.
- **Joined labels:** "Thesis prefix" and "Source: Journal" are followed by ": " and a title. "Reading time suffix" follows the number of minutes. "Figure prefix" is followed by the figure number.
- **Required fields:** every field is required. The build fails if the record is missing, rather than show a blank label.

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

The models `homepage`, `other_page`, `menu`, `footer`, `website_setting`, `archive_page`, `project_archive`, `projects_done`, `not_found_page` and their blocks still feed the live Gatsby site. The new site doesn't read them; **Site settings** replaces `website_setting`. Delete them only after the new site is live.
