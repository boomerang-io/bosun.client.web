import React from 'react';
import BlogPost from './index';
import renderer from 'react-test-renderer';

const props = {
  author: 'Test Author',
  content: 'Test content',
  title: 'Test Title',
};

describe('BlogPost --- Snapshot Test', () => {
  it('Capturing Snapshot of ActivityDropdown', () => {
    const component = renderer.create(<BlogPost {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('BlogPost --- Shallow Test', () => {
  let component;
  beforeEach(() => {
    component = shallow(<BlogPost {...props} />);
  });
  it('render the component ', () => {
    expect(component.length).toEqual(1);
  });
  it('render with the correct block class ', () => {
    expect(component.find('.b-blog-post').length).toEqual(1);
  });
  it('render with the correct content ', () => {
    expect(component.find('h1').text()).toEqual(props.title);
    expect(component.find('h3').text()).toEqual(`By: ${props.author}`);
    expect(component.find('p').text()).toEqual(props.content);
  });
});
