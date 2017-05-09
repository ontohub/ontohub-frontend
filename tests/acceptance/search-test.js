import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import _ from 'lodash';

describe('Acceptance | search', () => {
  let application;

  beforeEach(() => {
    application = startApp();
  });

  afterEach(() => {
    destroyApp(application);
  });

  describe('Search page', () => {
    beforeEach(function() {
      const userCount = 5,
            organizationCount = 2,
            repositoryCount = 2 * 10,
            users = server.createList('user', userCount),
            organizations = server.createList(
              'organization',
              organizationCount
            ),
            userRepositories = server.createList(
              'repository',
              repositoryCount / 2,
              { ownerUserId: _.sample(users).id }
            ),
            organizationRepositories = server.createList(
              'repository',
              repositoryCount / 2,
              { ownerOrganizationId: _.sample(organizations).id }
            ),
            testData = {
              organizationalUnitCount: userCount + organizationCount,
              organizationalUnits: _.concat(users, organizations),
              repositoryCount,
              repositories: _.concat(userRepositories, organizationRepositories)
            };
      Object.assign(this.currentTest, testData);
      visit('/search');
    });

    it('displays general search information', () => {
      const header = find('.top-route-header'),
            name = find('h1', header);

      expect(name.text()).to.equal('All repositories');
    });

    it('shows the found repositories', function() {
      const results = find('#results');

      expect(results.children()).to.have.length(this.test.repositoryCount);
      let repoNames = _.map(this.test.repositories, (r) => r.attrs.id);
      _.map(results.children(), (r) => {
        // Extract repository name without 'Private' if repository is private
        let name = find('h1 a', r)[0].childNodes[0].nodeValue;
        expect(name).to.be.oneOf(repoNames);
      });
    });

    it('shows that no OMS were found', () => {
      click('a:contains(OMS)');

      andThen(() => {
        const results = find('#results');

        expect(results.text()).to.equal('No OMS found.');
      });
    });

    it('shows the found organizational units', function() {
      click('a:contains(Users)');
      andThen(() => {
        const results = find('#results');

        expect(results.children()).to.have.length(
          this.test.organizationalUnitCount
        );
      });
    });

    it('resets the tabs correctly upon re-entering page', () => {
      click('a:contains(Users)');
      click('a:contains(Ontohub)');
      click('a:contains(Search)');
      andThen(() => {
        expect(currentURL()).to.equal('/search');
      });
    });
  });
});
