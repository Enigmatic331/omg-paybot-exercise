import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { config } from '../config'
import Fetcher from '../services/fetcher';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false
    };

  }

  componentWillMount() {
    const fetcher = new Fetcher(config);

    fetcher.fetchAuthenticated("/some_endpoint", {})
    .then((response) => {
      if (response.success) {
        localStorage.removeItem('user_id', response.data.user_id);
        localStorage.removeItem('auth_token', response.data.authentication_token);

        this.triggerNext();
      } else {
        this.setState({ loading: false, result: 'Unable to log out. ' + response.data.description });
        this.trigger('reofferHelp');
      }
    })
  }

  trigger(trigger) {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({ trigger: trigger });
    });
  }

  triggerNext = () => {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div className="logout">
        { loading ? <Loading /> : result }
      </div>
    );
  }
};

Logout.propTypes = {
  steps: PropTypes.object,
};

Logout.defaultProps = {
  steps: undefined,
};

export default Logout;
