import Ember from 'ember';

export default Ember.Controller.extend({
  content_type: "ontology",
  public_access: true,
  actions: {
    submitNewRepo: function() {
      let model = this.get('model');
      let repo = model.repository;
      repo.set('owner', model.organizationalUnit);
      repo.set('contentType', this.get('contentType'));
      repo.set('publicAccess', this.get('publicAccess'));
      repo.save().then((repo) => {
        let _splitId = repo.id.split('/');
        this.transitionToRoute('organizationalUnit.repository.show', _splitId[0],
          _splitId[1]);
      });
      return false;
    }
  }
});
