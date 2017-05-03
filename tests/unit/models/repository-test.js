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
      Ember.run(() => {
        let user = this.store().createRecord('user', { id: 'somebody' }),
            subj = this.subject();
        subj.set('owner', user);
        expect(subj.get('ownerUser.id')).to.equal(user.id);
        expect(subj.get('ownerOrganization.id')).to.be.undefined;
        expect(subj.get('owner.id')).to.equal(user.id);
      });
    });

    it('an organization', function() {
      let model = this.store().modelFor('repository'),
          relationship = Ember.get(model, 'relationshipsByName').
        get('ownerOrganization');
      expect(relationship.key).to.equal('ownerOrganization');
      expect(relationship.kind).to.equal('belongsTo');
      Ember.run(() => {
        let org = this.store().createRecord(
                    'organization',
                    { id: 'some-organization' }
                  ),
            subj = this.subject();
        subj.set('owner', org);
        expect(subj.get('ownerOrganization.id')).to.equal(org.id);
        expect(subj.get('ownerUser.id')).to.be.undefined;
        expect(subj.get('owner.id')).to.equal(org.id);
      });
    });
  });
});
