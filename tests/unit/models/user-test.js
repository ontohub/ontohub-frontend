import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Model | user', () => {
  setupModelTest('user', {
    // Specify the other units that are required for this test.
    needs: ['model:repository', 'model:organization']
  });

  it('has many repositories', function() {
    let model = this.store().modelFor('user');
    let relationship = Ember.get(model, 'relationshipsByName').
      get('repositories');
    expect(relationship.key).to.equal('repositories');
    expect(relationship.kind).to.equal('hasMany');
  });

  it('has many organizations', function() {
    let model = this.store().modelFor('user');
    let relationship = Ember.get(model, 'relationshipsByName').
      get('organizations');
    expect(relationship.key).to.equal('organizations');
    expect(relationship.kind).to.equal('hasMany');
  });
});
