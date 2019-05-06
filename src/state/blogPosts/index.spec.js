import {
  default as blogPostReducer,
  types as actionTypes,
  initialState,
} from './index.js';

describe('blogPosts Reducer', () => {
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState;

    expect(blogPostReducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_POSTS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_POSTS_REQUEST };
    const expected = { ...initialState, isFetching: true };
    const newState = blogPostReducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('should handle FETCH_POSTS_SUCCESS', () => {
    const action = { type: actionTypes.FETCH_POSTS_SUCCESS, data: ['test'] };
    const expected = {
      ...initialState,
      data: action.data,
      isFetching: false,
      status: 'success',
    };
    const newState = blogPostReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
  it('should handle FETCH_POSTS_FAILURE', () => {
    const action = { type: actionTypes.FETCH_POSTS_FAILURE, error: 'error' };
    const expected = {
      ...initialState,
      error: action.error,
      status: 'failure',
    };
    const newState = blogPostReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
  it('should handle RESET_POSTS', () => {
    const action = { type: actionTypes.RESET_POSTS };
    const expected = initialState;
    const newState = blogPostReducer(initialState, action);

    expect(newState).toEqual(expected);
  });
});
