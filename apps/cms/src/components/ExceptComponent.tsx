'use client'

import React, { useCallback } from 'react'
import { useField, useFormFields, Label } from '@payloadcms/ui'
import './styles.css' // Optional: if you want to extract styles

// Helper to extract plain text from RichText (Lexical or Slate)
const extractTextFromRichText = (node: any): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.text) return node.text
  
  // Handle Lexical (root.children) or Slate (children)
  const children = node.root?.children || node.children
  
  if (Array.isArray(children)) {
    return children.map(extractTextFromRichText).join(' ')
  }
  
  return ''
}

export const ExcerptComponent: React.FC = () => {
  const path = 'excerpt'
  const label = 'Excerpt'
  const minLength = 50
  const maxLength = 300 // Recommended length for SEO excerpts

  // 1. Get the Excerpt field
  const { value, setValue, showError } = useField<string>({ path })

  // 2. Get the Content field to generate from
  // We useFormFields to get the current value of the 'content' field from the form state
  const content = useFormFields(([fields]) => fields.content?.value)

  // 3. Logic to generate the excerpt
  const regenerateExcerpt = useCallback(() => {
    if (!content) {
      alert('Please add content before generating an excerpt.')
      return
    }

    const plainText = extractTextFromRichText(content)
    
    // Trim to maxLength and add ellipsis if needed
    let generatedExcerpt = plainText.substring(0, maxLength)
    if (plainText.length > maxLength) {
      generatedExcerpt = generatedExcerpt.substring(0, generatedExcerpt.lastIndexOf(' ')) + '...'
    }

    setValue(generatedExcerpt)
  }, [content, setValue, maxLength])

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Top Label Row */}
      <div style={{ marginBottom: '5px', position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Label htmlFor={path} />
        
        {/* The Auto-generate Button (Styled like MetaTitle.tsx) */}
        <button
          onClick={regenerateExcerpt}
          type="button"
          style={{
            padding: 0,
            background: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            textDecoration: 'underline',
            color: 'var(--theme-elevation-400)', // Adapts to theme
            fontSize: '13px',
          }}
        >
          Auto-generate
        </button>
      </div>

      {/* Description / Help Text */}
      <div style={{ color: '#9A9A9A', fontSize: '13px', marginBottom: '10px' }}>
        {`This should be between ${minLength} and ${maxLength} characters.`}
      </div>

      {/* The Textarea Input */}
      <div style={{ position: 'relative', marginBottom: '5px' }}>
        <textarea
          id={path}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--theme-bg)',
            color: 'var(--theme-text)',
            border: showError ? '1px solid var(--theme-error-500)' : '1px solid var(--theme-elevation-200)',
            borderRadius: '4px',
            fontFamily: 'inherit',
            fontSize: '16px',
            resize: 'vertical',
          }}
        />
        {showError && (
            <div style={{ color: 'var(--theme-error-500)', fontSize: '12px', marginTop: '5px' }}>
                This field is required
            </div>
        )}
      </div>

      {/* Length Indicator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '12px', color: '#9A9A9A' }}>
        {value?.length || 0} / {maxLength} chars
      </div>
    </div>
  )
}