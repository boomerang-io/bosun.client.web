import { APP_ROOT } from "Config/appConfig";

export function getByTextAndAttribute({ element, text, attribute, attributeValue }) {
  return (
    element.textContent === text &&
    element.getAttributeNode(attribute) &&
    element.getAttributeNode(attribute).value === attributeValue
  );
}

export function buildVisitUrl(path = "") {
  return `${APP_ROOT}${path}`;
}
