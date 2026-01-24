import { smartTruncate } from '@/utils/text'
import { SITE_NAME, SITE_TITLE_SEP, SITE_TITLE_MAX } from './constants'

export function buildTitle(pageTitle: string): string {
  if (!pageTitle || pageTitle.toLowerCase() === 'home') return SITE_NAME

  if (pageTitle.includes(SITE_NAME)) return smartTruncate(pageTitle, SITE_TITLE_MAX)

  const suffix = `${SITE_TITLE_SEP}${SITE_NAME}`
  const full = `${pageTitle}${suffix}`

  if (full.length <= SITE_TITLE_MAX) return full

  const allowedForTitle = SITE_TITLE_MAX - suffix.length
  const trimmed = smartTruncate(pageTitle, Math.max(allowedForTitle, 20))

  return `${trimmed}${suffix}`
}


