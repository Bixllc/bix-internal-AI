import type { FetchedPage } from '../websiteFetcher'

const BIX_SERVICES = [
  'Website Redesign',
  'BIX Booking',
  'BIX Client Portal',
  'Workflow Automation',
  'AI Automation',
  'Custom Software',
]

export const SYSTEM_PROMPT = `You are a senior business consultant and sales strategist for BIX, an agency that helps service-based businesses (med spas, specialty medical practices, property managers, accounting firms, insurance agencies, and similar) with websites, booking systems, client portals, workflow automation, AI automation, and custom software.

You analyze a business's public website content and produce a structured opportunity report used internally by BIX's sales team to prep outreach and a free automation audit call. You are direct, specific to the business in front of you, and never generic or filled with buzzwords.

Score the opportunity from 1-100 based on:
- manual work detected (booking, intake, reminders, coordination)
- appointment or booking dependency
- form/intake workflows
- customer communication needs
- staff/vendor coordination
- recurring customers
- multiple locations
- operational complexity
- visible technology gaps
- likely ability to pay for a $3k-$16k project
- fit with BIX's services

Map every recommendation to one or more of these exact BIX service names: ${BIX_SERVICES.join(', ')}.

Cold email and LinkedIn message rules:
- short, specific to this business, natural tone
- not spammy, no overpromising
- focus on manual work / time saved, not "AI" as a buzzword (mention it at most once)
- end with a free automation audit call-to-action
- format coldEmailDraft as "Subject: <subject line>\\n\\n<email body>"

Respond with ONLY a single JSON object matching the exact schema you are given. No markdown, no commentary, no code fences.`

export function buildAnalysisUserPrompt(params: {
  businessName: string
  industry: string
  location: string
  pages: FetchedPage[]
}): string {
  const pagesBlock = params.pages
    .map((page) => `--- PAGE: ${page.url} ---\n${page.text}`)
    .join('\n\n')

  return `Business: ${params.businessName}
Industry: ${params.industry}
Location: ${params.location}

Website content collected from the business's own site:

${pagesBlock}

Return a single JSON object with exactly these keys:
{
  "executiveSummary": string (3-5 sentences, consultant tone),
  "services": string[],
  "targetCustomers": string[],
  "customerJourney": [{ "step": string, "description": string, "friction": string (optional, omit if none) }],
  "detectedSoftware": { "found": string[], "missing": string[] },
  "manualProcesses": string[],
  "painPoints": string[],
  "automationOpportunities": [{ "title": string, "description": string, "businessImpact": string, "estimatedHoursSavedPerMonth": string, "recommendedBixService": string }],
  "businessImpact": string[],
  "opportunityScore": number (1-100),
  "leadQuality": "Excellent" | "Good" | "Moderate" | "Low",
  "estimatedHoursSaved": string (e.g. "20-25 hrs/mo"),
  "estimatedProjectValue": string (e.g. "$8,000 - $14,000"),
  "estimatedMonthlyRevenue": string (recurring revenue BIX could expect, e.g. "$200 - $350/mo"),
  "recommendedBixSolution": string (single primary recommended service name),
  "recommendedBixSolutions": [{ "service": string, "whyItFits": string, "expectedImpact": string, "implementation": string, "estimatedPriceRange": string }],
  "coldEmailDraft": string ("Subject: ...\\n\\n..." format),
  "linkedinMessage": string,
  "salesTalkingPoints": string[]
}`
}
