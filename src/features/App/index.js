import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as appActions } from "State/app";
import { actions as navigationActions } from "State/navigation";
import { actions as teamsActions } from "State/teams";
import { actions as userActions } from "State/user";
import { matchPath, withRouter } from "react-router-dom";
import ErrorBoundary from "@boomerang/boomerang-components/lib/ErrorBoundary";
import Loading from "Components/Loading";
import Main from "./Main";
import Navbar from "./Navbar";
import ErrorDragon from "Components/ErrorDragon";
import {
  SERVICE_PRODUCT_TEAM_PATH,
  SERVICE_USERS_NAVIGATION_PATH,
  SERVICE_USERS_PROFILE_PATH,
  SERVICE_REQUEST_STATUSES
} from "Config/servicesConfig";
import "./styles.scss";

export class AppContainer extends Component {
  static propTypes = {
    teamsActions: PropTypes.object.isRequired,
    teams: PropTypes.object,
    userActions: PropTypes.object.isRequired,
    user: PropTypes.object,
    navigationActions: PropTypes.object.isRequired,
    navigation: PropTypes.object
  };

  state = {
    showFirstTimeExperience: false
  };

  handleOnQuestionClick = () => {
    this.setState({
      showFirstTimeExperience: true
    });
  };

  handleOnGuideFinish = () => {
    this.setState({
      showFirstTimeExperience: false
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  setActiveTeam = teamName => {
    const matchedTeamFromState = this.props.teams.data.find(team => team.boomerangTeamShortname === teamName);
    this.props.appActions.setActiveTeam(matchedTeamFromState);
  };

  refreshPage = () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      await Promise.all([
        this.props.navigationActions.fetchNavigation(SERVICE_USERS_NAVIGATION_PATH),
        this.props.userActions.fetchUser(SERVICE_USERS_PROFILE_PATH),
        this.props.teamsActions.fetch(SERVICE_PRODUCT_TEAM_PATH)
      ]);
    } catch (err) {
      //noop
    }
  };

  renderMain() {
    const { globalMatch, navigation, router, teams, user } = this.props;

    if (user.isFetching || user.isCreating || navigation.isFetching || teams.isFetching) {
      return (
        <div className="c-app-content c-app-content--not-loaded">
          <Loading />
        </div>
      );
    }
    if (
      user.status === SERVICE_REQUEST_STATUSES.SUCCESS &&
      navigation.status === SERVICE_REQUEST_STATUSES.SUCCESS &&
      teams.status === SERVICE_REQUEST_STATUSES.SUCCESS
    ) {
      return <Main globalMatch={globalMatch} router={router} setActiveTeam={this.setActiveTeam} user={user} />;
    }
    if (
      user.status === SERVICE_REQUEST_STATUSES.FAILURE ||
      navigation.status === SERVICE_REQUEST_STATUSES.FAILURE ||
      teams.status === SERVICE_REQUEST_STATUSES.FAILURE
    ) {
      return (
        <div className="c-app-content c-app-content--not-loaded">
          <ErrorDragon style={{ margin: "3.5rem 0" }} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <ErrorBoundary errorComponent={ErrorDragon}>
        <div className="c-app">
          <Navbar navigation={this.props.navigation} handleOnTutorialClick={this.handleOnQuestionClick} />
          {this.renderMain()}
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    globalMatch: matchPath(props.location.pathname, { path: "/:teamName" }),
    navigation: state.navigation,
    teams: state.teams,
    user: state.user,
    router: props.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    navigationActions: bindActionCreators(navigationActions, dispatch),
    teamsActions: bindActionCreators(teamsActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContainer)
);
