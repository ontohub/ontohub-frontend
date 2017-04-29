import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('user.new', { path: 'users/sign_up' })
  this.route('organizationalUnit.repository.new', { path: 'new' })
  this.route('organizationalUnit', {
    path: ':organizational_unit_id'
  }, function() {
    this.route('show', { path: '' })

    this.route('repository', { path: ':repository_id' }, function() {
      this.route('show', { path: '' })
    })
  })
  this.route('search-result', { path: 'search' })
  this.route('login')
})

export default Router
