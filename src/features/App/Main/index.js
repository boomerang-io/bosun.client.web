import React, { Suspense, Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { NotificationContainer } from "@boomerang/boomerang-components/lib/Notifications";
import LoadingAnimation from "Components/Loading";
import CreatePolicy from "Features/CreatePolicy";
import EditPolicy from "Features/EditPolicy";
import Overview from "Features/Overview";
import NotificationBanner from "Components/NotificationBanner";

class Main extends Component {
  static propTypes = {
    globalMatch: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    setActiveTeam: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { globalMatch, setActiveTeam } = this.props;
    const teamName = globalMatch && globalMatch.params && globalMatch.params.teamName;
    if (teamName) {
      setActiveTeam(teamName);
    }
    
    this.setNewRelicCustomAttribute();
  }

  componentDidUpdate(prevProps) {
    const { globalMatch, setActiveTeam } = this.props;
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const teamName = globalMatch && globalMatch.params && globalMatch.params.teamName;
      setActiveTeam(teamName);
    }
  }

  closeBanner = () => {
    this.setState({ bannerClosed: true });
  };

  setNewRelicCustomAttribute() {
    if (window.newrelic) {
      window.newrelic.setCustomAttribute("userId", this.props.user.data.id);
    }
  }

  render() {
    return (
      <div className="c-app-content">
        <NotificationBanner />
        <main className="c-app-main">
          <Suspense fallback={<LoadingAnimation theme="bmrg-white" />}>
            <Switch>
              <Route path="/:teamName/policy/edit/:policyId" component={EditPolicy} />
              <Route path="/:teamName/policy/create" component={CreatePolicy} />
              <Route path="/:teamName" component={Overview} />
              <Route path="/" component={Overview} />
            </Switch>
          </Suspense>
        </main>
        <NotificationContainer />
      </div>
    );
  }
}

export default withRouter(Main);
