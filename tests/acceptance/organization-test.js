import { describe, it, beforeEach, afterEach } from 'mocha';
import _ from 'lodash';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | organization', () => {
  let application;

  beforeEach(() => {
    application = startApp();
  });

  afterEach(() => {
    destroyApp(application);
  });

  describe('Organization page', () => {
    beforeEach(function() {
      const memberCount = 3,
            repositoryCount = 2,
            members = server.createList('user', memberCount),
            organization = server.create('organization', { memberIds: _.map(members, (u) => u.id) }),
            repositories = server.createList('repository', repositoryCount, { ownerOrganizationId: organization.id }),
            testData = {
              organization,
              members,
              memberCount,
              repositories,
              repositoryCount
            };
      Object.assign(this.currentTest, testData);
      visit(`/${organization.id}`);
    });

    it('displays general organization information', function() {
      const header = find('.top-route-header'),
            username = find('h1', header);

      expect(username.text()).to.equal(this.test.organization.name);
    });

    it('displays the number of repositories and members', function() {
      const tabs = find('.top-route-header .tabs'),
            repositoryTab = find('li:contains(Repositories)', tabs),
            membersTab = find('li:contains(Members)', tabs);

      expect(repositoryTab.text()).to.contain(this.test.repositoryCount);
      expect(membersTab.text()).to.contain(this.test.memberCount);
    });

    it('displays the repositories', function() {
      const container = find('.page-content');

      expect(container.children()).to.have.length(this.test.repositoryCount);
      _.map(_.zip(container.children(), this.test.repositories), (e) => {
        expect(find('h1', e[0]).text()).to.contain(e[1].name);
        expect(find('p.help-text', e[0]).text()).to.contain(e[1].description);
      });
    });

    it('displays the members', function() {
      const membersTab = find('.top-route-header .tabs a:contains(Members)');
      click(membersTab);
      andThen(() => {
        const container = find('.page-content');

        expect(container.children()).to.have.length(this.test.memberCount);
        _.map(_.zip(container.children(), this.test.members), (e) => {
          expect(find('h1', e[0]).text()).to.contain(e[1].name);
        });
      });
    });

    it('resets the tabs correctly upon re-entering page', function() {
      const membersTab = find('.top-route-header .tabs a:contains(Members)');
      click(membersTab);
      click(`.page-content a:contains(${this.test.members[0].name})`);
      click('a:contains(Organizations)');
      click(`.page-content a:contains(${this.test.organization.name})`);
      andThen(() => {
        expect(currentURL()).to.not.equal(`/${this.test.organization.id}?tab=members`)
        expect(currentURL()).to.equal(`/${this.test.organization.id}`)
      });
    });
  });
});
