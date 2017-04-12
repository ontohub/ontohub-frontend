import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Model | repository', () => {
  setupModelTest('repository', {
    // Specify the other units that are required for this test.
    needs: ['model:user', 'model:organization']
  });

  it('returns the correct repository slug', function() {
    let model = this.subject({ id: 'freddy-fazbear/some-repo' });
    expect(model.get('repoId')).to.equal('some-repo');
  });

  it('has a name', function() {
    let model = this.subject();
    expect(model).to.be.ok;
  });

  describe('belongs to', () => {
    it('a user', function() {
      let model = this.store().modelFor('repository'),
          relationship = Ember.get(model, 'relationshipsByName').
        get('ownerUser');
      expect(relationship.key).to.equal('ownerUser');
      expect(relationship.kind).to.equal('belongsTo');
    });

    it('an organization', function() {
      let model = this.store().modelFor('repository'),
          relationship = Ember.get(model, 'relationshipsByName').
        get('ownerOrganization');
      expect(relationship.key).to.equal('ownerOrganization');
      expect(relationship.kind).to.equal('belongsTo');
    });
  });
});
