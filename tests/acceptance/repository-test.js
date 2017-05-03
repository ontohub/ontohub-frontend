import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import {
  authenticateSession
} from 'ontohub-frontend/tests/helpers/ember-simple-auth';

describe('Acceptance | repository', () => {
  let application;

  beforeEach(() => {
    application = startApp();
  });

  afterEach(() => {
    destroyApp(application);
  });

  describe('Repository page', () => {
    beforeEach(function() {
      const user = server.create('user'),
            repository = server.create('repository', { ownerUserId: user.id }),
            testData = {
              user,
              repository
            };
      Object.assign(this.currentTest, testData);
      visit(`/${repository.id}`);
    });

    it('displays general repository information', function() {
      const header = find('.top-route-header'),
            name = find('h1', header),
            description = find('span', header);

      expect(name.text()).to.equal(
        `${this.test.user.name} / ${this.test.repository.name}`
      );
      expect(description.text()).to.equal(this.test.repository.description);
    });

    it('can change the repository description', function() {
      const header = find('.top-route-header'),
            description = find('span', header),
            newDescription = 'This is the new description';

      expect(description.text()).to.equal(this.test.repository.description);
      click(description);
      fillIn('.top-route-header form input', newDescription);
      click('.top-route-header form button');
      andThen(() => {
        expect(find('span', header).text()).to.equal(newDescription);
      });
    });
  });

  describe('New repository page', () => {
    beforeEach(function() {
      this.currentTest.user = server.create('user', { name: 'Ada' });
      authenticateSession(Application, {
        data: {
          id: 'authenticationtoken',
          type: 'authentication_tokens',
          attributes: {
            // eslint-disable-next-line max-len
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoiYWRhIiwiZXhwIjoxNDkzMTkyNjAyfQ._vLn9KCMOfhTls26mRW_3Z322UmxsIidzLiE7uPJGCpTf_NluBiWbXCe-6ifyloR61VKjJU4kwF4-4-zEasSPw'
          }
        },
        jsonapi: { version: '1.0' }
      });
      visit('/new');
    });

    it('Displays the available namespaces', function() {
      const namespaceField = find('#repository_new_name select');
      expect(namespaceField.text()).to.equal(this.test.user.name);
    });

    it('Creates a new repository and redirects', function() {
      const name = 'some repo',
            description = 'This is the repository description',
            expectedId = `${this.test.user.id}/some-repo`;
      fillIn('#repository_new_name input', name);
      fillIn('#repository_new_description input', description);
      click('label:contains(Model)');
      click('label:contains(Private)');
      click('#repository_new_submit button');
      andThen(() => {
        const repo = server.db.repositories[0];
        expect(repo.contentType).to.equal('model');
        expect(repo.publicAccess).to.be.false;
        expect(repo.name).to.equal(name);
        expect(repo.id).to.equal(expectedId);
        expect(repo.description).to.equal('This is the repository description');
        expect(currentURL()).to.equal(`/${expectedId}`);
      });
    });
  });
});
