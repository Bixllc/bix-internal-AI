import type { ColdEmail } from '../types'

export function parseColdEmail(draft: string, businessName: string): ColdEmail {
  const match = draft.match(/^Subject:\s*(.+?)\n+([\s\S]*)$/i)
  if (match) {
    return { subject: match[1].trim(), body: match[2].trim() }
  }
  return { subject: `Quick idea for ${businessName}`, body: draft.trim() }
}
