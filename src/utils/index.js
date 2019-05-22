// Combo box default prop "shouldFilterItem" function
export const shouldFilterItem = ({ inputValue, item, itemToString }) =>
  itemToString(item)
    .toLowerCase()
    .includes(inputValue.toLowerCase());

/**
 * Helper to format date timestamp w/o moment or date-fns dependency
 * @param {string} timestamp
 * @returns formatted date string
 */
export function formatDateTimestamp(timestamp) {
  return new Date(Number(timestamp)).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
