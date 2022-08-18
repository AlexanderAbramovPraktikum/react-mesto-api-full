export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getServerStatus(res) {
    if (res.ok) {
      console.log(res.data);
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

  addNewCard(bodyOptions) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(bodyOptions)
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked)
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._options.headers
      })
        .then(res => {
          return this._getServerStatus(res)
        })
    else 
      return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._options.headers
      })
        .then(res => {
          return this._getServerStatus(res)
        })
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

  patchUserAvatar(bodyOptions) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(bodyOptions)
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

  patchUserInfo(bodyOptions) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(bodyOptions)
    })
      .then(res => {
        return this._getServerStatus(res)
      })
  }

}

export const apiSettings = new Api({
  // baseUrl: "https://api.alexander.abramov.nomoredomains.sbs",
  baseUrl: "http://localhost:5000",
  headers: {
    // authorization: localStorage.getItem('jwt'),
    // authorization: cookie.get('jwt'),
    "Content-Type": "application/json",
  },
  credentials: 'include',
});
