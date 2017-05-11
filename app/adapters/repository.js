import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
  urlForFindRecord(id) {
    return this._urlForRecord(id)
  },
  urlForUpdateRecord(id) {
    return this._urlForRecord(id)
  },
  urlForDeleteRecord(id) {
    return this._urlForRecord(id)
  },
  _urlForRecord(id) {
    let host = this.get('host'),
        url = `/repositories/${id}`
    /*
     * This is configuration specific and can't be tested
     */
    /* istanbul ignore else */
    if(host) {
      url = `${host}${url}`
    }
    return url
  }
})
