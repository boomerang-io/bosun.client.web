import moment from "moment";
import { sortBy } from "lodash";

export const getLineChartData = (data) => {
  let higherValue = 0;
  let dateName = [];
  let lines = [];
  let totalViolations = 0;
  data.forEach((policy) => {
    lines.push(policy.policyName);
    policy.insights.forEach((insight) => {
      if (
        dateName.find(
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
  const finalData = [];
  sortedDate.forEach((date) => {
    let violationsData = data.map((policy) => {
      let violationCount = 0;
      policy.insights.forEach((insight) => {
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
    violationsData.forEach((violation) => {
      policiesData[violation.name] = violation.count;
    });
    finalData.push({ date: date ? moment(date).format("MMMM DD, YYYY") : "---", ...policiesData });
  });
  return { chartData: finalData, lines, totalViolations, higherValue };
};
