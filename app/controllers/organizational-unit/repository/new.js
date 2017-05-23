import Ember from 'ember'

export default Ember.Controller.extend({
  authenticatedUser: Ember.inject.service(),
  session: Ember.inject.service(),
  contentType: 'ontology',
  publicAccess: true,
  actions: {
    submitNewRepo: function() {
      let repo = this.get('model')
      this.get('authenticatedUser.authenticatedUser').then((user) => {
        repo.set('owner', user)
      })
      repo.set('contentType', this.get('contentType'))
      repo.set('publicAccess', this.get('publicAccess'))
      repo.save().then((repo) => {
        let _splitId = repo.id.split('/')
        this.transitionToRoute('organizationalUnit.repository.show',
          _splitId[0],
          _splitId[1])
      })
      return false
    }
  }
})
