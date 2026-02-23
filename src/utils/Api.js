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

  getSpanishPrint(oracleId) {
    return fetch(`${this._baseUrl}/cards/search?q=oracleid:${oracleId}+lang:es`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => data?.data?.[0] || null);
  }
}

export { Api };
