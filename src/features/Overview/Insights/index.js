import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actions } from "State/teamMembers";
import Graph from "./Graph";
import Info from "./Info";
// import LoadingAnimation from "Components/Loading";
// import { notify, Notification } from "@boomerang/boomerang-components/lib/Notifications";
import { getLineChartData } from "./helpers/formatLineChartData";
import "./styles.scss";

export class Insights extends Component {
  static propTypes = {
    insights: PropTypes.array,
    policies: PropTypes.array,
    violations: PropTypes.array
  };

  render() {
    const { insights, violations, policies } = this.props;
    const formatedData = getLineChartData(insights);
    let gatesCount = 0;
    policies.forEach(policy => gatesCount += policy.stages.length);

    const gatesData = {
      type: "gates",
      title: "Current Gates",
      content: "Software never is perfect and it won’t be. But is that a license to create garbage?",
      count: gatesCount
    };
    const violationsData = {
      type: "violations",
      title: "Current Violations",
      content: "Code will set you free. Think of this as an opportunity for better code. Drive towards zero.",
      count: violations.reduce((acc, violation) => (acc += violation.violations), 0)
    };

    return (
      <section className="c-overview-general-info">
        <h2 className="b-overview-general-title">Insights</h2>
        <div className="c-overview-general-info__content">
          <div className="c-tiles">
            <Info info={gatesData} />
            <Info info={violationsData} />
          </div>
          <div className="c-graphs">
            <Graph formatedData={formatedData} />
          </div>
        </div>
      </section>
    );
  }
}

export default Insights;
