import React from 'react';
import { BlogPostsContainer } from './index';
import { initialState, actions as blogPostActions } from 'State/blogPosts';
import renderer from 'react-test-renderer';

const props = {
  blogPostActions,
  blogPosts: initialState,
};

describe('BlogPostsContainer --- Snapshot Test', () => {
  it('Capturing Snapshot of BlogPostsContainer', () => {
    const component = renderer
      .create(<BlogPostsContainer {...props} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
