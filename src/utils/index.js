import moment from "moment";

/**
 * @param {string} timestamp
 * @returns formatted date string
 */
export function formatDateTimestamp(timestamp) {
  return moment(timestamp).format("MMMM Do, YYYY");
}
