class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse = (res) => {
    if (res.ok) return res.json();

    if (res.status === 404) {
      return Promise.resolve({ data: [] });
    }

    return Promise.reject(`Error: ${res.status}`);
  };

  _request(url) {
    return fetch(url).then(this._checkResponse);
  }

  searchCards(query) {
    return this._request(
      `${this._baseUrl}/cards/search?q=${encodeURIComponent(query)}`,
    );
  }

  getByUrl(url) {
    return this._request(url);
  }

  getSpanishPrint(oracleId) {
    return this._request(
      `${this._baseUrl}/cards/search?q=${encodeURIComponent(
        `oracleid:${oracleId} lang:es`,
      )}`,
    ).then((data) => data?.data?.[0] || null);
  }

  getRandomCard() {
    return this._request(`${this._baseUrl}/cards/random`);
  }
}

export { Api };
