import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForFindRecord() {
    let host = this.get('host'),
        url = '/version';
    if(host) {
      url = `${host}${url}`;
    }
    return url;
  }
})
