import moment from "moment";

/**
 * @param {string} timestamp
 * @returns formatted date string
 */
export function formatDateTimestamp(timestamp) {
  return moment(timestamp).format("MMMM Do, YYYY");
}

/**
 * Check if accessible click event with configurable event, codes and keys
 * Check for both codes and keys for more browser support according to docs below
 * defaults to values for role="button"
 * references: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 * @param {Object} event - DOM event object
 * @param {Object} config - types to respond to, keys to check, codes to check as a fallback
 * @returns {boolean} - if it is a valid accessible event
 * @example
 *
 *       function incrementWithIsAccessibleEventCheck(e) {
 *           isAccessibleEvent(e) && handleButtonClick(e)
 *       }
 *
 *       function render() {
 *          return (
 *            <div
 *             role="button"
 *              tabIndex="0"
 *              onClick={incrementWithIsAccessibleEventCheck}
 *              onKeyDown={incrementWithIsAccessibleEventCheck}
 *             >
 *          );
 *        }
 *
 */

function isAccessibleEvent(
  event,
  { types = ["click", "keydown"], codes = ["Enter", "Space"], keys = ["Enter", " ", "Spacebar"] } = {}
) {
  const { code, key, type } = event;
  const keyReference = code || key;

  // Include click here so an onEvent handler can be used for
  // both click and keyboard event types
  if (type === "click" && types.includes(type)) {
    return true;
  }

  if (types.includes(type)) {
    if (codes.includes(keyReference) || keys.includes(keyReference)) {
      return true;
    }
  }

  return false;
}

export default isAccessibleEvent;
