import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

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

      expect(name.text()).to.equal(`${this.test.repository.name} / ${this.test.user.name}`);
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
  })
});
