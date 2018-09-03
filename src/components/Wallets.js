import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { config } from '../config'
import Fetcher from '../services/fetcher';
import { formatReceiveAmountToTotal } from '../helpers/formatter'

class Wallets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
      success: null
    };

  }

  componentWillMount() {
    const fetcher = new Fetcher(config);

    fetcher.fetchAuthenticated("/some_endpoint", {
      some_key: "some_value"
    })
    .then((response) => {
      if (response.success) {
        this.setState({ loading: false, success: true, result: response.data.data });
        this.triggerNext();
      } else {
        this.setState({ loading: false, success: false, result: 'Failed to retrieve the wallets. ' + response.data.description });
        this.triggerNext();
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
    const { success, loading, result } = this.state;
    if (success === true) {
      const Wallets = ({wallets}) => (
        <div>
        {
          !!wallets &&
            wallets.map(wallet => (
              <div key={wallet.address} className="wallet">
                <p>Okay. Here are your wallets and their balances.</p>

                <p><strong>Wallet {wallet.address}:</strong></p>

                <Balances balances={wallet.balances} />
              </div>
            ))
        }
        </div>
      );

      const Balances = ({balances}) => (
        <ul>
        {
          !!balances &&
            balances.map(balance => (
              <li key={balance.token.id} className="balance">{formatReceiveAmountToTotal(balance.amount, balance.token.subunit_to_unit)} {balance.token.symbol}</li>
            ))
        }
        </ul>
      );

      return (
        <div className="wallets">
          { loading ? <Loading /> : <Wallets wallets={result} /> }
        </div>
      )
    } else {
      return (
        <div className="wallets">
          { loading ? <Loading /> : result }
        </div>
      )
    }
  }
};

Wallets.propTypes = {
  steps: PropTypes.object,
};

Wallets.defaultProps = {
  steps: undefined,
};

export default Wallets;
