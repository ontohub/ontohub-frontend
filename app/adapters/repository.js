import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function(modelName, id, snapshot, requestType, query) {
    let _id = id.split('/');
    console.log(id);
    let namespace = _id[0];
    let repo_id = _id[2];
    console.log(repo_id);
    return `${this.get('host')}/repositories/${id}`;
  }
});
