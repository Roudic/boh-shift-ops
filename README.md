# BOH Shift Ops

Chick-fil-A Vestavia Hills BOH scheduling + shift setup app.

**iPhone & iPad app** — native iOS shell via [Capacitor](https://capacitorjs.com/) (see [iOS build](#ios-app-iphone--ipad) below).

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

1. Run [`supabase-schema.sql`](./supabase-schema.sql) in Supabase SQL Editor  
2. Copy Project URL + anon key (Settings → API)  
3. Live app → **Local only** badge → paste → Save · Test · Push  

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

## iOS app (iPhone & iPad)

The same web app runs inside a native iOS shell. Layout adapts for **phone** (bottom tab bar, action sheet) and **tablet** (split layouts, sticky pool).

### Requirements

- Mac with **Xcode 15+**
- **Node.js 18+**
- **CocoaPods** (`sudo gem install cocoapods`)

### Build & run on device / simulator

```bash
npm install
npm run cap:sync          # copy index.html → www/ and sync to ios/
cd ios/App && pod install && cd ../..
npx cap open ios          # opens Xcode
```

In Xcode: select a simulator or your iPhone/iPad → **Run** (▶).

### After web changes

```bash
npm run cap:sync
```

Then rebuild in Xcode. The live GitHub Pages site (`index.html` at repo root) and the iOS app share the same source file.

### App id

Bundle id: `com.vestavia.bohshiftops` — change in `capacitor.config.json` before App Store submission if needed.

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
