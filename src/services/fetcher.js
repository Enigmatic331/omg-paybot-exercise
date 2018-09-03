export default class Fetcher {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.url = config.eWalletUrl;
  }

  fetchUnauthenticated(path, data) {
    return fetch(this.url + path, {
      method: 'POST',
      headers: {
        'SomeHeader': 'SomeValue'
      },
      body: JSON.stringify(data)
    })
    .then(this.checkStatus)
    .then(this.parseJSON)
    .then(function(data) {
      console.log('Request success:', data)
      return data;
    })
  }

  fetchAuthenticated(path, data) {
    const authToken = localStorage.getItem('auth_token');

    return fetch(this.url + path, {
      method: 'POST',
      headers: {
        'SomeHeader': 'SomeValue'
      },
      body: JSON.stringify(data)
    })
    .then(this.checkStatus)
    .then(this.parseJSON)
    .then(function(data) {
      console.log('Request success:', data)
      return data;
    })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  parseJSON(response) {
    return response.json()
  }
}
