import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  convertLexicalToPlaintext,
  type PlaintextConverters,
} from '@payloadcms/richtext-lexical/plaintext'

import { smartTruncate, normalizeWhitespace } from '@/utils/text'

export type ExcerptInput = SerializedEditorState | string | null | undefined

export type GenerateExcerptOptions = {
  skipHeadings?: boolean
  ellipsis?: string
}

function isSerializedEditorState(value: unknown): value is SerializedEditorState {
  return typeof value === 'object' && value !== null && 'root' in value
}

const skipHeadingConverters: PlaintextConverters<DefaultNodeTypes> = {
  heading: () => '',
}

export function generateExcerpt(
  content: ExcerptInput,
  maxLength: number = 150,
  options: GenerateExcerptOptions = {},
): string {
  if (!content) return ''

  const { skipHeadings = true, ellipsis = '...' } = options

  if (typeof content === 'string') {
    return smartTruncate(content, maxLength, { ellipsis })
  }

  if (isSerializedEditorState(content)) {
    const plaintextSkippingHeadings = convertLexicalToPlaintext({
      data: content,
      ...(skipHeadings ? { converters: skipHeadingConverters } : {}),
    })

    const plaintext =
      skipHeadings && !normalizeWhitespace(plaintextSkippingHeadings)
        ? convertLexicalToPlaintext({ data: content })
        : plaintextSkippingHeadings

    return smartTruncate(plaintext, maxLength, { ellipsis })
  }

  return ''
}
