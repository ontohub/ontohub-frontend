import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Model | repository', () => {
  setupModelTest('repository', {
    // Specify the other units that are required for this test.
    needs: ['model:user']
  });

  it('has a name', function() {
    let model = this.subject();
    expect(model).to.be.ok;
  });

  it('belongs to a user', function() {
    let model = this.store().modelFor('repository');
    let relationship = Ember.get(model, 'relationshipsByName').
      get('owner');
    expect(relationship.key).to.equal('owner');
    expect(relationship.kind).to.equal('belongsTo');
  });
});
