// import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

/**
 * Generates an excerpt from Lexical RichText content using the built-in converter.
 * @param content The Lexical RichText content object (SerializedEditorState).
 * @param maxLength The maximum length of the excerpt (including ellipsis if truncated).
 * @returns The generated excerpt string.
 */
export function generateExcerpt(
  content: any,
  maxLength: number = 150,
): string {
  if (!content) {
    return ''
  }

  let textContent = '';

  if (typeof content === 'object' && content !== null && 'root' in content) {
    textContent = convertLexicalToPlaintext({ data: content })
  } else if (typeof content === 'string') {
    textContent = content
  }

  const trimmedText = textContent.trim().replace(/\s+/g, ' ') // Remove double spaces/newlines

  if (trimmedText.length <= maxLength) {
    return trimmedText
  }

  const ellipsis = '...'
  const maxContentLength = maxLength - ellipsis.length

  if (maxContentLength <= 0) {
    return trimmedText.substring(0, maxLength)
  }

  const truncated = trimmedText.substring(0, maxContentLength).trimEnd()
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + ellipsis
  } else {
    return truncated + ellipsis
  }
}
