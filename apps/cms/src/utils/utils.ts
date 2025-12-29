import { CollectionBeforeValidateHook, ValidationError } from 'payload'

export const requireMetaOnPublish: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (!data) return data

  // Only check this during create or update operations
  const status = (data as any)?._status
  const isPublishing = status === 'published'

  if (!isPublishing) return data

  const title = (data as any)?.meta?.title?.trim?.()
  const description = (data as any)?.meta?.description?.trim?.()

  const errors: { message: string; path: string }[] = []

  if (!title) {
    errors.push({
      message: 'SEO title is required to publish.',
      path: 'meta.title', // This links the error to the specific field
    })
  }

  if (!description) {
    errors.push({
      message: 'SEO description is required to publish.',
      path: 'meta.description',
    })
  }

  if (errors.length > 0) {
    // Throwing ValidationError makes the UI display the specific messages
    throw new ValidationError({
      errors,
    })
  }

  return data
}

/**
 * Validates that a value is a URL starting with http:// or https://
 * @param value The value to validate
 * @returns true if valid, otherwise an error message string
 */
export function validateUrl(value: unknown): true | string {
    if (!value) return true;
    const urlRegex = /^https?:\/\/.+/i;
    return urlRegex.test(value as string)
        ? true
        : 'Please enter a valid URL starting with http:// or https://';
}