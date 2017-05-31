import config from '../config'

export const Api = {
  fetch(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    }
    let authToken = localStorage.getItem('auth-token')
    if (authToken) {
      defaultOptions.headers.Authorization = `Bearer ${authToken}`
    }
    return fetch(`${config.api.endpoint}${url}`, {
      ...defaultOptions,
      ...options
    })
  },
  get(url, options = {}) {
    return this.fetch(url, options)
  },
  post(url, body) {
    return this.fetch(url, { method: 'POST', body: JSON.stringify(body) })
  }
}
