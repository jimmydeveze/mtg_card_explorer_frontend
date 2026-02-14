class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  searchCards(query) {
    return fetch(`${this._baseUrl}/cards/search?q=${encodeURIComponent(query)}`)
      .then(this._checkResponse)
      .then((data) => data.data); // Scryfall devuelve { data: [...] }
  }
}

export { Api };
