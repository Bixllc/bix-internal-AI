import { useEffect, useState } from 'react'

export const researchPhrases = [
  'Reading homepage…',
  'Analyzing booking experience…',
  'Detecting technology stack…',
  'Identifying manual workflows…',
  'Generating recommendations…',
  'Drafting outreach…',
]

export function useResearchPhrases(active: boolean, intervalMs = 900) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) {
      setIndex(0)
      return
    }
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % researchPhrases.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [active, intervalMs])

  return researchPhrases[index]
}
