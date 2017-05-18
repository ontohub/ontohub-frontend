import ApplicationAdapter from './application'

export default ApplicationAdapter.extend({
  urlForCreateRecord() {
    return `${this.get('host')}/users`
  },
  urlForDeleteRecord() {
    return `${this.get('host')}/users`
  }
})
