export type SmartTruncateOptions = {
  ellipsis?: string
  normalizeWhitespace?: boolean
}

/** Trim + collapse whitespace (spaces/newlines/tabs) into single spaces */
export function normalizeWhitespace(str: string): string {
  return (str || '').trim().replace(/\s+/g, ' ')
}

/**
 * Truncate text at the last full word within maxLength (including ellipsis).
 */
export function smartTruncate(
  str: string,
  maxLength: number,
  options: SmartTruncateOptions = {},
): string {
  const { ellipsis = '...', normalizeWhitespace: doNormalize = true } = options

  const text = doNormalize ? normalizeWhitespace(str) : (str || '').trim()
  if (text.length <= maxLength) return text

  const maxContentLength = maxLength - ellipsis.length
  if (maxContentLength <= 0) return text.substring(0, maxLength)

  const truncated = text.substring(0, maxContentLength).trimEnd()
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  return (lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated) + ellipsis
}
