# BOH Shift Ops

Chick-fil-A Vestavia Hills BOH scheduling + shift setup app.

## Share this (always handy)

**Team hub (bookmark & send):**  
### https://roudic.github.io/boh-shift-ops/guide/

| Link | URL |
|------|-----|
| Live app | https://roudic.github.io/boh-shift-ops/ |
| Share hub + photo demos | https://roudic.github.io/boh-shift-ops/guide/ |
| Full how-to README | [guide/HOW-TO.md](./guide/HOW-TO.md) |
| Short share card | [guide/SHARE.md](./guide/SHARE.md) |
| GitHub | https://github.com/Roudic/boh-shift-ops |
| Supabase SQL | [supabase-schema.sql](./supabase-schema.sql) |

## What’s included

- **Schedule** — Classic week grid + SmartView hour timelines  
- **Period blocks** — create / edit / delete your own  
- **Shift Setup** — custom positions, multi-period layout link, handovers  
- **Cloud** — Supabase sync (localStorage + DB)  
- **guide/** — photo demos + shareable link page  

## Cloud database (quick)

Cloud link is **per browser**. That is why one phone can show **Cloud** and another **Local only** until the second device is connected.

1. Run [`supabase-schema.sql`](./supabase-schema.sql) in Supabase SQL Editor  
2. Copy Project URL + anon key (Settings → API)  
3. Live app → cloud badge → paste → **Save connection**  
4. On that same device → **Copy link for other devices** → open the link on every other phone/PC  

Optional team-wide auto-connect: copy [`data/cloud-config.example.json`](./data/cloud-config.example.json) → `data/cloud-config.json`, paste the anon key, commit & deploy. New browsers then link on first load.

This project URL form: `https://oikrcoccaepgtvdswuuo.supabase.co`

## Local file

Open `index.html`, or:

```bash
npx --yes serve .
```

## Deploy updates

```bash
git add -A
git commit -m "Update BOH Shift Ops"
git push origin master
```

GitHub Pages serves from the `master` branch root.

## Seed / backup data

Latest browser export lives in [`data/boh-app-state.json`](./data/boh-app-state.json) (schedule, staff, setups).

### Push that file to Supabase (cloud)

```bash
# Windows PowerShell
$env:SUPABASE_URL="https://oikrcoccaepgtvdswuuo.supabase.co"
$env:SUPABASE_ANON_KEY="paste-anon-public-key-here"
node scripts/push-cloud.mjs
```

Or in the live app: open Cloud badge → **Push to DB** (uses the same store id `default`).
