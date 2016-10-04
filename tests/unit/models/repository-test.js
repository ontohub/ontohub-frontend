import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';
import Ember from 'ember';

describeModel(
  'repository',
  'Unit | Model | repository',
  {
    // Specify the other units that are required for this test.
    needs: ['model:namespace']
  },
  function() {
    it('has a name', function() {
      let model = this.subject();
      expect(model).to.be.ok;
    });

    it('belongs to a namespace', function() {
      let model = this.store().modelFor('repository');
      let relationship = Ember.get(model, 'relationshipsByName').get('namespace');
      expect(relationship.key).to.equal('namespace');
      expect(relationship.kind).to.equal('belongsTo');
    });
  }
);
