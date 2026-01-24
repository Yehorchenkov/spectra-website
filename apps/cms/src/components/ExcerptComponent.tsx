'use client'

import React, { useCallback } from 'react'
import type { TextareaFieldClientProps } from 'payload'
import { useField, useFormFields, FieldLabel } from '@payloadcms/ui'
import { generateExcerpt, type ExcerptInput} from '@/utils/generateExcerpt' // Adjust path if needed

export const ExcerptComponent = (props: TextareaFieldClientProps) => {
  const { field, path, readOnly } = props
  const { label, localized, required } = field
  
  // You can adjust these or pass them via field admin.custom props
  const maxLength = 500 
  const minLength = 400

  const { value, setValue, showError, errorMessage } = useField<string>({ path })

  // Watch the 'content' field for changes
  const content = useFormFields(([fields]) => fields.content?.value)

  const handleGenerate = useCallback(() => {
    if (!content) {
      alert('Please add content to the main Content field first.')
      return
    }

    if (typeof content !== 'string' && typeof content !== 'object') {
      alert('Unsupported content format.')
      return
    }

    // Use your custom function
    const generated = generateExcerpt(content as ExcerptInput, maxLength)
    
    setValue(generated)
  }, [content, setValue, maxLength])

  return (
    <div className="field-type textarea" style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FieldLabel
          label={label}
          localized={localized}
          path={path}
          required={required}
        />
        
        <button
          onClick={handleGenerate}
          type="button"
          disabled={readOnly}
          style={{
            background: 'none',
            border: 'none',
            cursor: readOnly ? 'not-allowed' : 'pointer',
            textDecoration: 'underline',
            color: 'var(--theme-elevation-400)',
            fontSize: '13px',
            padding: 0,
          }}
        >
          Auto-generate
        </button>
      </div>

      <div style={{ color: '#9A9A9A', fontSize: '13px', marginBottom: '10px' }}>
        {`This should be between ${minLength} and ${maxLength} characters.`}
      </div>

      <div style={{ position: 'relative' }}>
        <textarea
          id={path}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          disabled={readOnly}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--theme-bg)',
            color: 'var(--theme-text)',
            border: showError 
              ? '1px solid var(--theme-error-500)' 
              : '1px solid var(--theme-elevation-200)',
            borderRadius: '4px',
            fontFamily: 'inherit',
            fontSize: '14px',
            resize: 'vertical',
          }}
        />
        {showError && (
          <div style={{ color: 'var(--theme-error-500)', fontSize: '12px', marginTop: '5px' }}>
            {errorMessage || 'This field is required'}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '12px', color: '#9A9A9A', marginTop: '5px' }}>
        {value?.length || 0} / {maxLength} chars
      </div>
    </div>
  )
}