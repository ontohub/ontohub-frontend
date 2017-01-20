import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Model | namespace', () => {
  setupModelTest('namespace', {
    needs: ['model:repository']
  });
  it('has a name', function() {
    let model = this.subject({ name: 'Foobar' });
    expect(model.get('name')).to.equal('Foobar');
  });

  it('has many repositories', function() {
    let model = this.store().modelFor('namespace');
    let relationship = Ember.get(model, 'relationshipsByName').
      get('repositories');
    expect(relationship.key).to.equal('repositories');
    expect(relationship.kind).to.equal('hasMany');
  });
});
