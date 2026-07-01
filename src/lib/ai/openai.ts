import OpenAI from 'openai'
import { getOpenAIKey, getOpenAIModel } from '../env'
import type { FetchedPage } from '../websiteFetcher'
import { aiAnalysisReportSchema, outreachRegenerationSchema, type AIAnalysisReportParsed, type OutreachRegeneration } from './schema'
import { SYSTEM_PROMPT, buildAnalysisUserPrompt } from './prompt'

export async function generateAnalysis(params: {
  businessName: string
  industry: string
  location: string
  pages: FetchedPage[]
}): Promise<AIAnalysisReportParsed> {
  const apiKey = getOpenAIKey()
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured. Add it to your .env file to run website analysis.')
  }

  const client = new OpenAI({ apiKey })
  const model = getOpenAIModel()

  let raw: string | null
  try {
    const completion = await client.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildAnalysisUserPrompt(params) },
      ],
    })
    raw = completion.choices[0]?.message?.content ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown OpenAI error'
    throw new Error(`OpenAI request failed: ${message}`)
  }

  if (!raw) {
    throw new Error('OpenAI returned an empty response.')
  }

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    throw new Error('AI response was not valid JSON. Try analyzing this website again.')
  }

  const result = aiAnalysisReportSchema.safeParse(parsedJson)
  if (!result.success) {
    throw new Error(
      `AI response did not match the expected report structure: ${result.error.issues.map((i) => i.path.join('.')).join(', ')}`,
    )
  }

  return result.data
}

export async function regenerateOutreach(params: {
  businessName: string
  executiveSummary: string
  painPoints: string[]
  automationOpportunities: unknown
}): Promise<OutreachRegeneration> {
  const apiKey = getOpenAIKey()
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured. Add it to your .env file to regenerate outreach.')
  }

  const client = new OpenAI({ apiKey })
  const model = getOpenAIModel()

  let raw: string | null
  try {
    const completion = await client.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Using this existing analysis of ${params.businessName}, write a fresh variation of the cold email and LinkedIn message. Do not repeat the previous draft word-for-word — vary the angle or opening while staying grounded in these facts.

Executive summary: ${params.executiveSummary}
Pain points: ${JSON.stringify(params.painPoints)}
Automation opportunities: ${JSON.stringify(params.automationOpportunities)}

Return ONLY a JSON object: { "coldEmailDraft": "Subject: ...\\n\\n...", "linkedinMessage": "..." }`,
        },
      ],
    })
    raw = completion.choices[0]?.message?.content ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown OpenAI error'
    throw new Error(`OpenAI request failed: ${message}`)
  }

  if (!raw) throw new Error('OpenAI returned an empty response.')

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    throw new Error('AI response was not valid JSON. Try regenerating again.')
  }

  const result = outreachRegenerationSchema.safeParse(parsedJson)
  if (!result.success) {
    throw new Error('AI response did not match the expected outreach structure.')
  }

  return result.data
}
