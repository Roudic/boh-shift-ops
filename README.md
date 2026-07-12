# BOH Shift Ops

Chick-fil-A Vestavia Hills BOH scheduling + shift setup app.

- **Live (GitHub Pages):** https://roudic.github.io/boh-shift-ops/
- **Local data:** browser `localStorage`
- **Cloud DB (optional):** [Supabase](https://supabase.com) free project

## Cloud database setup (5 minutes)

1. Create a free project at https://supabase.com  
2. Open **SQL Editor** → New query  
3. Paste everything from [`supabase-schema.sql`](./supabase-schema.sql) → **Run**  
4. Open **Project Settings → API**  
5. Copy **Project URL** and **anon public** key  
6. Open the live app → click the **Local only / Cloud** badge  
7. Paste URL + key → **Save connection** → **Test** → **Push**

After that, saves auto-sync to the database so any browser can **Pull** the same schedule.

## Local file

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Deploy / update GitHub Pages

```bash
git add -A
git commit -m "Update BOH Shift Ops"
git push origin main
```

Pages is served from the `main` branch root (`index.html`).
