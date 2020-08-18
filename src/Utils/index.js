import moment from "moment";

/**
 * @param {string} dateTimeString
 * @param {string} format - Moment date format
 * @returns formatted date string
 */
export function formatDateTimeString(dateTimeString, format = "MMMM Do, YYYY") {
  return moment(dateTimeString).format("MMMM Do, YYYY");
}
