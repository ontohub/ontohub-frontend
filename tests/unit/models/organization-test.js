import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupModelTest } from 'ember-mocha'
import Ember from 'ember'

describe('Unit | Model | organization', () => {
  setupModelTest('organization', {
    needs: ['model:repository', 'model:user']
  })

  it('has many repositories', function() {
    let model = this.store().modelFor('organization'),
        relationship = Ember.get(model, 'relationshipsByName').
                             get('repositories')
    expect(relationship.key).to.equal('repositories')
    expect(relationship.kind).to.equal('hasMany')
  })

  it('has many members', function() {
    let model = this.store().modelFor('organization'),
        relationship = Ember.get(model, 'relationshipsByName').
                             get('members')
    expect(relationship.key).to.equal('members')
    expect(relationship.kind).to.equal('hasMany')
  })
})
