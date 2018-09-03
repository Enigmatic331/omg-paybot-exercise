import React from 'react';
import Login from '../components/Login';
import Logout from '../components/Logout';
import CheckAuth from '../components/CheckAuth';
import FundsRequest from '../components/FundsRequest';
import Signup from '../components/Signup';
import Wallets from '../components/Wallets';
import TokenOptionsStep from '../components/TokenOptions/TokenOptionsStep';

export const steps = [
  // Starting up
  {
    id: 'start',
    asMessage: true,
    component: <CheckAuth />
  },
  {
    id: 'informAuthRequired',
    message: 'Before I can proceed, I\'ll need you to authenticate yourself by logging in or signing up with us.',
    trigger: 'optionsLoginOrSignup'
  },
  {
    id: 'reinformAuthRequired',
    message: 'Please try logging in or signing up again.',
    trigger: 'optionsLoginOrSignup'
  },
  {
    id: 'optionsLoginOrSignup',
    options: [
      { value: 'login', label: 'Log me in', trigger: 'loginAskEmail' },
      { value: 'signup', label: 'Sign me up', trigger: 'signupAskEmail' }
    ],
  },

  // Sign up flow
  {
    id: 'signupAskEmail',
    message: 'What is your email?',
    trigger: 'signupInputEmail'
  },
  {
    id: 'signupInputEmail',
    user: true,
    placeholder: "Type your email here",
    trigger: 'signupAskPassword'
  },
  {
    id: 'signupAskPassword',
    message: 'And your password?',
    trigger: 'signupAskPasswordDisclaimer'
  },
  {
    id: 'signupAskPasswordDisclaimer',
    message: '(because we\'re in a workshop so I\'m asking you this. Please don\'t ask for passwords in plaintext in production!)',
    trigger: 'signupInputPassword'
  },
  {
    id: 'signupInputPassword',
    user: true,
    placeholder: "Type your password here",
    trigger: 'signupAskPasswordConfirmation'
  },
  {
    id: 'signupAskPasswordConfirmation',
    message: 'Retype your password again just to be sure.',
    placeholder: "Type your password again",
    trigger: 'signupInputPasswordConfirmation'
  },
  {
    id: 'signupInputPasswordConfirmation',
    user: true,
    placeholder: "Type your password again",
    trigger: 'signup'
  },
  {
    id: 'signup',
    component: <Signup />,
    waitAction: true,
    asMessage: true,
    trigger: 'reofferHelp'
  },

  // Login flow
  {
    id: 'loginAskEmail',
    message: 'What is your email?',
    trigger: 'loginInputEmail'
  },
  {
    id: 'loginInputEmail',
    user: true,
    placeholder: "Type your email here",
    trigger: 'loginAskPassword'
  },
  {
    id: 'loginAskPassword',
    message: 'And your password?',
    trigger: 'loginAskPasswordDisclaimer'
  },
  {
    id: 'loginAskPasswordDisclaimer',
    message: '(because we\'re in a workshop so I\'m asking you this. Please don\'t ask for passwords in plaintext in production!)',
    trigger: 'loginInputPassword'
  },
  {
    id: 'loginInputPassword',
    user: true,
    placeholder: "Type your password here",
    trigger: 'login'
  },
  {
    id: 'login',
    component: <Login />,
    waitAction: true,
    asMessage: true,
    trigger: 'offerHelp'
  },

  // After login
  {
    id: 'offerHelp',
    message: 'What can I do for you today?',
    trigger: 'taskOptions',
  },
  {
    id: 'reofferHelp',
    message: 'Anything else I can do for you?',
    trigger: 'taskOptions',
  },
  {
    id: 'taskOptions',
    options: [
      { value: 'list-wallets', label: 'List my wallets', trigger: 'listWallets' },
      { value: 'request-funds', label: 'Request funds', trigger: 'requestAmountAsk' },
      { value: 'logout', label: 'Log Out', trigger: 'logout' },
      // { value: 'no-thanks', label: 'Nothing, thanks', trigger: 'farewell' }
    ],
  },

  // User operations
  {
    id: 'listWallets',
    component: <Wallets />,
    waitAction: true,
    asMessage: true,
    trigger: 'reofferHelp'
  },

  // Request funds

  {
    id: 'requestAmountAsk',
    message: 'How much do you want?',
    trigger: 'requestAmountInput'
  },
  {
    id: 'requestAmountInput',
    user: true,
    placeholder: "Type the amount here",
    trigger: 'requestFundsAskToken'
  },

  {
    id: 'requestFundsAskToken',
    message: 'In what token?',
    trigger: 'requestdFundsInputToken'
  },
  {
    id: 'requestdFundsInputToken',
    component: <TokenOptionsStep />,
    waitAction: true,
    replace: true,
    trigger: 'requestFunds'
  },
  {
    id: 'requestFunds',
    component: <FundsRequest />,
    waitAction: true,
    trigger: 'finalizeRequestAmount'
  },
  {
    id: 'finalizeRequestAmount',
    message: "Successfully created a transaction request. You'll have to wait for an admin to approve it.",
    trigger: 'reofferHelp'
  },

  // TODO: Send funds

  // Log out

  {
    id: 'logout',
    component: <Logout />,
    trigger: 'farewell',
    waitAction: true
  },

  // Ending
  {
    id: 'farewell',
    message: 'Thanks for visiting. Good bye!',
    end: true,
  },
];
