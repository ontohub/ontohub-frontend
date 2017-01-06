import Ember from 'ember';

export default Ember.Controller.extend({
  content_type: "ontology",
  public_access: true,
  actions: {
    submitNewRepo: function() {
      let model = this.get('model');
      let repo = model.repository;
      repo.set('namespace', model.namespace);
      repo.set('content_type', this.get('content_type'));
      repo.set('public_access', this.get('public_access'));
      repo.save().then((repo) => {
        let _splitId = repo.id.split('/');
        this.transitionToRoute('namespace.repository.show', _splitId[0],
          _splitId[1]);
      });
      return false;
    }
  }
});
