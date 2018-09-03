import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { config } from '../config'
import Fetcher from '../services/fetcher';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false
    };

  }

  componentWillMount() {
    const { steps } = this.props;
    const fetcher = new Fetcher(config);

    fetcher.fetchUnauthenticated("/some_endpoint", {
      some_key: "some_value"
    })
    .then((response) => {
      if (response.success) {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('auth_token', response.data.authentication_token);

        this.setState({ loading: false, result: 'Looks good! You are logged in as ' + response.data.user.email });
        this.triggerNext();
      } else {
        this.setState({ loading: false, result: 'Unable to log in. ' + response.data.description });
        this.trigger('reinformAuthRequired');
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
      <div className="login">
        { loading ? <Loading /> : result }
      </div>
    );
  }
};

Login.propTypes = {
  steps: PropTypes.object,
};

Login.defaultProps = {
  steps: undefined,
};

export default Login;
