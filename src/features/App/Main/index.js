import React, { Suspense, Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { NotificationContainer } from "@boomerang/boomerang-components/lib/Notifications";
import GdprRedirectModal from "@boomerang/boomerang-components/lib/GdprRedirectModal";
import LoadingAnimation from "Components/Loading";
import CreatePolicy from "Features/CreatePolicy";
import EditPolicy from "Features/EditPolicy";
import Overview from "Features/Overview";
import NotificationBanner from "Components/NotificationBanner";
import { BASE_LAUNCH_ENV_URL, BASE_WWW_ENV_URL } from "Config/platformUrlConfig";

class Main extends Component {
  static propTypes = {
    globalMatch: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    setActiveTeam: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  setNewRelicCustomAttribute() {
    if (window.newrelic) {
      window.newrelic.setCustomAttribute("userId", this.props.user.data.id);
    }
  }

  componentDidMount() {
    const { globalMatch, setActiveTeam } = this.props;
    const teamName = globalMatch && globalMatch.params && globalMatch.params.teamName;
    if (teamName) {
      setActiveTeam(teamName);
    }
  }

  componentDidUpdate(prevProps) {
    const { globalMatch, router, setActiveTeam } = this.props;
    if (router.location.pathname !== prevProps.router.location.pathname) {
      const teamName = globalMatch && globalMatch.params && globalMatch.params.teamName;
      setActiveTeam(teamName);
    }
  }

  closeBanner = () => {
    this.setState({ bannerClosed: true });
  };

  render() {
    const { user } = this.props;
    const hasConsented = user.data ? user.data.hasConsented : false;
    if (!hasConsented) {
      return (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={BASE_LAUNCH_ENV_URL} baseWWWEnvUrl={BASE_WWW_ENV_URL} user={user} />
      );
    }

    this.setNewRelicCustomAttribute();
    return (
      <>
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
      </>
    );
  }
}

export default Main;
