# BIX Scout

Internal AI prospecting tool for BIX. Find service-based businesses, analyze their
websites, generate an AI consulting report and opportunity score, draft outreach, and
track leads through a simple pipeline.

## Stack

Next.js (App Router) · TypeScript · Prisma · Postgres (Neon) · Tailwind · OpenAI · Google Places API

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in real values:

   ```
   DATABASE_URL=            # Neon connection string (Dashboard -> Connection Details -> Prisma tab)
   GOOGLE_PLACES_API_KEY=   # Google Cloud project with Places API enabled
   OPENAI_API_KEY=          # OpenAI key used for website analysis
   OPENAI_MODEL=gpt-4o      # optional, defaults to gpt-4o
   FIRECRAWL_API_KEY=       # optional — falls back to a basic built-in fetcher if unset
   ```

3. Run the database migration:

   ```
   npx prisma migrate dev
   ```

4. Start the dev server:

   ```
   npm run dev
   ```

## What works without every key set

The app is designed to degrade cleanly rather than crash:

- No `DATABASE_URL` reachable → pages show a "Try again" error card instead of a stack trace.
- No `GOOGLE_PLACES_API_KEY` → Find Leads shows a clear inline error when you search.
- No `OPENAI_API_KEY` → Analyze Website fails cleanly with an explanatory message and logs
  it to the prospect's activity timeline; you can retry once the key is added.
- No `FIRECRAWL_API_KEY` → website analysis automatically falls back to a basic built-in
  fetcher instead of Firecrawl.

Dashboard's "System Status" widget reflects which of these are actually configured.

## Core flow

1. `/find-leads` — search industry + location, save selected (or all) results as prospects.
2. `/pipeline` — see all prospects grouped by status; change status from a dropdown on
   each card.
3. `/prospect/[id]` — open a prospect, click "Analyze Website" to generate the full AI
   report (executive summary, opportunity score, automation opportunities, recommended
   BIX solutions, cold email, LinkedIn message, talking points). Regenerate outreach
   independently once analyzed. Add internal notes; every action logs to the activity
   timeline.
4. `/` — dashboard cockpit: today's queue (AI-prioritized), KPIs, live AI activity feed,
   needs attention / high opportunity widgets, all backed by real data.
