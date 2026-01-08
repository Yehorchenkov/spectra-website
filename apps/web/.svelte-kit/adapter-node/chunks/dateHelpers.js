function formatDateLong(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return new Date(date1).toDateString() === new Date(date2).toDateString();
}
function formatDateRange(start, end, placeholder = "Unknown") {
  if (!start) return "";
  const startStr = formatDateLong(start);
  if (!end) {
    return `${startStr} - ${placeholder}`;
  }
  if (isSameDay(start, end)) {
    return startStr;
  }
  return `${startStr} - ${formatDateLong(end)}`;
}
export {
  formatDateLong as a,
  formatDateRange as f
};
