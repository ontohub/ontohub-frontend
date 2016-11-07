/* eslint-disable no-undef */

import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .when('I visit the index page', (next) => {
      visit('/');
      andThen(() => next());
    })

    .then('I should see the welcome message', (next) => {
      const header = find('.top-route-header');
      const heading = find('h1', header);
      const subheading = find('p.help-text');

      expect(heading.text()).to.equal('Welcome to Ontohub!');
      // eslint-disable-next-line max-len
      expect(subheading.text()).to.equal('Repositories and proof tools for Ontologies, Models and Specifications (OMS)');
      next();
    })
    .then('I should see the development note', (next) => {
      const note = find('.page-content .warning.callout');
      const heading = find('h4', note);
      const noteText = find('p');

      expect(heading.text()).to.equal('Please note:');
      // eslint-disable-next-line max-len
      expect(noteText.text()).to.have.string('This is the preview version of Ontohub.');
      next();
    });
}
