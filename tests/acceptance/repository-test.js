import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { signIn } from '../helpers/session';

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
      signIn(application);
      visit('/new');
    });

    it('displays the available namespaces', function() {
      const namespaceField = find('#repository-new-name select');
      expect(namespaceField.text()).to.equal(this.test.user.name);
    });

    it('creates a new repository and redirects', function() {
      const name = 'some repo',
            description = 'This is the repository description',
            expectedId = `${this.test.user.id}/some-repo`;
      fillIn('#repository-new-name input', name);
      fillIn('#repository-new-description input', description);
      click('label:contains(Model)');
      click('label:contains(Private)');
      click('#repository-new-submit button');
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
