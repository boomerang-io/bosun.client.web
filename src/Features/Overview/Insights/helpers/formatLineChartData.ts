import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { sortBy } from "lodash";

export const getLineChartData = (data: any) => {
  let higherValue = 0;
  let dateName: any = [];
  let lines: any = [];
  let totalViolations = 0;
  data.forEach((policy: any) => {
    lines.push(policy.policyName);
    policy.insights.forEach((insight: any) => {
      if (
        dateName.find(
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
          (date) =>
            moment(date).format("MMM DD - YYYY") === moment(insight.policyActivityCreatedDate).format("MMM DD - YYYY")
        )
      ) {
      } else {
        dateName.push(insight.policyActivityCreatedDate);
      }
      totalViolations = totalViolations + insight.violations;
    });
  });

  const sortedDate = sortBy(sortBy(dateName));
  const finalData: any = [];
  sortedDate.forEach((date: any) => {
    let violationsData = data.map((policy: any) => {
      let violationCount = 0;
      policy.insights.forEach((insight: any) => {
        if (
          moment(date).format("MMM DD - YYYY") === moment(insight.policyActivityCreatedDate).format("MMM DD - YYYY")
        ) {
          violationCount += insight.violations;
        } else {
          return null;
        }
      });
      higherValue = higherValue > violationCount ? higherValue : violationCount;
      return { count: violationCount, name: policy.policyName };
    });
    let policiesData = {};
    violationsData.forEach((violation: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      policiesData[violation.name] = violation.count;
    });
    finalData.push({ date: date ? moment(date).format("MMMM DD, YYYY") : "---", ...policiesData });
  });
  return { chartData: finalData, lines, totalViolations, higherValue };
};
