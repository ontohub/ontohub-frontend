import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForCreateRecord() {
    return `${this.get('host')}/users`;
  }
});
