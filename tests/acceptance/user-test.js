import { describe, it, beforeEach, afterEach } from 'mocha';
import _ from 'lodash';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | user', () => {
  let application;

  beforeEach(() => {
    application = startApp();
  });

  afterEach(() => {
    destroyApp(application);
  });

  describe('User page', () => {
    beforeEach(function() {
      const organizationCount = 1,
            repositoryCount = 2,
            user = server.create('user'),
            organizations = server.createList(
              'organization',
              organizationCount,
              { memberIds: [user.id] }),
            repositories = server.createList(
              'repository',
              repositoryCount,
              { ownerUserId: user.id }),
            testData = {
              user,
              organizations,
              organizationCount,
              repositories,
              repositoryCount
            };
      Object.assign(this.currentTest, testData);
      visit(`/${user.id}`);
    });

    it('displays general user information', function() {
      const header = find('.top-route-header'),
            realname = find('h1', header),
            username = find('h2', header);

      expect(username.text()).to.equal(this.test.user.name);
      expect(realname.text()).to.equal(this.test.user.real_name);
    });

    it('displays the number of repositories and organizations', function() {
      const tabs = find('.top-route-header .tabs'),
            repositoryTab = find('li:contains(Repositories)', tabs),
            organizationsTab = find('li:contains(Organizations)', tabs);

      expect(repositoryTab.text()).to.contain(this.test.repositoryCount);
      expect(organizationsTab.text()).to.contain(this.test.organizationCount);
    });

    it('displays the repositories', function() {
      const container = find('.page-content');

      expect(container.children()).to.have.length(this.test.repositoryCount);
      _.map(_.zip(container.children(), this.test.repositories), (e) => {
        expect(find('h1', e[0]).text()).to.contain(e[1].name);
        expect(find('p.help-text', e[0]).text()).to.contain(e[1].description);
      });
    });

    it('displays the organizations', function() {
      const organizationsTab = find(
        '.top-route-header .tabs a:contains(Organizations)'
      );
      click(organizationsTab);
      andThen(() => {
        const container = find('.page-content');

        expect(container.children()).to.have.length(
          this.test.organizationCount
        );
        _.map(_.zip(container.children(), this.test.organizations), (e) => {
          expect(find('h1', e[0]).text()).to.contain(e[1].name);
        });
      });
    });

    it('resets the tabs correctly upon re-entering page', function() {
      const organizationsTab = find(
        '.top-route-header .tabs a:contains(Organizations)'
      );
      click(organizationsTab);
      click(`.page-content a:contains(${this.test.organizations[0].name})`);
      click('a:contains(Members)');
      click(`.page-content a:contains(${this.test.user.name})`);
      andThen(() => {
        expect(currentURL()).to.equal(`/${this.test.user.id}`);
      });
    });
  });
});
