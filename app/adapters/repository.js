import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this._urlForRecord(id);
  },
  urlForUpdateRecord(id, modelName, snapshot) {
    return this._urlForRecord(id);
  },
  urlForDeleteRecord(id, modelName, snapshot) {
    return this._urlForRecord(id);
  },
  _urlForRecord(id) {
    let host = this.get('host');
    let url = `/repositories/${id}`;
    if(host) {
      url = `${host}${url}`;
    }
    return url;
  }
});
