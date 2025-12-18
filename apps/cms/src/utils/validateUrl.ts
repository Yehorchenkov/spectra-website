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