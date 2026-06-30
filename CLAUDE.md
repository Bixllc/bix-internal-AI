# CLAUDE.md

## Project Context

This app is an internal BIX tool called AI Prospecting MVP.

BIX helps service-based businesses with websites, booking systems, client portals, workflow automation, AI automation, and custom software.

The purpose of this tool is to help BIX find qualified leads, analyze their websites, identify automation opportunities, and draft personalized outreach for a free business automation audit.

This is not a public SaaS yet. Build for internal use first.

## Product Goal

The user should be able to:

1. Search for businesses by industry and location.
2. Save those businesses as prospects.
3. Analyze each prospect's website.
4. Generate an AI automation opportunity report.
5. Draft a personalized cold email.
6. Track lead status.

## MVP Principle

Keep it simple.

Do not overbuild:

* Authentication
* Billing
* Team roles
* Complex CRM features
* Multi-tenant architecture
* Advanced email sending

Manual approval is preferred. The app should help the user work faster, not fully automate outreach yet.

## Ideal User Flow

1. User opens `/prospecting`.
2. User clicks "Find Leads."
3. User enters:

   * industry
   * location
   * max results
4. App fetches businesses from Google Places API.
5. App saves prospects.
6. User opens a prospect.
7. User clicks "Analyze Website."
8. AI returns:

   * business summary
   * services
   * detected tools
   * likely manual workflows
   * pain points
   * automation opportunities
   * opportunity score
   * recommended BIX solution
   * outreach email draft
9. User updates status as they contact leads.

## BIX Services to Map Recommendations To

Use these service categories:

* Website Redesign
* BIX Booking
* BIX Client Portal
* Workflow Automation
* AI Automation
* Custom Software

When AI identifies a pain point, map it to one or more BIX services.

Example:
If a med spa has generic contact forms and no online booking flow, recommend BIX Booking and Workflow Automation.

If a property manager has maintenance requests and tenant communication issues, recommend BIX Client Portal and Workflow Automation.

## Main Niches

Prioritize language and examples around:

* Med spas
* Specialty medical practices
* Property management companies
* Accounting firms
* Insurance agencies
* Service-based businesses

## Code Style

Use:

* TypeScript
* Clean component structure
* Prisma for database access
* Server actions or API routes where appropriate
* Tailwind for styling
* Clear loading/error states
* Reusable components where useful

Avoid:

* Unnecessary abstractions
* Premature SaaS architecture
* Hardcoded fake data unless clearly marked
* Large complex refactors without need

## AI Analysis Prompt Requirements

When analyzing a prospect, the AI should return structured JSON with:

* summary
* services
* detectedTools
* customerJourney
* likelyManualWorkflows
* painPoints
* automationIdeas
* opportunityScore
* recommendedBixSolution
* coldEmailDraft

The cold email should be short, personalized, and focused on offering a free automation audit.

## Cold Email Style

Emails should be:

* concise
* natural
* not spammy
* specific to the business
* focused on saving time or reducing manual work
* ending with a free automation audit CTA

Avoid:

* buzzwords
* overpromising
* saying "AI" too much
* generic agency language

## Important

This tool should help BIX get more business now.

Build the fastest usable version first.

## Build Plan: AI Prospecting MVP

Goal:
Help BIX find service-based businesses, analyze their websites, identify automation opportunities, and draft personalized outreach emails for a free automation audit.

This is not a full SaaS yet. It is an internal lead generation tool.

### Core workflow

1. User enters industry, location, and number of leads.
2. App finds businesses.
3. App saves prospects.
4. User can analyze each website.
5. AI summarizes the business.
6. AI identifies likely manual workflows.
7. AI suggests automation opportunities.
8. AI drafts a cold email inviting them to a free automation audit.
9. User manages leads in a dashboard.

### Stack

* Next.js
* TypeScript
* Prisma
* Neon/Postgres
* Tailwind
* OpenAI or Claude API
* Google Places API for lead discovery
* Firecrawl or basic website fetcher for website analysis

### Pages needed

* `/prospecting` dashboard
* `/prospecting/search` lead search form
* `/prospecting/[id]` individual prospect detail page

### MVP database model

Prospect:

* id
* businessName
* industry
* location
* website
* phone
* address
* source
* status
* summary
* services
* detectedTools
* painPoints
* automationIdeas
* opportunityScore
* recommendedBixSolution
* emailDraft
* notes
* createdAt
* updatedAt

Statuses:

* new
* analyzed
* email_drafted
* contacted
* replied
* audit_booked
* proposal_sent
* won
* lost

### Lead search

Create a form where I enter:

* industry
* location
* max results

Use Google Places API to return businesses and save them as prospects.

### Website analysis

On a prospect detail page, add an "Analyze Website" button.

When clicked:

* Fetch website content
* Analyze homepage/contact/booking/services pages when available
* Summarize what the business does
* Identify how customers likely book/contact them
* Detect signs of manual workflows
* Suggest 3–5 automation opportunities
* Score opportunity from 1–100
* Recommend which BIX service fits:

  * Website redesign
  * BIX Booking
  * BIX Client Portal
  * Workflow Automation
  * AI Automation
  * Custom Software
* Generate a personalized cold email with a free automation audit CTA

### UI direction

Make it feel like an AI workspace, not a boring CRM.
Each prospect should show:

* Business summary
* Automation score
* Pain points
* Recommended BIX solution
* Email draft
* Status
* Notes

Dashboard should show cards or table with:

* Business name
* Industry
* Location
* Website
* Opportunity score
* Status
* Last updated

Keep the MVP simple. Prioritize functionality over polish. Do not overbuild authentication, billing, multi-user roles, or SaaS features yet.
