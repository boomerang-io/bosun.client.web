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
import ErrorDragon from "Components/ErrorDragon";
import Loading from "Components/Loading";
import Main from "./Main";
import Navbar from "./Navbar";
import {
  SERVICE_PRODUCT_TEAM_PATH,
  SERVICE_USERS_NAVIGATION_PATH,
  SERVICE_USERS_PROFILE_PATH,
  SERVICE_REQUEST_STATUSES
} from "Config/servicesConfig";
import styles from "./App.module.scss";

export class AppContainer extends Component {
  static propTypes = {
    navigationActions: PropTypes.object.isRequired,
    navigationState: PropTypes.object,
    teamsActions: PropTypes.object.isRequired,
    teamsState: PropTypes.object,
    userActions: PropTypes.object.isRequired,
    userState: PropTypes.object
  };

  state = {
    showFirstTimeExperience: false
  };

  componentDidMount() {
    this.fetchData();
  }

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

  refreshPage = () => {
    this.fetchData();
  };

  setActiveTeam = teamName => {
    const matchedTeamFromState = this.props.teamsState.data.find(team => team.boomerangTeamShortname === teamName);
    this.props.appActions.setActiveTeam(matchedTeamFromState);
  };

  renderMain() {
    const { globalMatch, navigationState, teamsState, userState } = this.props;

    if (userState.isFetching || navigationState.isFetching || teamsState.isFetching) {
      return <Loading centered />;
    }
    if (
      userState.status === SERVICE_REQUEST_STATUSES.SUCCESS &&
      (!userState.data.id || userState.data.hasConsented === false)
    ) {
      /**
       * render null for a non-user
       */
      return null;
    }
    if (
      userState.status === SERVICE_REQUEST_STATUSES.SUCCESS &&
      navigationState.status === SERVICE_REQUEST_STATUSES.SUCCESS &&
      teamsState.status === SERVICE_REQUEST_STATUSES.SUCCESS
    ) {
      return <Main globalMatch={globalMatch} setActiveTeam={this.setActiveTeam} user={userState} />;
    }
    if (
      userState.status === SERVICE_REQUEST_STATUSES.FAILURE ||
      navigationState.status === SERVICE_REQUEST_STATUSES.FAILURE ||
      teamsState.status === SERVICE_REQUEST_STATUSES.FAILURE
    ) {
      return (
        <div className={styles.content}>
          <ErrorDragon style={{ margin: "3.5rem 0" }} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <ErrorBoundary errorComponent={ErrorDragon}>
        <div className={styles.container}>
          <Navbar
            navigation={this.props.navigationState}
            handleOnTutorialClick={this.handleOnQuestionClick}
            user={this.props.userState}
          />
          {this.renderMain()}
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    globalMatch: matchPath(props.location.pathname, { path: "/:teamName" }),
    navigationState: state.navigation,
    teamsState: state.teams,
    userState: state.user
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
