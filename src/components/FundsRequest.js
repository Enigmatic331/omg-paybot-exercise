import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { config } from '../config'
import Fetcher from '../services/fetcher';
import { formatAmount } from '../helpers/formatter'

class FundsRequest extends Component {
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

    const idempotencyToken = Math.random().toString(36).substr(2);
    const userId = localStorage.getItem("user_id");
    const inputAmount = steps.requestAmountInput.value;
    const inputTokenId = steps.requestdFundsInputToken.value.id;
    const subunitToUnit = steps.requestdFundsInputToken.value.subunit_to_unit;
    fetcher.fetchAuthenticated("/some_endpoint", {
      some_key: "some_value"
    })
    .then((response) => {
      if (response.success) {
        this.setState({ loading: false })
        this.triggerNext();
      } else {
        this.setState({ loading: false, result: response.data.description });
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
      <div className="funds-request">
        { loading ? <Loading /> : result }
      </div>
    );
  }
};

FundsRequest.propTypes = {
  steps: PropTypes.object,
};

FundsRequest.defaultProps = {
  steps: undefined,
};

export default FundsRequest;
