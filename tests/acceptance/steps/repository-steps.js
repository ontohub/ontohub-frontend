import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .given('there is a repository', (next) => {
      next();
    })
    .when('I click on the description', (next) => {
      click('.top-route-header span');
      andThen(next);
    })
    .when('I fill in the field with "$string"', (str, next) => {
      fillIn('.top-route-header input', str);
      andThen(next);
    })
    .when('I click on the save button', (next) => {
      click('.top-route-header button');
      andThen(next);
    })
    .then('I should see the repository name "$name"', (name, next) => {
      const element = find('.top-route-header h1');
      expect(element.text()).to.equal(name);
      next();
    })
    .then('I should see the repository description "$description"', (description, next) => {
      const element = find('.top-route-header span');
      expect(element.text()).to.equal(description);
      next();
    });
}
