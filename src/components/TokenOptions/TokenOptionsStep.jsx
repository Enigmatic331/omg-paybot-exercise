import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TokenOption from './TokenOption';
import TokenOptionElement from './TokenOptionElement';
import TokenOptions from './TokenOptions';
import TokenOptionsStepContainer from './TokenOptionsStepContainer';
import { config } from '../../config'
import Fetcher from '../../services/fetcher';

class TokenOptionsStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      options: []
    };

  }

  componentWillMount() {
    const fetcher = new Fetcher(config);

    fetcher.fetchAuthenticated("/some_endpoint", {})
    .then((response) => {
      if (response.success) {
        this.setState({ loading: false, options: response.data.tokens });
      } else {
        this.setState({ loading: false, options: [] });
      }
    })
  }

  onOptionClick = ({ value }) => {
    this.props.triggerNextStep({ value });
  }

  renderOption = (option) => {
    const { bubbleOptionStyle } = this.props;
    const { user } = this.props.step;
    const { id, symbol, name } = option;

    return (
      <TokenOption
        key={id}
        className="rsc-token-option"
      >
        <TokenOptionElement
          className="rsc-token-option-element"
          style={bubbleOptionStyle}
          user={user}
          onClick={() => this.onOptionClick({value: option})}
        >
          {name} ({symbol})
        </TokenOptionElement>
      </TokenOption>
    );
  }

  render() {
    const { options } = this.state;

    return (
      <TokenOptionsStepContainer className="rsc-token">
        <TokenOptions className="rsc-token-options">
          {_.map(options, this.renderOption)}
        </TokenOptions>
      </TokenOptionsStepContainer>
    );
  }
}

TokenOptionsStep.propTypes = {
  step: PropTypes.object,
  triggerNextStep: PropTypes.func,
  bubbleOptionStyle: PropTypes.object,
};

export default TokenOptionsStep;
