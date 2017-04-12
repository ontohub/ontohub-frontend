import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .when('I visit a user page', (next) => {
      visit('/freddy-fazbear');
      andThen(() => next());
    })

    .then('I should see the user name', (next) => {
      const element = find('.top-route-header h2');
      expect(element.text()).to.equal('Freddy Fazbear');
      next();
    });
}
