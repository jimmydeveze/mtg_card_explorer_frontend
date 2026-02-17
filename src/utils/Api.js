class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 404) {
      return Promise.resolve({ data: [] });
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  searchCards(query) {
    return fetch(`${this._baseUrl}/cards/search?q=${query}`).then(
      this._checkResponse,
    );
  }
}

export { Api };
