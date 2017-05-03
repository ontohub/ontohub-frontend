import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForCreateRecord() {
    return `${this.get('host')}/users`;
  },
  urlForQueryRecord(query, modelName) {
    if (typeof(query.filter.name) == 'string') {
      return `${this.get('host')}/users/by-name/${query.filter.name}`
    } else {
      super.urlForQueryRecord(query, modelName)
    }
  }
});
