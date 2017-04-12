import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .given('there is a repository', (next) => {
      next();
    })

    .when('I visit a repository page', (next) => {
      visit('/freddy-fazbear/bonnie-the-bunny');
      andThen(() => next());
    })

    .then('I should see the repository name', (next) => {
      const element = find('.top-route-header h1');
      expect(element.text()).to.equal('Freddy Fazbear / Bonnie Bunny');
      next();
    });
}
