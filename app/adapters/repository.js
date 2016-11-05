import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id, snapshot, requestType, query) {
    let _id = id.split('/');
    let namespace = _id[0];
    let repo_id = _id[1];
    return `${this.get('host')}/namespaces/${namespace}/repositories/${repo_id}`;
  }
});
