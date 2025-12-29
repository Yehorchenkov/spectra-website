import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

/**
 * CONSTANTS
 */
const BRAND = process.env.SITE_NAME || 'SPECTRA CE EU'
const TITLE_SEP = process.env.SITE_TITLE_SEP || ' - '
const TITLE_MAX = Number(process.env.SITE_TITLE_MAX || 60)
const DESCRIPTION_MAX = Number(process.env.SITE_DESCRIPTION_MAX || 158)

function extractTextFromLexical(node: any): string {
  if (!node) return ''

  // 1. Skip all heading nodes (h1, h2, h3, etc.)
  if (node.type === 'heading') {
    return ''
  }

  // 2. If it's a text node, return its content
  if (node.type === 'text') {
    return node.text || ''
  }

  // 3. If it has children (like paragraphs, lists, or formatting blocks),
  // recurse through them, but skip the headings inside.
  if (node.children && Array.isArray(node.children)) {
    return node.children
      .map((child: any) => extractTextFromLexical(child))
      .filter(Boolean) // Remove empty strings from skipped headings
      .join(' ') // Join with space to prevent words from sticking together
  }

  return ''
}

/**
 * 1. CORE UTILITY: Truncates text at the last full word.
 */
export function smartTruncate(str: string, maxLength: number, ellipsis: string = '...'): string {
  const text = (str || '').trim().replace(/\s+/g, ' ')
  if (text.length <= maxLength) return text

  const maxContentLength = maxLength - ellipsis.length
  if (maxContentLength <= 0) return text.substring(0, maxLength)

  let truncated = text.substring(0, maxContentLength).trimEnd()
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    truncated = truncated.substring(0, lastSpaceIndex)
  }

  return `${truncated}${ellipsis}`
}

/**
 * 2. EXCERPT UTILITY: Converts Lexical JSON and generates description.
 */
export function generateExcerpt(content: any, maxLength: number = 158): string {
  if (!content) return ''

  let textContent = extractTextFromLexical(content.root)

  // FALLBACK: If skipping headers resulted in NO text (e.g. an article with only headings),
  // then use the standard converter so we at least have SOME description.
  if (!textContent.trim() && typeof content === 'object') {
    textContent = convertLexicalToPlaintext({ data: content })
  }

  return smartTruncate(textContent || '', maxLength)
}

/**
 * 3. TITLE UTILITY: Builds brand-consistent titles.
 */
export function buildTitle(pageTitle: string): string {
  const core = (pageTitle || '').trim().replace(/\s+/g, ' ')
  if (!core || core.toLowerCase() === 'home') return BRAND

  // Prevent double branding
  if (core.includes(BRAND)) return smartTruncate(core, TITLE_MAX)

  const suffix = `${TITLE_SEP}${BRAND}`
  const full = `${core}${suffix}`

  if (full.length <= TITLE_MAX) return full

  const allowedForTitle = TITLE_MAX - suffix.length
  const trimmed = smartTruncate(core, Math.max(allowedForTitle, 20))

  return `${trimmed}${suffix}`
}
