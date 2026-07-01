// Single entrypoint for AI report generation. Currently backed by OpenAI;
// swapping providers means implementing the same `generateAnalysis` signature
// (see openai.ts) and re-exporting it here.
export { generateAnalysis, regenerateOutreach } from './openai'
