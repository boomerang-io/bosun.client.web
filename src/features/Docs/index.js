import React, { Component } from 'react';
import axios from 'axios';
import Loading from 'Components/Loading';
import Doc from './Doc';
import { BASE_SERVICE_URL } from 'Config/servicesConfig';

class DocsContainer extends Component {
  state = {
    isFetching: false,
    status: '',
    data: [],
    error: undefined,
  };

  componentDidMount() {
    this.fetchDocs();
  }

  fetchDocs() {
    this.setState(() => ({
      isFetching: true,
    }));
    axios
      .get(`${BASE_SERVICE_URL}/docs`)
      .then(response => {
        this.setState(() => ({
          isFetching: false,
          status: 'success',
          data: response.data,
        }));
      })
      .catch(error => {
        this.setState(() => ({
          isFetching: false,
          status: 'failure',
          error: error,
        }));
      });
  }

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    }
    if (this.state.data.length > 0) {
      return this.state.data.map(doc => {
        const { id, title, content } = doc;
        return <Doc key={id} title={title} content={content} />;
      });
    }

    return null;
  }
}

export default DocsContainer;
