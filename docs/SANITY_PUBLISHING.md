# Sanity publishing → live website

This site loads content from Sanity at **build time** and caches fetches with the Next.js tag `sanity`. After Greg publishes in Studio, the live site must be told to refresh that cache (or run a full rebuild).

## How updates reach the live site

1. Greg edits and **publishes** in Sanity Studio (`/studio`).
2. Sanity sends a webhook to your deployed site.
3. The webhook route (`/api/sanity-webhook`) runs `revalidateTag('sanity')` so the next visitor gets fresh CMS data.
4. Optionally, the same webhook also hits a **Vercel Deploy Hook** for a full rebuild (slower, but guarantees everything—including new routes—is regenerated).

**Local dev:** Run `npm run dev` and refresh the browser after publishing. No webhook needed locally.

**Production without webhook:** Content only updates after the next Vercel deployment (git push or manual redeploy).

---

## Step 1 — Vercel Deploy Hook (optional, recommended for major changes)

1. Open [Vercel](https://vercel.com) → your project → **Settings** → **Git** → **Deploy Hooks**.
2. **Create Hook**
   - Name: `Sanity Publish`
   - Branch: `main` (or your production branch)
3. Copy the hook URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`).
4. In Vercel → **Settings** → **Environment Variables**, add for **Production** (and Preview if you want):

   ```bash
   VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
   ```

The webhook will POST to this URL after each publish. You can use **only** on-demand revalidation (faster) by skipping this variable.

---

## Step 2 — Webhook secret

Generate a random string (e.g. `openssl rand -hex 32`) and set it in Vercel:

```bash
SANITY_WEBHOOK_SECRET=your_random_secret_here
```

Use the **same** value when configuring the Sanity webhook (header or query param below).

---

## Step 3 — Sanity webhook

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → project **1cee5byk** → **API** → **Webhooks** → **Create webhook**.
2. Settings:
   - **Name:** `Trigger site refresh`
   - **URL:** `https://YOUR_PRODUCTION_DOMAIN/api/sanity-webhook`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** (leave empty, or limit to document types if you prefer)
   - **HTTP method:** POST
   - **Headers:** add  
     `x-sanity-webhook-secret` = same value as `SANITY_WEBHOOK_SECRET`
   - Alternatively append to the URL:  
     `https://YOUR_DOMAIN/api/sanity-webhook?secret=YOUR_SECRET`
3. Save and use **Test webhook**; you should get `{ "ok": true, "revalidated": true }`.

---

## Step 4 — Environment variables (summary)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | `1cee5byk` |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | e.g. `2026-05-22` |
| `SANITY_WEBHOOK_SECRET` | Recommended | Secures `/api/sanity-webhook` |
| `VERCEL_DEPLOY_HOOK_URL` | Optional | Full Vercel rebuild on publish |
| `SANITY_API_WRITE_TOKEN` | Local seed only | `npm run seed:sanity` |

---

## Media paths in Studio

Fallback media fields accept:

- `https://…` / `http://…`
- `/assets/images/…` and `/assets/videos/…` (local files in `public/assets`)

Uploading images or video **files** in Studio uses Sanity CDN URLs automatically; local paths remain valid for migration.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Studio shows URL errors on `/assets/...` | Restart dev server; hard-refresh Studio. Schema uses `string` + custom rules, not `url`. |
| Publish works but live site unchanged | Confirm webhook URL, secret, and Vercel env vars; check Vercel function logs for `/api/sanity-webhook`. |
| New case study slug 404 | Add document in Sanity, then run deploy hook or redeploy so `generateStaticParams` picks up the new slug. |
