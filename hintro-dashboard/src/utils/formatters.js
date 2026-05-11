/* ============================================================
   src/utils/formatters.js — Pure Helper Functions
   
   "Pure functions" = given the same input, always return the
   same output. No side effects. Easy to test and reuse.
   ============================================================ */

/**
 * Convert seconds into a human-readable duration string.
 * 
 * CONCEPT: Math.floor() — rounds DOWN to nearest whole number
 *          The modulo operator % — gives you the REMAINDER
 * 
 * Example: 3871 seconds
 *   hours   = Math.floor(3871 / 3600) = 1
 *   minutes = Math.floor((3871 % 3600) / 60) = Math.floor(271 / 60) = 4
 *   → "1h 4m"
 * 
 * @param {number} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0m';

  const hours   = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

/**
 * Format average duration (in seconds) to a compact string.
 * Used for the "Avg Duration" stats card.
 *
 * @param {number} seconds
 * @returns {string}
 */
export function formatAvgDuration(seconds) {
  if (!seconds || seconds === 0) return '—';
  return formatDuration(seconds);
}

/**
 * Convert an ISO date string to a relative "time ago" string.
 * 
 * CONCEPT: Date.now() returns the current time in milliseconds.
 *          new Date(string) parses an ISO string into a Date object.
 *          .getTime() converts a Date to milliseconds.
 *          Subtracting gives you the diff in ms → convert to days.
 * 
 * @param {string} dateString - ISO 8601 date string
 * @returns {string}
 */
export function timeAgo(dateString) {
  if (!dateString) return '—';

  const diffMs   = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7)   return `${diffDays} days ago`;
  if (diffDays < 30)  return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

/**
 * Format an ISO date string to "Apr 29" style.
 * 
 * CONCEPT: toLocaleDateString() — built-in JS date formatter.
 *          You pass an "options" object to control the output format.
 * 
 * @param {string} dateString
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the most recent date from an array of ISO date strings.
 * Used for "Last Session" stats card.
 * 
 * CONCEPT: Array spread [...arr] + Math.max() together can find
 *          the largest number in an array.
 *          Here we convert dates to timestamps (numbers) first.
 * 
 * @param {string[]} dateArray
 * @returns {string}
 */
export function getLastSession(dateArray) {
  if (!dateArray || dateArray.length === 0) return '—';
  // Sort descending and take the first (most recent)
  const sorted = [...dateArray].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  return timeAgo(sorted[0]);
}

/**
 * Capitalize first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
