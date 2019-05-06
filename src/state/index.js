import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import blogPosts from './blogPosts';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    blogPosts,
  });

export default rootReducer;
