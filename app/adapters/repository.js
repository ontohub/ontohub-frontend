import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id) {
    return `${this.get('host')}/repositories/${id}`;
  }
});
