import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
  urlForFindRecord() {
    let host = this.get('host'),
        url = '/version'
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
