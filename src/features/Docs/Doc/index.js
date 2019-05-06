import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Doc.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function Doc({ title, content }) {
  return (
    <article className="b-blog-post">
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
}

export default Doc;
