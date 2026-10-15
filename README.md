# Riju Kattel — research portfolio

Source for [rijukattel.com.np](https://rijukattel.com.np): a static Next.js site.
Page copy, research and design live in this repo; DatoCMS supplies the Journal
(blog posts), photos and site settings.

The plan, content inventory, design system and motion system are in
[docs/PLAN.md](docs/PLAN.md).

## Develop

```bash
cp .env.example .env.local   # add the read-only DatoCMS token
npm install
npm run dev
```

`npm run build` writes the static site to `out/`. Netlify builds it on push and
whenever a post is published in DatoCMS (build trigger).

| Script              | What it does            |
| ------------------- | ----------------------- |
| `npm run dev`       | Local dev server        |
| `npm run build`     | Static export to `out/` |
| `npm run start`     | Serve `out/` locally    |
| `npm run lint`      | ESLint                  |
| `npm run typecheck` | TypeScript, no emit     |
| `npm run format`    | Prettier                |

Only a **read-only** Content Delivery API token belongs in `.env.local` or
Netlify. Never use a full-access token here.
