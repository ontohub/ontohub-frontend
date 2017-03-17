import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .given('there is a repository', (next) => {
      server.loadFixtures('repositories');
      next();
    })

    .when('I visit a repository page', (next) => {
      visit('/freddy-fazbear/bonnie-the-bunny');
      return pauseTest();
      andThen(() => next());
    })

    .then('I should see the repository name', (next) => {
      const element = find('.top-route-header h1');
      console.log("Element: ", element.text());
      expect(element.text()).to.equal('freddy-fazbear/aaaaaabonnie-the-bunny');
      next();
    });
}
