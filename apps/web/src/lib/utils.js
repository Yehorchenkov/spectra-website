export function truncateString(str, length) {
	if (str.length <= length) return str;

	const truncatedString = str.slice(0, length);
	const lastSpaceIndex = truncatedString.lastIndexOf(' ');

	return truncatedString.slice(0, lastSpaceIndex) + '...';
}
