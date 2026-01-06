/**
 * Formats a date to "3 January 2026" style
 */
export function formatDateLong(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Checks if two dates fall on the same calendar day
 */
export function isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return new Date(date1).toDateString() === new Date(date2).toDateString();
}

/**
 * @param {string|Date} start 
 * @param {string|Date} end 
 * @param {string} placeholder - What to show if end is missing (e.g., 'Unknown', 'Present')
 */
export function formatDateRange(start, end, placeholder = 'Unknown') {
    if (!start) return '';
    
    const startStr = formatDateLong(start);

    // If there is no finish date
    if (!end) {
        return `${startStr} - ${placeholder}`;
    }

    // If finish date exists but it's the same day as start
    if (isSameDay(start, end)) {
        return startStr;
    }

    // If finish date is a different day
    return `${startStr} - ${formatDateLong(end)}`;
}