import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { config } from '../config'
import Fetcher from '../services/fetcher';

class Signup extends Component {
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
        this.setState({ loading: false, result: 'Successfully signed up! If the email server was correctly configured you would receive an email with a link to validate your account. But as you are running the server locally, you will need to check the logs of the latest request and copy/paste the link in your browser.' });
      } else {
        this.setState({ loading: false, result: 'Unable to sign up. ' + response.data.description });

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
      <div className="signup">
        { loading ? <Loading /> : result }
      </div>
    );
  }
};

Signup.propTypes = {
  steps: PropTypes.object,
};

Signup.defaultProps = {
  steps: undefined,
};

export default Signup;
