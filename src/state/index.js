import { combineReducers } from 'redux';
import app from "./app";
import insights from "./insights";
import navigation from "./navigation";
import policies from "./policies";
import teams from "./teams";
import user from "./user";
import violations from "./violations";

const rootReducer = () =>
  combineReducers({
    app,
    insights,
    navigation,
    policies,
    teams,
    user,
    violations
  });

export default rootReducer;
