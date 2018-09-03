import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trigger: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.trigger('offerHelp');
    } else {
      this.trigger('informAuthRequired');
    }

    this.setState({ loading: false });
  }

  trigger(trigger) {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep({ trigger: trigger });
    });
  }

  render() {
    return (
      <div className="authenticator">
        Welcome to OMG PayBot!
      </div>
    );
  }
};

CheckAuth.propTypes = {
  steps: PropTypes.object,
};

CheckAuth.defaultProps = {
  steps: undefined,
};

export default CheckAuth;
