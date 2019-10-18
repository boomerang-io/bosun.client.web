import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as insightsActions } from "State/insights";
import { actions as getPoliciesActions } from "State/policies/getPolicies";
import { actions as violationsActions } from "State/violations";
import LoadingAnimation from "Components/Loading";
import ErrorDragon from "Components/ErrorDragon";
import Header from "./TeamSelector";
import Welcome from "Components/Welcome";
import Insights from "./Insights";
import Policies from "./Policies";
import Violations from "./Violations";
import {
  SERVICE_PRODUCT_INSIGHTS_PATH,
  SERVICE_PRODUCT_POLICIES_PATH,
  SERVICE_REQUEST_STATUSES,
  SERVICE_PRODUCT_VIOLATIONS_PATH
} from "Config/servicesConfig";
import sortBy from "lodash/sortBy";
import styles from "./overview.module.scss";

export class Overview extends Component {
  static propTypes = {
    activeTeam: PropTypes.object,
    insightsActions: PropTypes.object.isRequired,
    insights: PropTypes.object.isRequired,
    getPoliciesActions: PropTypes.object.isRequired,
    policies: PropTypes.object.isRequired,
    teams: PropTypes.array,
    violationsActions: PropTypes.object.isRequired,
    violations: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.activeTeam) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeTeam) {
      if (!prevProps.activeTeam || this.props.activeTeam.id !== prevProps.activeTeam.id) {
        this.fetchData();
      }
    }
  }

  fetchData = async () => {
    const { id } = this.props.activeTeam;
    try {
      await Promise.all([
        this.props.getPoliciesActions.fetch(`${SERVICE_PRODUCT_POLICIES_PATH}?ciTeamId=${id}`),
        this.props.insightsActions.fetch(`${SERVICE_PRODUCT_INSIGHTS_PATH}?ciTeamId=${id}`),
        this.props.violationsActions.fetch(`${SERVICE_PRODUCT_VIOLATIONS_PATH}?ciTeamId=${id}`)
      ]);
    } catch (err) {
      //noop
    }
  };

  handleChangeTeam = ({ selectedItem }) => {
    if (selectedItem?.name) {
      this.props.history.push(`/${selectedItem.name}`);
    }
  };

  renderContent() {
    const { activeTeam, policies, violations, insights } = this.props;
    if (!activeTeam) {
      return <Welcome />;
    }

    if (policies.isFetching || insights.isFetching || violations.isFetching)
      return <LoadingAnimation theme="bmrg-white" message="Just a moment, por favor" delay={500} />;

    if (
      policies.status === SERVICE_REQUEST_STATUSES.SUCCESS ||
      insights.status === SERVICE_REQUEST_STATUSES.SUCCESS ||
      violations.status === SERVICE_REQUEST_STATUSES.SUCCESS
    ) {
      return (
        <>
          {insights.status === SERVICE_REQUEST_STATUSES.SUCCESS && (
            <Insights insights={insights.data} violations={violations.data} policies={policies.data} />
          )}
          {policies.status === SERVICE_REQUEST_STATUSES.SUCCESS && <Policies policies={policies.data} />}
          {violations.status === SERVICE_REQUEST_STATUSES.SUCCESS && (
            <Violations hasPolicies={policies.data.length} violations={violations.data} />
          )}
        </>
      );
    }

    if (
      policies.status === SERVICE_REQUEST_STATUSES.FAILURE &&
      insights.status === SERVICE_REQUEST_STATUSES.FAILURE &&
      violations.status === SERVICE_REQUEST_STATUSES.FAILURE
    ) {
      return <ErrorDragon />;
    }
  }

  render() {
    const { activeTeam, teams } = this.props;
    return (
      <div className={styles.container}>
        <Header activeTeam={activeTeam} handleChangeTeam={this.handleChangeTeam} teams={teams} />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTeam: state.app.activeTeam,
    insights: state.insights,
    policies: state.policies.getPolicies,
    teams: sortBy(state.teams.data, team => team.boomerangTeamName.toLowerCase()),
    violations: state.violations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPoliciesActions: bindActionCreators(getPoliciesActions, dispatch),
    insightsActions: bindActionCreators(insightsActions, dispatch),
    violationsActions: bindActionCreators(violationsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
