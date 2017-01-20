import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .given('there is an organizational unit', (next) => {
      server.loadFixtures('organizational-units');
      // the data needed are in the fixtures
      next();
    })

    .when('I visit an organizational unit page', (next) => {
      visit('/freddy-fazbear');
      andThen(() => next());
    })

    .then('I should see the organizational unit name', (next) => {
      const element = find('.top-route-header h1');
      expect(element.text()).to.equal('Freddy Fazbear');
      next();
    });
}
